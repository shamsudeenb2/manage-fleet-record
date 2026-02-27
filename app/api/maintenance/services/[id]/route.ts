// src/app/api/maintenance/services/[id]/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { z }            from "zod";
import { getSession }   from "@/app/config/auth";

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

// All fields optional for PATCH — only provided fields are updated
const UpdateServiceSchema = z.object({
  vehicleId:       z.string().uuid().optional(),
  driverId:        z.string().uuid().optional().nullable(),
  serviceType:     z.enum(SERVICE_TYPES).optional(),
  status:          z.enum(SERVICE_STATUSES).optional(),
  description:     z.string().optional().nullable(),
  odometerKm:      z.number().int().nonnegative().optional().nullable(),
  nextServiceKm:   z.number().int().nonnegative().optional().nullable(),
  nextServiceDate: z.string().optional().nullable(),
  laborCost:       z.number().nonnegative().optional().nullable(),
  partsCost:       z.number().nonnegative().optional().nullable(),
  garage:          z.string().optional().nullable(),
  garagePhone:     z.string().optional().nullable(),
  scheduledDate:   z.string().optional().nullable(),
  completedDate:   z.string().optional().nullable(),
  notes:           z.string().optional().nullable(),
});

type Ctx ={ params: Promise<{ id: string }> } ;

// ─── GET: Single service ──────────────────────────────────────────────────────
export async function GET(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id} = await params

    const service = await prisma.service.findUnique({
      where: { id:id, deletedAt: null },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true, currentOdo: true } },
        driver:  { select: { id: true, name: true, phone: true } },
      },
    });

    if (!service) {
      return NextResponse.json({ ok: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, service });
  } catch (err: any) {
    console.error("[service GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ─── PATCH: Update service ────────────────────────────────────────────────────
//
// Status transition logic:
//   → COMPLETED : auto-set completedDate = now() if not provided
//                 mirror odometerKm → vehicle.currentOdo
//                 mirror nextServiceKm / nextServiceDate → vehicle
//   → IN_PROGRESS: no automatic field changes (startedDate not tracked on Service)
//
export async function PATCH(req: Request, { params }: Ctx) {
  
  try {
    
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

     const {id} = await params
    // Fetch existing record — we need current costs to re-derive totalCost
    const existing = await prisma.service.findUnique({
      where:  { id: id, deletedAt: null },
      select: {
        id:           true,
        vehicleId:    true,
        laborCost:    true,
        partsCost:    true,
        status:       true,
        odometerKm:   true,
        nextServiceKm:   true,
        nextServiceDate: true,
      },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Service not found" }, { status: 404 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = UpdateServiceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const d = parsed.data;

    if (Object.keys(d).length === 0) {
      return NextResponse.json({ ok: false, message: "No fields to update" }, { status: 400 });
    }

    // Re-derive totalCost using updated or existing cost values
    const laborCost = d.laborCost !== undefined ? (d.laborCost ?? 0) : (existing.laborCost ?? 0);
    const partsCost = d.partsCost !== undefined ? (d.partsCost ?? 0) : (existing.partsCost ?? 0);
    const totalCost = +(laborCost + partsCost).toFixed(2);

    // Build the update data object — only include provided fields
    const data: Record<string, any> = { totalCost: totalCost > 0 ? totalCost : null };

    for (const [key, val] of Object.entries(d)) {
      if (val !== undefined) data[key] = val;
    }

    // Convert date strings to Date objects
    for (const key of ["nextServiceDate", "scheduledDate", "completedDate"] as const) {
      if (typeof data[key] === "string") data[key] = new Date(data[key]);
      else if (data[key] === null)       data[key] = null;
      // else: not provided — leave key out (undefined fields don't overwrite in Prisma)
    }

    // Auto-set completedDate on COMPLETED transition if form didn't provide one
    const transitioningToCompleted =
      d.status === "COMPLETED" && existing.status !== "COMPLETED";

    if (transitioningToCompleted && !data.completedDate) {
      data.completedDate = new Date();
    }
      
    const service = await prisma.service.update({
      where: { id: id },
      data,
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver:  { select: { id: true, name: true } },
      },
    });

    // ── Mirror completed-service data onto Vehicle ────────────────────────────
    if (transitioningToCompleted) {
      const vehicleUpdates: Record<string, any> = {};

      const odo = d.odometerKm ?? existing.odometerKm;
      if (odo) vehicleUpdates.currentOdo = odo;

      const nsk = d.nextServiceKm ?? existing.nextServiceKm;
      if (nsk) vehicleUpdates.nextServiceKm = nsk;

      const nsd = d.nextServiceDate
        ? new Date(d.nextServiceDate)
        : existing.nextServiceDate;
      if (nsd) vehicleUpdates.nextServiceDate = nsd;

      if (Object.keys(vehicleUpdates).length > 0) {
        await prisma.vehicle.update({
          where: { id: existing.vehicleId },
          data:  vehicleUpdates,
        });
      }
    }

    return NextResponse.json({ ok: true, service });
  } catch (err: any) {
    console.error("[service PATCH]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// ─── DELETE: Soft-delete service ──────────────────────────────────────────────
export async function DELETE(_req: Request, { params }: Ctx) {

  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
    const {id}= await params
    const existing = await prisma.service.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Service not found" }, { status: 404 });
    }

    await prisma.service.update({
      where: { id: id },
      data:  { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true, message: "Service deleted" });
  } catch (err: any) {
    console.error("[service DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
