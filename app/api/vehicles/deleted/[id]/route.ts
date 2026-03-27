// src/app/api/vehicles/restore/[id]/route.ts
import { NextResponse } from "next/server";
import prisma           from "@/components/lib/db";
import { getSession }   from "@/app/config/auth";

type Ctx = { params: { id: string } };

// ─── PATCH: Restore (undelete) a soft-deleted vehicle (Admin only) ────────────
//
// Sets deletedAt back to null, making the vehicle fully active again.
// The vehicle's driver assignment and all historical records are preserved
// because soft-delete only sets deletedAt — it does not cascade-delete anything.
//
// Returns the restored vehicle record with basic fields.
//
export async function PATCH(_req: Request, { params }: Ctx) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized — admin only" }, { status: 401 });
    }

    const { id } = params;

    // Verify the vehicle exists AND is currently soft-deleted
    const existing = await prisma.vehicle.findUnique({
      where:  { id },
      select: { id: true, deletedAt: true, plateNumber: true, cap_no: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    }

    if (!existing.deletedAt) {
      return NextResponse.json(
        { ok: false, message: "Vehicle is already active — it has not been deleted" },
        { status: 409 }
      );
    }

    // Check if the plate number is now in use by another active vehicle
    // (edge case: another vehicle could have been created with the same plate
    //  while this one was deleted)
    const plateConflict = await prisma.vehicle.findFirst({
      where: {
        plateNumber: existing.plateNumber,
        deletedAt:   null,
        id:          { not: id },
      },
      select: { id: true, plateNumber: true },
    });

    if (plateConflict) {
      return NextResponse.json(
        {
          ok: false,
          message: `Cannot restore — plate number ${existing.plateNumber} is already in use by another active vehicle. Edit the plate number before restoring.`,
        },
        { status: 409 }
      );
    }

    // Restore: clear deletedAt
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data:  { deletedAt: null },
      select: {
        id:          true,
        plateNumber: true,
        cap_no:      true,
        make:        true,
        model:       true,
        year:        true,
        fuelType:    true,
        vehicleImg:  true,
        currentOdo:  true,
        driverId:    true,
        deletedAt:   true,
      },
    });

    return NextResponse.json({
      ok: true,
      message: `Vehicle ${vehicle.plateNumber} restored successfully`,
      vehicle,
    });
  } catch (err: any) {
    console.error("[vehicles/restore PATCH]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
