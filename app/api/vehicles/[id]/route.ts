// // src/app/api/admin/vehicles/[id]/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import  prisma  from "@/components/lib/db";
// import { hashPassword } from "@/app/lib/auth";
// import  {getSession}  from "@/app/config/auth";

// const UpdateVehicleSchema = z.object({
//   vin: z.string().optional().nullable(),
//   plateNumber: z.string().optional(),
//   cap_no: z.string().optional(),
//   make: z.string().optional(),
//   model: z.string().optional(),
//   year: z.number().int().optional().nullable(),
//   assignDriverId: z.string().uuid().optional().nullable(),
// });



// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any).user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const id = await params?.id
//     const body = await req.json().catch(() => ({}));
//     const parsed = UpdateVehicleSchema.safeParse(body);
//     if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });

//     const { assignDriverId, ...data } = parsed.data;

//     const updated = await prisma.$transaction(async (tx) => {
//       // handle assignment/unassignment
//       if ("assignDriverId" in parsed.data) {
//         const currentVehicle = await tx.vehicle.findUnique({ where: { id:id } });
//         if (!currentVehicle) throw new Error("Vehicle not found");

//         if (currentVehicle.driverId && currentVehicle.driverId !== assignDriverId) {
//           // await tx.driver.update({ where: { id: currentVehicle.driverId }, data: { vehicleId: null } });
//           await tx.vehicle.update({ where: { id: id }, data: { driverId: null } }); //unassign driver
//         }

//         if (assignDriverId) {
//           const d = await tx.driver.findUnique({ where: { id: assignDriverId },include:{vehicle:true}});
//           if (!d) throw new Error("Driver not found");
//           if (d.vehicle ) throw new Error("Driver already assigned");
          
//           await tx.vehicle.update(
//             { 
//               where: { id: id }, 
//               data: { driverId: assignDriverId,
//                 asssignDate: new Date()
//                } 
//             });
//         }
//       }

//       // update vehicle fields
//       const u = await tx.vehicle.update({ where: { id: id }, data, include: { driver: true } });
//       return u;
//     });

//     return NextResponse.json({ ok: true, vehicle: updated }, { status: 200 });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getSession();
//     if (!session || (session as any).user?.role !== "ADMIN") {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const id = await params.id;
//     await prisma.vehicle.delete({ where: { id } });
//     return NextResponse.json({ ok: true }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/vehicles/[id]/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

const UpdateVehicleSchema = z.object({
  vin: z.string().min(1).optional().nullable(),
  plateNumber: z.string().min(2).optional(),
  cap_no: z.string().min(1).optional(),
  make: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional()
    .nullable(),
  fuelType: z.enum(["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"]).optional(),
  fuelEfficiencyKmPerUnit: z.number().positive().optional().nullable(),
  vehicleImg: z.string().optional().nullable(),
  assignDriverId: z.string().uuid("Invalid driver ID").optional().nullable(),
});

// ── GET: Single vehicle with full details ────────────────────────────────
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     const vehicle = await prisma.vehicle.findUnique({
//       where: { id, deletedAt: null },
//       include: {
//         driver: {
//           select: {
//             id: true,
//             name: true,
//             phone: true,
//             profileImage: true,
//             licenseNo: true,
//             licenseExp: true,
//           },
//         },
//         trips: {
//           take: 5,
//           orderBy: { despatchDate: "desc" },
//           select: {
//             id: true,
//             despatchDate: true,
//             destination: true,
//             loadingPlant: true,
//             status: true,
//             totaldistanceKm: true,
//           },
//         },
//         parts: {
//           take: 10,
//           orderBy: { dateInstalled: "desc" },
//           select: {
//             id: true,
//             partName: true,
//             dateInstalled: true,
//             odometerAtInstall: true,
//             unitCost: true,
//           },
//         },
//         repairs: {
//           take: 5,
//           orderBy: { repairDate: "desc" },
//           select: {
//             id: true,
//             repairDate: true,
//             description: true,
//             totalCost: true,
//             status: true,
//           },
//         },
//       },
//     });

//     if (!vehicle) {
//       return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
//     }

//     return NextResponse.json({ ok: true, vehicle }, { status: 200 });
//   } catch (err: any) {
//     console.error("[vehicle GET]", err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const vehicleId = await params.id;
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId }, include: { driver: true } });
    if (!vehicle) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, vehicle }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── PATCH: Update vehicle fields and/or reassign driver ──────────────────
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (
      !session ||
      !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)
    ) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const body = await req.json().catch(() => ({}));
    const parsed = UpdateVehicleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const { assignDriverId, ...vehicleFields } = parsed.data;

    const updated = await prisma.$transaction(async (tx) => {
      // Verify vehicle exists
      const currentVehicle = await tx.vehicle.findUnique({
        where: { id, deletedAt: null },
        select: { id: true, driverId: true, plateNumber: true,asssignDate:true },
      });
      if (!currentVehicle) throw new Error("Vehicle not found");

      // ── Driver assignment logic ──────────────────────────────────────
      if ("assignDriverId" in parsed.data) {
        const incomingDriverId = assignDriverId ?? null;

        // Unassign current driver if there is one and it's different
        if (
          currentVehicle.driverId &&
          currentVehicle.driverId !== incomingDriverId
        ) {
          // Close the TruckDriver history record for the outgoing driver
          await tx.truckDriver.updateMany({
            where: {
              vehicleId: id,
              driverId: currentVehicle.driverId,
              to: new Date("9999-12-31"),
            },
            data: { to: new Date() },
          });

          // Clear driver from vehicle
          await tx.vehicle.update({
            where: { id },
            data: { driverId: null, asssignDate: null },
          });
        }

        // Assign new driver if provided
        if (incomingDriverId) {
          const driver = await tx.driver.findUnique({
            where: { id: incomingDriverId },
            include: { vehicle: true },
          });

          if (!driver) throw new Error("Driver not found");
          if (driver.vehicle && driver.vehicle.id !== id) {
            throw new Error(
              `Driver is already assigned to vehicle ${driver.vehicle.plateNumber}`
            );
          }

          const now = new Date();

          // Update vehicle with new driver
          await tx.vehicle.update({
            where: { id },
            data: { driverId: incomingDriverId, asssignDate: now },
          });

          // Create TruckDriver history record for the new assignment
          await tx.truckDriver.create({
            data: {
              vehicleId: id,
              driverId: incomingDriverId,
              from: now,
              to: new Date("9999-12-31"),
            },
          });
        }
      }

      // ── Update other vehicle fields ──────────────────────────────────
      // Strip undefined values so we don't accidentally null out fields
      const cleanFields = Object.fromEntries(
        Object.entries(vehicleFields).filter(([, v]) => v !== undefined)
      );

      const updatedVehicle = await tx.vehicle.update({
        where: { id },
        data: cleanFields,
        include: {
          driver: {
            select: {
              id: true,
              name: true,
              phone: true,
              profileImage: true,
            },
          },
        },
      });

      return updatedVehicle;
    });

    return NextResponse.json({ ok: true, vehicle: updated }, { status: 200 });
  } catch (err: any) {
    console.error("[vehicle PATCH]", err);

    // Friendly error messages for known throws
    if (
      err?.message?.includes("already assigned") ||
      err?.message?.includes("not found")
    ) {
      return NextResponse.json({ ok: false, message: err.message }, { status: 409 });
    }

    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── DELETE: Soft-delete a vehicle ────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Verify vehicle exists and isn't already deleted
    const existing = await prisma.vehicle.findUnique({
      where: { id, deletedAt: null },
      select: { id: true, driverId: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      // Close any open TruckDriver history records
      if (existing.driverId) {
        await tx.truckDriver.updateMany({
          where: {
            vehicleId: id,
            to: new Date("9999-12-31"),
          },
          data: { to: new Date() },
        });
      }

      // Soft-delete the vehicle
      await tx.vehicle.update({
        where: { id },
        data: { deletedAt: new Date(), driverId: null },
      });
    });

    return NextResponse.json({ ok: true, message: "Vehicle deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("[vehicle DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
