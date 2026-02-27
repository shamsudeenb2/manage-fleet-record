// src/app/api/admin/vehicles/[id]/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import  prisma  from "@/components/lib/db";
import { hashPassword } from "@/app/lib/auth";
import  {getSession}  from "@/app/config/auth";

const UpdateVehicleSchema = z.object({
  vin: z.string().optional().nullable(),
  plateNumber: z.string().optional(),
  cap_no: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().int().optional().nullable(),
  assignDriverId: z.string().uuid().optional().nullable(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const {id} = await params
    const vehicle = await prisma.vehicle.findUnique({ where: { id:id }, include: { driver: true } });
    if (!vehicle) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, vehicle }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}


// ── PATCH: Remove (unassign) driver from a vehicle ───────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getSession();
    if (
      !session ||
      !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)
    ) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id, deletedAt: null },
      select: { id: true, driverId: true, plateNumber: true },
    });

    if (!vehicle) {
      return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    }

    if (!vehicle.driverId) {
      return NextResponse.json(
        { ok: false, message: "Vehicle has no driver assigned" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      // Close the open TruckDriver history record
      await tx.truckDriver.updateMany({
        where: {
          vehicleId: id,
          driverId: vehicle.driverId!,
          to: new Date("9999-12-31"),
        },
        data: { to: new Date() },
      });

      // Unassign driver from vehicle
      await tx.vehicle.update({
        where: { id },
        data: { driverId: null, asssignDate: null },
      });
    });

    return NextResponse.json({ ok: true, message: "Driver removed successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("[vehicle remove driver]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const session = await getSession();
    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const {id} = await params;
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
