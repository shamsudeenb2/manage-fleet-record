// src/app/api/vehicles/deleted/route.ts
import {NextRequest, NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { getSession }   from "@/app/config/auth";

// ─── GET: List soft-deleted vehicles (Admin only) ─────────────────────────────
//
// Query params:
//   page   (default 1)
//   limit  (default 10, max 100)
//   search (plate, cap_no, VIN, make, model)
//
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized — admin only" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1", 10));
    const limit  = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "10", 10)));
    const search = (searchParams.get("search") ?? "").trim();

    // Build search filter — matches plate, cap_no, VIN, make, model
    const searchFilter = search
      ? {
          OR: [
            { plateNumber: { contains: search, mode: "insensitive" as const } },
            { cap_no:      { contains: search, mode: "insensitive" as const } },
            { vin:         { contains: search, mode: "insensitive" as const } },
            { make:        { contains: search, mode: "insensitive" as const } },
            { model:       { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    // Only fetch records where deletedAt IS NOT null
    const where = {
      deletedAt: { not: null },
      ...searchFilter,
    };

    const [items, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        orderBy: { deletedAt: "desc" },  // most recently deleted first
        skip:    (page - 1) * limit,
        take:    limit,
        select: {
          id:          true,
          vin:         true,
          plateNumber: true,
          cap_no:      true,
          make:        true,
          model:       true,
          year:        true,
          fuelType:    true,
          vehicleImg:  true,
          currentOdo:  true,
          deletedAt:   true,
          createdAt:   true,
        },
      }),
      prisma.vehicle.count({ where }),
    ]);

    return NextResponse.json({ ok: true, items, total, page, limit });
  } catch (err: any) {
    console.error("[vehicles/deleted GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
