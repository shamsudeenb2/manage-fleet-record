// // src/app/api/maintenance/parts/[id]/route.ts
// import { NextResponse } from "next/server";
// import prisma           from "@/components/lib/db";
// import { z }            from "zod";
// import { getSession }   from "@/app/config/auth";
// import { updateRepairPartsCostRollup } from "../route";

// const CATEGORIES = [
//   "Engine",
//   "Brakes",
//   "Electrical",
//   "Tyres",
//   "Suspension",
//   "Body",
//   "Other",
// ] as const;

// // All fields optional — only provided fields are updated
// const UpdatePartSchema = z.object({
//   name:           z.string().min(1).optional(),
//   partNumber:     z.string().optional().nullable(),
//   category:       z.enum(CATEGORIES).optional(),
//   quantity:       z.number().int().positive().optional(),
//   unitCost:       z.number().nonnegative().optional(),
//   supplier:       z.string().optional().nullable(),
//   supplierPhone:  z.string().optional().nullable(),
//   purchaseDate:   z.string().optional().nullable(),
//   fittedDate:     z.string().optional().nullable(),
//   warrantyExpiry: z.string().optional().nullable(),
//   notes:          z.string().optional().nullable(),
// });

// type Ctx = { params: { id: string } };

// // ─── GET: Single part ─────────────────────────────────────────────────────────
// export async function GET(_req: Request, { params }: Ctx) {
//   try {
//     const session = await getSession();
//     if (!session) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const part = await prisma.part.findUnique({
//       where:   { id: params.id, deletedAt: null },
//       include: {
//         vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
//         repair:  { select: { id: true, faultDesc: true, status: true } },
//       },
//     });

//     if (!part) {
//       return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
//     }

//     return NextResponse.json({ ok: true, part });
//   } catch (err: any) {
//     console.error("[part GET]", err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// // ─── PUT: Update part ─────────────────────────────────────────────────────────
// //
// // totalCost re-derived from updated or existing quantity × unitCost.
// // If this part is linked to a Repair, repair.partsCost + repair.totalCost
// // are re-aggregated after the update via updateRepairPartsCostRollup().
// //
// export async function PUT(req: Request, { params }: Ctx) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const existing = await prisma.part.findUnique({
//       where:  { id: params.id, deletedAt: null },
//       select: { id: true, quantity: true, unitCost: true, repairId: true },
//     });

//     if (!existing) {
//       return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
//     }

//     const body   = await req.json().catch(() => ({}));
//     const parsed = UpdatePartSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { ok: false, errors: parsed.error.format(), message: "Validation failed" },
//         { status: 400 }
//       );
//     }

//     const d = parsed.data;

//     if (Object.keys(d).length === 0) {
//       return NextResponse.json({ ok: false, message: "No fields to update" }, { status: 400 });
//     }

//     // Re-derive totalCost using updated or existing qty/cost
//     const qty      = d.quantity ?? existing.quantity;
//     const cost     = d.unitCost ?? existing.unitCost;
//     const totalCost = +(qty * cost).toFixed(2);

//     const part = await prisma.part.update({
//       where: { id: params.id },
//       data: {
//         ...d,
//         totalCost,
//         purchaseDate:   d.purchaseDate !== undefined
//           ? (d.purchaseDate ? new Date(d.purchaseDate) : null)
//           : undefined,
//         fittedDate:     d.fittedDate !== undefined
//           ? (d.fittedDate ? new Date(d.fittedDate) : null)
//           : undefined,
//         warrantyExpiry: d.warrantyExpiry !== undefined
//           ? (d.warrantyExpiry ? new Date(d.warrantyExpiry) : null)
//           : undefined,
//       },
//       include: {
//         vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
//         repair:  { select: { id: true, faultDesc: true } },
//       },
//     });

//     // Keep repair rollup in sync
//     if (existing.repairId) {
//       await updateRepairPartsCostRollup(existing.repairId);
//     }

//     return NextResponse.json({ ok: true, part });
//   } catch (err: any) {
//     console.error("[part PUT]", err);
//     return NextResponse.json(
//       { ok: false, message: err?.message ?? "Server error" },
//       { status: 500 }
//     );
//   }
// }

// // ─── DELETE: Soft-delete part ─────────────────────────────────────────────────
// //
// // After soft-deleting, re-aggregate the parent Repair's partsCost and totalCost
// // so the repair's cost remains accurate.
// //
// export async function DELETE(_req: Request, { params }: Ctx) {
//   try {
//     const session = await getSession();
//     if (!session || (session as any)?.user?.role !== "ADMIN") {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const existing = await prisma.part.findUnique({
//       where:  { id: params.id, deletedAt: null },
//       select: { id: true, repairId: true },
//     });

//     if (!existing) {
//       return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
//     }

//     await prisma.part.update({
//       where: { id: params.id },
//       data:  { deletedAt: new Date() },
//     });

//     // Re-roll repair cost after this part is removed
//     if (existing.repairId) {
//       await updateRepairPartsCostRollup(existing.repairId);
//     }

//     return NextResponse.json({ ok: true, message: "Part deleted" });
//   } catch (err: any) {
//     console.error("[part DELETE]", err);
//     return NextResponse.json(
//       { ok: false, message: err?.message ?? "Server error" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/maintenance/parts/[id]/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { z }            from "zod";
import { getSession }   from "@/app/config/auth";
import { updateRepairPartsCostRollup } from "../route";

const CATEGORIES = [
  "Engine",
  "Brakes",
  "Electrical",
  "Tyres",
  "Suspension",
  "Body",
  "Other",
] as const;

// All fields optional — only provided fields are updated
const UpdatePartSchema = z.object({
  name:           z.string().min(1).optional(),
  partNumber:     z.string().optional().nullable(),
  category:       z.enum(CATEGORIES).optional(),
  quantity:       z.number().int().positive().optional(),
  unitCost:       z.number().nonnegative().optional(),
  supplier:       z.string().optional().nullable(),
  supplierPhone:  z.string().optional().nullable(),
  purchaseDate:   z.string().optional().nullable(),
  fittedDate:     z.string().optional().nullable(),
  warrantyExpiry: z.string().optional().nullable(),
  notes:          z.string().optional().nullable(),
});

type Ctx =  { params: Promise<{ id: string }> } ;

// ─── GET: Single part ─────────────────────────────────────────────────────────
export async function GET(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id } = await params
    const part = await prisma.part.findUnique({
      where:   { id: id, deletedAt: null },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        repair:  { select: { id: true, faultDesc: true, status: true } },
      },
    });

    if (!part) {
      return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, part });
  } catch (err: any) {
    console.error("[part GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ─── PUT: Update part ─────────────────────────────────────────────────────────
//
// totalCost re-derived from updated or existing quantity × unitCost.
// If this part is linked to a Repair, repair.partsCost + repair.totalCost
// are re-aggregated after the update via updateRepairPartsCostRollup().
//
export async function PUT(req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
    const {id} = await params
    const existing = await prisma.part.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true, quantity: true, unitCost: true, repairId: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = UpdatePartSchema.safeParse(body);

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

    // Re-derive totalCost using updated or existing qty/cost
    const qty      = d.quantity ?? existing.quantity;
    const cost     = d.unitCost ?? existing.unitCost;
    const totalCost = +(qty * cost).toFixed(2);

    const part = await prisma.part.update({
      where: { id: id },
      data: {
        ...d,
        totalCost,
        purchaseDate:   d.purchaseDate !== undefined
          ? (d.purchaseDate ? new Date(d.purchaseDate) : null)
          : undefined,
        fittedDate:     d.fittedDate !== undefined
          ? (d.fittedDate ? new Date(d.fittedDate) : null)
          : undefined,
        warrantyExpiry: d.warrantyExpiry !== undefined
          ? (d.warrantyExpiry ? new Date(d.warrantyExpiry) : null)
          : undefined,
      },
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        repair:  { select: { id: true, faultDesc: true } },
      },
    });

    // Keep repair rollup in sync
    if (existing.repairId) {
      await updateRepairPartsCostRollup(existing.repairId);
    }

    return NextResponse.json({ ok: true, part });
  } catch (err: any) {
    console.error("[part PUT]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// ─── DELETE: Soft-delete part ─────────────────────────────────────────────────
//
// After soft-deleting, re-aggregate the parent Repair's partsCost and totalCost
// so the repair's cost remains accurate.
//
export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id} = await params
    const existing = await prisma.part.findUnique({
      where:  { id: id, deletedAt: null },
      select: { id: true, repairId: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Part not found" }, { status: 404 });
    }

    await prisma.part.update({
      where: { id: id },
      data:  { deletedAt: new Date() },
    });

    // Re-roll repair cost after this part is removed
    if (existing.repairId) {
      await updateRepairPartsCostRollup(existing.repairId);
    }

    return NextResponse.json({ ok: true, message: "Part deleted" });
  } catch (err: any) {
    console.error("[part DELETE]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
