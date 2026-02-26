// src/app/api/maintenance/services/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { z }            from "zod";
import { getSession }   from "@/app/config/auth";

// ─── Enums (match schema.prisma exactly) ────────────────────────────────────
const SERVICE_TYPES = [
  "OIL_CHANGE",
  "PERIODIC_INSPECTION",
  "AIR_FILTER",
  "FULL_SERVICE",
  "GENERATOR",
  "OTHER",
] as const;

const SERVICE_STATUSES = [
  "SCHEDULED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

// ─── Validation schema (mirrors create form exactly) ─────────────────────────
//
// Field-by-field mapping to the create page's ServiceSchema:
//
//  vehicleId        → required FK to Vehicle
//  driverId         → optional FK to Driver (present at service)
//  serviceType      → ServiceType enum, default OTHER
//  status           → ServiceStatus enum, default SCHEDULED
//  description      → free text, optional
//  odometerKm       → vehicle odometer at time of service (auto-filled from vehicle.currentOdo)
//  nextServiceKm    → odometer reading when next service is due
//  nextServiceDate  → date-based next service reminder
//  laborCost        → mechanic/garage labour cost (₦)
//  partsCost        → parts used in this service (manual entry OR from parts log)
//  totalCost        → laborCost + partsCost — ACCEPTED from form but OVERWRITTEN server-side
//  garage           → workshop name
//  garagePhone      → workshop contact number
//  scheduledDate    → when the service is planned for
//  completedDate    → when the service was finished (auto-set when status=COMPLETED)
//  notes            → free text

const CreateServiceSchema = z.object({
  vehicleId:       z.string().uuid("Invalid vehicle ID"),
  driverId:        z.string().uuid().optional().nullable(),
  serviceType:     z.enum(SERVICE_TYPES),
  status:          z.enum(SERVICE_STATUSES),
  description:     z.string().optional().nullable(),
  odometerKm:      z.number().int().nonnegative().optional().nullable(),
  nextServiceKm:   z.number().int().nonnegative().optional().nullable(),
  nextServiceDate: z.string().optional().nullable(),
  laborCost:       z.number().nonnegative().optional().nullable(),
  partsCost:       z.number().nonnegative().optional().nullable(),
  totalCost:       z.number().nonnegative().optional().nullable(), // overwritten server-side
  garage:          z.string().optional().nullable(),
  garagePhone:     z.string().optional().nullable(),
  scheduledDate:   z.string().optional().nullable(),
  completedDate:   z.string().optional().nullable(),
  notes:           z.string().optional().nullable(),
});

// ─── GET: List services ───────────────────────────────────────────────────────
//
// Query params:
//   page, limit        — pagination
//   search             — matches description, garage, plate, cap_no
//   status             — ServiceStatus or "ALL"
//   serviceType        — ServiceType or "ALL"
//   vehicleId          — filter to one vehicle
//   driverId           — filter to one driver
//   from / to          — date range on scheduledDate
//
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const url       = new URL(req.url);
    const page      = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
    const limit     = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 20)), 200);
    const search    = url.searchParams.get("search")      ?? "";
    const status    = url.searchParams.get("status");
    const svcType   = url.searchParams.get("serviceType");
    const vehicleId = url.searchParams.get("vehicleId");
    const driverId  = url.searchParams.get("driverId");
    const from      = url.searchParams.get("from");
    const to        = url.searchParams.get("to");

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { description: { contains: search, mode: "insensitive" } },
        { garage:      { contains: search, mode: "insensitive" } },
        { vehicle: { plateNumber: { contains: search, mode: "insensitive" } } },
        { vehicle: { cap_no:      { contains: search, mode: "insensitive" } } },
      ];
    }

    if (status  && status  !== "ALL") where.status      = status;
    if (svcType && svcType !== "ALL") where.serviceType = svcType;
    if (vehicleId)                    where.vehicleId   = vehicleId;
    if (driverId)                     where.driverId    = driverId;

    if (from || to) {
      where.scheduledDate = {};
      if (from) where.scheduledDate.gte = new Date(from);
      if (to)   where.scheduledDate.lte = new Date(to);
    }

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { createdAt: "desc" },
        include: {
          vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
          driver:  { select: { id: true, name: true } },
        },
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[services GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ─── POST: Create a service ───────────────────────────────────────────────────
//
// Server-side behaviour (beyond simple field storage):
//
//  1. totalCost re-computed: laborCost + partsCost — client value discarded
//  2. completedDate auto-set to now() if status=COMPLETED and form left it empty
//  3. On COMPLETED: vehicle.currentOdo updated if odometerKm provided
//  4. On COMPLETED: vehicle.nextServiceKm + vehicle.nextServiceDate mirrored from
//     the service record — enables "due soon" dashboard alerts without joining Service
//
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = CreateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // ── Entity checks (parallel) ──────────────────────────────────────────────
    const [vehicle, driver] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: d.vehicleId, deletedAt: null } }),
      d.driverId
        ? prisma.driver.findUnique({ where: { id: d.driverId, deletedAt: null } })
        : Promise.resolve(null),
    ]);

    if (!vehicle) {
      return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    }
    if (d.driverId && !driver) {
      return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
    }

    // ── Server-compute totalCost — never trust the client value ───────────────
    const totalCost = +((d.laborCost ?? 0) + (d.partsCost ?? 0)).toFixed(2);

    // ── Auto-set completedDate if status is COMPLETED and form left it blank ──
    const completedDate =
      d.completedDate
        ? new Date(d.completedDate)
        : d.status === "COMPLETED"
        ? new Date()
        : null;

    // ── Create the service record ─────────────────────────────────────────────
    const service = await prisma.service.create({
      data: {
        vehicleId:       d.vehicleId,
        driverId:        d.driverId       ?? null,
        serviceType:     d.serviceType,
        status:          d.status,
        description:     d.description    ?? null,
        odometerKm:      d.odometerKm     ?? null,
        nextServiceKm:   d.nextServiceKm  ?? null,
        nextServiceDate: d.nextServiceDate ? new Date(d.nextServiceDate) : null,
        laborCost:       d.laborCost      ?? null,
        partsCost:       d.partsCost      ?? null,
        totalCost:       totalCost > 0 ? totalCost : null,
        garage:          d.garage         ?? null,
        garagePhone:     d.garagePhone    ?? null,
        scheduledDate:   d.scheduledDate  ? new Date(d.scheduledDate) : null,
        completedDate,
        notes:           d.notes          ?? null,
      },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver:  { select: { id: true, name: true } },
      },
    });

    // ── Post-create side-effects for COMPLETED services ───────────────────────
    if (d.status === "COMPLETED") {
      const vehicleUpdates: Record<string, any> = {};

      // Mirror odometer onto vehicle record
      if (d.odometerKm) {
        vehicleUpdates.currentOdo = d.odometerKm;
      }

      // Mirror next-service pointers onto Vehicle so the dashboard
      // can query "due soon" without joining the Service table at all
      if (d.nextServiceKm) {
        vehicleUpdates.nextServiceKm = d.nextServiceKm;
      }
      if (d.nextServiceDate) {
        vehicleUpdates.nextServiceDate = new Date(d.nextServiceDate);
      }

      // if (Object.keys(vehicleUpdates).length > 0) {
      //   await prisma.vehicle.update({
      //     where: { id: d.vehicleId },
      //     data:  vehicleUpdates,
      //   });
      // }
    }

    return NextResponse.json({ ok: true, service }, { status: 201 });
  } catch (err: any) {
    console.error("[services POST]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
