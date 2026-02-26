// src/app/api/maintenance/parts/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { z }            from "zod";
import { getSession }   from "@/app/config/auth";

// ─── Constants (match create form + schema.prisma) ───────────────────────────
const CATEGORIES = [
  "Engine",
  "Brakes",
  "Electrical",
  "Tyres",
  "Suspension",
  "Body",
  "Other",
] as const;

// ─── Validation schema (mirrors create form PartSchema exactly) ───────────────
//
// Field-by-field mapping to the create page:
//
//  vehicleId      → required FK to Vehicle
//  repairId       → optional FK to Repair — part can exist standalone OR under a repair
//  name           → part name (e.g. "Air Filter", "Engine Belt")     — required
//  partNumber     → manufacturer / OEM code (e.g. "AF-2241-B")       — optional
//  category       → one of the 7 CATEGORIES enum values              — default Other
//  quantity       → how many units purchased                          — required, ≥1
//  unitCost       → cost per unit (₦)                                — required
//  totalCost      → quantity × unitCost — ACCEPTED from form but OVERWRITTEN server-side
//  supplier       → supplier / vendor name                           — optional
//  supplierPhone  → supplier contact number                          — optional
//  purchaseDate   → when the part was purchased                      — optional
//  fittedDate     → when the part was physically installed            — optional
//                   (often differs from purchaseDate — stock purchases)
//  warrantyExpiry → enables expiry alert badges on the list page     — optional
//  notes          → free text                                         — optional

const CreatePartSchema = z.object({
  vehicleId:      z.string().uuid("Invalid vehicle ID"),
  repairId:       z.string().uuid().optional().nullable(),
  name:           z.string().min(1, "Part name is required"),
  partNumber:     z.string().optional().nullable(),
  category:       z.enum(CATEGORIES).default("Other"),
  quantity:       z.number().int().positive("Quantity must be at least 1"),
  unitCost:       z.number().nonnegative("Unit cost is required"),
  totalCost:      z.number().nonnegative().optional(), // overwritten server-side
  supplier:       z.string().optional().nullable(),
  supplierPhone:  z.string().optional().nullable(),
  purchaseDate:   z.string().optional().nullable(),
  fittedDate:     z.string().optional().nullable(),
  warrantyExpiry: z.string().optional().nullable(),
  notes:          z.string().optional().nullable(),
});

// ─── Helper: re-aggregate Repair.partsCost + Repair.totalCost ────────────────
//
// Called every time a Part is created, updated, or deleted under a Repair.
// Keeps the repair's cost rollup in sync without manual maintenance.
// Exported so /api/maintenance/parts/[id]/route.ts can import and reuse it.
//
export async function updateRepairPartsCostRollup(repairId: string) {
  // Sum all non-deleted parts under this repair
  const agg = await prisma.part.aggregate({
    where: { repairId, deletedAt: null },
    _sum:  { totalCost: true },
  });
  const partsCost = +(agg._sum.totalCost ?? 0).toFixed(2);

  // Fetch current laborCost so we can keep it unchanged
  const repair = await prisma.repair.findUnique({
    where:  { id: repairId },
    select: { laborCost: true },
  });
  const totalCost = +((repair?.laborCost ?? 0) + partsCost).toFixed(2);

  await prisma.repair.update({
    where: { id: repairId },
    data:  {
      partsCost,
      totalCost: totalCost > 0 ? totalCost : null,
    },
  });
}

// ─── GET: List parts ─────────────────────────────────────────────────────────
//
// Query params:
//   page, limit      — pagination
//   search           — matches name, partNumber, supplier, category
//   category         — one of the 7 categories or "ALL"
//   vehicleId        — all parts for a specific vehicle
//   repairId         — all parts linked to a specific repair
//   from / to        — date range on purchaseDate
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
    const category  = url.searchParams.get("category");
    const vehicleId = url.searchParams.get("vehicleId");
    const repairId  = url.searchParams.get("repairId");
    const from      = url.searchParams.get("from");
    const to        = url.searchParams.get("to");

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { name:       { contains: search, mode: "insensitive" } },
        { partNumber: { contains: search, mode: "insensitive" } },
        { supplier:   { contains: search, mode: "insensitive" } },
        { category:   { contains: search, mode: "insensitive" } },
      ];
    }

    if (category && category !== "ALL") where.category  = category;
    if (vehicleId)                       where.vehicleId = vehicleId;
    if (repairId)                        where.repairId  = repairId;

    if (from || to) {
      where.purchaseDate = {};
      if (from) where.purchaseDate.gte = new Date(from);
      if (to)   where.purchaseDate.lte = new Date(to);
    }

    const [items, total] = await Promise.all([
      prisma.part.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { createdAt: "desc" },
        include: {
          vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
          repair:  { select: { id: true, faultDesc: true } },
        },
      }),
      prisma.part.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[parts GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ─── POST: Create a part ──────────────────────────────────────────────────────
//
// Server-side behaviour:
//
//  1. totalCost re-computed: quantity × unitCost — client value discarded
//
//  2. If repairId is provided:
//     a. Verify the repair exists and is not soft-deleted
//     b. After creating the Part, call updateRepairPartsCostRollup(repairId)
//        which re-sums all parts under this repair and updates repair.partsCost
//        and repair.totalCost atomically
//
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = CreatePartSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // ── Entity checks (parallel) ──────────────────────────────────────────────
    const [vehicle, repair] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: d.vehicleId, deletedAt: null } }),
      d.repairId
        ? prisma.repair.findUnique({ where: { id: d.repairId, deletedAt: null } })
        : Promise.resolve(null),
    ]);

    if (!vehicle) {
      return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    }
    if (d.repairId && !repair) {
      return NextResponse.json({ ok: false, message: "Repair job not found" }, { status: 404 });
    }

    // ── Server-compute totalCost — never trust the client value ───────────────
    const totalCost = +(d.quantity * d.unitCost).toFixed(2);

    // ── Create part record ────────────────────────────────────────────────────
    const part = await prisma.part.create({
      data: {
        vehicleId:      d.vehicleId,
        repairId:       d.repairId      ?? null,
        name:           d.name,
        partNumber:     d.partNumber    ?? null,
        category:       d.category,
        quantity:       d.quantity,
        unitCost:       d.unitCost,
        totalCost,                                    // server-computed
        supplier:       d.supplier      ?? null,
        supplierPhone:  d.supplierPhone ?? null,
        purchaseDate:   d.purchaseDate  ? new Date(d.purchaseDate)  : null,
        fittedDate:     d.fittedDate    ? new Date(d.fittedDate)    : null,
        warrantyExpiry: d.warrantyExpiry ? new Date(d.warrantyExpiry) : null,
        notes:          d.notes         ?? null,
      },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        repair:  { select: { id: true, faultDesc: true } },
      },
    });

    // ── Update repair cost rollup if this part is linked to a repair ──────────
    if (d.repairId) {
      await updateRepairPartsCostRollup(d.repairId);
    }

    return NextResponse.json({ ok: true, part }, { status: 201 });
  } catch (err: any) {
    console.error("[parts POST]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
