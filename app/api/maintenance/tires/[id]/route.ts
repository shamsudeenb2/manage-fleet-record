// src/app/api/maintenance/tires/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from "zod";
import { getSession } from "@/app/config/auth";

const STATUSES  = ["FITTED", "REPLACED", "RETREADED", "SCRAPPED"] as const;
const POSITIONS = [
  "FRONT_LEFT", "FRONT_RIGHT",
  "REAR_LEFT_INNER", "REAR_LEFT_OUTER",
  "REAR_RIGHT_INNER", "REAR_RIGHT_OUTER",
  "SPARE", "OTHER",
] as const;

const UpdateTireSchema = z.object({
  brand:                z.string().optional().nullable(),
  size:                 z.string().optional().nullable(),
  serialNumber:         z.string().optional().nullable(),
  position:             z.enum(POSITIONS).optional(),
  status:               z.enum(STATUSES).optional(),
  fittedOdometerKm:     z.number().int().nonnegative().optional().nullable(),
  removedOdometerKm:    z.number().int().nonnegative().optional().nullable(),
  treadDepthMm:         z.number().nonnegative().optional().nullable(),
  treadDepthAtRemoval:  z.number().nonnegative().optional().nullable(),
  expectedLifeKm:       z.number().int().nonnegative().optional().nullable(),
  unitCost:             z.number().nonnegative().optional().nullable(),
  supplier:             z.string().optional().nullable(),
  purchaseDate:         z.string().optional().nullable(),
  fittedDate:           z.string().optional().nullable(),
  removedDate:          z.string().optional().nullable(),
  notes:                z.string().optional().nullable(),
});

type Ctx ={ params: Promise<{ id: string }> } 

// ── GET single tire ───────────────────────────────────────────────────────────
export async function GET(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    const {id} = await params
    const tire = await prisma.tire.findUnique({
      where:   { id: id, deletedAt: null },
      include: { vehicle: { select: { id: true, plateNumber: true, cap_no: true, currentOdo: true } } },
    });
    if (!tire) return NextResponse.json({ ok: false, message: "Tire not found" }, { status: 404 });

    return NextResponse.json({ ok: true, tire });
  } catch (err: any) {
    console.error("[tire GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── PATCH: Update tire ────────────────────────────────────────────────────────
export async function PATCH(req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id}= await params

    const existing = await prisma.tire.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true, fittedOdometerKm: true, removedOdometerKm: true },
    });
    if (!existing) return NextResponse.json({ ok: false, message: "Tire not found" }, { status: 404 });

    const body   = await req.json().catch(() => ({}));
    const parsed = UpdateTireSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.format(), message: "Validation failed" }, { status: 400 });
    }

    const d = parsed.data;
    if (Object.keys(d).length === 0) {
      return NextResponse.json({ ok: false, message: "No fields to update" }, { status: 400 });
    }

    // Re-derive kmCovered if either odometer reading changes
    const fittedOdo  = d.fittedOdometerKm  ?? existing.fittedOdometerKm;
    const removedOdo = d.removedOdometerKm ?? existing.removedOdometerKm;
    let kmCovered: number | null = null;
    if (
      typeof fittedOdo  === "number" &&
      typeof removedOdo === "number" &&
      removedOdo > fittedOdo
    ) {
      kmCovered = removedOdo - fittedOdo;
    }

    // Auto-set removedDate when status transitions to non-FITTED and removedDate not provided
    const data: Record<string, any> = { ...d, kmCovered };
    if (d.status && d.status !== "FITTED" && !data.removedDate && !existing.removedOdometerKm) {
      data.removedDate = new Date();
    }
    for (const key of ["purchaseDate", "fittedDate", "removedDate"] as const) {
      if (data[key]) data[key] = new Date(data[key]);
      else if (data[key] === null) data[key] = null;
    }

    const tire = await prisma.tire.update({
      where:   { id: id },
      data,
      include: { vehicle: { select: { id: true, plateNumber: true, cap_no: true } } },
    });

    return NextResponse.json({ ok: true, tire });
  } catch (err: any) {
    console.error("[tire PATCH]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}

// ── DELETE: Soft-delete ───────────────────────────────────────────────────────
export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
    const {id} = await params
    const existing = await prisma.tire.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true },
    });
    if (!existing) return NextResponse.json({ ok: false, message: "Tire not found" }, { status: 404 });

    await prisma.tire.update({
      where: { id:id },
      data:  { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true, message: "Tire record deleted" });
  } catch (err: any) {
    console.error("[tire DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
