


// src/app/api/maintenance/repairs/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from "zod";
import { getSession } from "@/app/config/auth";

const STATUSES   = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

const UpdateRepairSchema = z.object({
  vehicleId:     z.string().uuid().optional(),
  driverId:      z.string().uuid().optional().nullable(),
  status:        z.enum(STATUSES).optional(),
  priority:      z.enum(PRIORITIES).optional(),
  faultDesc:     z.string().min(1).optional(),
  repairDesc:    z.string().optional().nullable(),
  odometerKm:   z.number().int().nonnegative().optional().nullable(),
  laborCost:    z.number().nonnegative().optional().nullable(),
  garage:        z.string().optional().nullable(),
  garagePhone:   z.string().optional().nullable(),
  reportedDate:  z.string().optional(),
  startedDate:   z.string().optional().nullable(),
  completedDate: z.string().optional().nullable(),
  notes:         z.string().optional().nullable(),
});

type Ctx =  { params: Promise<{ id: string }> } ;

// ── GET single repair ─────────────────────────────────────────────────────────
export async function GET(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

    const {id} = await params
    const repair = await prisma.repair.findUnique({
      where: { id: id, deletedAt: null },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true, currentOdo: true } },
        driver:  { select: { id: true, name: true, phone: true } },
        parts: {
          where:   { deletedAt: null },
          orderBy: { createdAt: "asc" },
          select:  { id: true, name: true, partNumber: true, category: true, quantity: true, unitCost: true, totalCost: true, fittedDate: true },
        },
      },
    });

    if (!repair) return NextResponse.json({ ok: false, message: "Repair not found" }, { status: 404 });

    return NextResponse.json({ ok: true, repair });
  } catch (err: any) {
    console.error("[repair GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── PATCH: Update repair ──────────────────────────────────────────────────────
export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id} = await params
    const existing = await prisma.repair.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true, laborCost: true, partsCost: true },
    });
    if (!existing) return NextResponse.json({ ok: false, message: "Repair not found" }, { status: 404 });

    const body   = await req.json().catch(() => ({}));
    const parsed = UpdateRepairSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.format(), message: "Validation failed" }, { status: 400 });
    }

    const d = parsed.data;

    // If laborCost changes, re-derive totalCost server-side
    const laborCost = d.laborCost !== undefined ? d.laborCost : existing.laborCost;
    const partsCost = existing.partsCost ?? 0; // partsCost only rolls up from parts[], not editable directly
    const totalCost = +((laborCost ?? 0) + partsCost).toFixed(2);

    // Build update payload — only include keys that were provided
    const data: Record<string, any> = { totalCost };
    for (const [key, val] of Object.entries(d)) {
      if (val !== undefined) data[key] = val;
    }
    // Convert date strings to Date objects
    for (const key of ["reportedDate", "startedDate", "completedDate"] as const) {
      if (data[key]) data[key] = new Date(data[key]);
      else if (data[key] === null) data[key] = null;
    }

    if (Object.keys(d).length === 0) {
      return NextResponse.json({ ok: false, message: "No fields to update" }, { status: 400 });
    }

    // Auto-set startedDate when status transitions to IN_PROGRESS
    if (d.status === "IN_PROGRESS" && !data.startedDate) {
      data.startedDate = new Date();
    }
    // Auto-set completedDate when status transitions to COMPLETED
    if (d.status === "COMPLETED" && !data.completedDate) {
      data.completedDate = new Date();
    }

    const repair = await prisma.repair.update({
      where: { id: id },
      data,
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver:  { select: { id: true, name: true } },
        parts:   { where: { deletedAt: null }, select: { id: true, name: true, totalCost: true } },
      },
    });

    return NextResponse.json({ ok: true, repair });
  } catch (err: any) {
    console.error("[repair PATCH]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}

// ── DELETE: Soft-delete repair ────────────────────────────────────────────────
export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id} = await params
    const existing = await prisma.repair.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true },
    });
    if (!existing) return NextResponse.json({ ok: false, message: "Repair not found" }, { status: 404 });

    // Soft-delete repair and all its child parts atomically
    await prisma.$transaction([
      prisma.part.updateMany({
        where: { repairId: id, deletedAt: null },
        data:  { deletedAt: new Date() },
      }),
      prisma.repair.update({
        where: { id: id },
        data:  { deletedAt: new Date() },
      }),
    ]);

    return NextResponse.json({ ok: true, message: "Repair deleted" });
  } catch (err: any) {
    console.error("[repair DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
