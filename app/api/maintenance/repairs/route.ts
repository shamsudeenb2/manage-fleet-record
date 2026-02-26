// // src/app/api/admin/repairs/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import prisma from "@/components/lib/db";
// import  {getSession}  from "@/app/config/auth";

// const PartUseSchema = z.object({
//   partId: z.string().uuid(),
//   qtyUsed: z.number().int().positive(),
//   unitPrice: z.number().optional(),
//   notes: z.string().optional(),
// });

// const CreateRepairSchema = z.object({
//   vehicleId: z.string().uuid(),
//   repairDate: z.string(),
//   repairDescription: z.string().min(1),
//   odometerReadingKm: z.number().int().nonnegative(),
//   totalCost: z.number().nonnegative().optional().default(0),
//   mechanic: z.string().optional(),
//   notes: z.string().optional(),
//   partsUsed: z.array(PartUseSchema).optional().default([]),
// });

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const page = Number(url.searchParams.get("page") ?? 1);
//     const limit = Math.min(Number(url.searchParams.get("limit") ?? 20), 200);

//     const [items, total] = await Promise.all([
//       prisma.repair.findMany({
//         skip: (page - 1) * limit,
//         take: limit,
//         orderBy: { repairDate: "desc" },
//         include: { partsUsed: { include: { part: true } }, vehicle: true },
//       }),
//       prisma.repair.count(),
//     ]);

//     return NextResponse.json({ ok: true, items, total, page, limit });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any).user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json().catch(() => ({}));
//     const parsed = CreateRepairSchema.safeParse(body);
//     if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });

//     const data = parsed.data;

//     // transaction: create repair, create partsUsed, decrement part quantity
//     const result = await prisma.$transaction(async (tx) => {
//       const rep = await tx.repair.create({
//         data: {
//           vehicleId: data.vehicleId,
//           repairDate: new Date(data.repairDate),
//           repairDescription: data.repairDescription,
//           odometerReadingKm: data.odometerReadingKm,
//           totalCost: data.totalCost,
//           mechanic: data.mechanic,
//           notes: data.notes,
//         },
//       });

//       for (const pu of data.partsUsed) {
//         const p = await tx.part.findUnique({ where: { id: pu.partId } });
//         if (!p) throw new Error(`Part not found: ${pu.partId}`);
//         if (p.quantity < pu.qtyUsed) throw new Error(`Insufficient quantity for part ${p.name} (SKU: ${p.sku})`);

//         await tx.partUsedInRepair.create({
//           data: {
//             partId: pu.partId,
//             repairId: rep.id,
//             qtyUsed: pu.qtyUsed,
//             unitPrice: pu.unitPrice,
//             notes: pu.notes,
//           },
//         });

//         await tx.part.update({
//           where: { id: pu.partId },
//           data: { quantity: p.quantity - pu.qtyUsed },
//         });
//       }

//       return tx.repair.findUnique({ where: { id: rep.id }, include: { partsUsed: { include: { part: true } }, vehicle: true } });
//     });

//     return NextResponse.json({ ok: true, repair: result }, { status: 201 });
//   } catch (err: any) {
//     console.error("create repair error", err);
//     if (err?.message?.startsWith("Insufficient")) {
//       return NextResponse.json({ ok: false, message: err.message }, { status: 400 });
//     }
//     return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
//   }
// }

// src/app/api/maintenance/repairs/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { z }            from "zod";
import { getSession }   from "@/app/config/auth";

// ─── Enums (match schema.prisma exactly) ─────────────────────────────────────
const STATUSES   = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

// ─── Validation schema (mirrors create form RepairSchema exactly) ─────────────
//
// Field-by-field mapping to the create page:
//
//  vehicleId     → required FK to Vehicle
//  driverId      → optional FK to Driver (driver who reported the fault)
//  status        → RepairStatus enum, default OPEN
//  priority      → RepairPriority enum, default MEDIUM
//  faultDesc     → what broke — recorded at report time (required)
//  repairDesc    → what was done — filled in when repair is completed (optional)
//  odometerKm    → vehicle odometer at time of breakdown (auto-filled from vehicle.currentOdo)
//  laborCost     → mechanic/garage labour cost (₦)
//  partsCost     → initial parts cost estimate — overwritten by Part[] rollup once parts are logged
//  totalCost     → laborCost + partsCost — ACCEPTED from form but OVERWRITTEN server-side
//  garage        → workshop name
//  garagePhone   → workshop contact number
//  reportedDate  → when the fault was reported (required, auto-defaults to today on form)
//  startedDate   → when mechanic started work (auto-set on IN_PROGRESS transition)
//  completedDate → when repair was finished (auto-set on COMPLETED transition)
//  notes         → free text

const CreateRepairSchema = z.object({
  vehicleId:     z.string().uuid("Invalid vehicle ID"),
  driverId:      z.string().uuid().optional().nullable(),
  status:        z.enum(STATUSES).default("OPEN"),
  priority:      z.enum(PRIORITIES).default("MEDIUM"),
  faultDesc:     z.string().min(1, "Fault description is required"),
  repairDesc:    z.string().optional().nullable(),
  odometerKm:   z.number().int().nonnegative().optional().nullable(),
  laborCost:    z.number().nonnegative().optional().nullable(),
  partsCost:    z.number().nonnegative().optional().nullable(),
  totalCost:    z.number().nonnegative().optional().nullable(), // overwritten server-side
  garage:        z.string().optional().nullable(),
  garagePhone:   z.string().optional().nullable(),
  reportedDate:  z.string().min(1, "Reported date is required"),
  startedDate:   z.string().optional().nullable(),
  completedDate: z.string().optional().nullable(),
  notes:         z.string().optional().nullable(),
});

// ─── GET: List repairs ────────────────────────────────────────────────────────
//
// Query params:
//   page, limit    — pagination
//   search         — matches faultDesc, repairDesc, garage, plate, cap_no
//   status         — RepairStatus or "ALL"
//   priority       — RepairPriority or "ALL"
//   vehicleId      — filter to one vehicle
//   driverId       — filter to one driver
//   from / to      — date range on reportedDate
//
// Ordering: CRITICAL priority always surfaces first, then by reportedDate desc.
// OPEN + CRITICAL repairs at the top ensures nothing urgent is buried.
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
    const search    = url.searchParams.get("search")    ?? "";
    const status    = url.searchParams.get("status");
    const priority  = url.searchParams.get("priority");
    const vehicleId = url.searchParams.get("vehicleId");
    const driverId  = url.searchParams.get("driverId");
    const from      = url.searchParams.get("from");
    const to        = url.searchParams.get("to");

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { faultDesc:  { contains: search, mode: "insensitive" } },
        { repairDesc: { contains: search, mode: "insensitive" } },
        { garage:     { contains: search, mode: "insensitive" } },
        { vehicle: { plateNumber: { contains: search, mode: "insensitive" } } },
        { vehicle: { cap_no:      { contains: search, mode: "insensitive" } } },
      ];
    }

    if (status   && status   !== "ALL") where.status    = status;
    if (priority && priority !== "ALL") where.priority  = priority;
    if (vehicleId)                      where.vehicleId = vehicleId;
    if (driverId)                       where.driverId  = driverId;

    if (from || to) {
      where.reportedDate = {};
      if (from) where.reportedDate.gte = new Date(from);
      if (to)   where.reportedDate.lte = new Date(to);
    }

    const [items, total] = await Promise.all([
      prisma.repair.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        // CRITICAL always at top, then newest reportedDate first
        orderBy: [{ priority: "desc" }, { reportedDate: "desc" }],
        include: {
          vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
          driver:  { select: { id: true, name: true } },
          parts: {
            where:  { deletedAt: null },
            select: { id: true, name: true, totalCost: true },
          },
        },
      }),
      prisma.repair.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[repairs GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ─── POST: Create a repair ────────────────────────────────────────────────────
//
// Server-side behaviour:
//
//  1. totalCost re-computed: laborCost + partsCost — client value discarded
//     Note: partsCost here is the INITIAL estimate. Once actual parts are logged
//     via /api/maintenance/parts, the Part[] rollup (updateRepairPartsCostRollup)
//     will overwrite partsCost and totalCost on this record automatically.
//
//  2. startedDate auto-set to now() if status=IN_PROGRESS and form left it empty
//
//  3. completedDate auto-set to now() if status=COMPLETED and form left it empty
//     (Covers the edge case where dispatcher logs a repair as already completed)
//
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = CreateRepairSchema.safeParse(body);

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

    // ── Server-compute totalCost ───────────────────────────────────────────────
    const totalCost = +((d.laborCost ?? 0) + (d.partsCost ?? 0)).toFixed(2);

    // ── Auto-set date fields on status transitions ─────────────────────────────
    const startedDate =
      d.startedDate
        ? new Date(d.startedDate)
        : d.status === "IN_PROGRESS"
        ? new Date()
        : null;

    const completedDate =
      d.completedDate
        ? new Date(d.completedDate)
        : d.status === "COMPLETED"
        ? new Date()
        : null;

    // ── Create repair record ───────────────────────────────────────────────────
    const repair = await prisma.repair.create({
      data: {
        vehicleId:     d.vehicleId,
        driverId:      d.driverId      ?? null,
        status:        d.status,
        priority:      d.priority,
        faultDesc:     d.faultDesc,
        repairDesc:    d.repairDesc    ?? null,
        odometerKm:   d.odometerKm    ?? null,
        laborCost:    d.laborCost     ?? null,
        partsCost:    d.partsCost     ?? null,   // initial estimate — overwritten by Part[] rollup
        totalCost:    totalCost > 0 ? totalCost : null,
        garage:        d.garage        ?? null,
        garagePhone:   d.garagePhone   ?? null,
        reportedDate:  new Date(d.reportedDate),
        startedDate,
        completedDate,
        notes:         d.notes         ?? null,
      },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver:  { select: { id: true, name: true } },
        parts:   true,
      },
    });

    return NextResponse.json({ ok: true, repair }, { status: 201 });
  } catch (err: any) {
    console.error("[repairs POST]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
