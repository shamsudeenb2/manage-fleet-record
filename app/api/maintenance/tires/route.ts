// src/app/api/maintenance/tires/route.ts
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

const CreateTireSchema = z.object({
  vehicleId:            z.string().uuid("Invalid vehicle ID"),
  brand:                z.string().optional().nullable(),
  size:                 z.string().optional().nullable(),
  serialNumber:         z.string().optional().nullable(),
  position:             z.enum(POSITIONS).default("OTHER"),
  status:               z.enum(STATUSES).default("FITTED"),
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

// ── GET: List tires ───────────────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

    const url       = new URL(req.url);
    const page      = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
    const limit     = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 20)), 200);
    const search    = url.searchParams.get("search")    ?? "";
    const status    = url.searchParams.get("status");
    const position  = url.searchParams.get("position");
    const vehicleId = url.searchParams.get("vehicleId");
    const from      = url.searchParams.get("from");
    const to        = url.searchParams.get("to");

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { brand:        { contains: search, mode: "insensitive" } },
        { size:         { contains: search, mode: "insensitive" } },
        { serialNumber: { contains: search, mode: "insensitive" } },
        { supplier:     { contains: search, mode: "insensitive" } },
        { vehicle: { plateNumber: { contains: search, mode: "insensitive" } } },
        { vehicle: { cap_no:      { contains: search, mode: "insensitive" } } },
      ];
    }
    if (status    && status   !== "ALL") where.status    = status;
    if (position  && position !== "ALL") where.position  = position;
    if (vehicleId)                       where.vehicleId = vehicleId;

    if (from || to) {
      where.fittedDate = {};
      if (from) where.fittedDate.gte = new Date(from);
      if (to)   where.fittedDate.lte = new Date(to);
    }

    const [items, total] = await Promise.all([
      prisma.tire.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { createdAt: "desc" },
        include: {
          vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        },
      }),
      prisma.tire.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[tires GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── POST: Create tire ─────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = CreateTireSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // Entity check
    const vehicle = await prisma.vehicle.findUnique({ where: { id: d.vehicleId, deletedAt: null } });
    if (!vehicle) return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });

    // Server-compute kmCovered if both odometer readings present
    let kmCovered: number | null = null;
    if (
      typeof d.fittedOdometerKm   === "number" &&
      typeof d.removedOdometerKm  === "number" &&
      d.removedOdometerKm > d.fittedOdometerKm
    ) {
      kmCovered = d.removedOdometerKm - d.fittedOdometerKm;
    }

    const tire = await prisma.tire.create({
      data: {
        vehicleId:           d.vehicleId,
        brand:               d.brand           ?? null,
        size:                d.size            ?? null,
        serialNumber:        d.serialNumber    ?? null,
        position:            d.position,
        status:              d.status,
        fittedOdometerKm:    d.fittedOdometerKm   ?? null,
        removedOdometerKm:   d.removedOdometerKm  ?? null,
        kmCovered,                                            // server-computed
        treadDepthMm:        d.treadDepthMm        ?? null,
        treadDepthAtRemoval: d.treadDepthAtRemoval ?? null,
        expectedLifeKm:      d.expectedLifeKm      ?? null,
        unitCost:            d.unitCost        ?? null,
        supplier:            d.supplier        ?? null,
        purchaseDate:        d.purchaseDate  ? new Date(d.purchaseDate)  : null,
        fittedDate:          d.fittedDate    ? new Date(d.fittedDate)    : null,
        removedDate:         d.removedDate   ? new Date(d.removedDate)   : null,
        notes:               d.notes         ?? null,
      },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
      },
    });

    return NextResponse.json({ ok: true, tire }, { status: 201 });
  } catch (err: any) {
    console.error("[tires POST]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}
