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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: params.id }, include: { driver: true } });
    if (!vehicle) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, vehicle }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any).user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     // const body = await req.json().catch(() => ({}));
//     // const parsed = UpdateVehicleSchema.safeParse(body);
//     // if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });

//     // const { assignDriverId, ...data } = parsed.data;

//     // const updated = await prisma.$transaction(async (tx) => {
//     //   // handle assignment/unassignment
//     //   if ("assignDriverId" in parsed.data) {
//     //     const currentVehicle = await tx.vehicle.findUnique({ where: { id: params.id } });
//     //     if (!currentVehicle) throw new Error("Vehicle not found");

//     //     if (currentVehicle.driverId && currentVehicle.driverId !== assignDriverId) {
//     //       await tx.driver.update({ where: { id: currentVehicle.driverId }, data: { vehicleId: null } });
//     //       await tx.vehicle.update({ where: { id: params.id }, data: { driverId: null } });
//     //     }

//     //     if (assignDriverId) {
//     //       const d = await tx.driver.findUnique({ where: { id: assignDriverId }});
//     //       if (!d) throw new Error("Driver not found");
//     //       if (d.vehicleId && d.vehicleId !== params.id) throw new Error("Driver already assigned");
//     //       await tx.driver.update({ where: { id: assignDriverId }, data: { vehicleId: params.id } });
//     //       await tx.vehicle.update({ where: { id: params.id }, data: { driverId: assignDriverId } });
//     //     }
//     //   }

//     //   // update vehicle fields
//     //   const u = await tx.vehicle.update({ where: { id: params.id }, data, include: { driver: true } });
//     //   return u;
//     // });

//     const id = await params?.id
//         const currentVehicle =  await prisma.vehicle.findUnique({ 
//           where: { id: id },
//           select: { id: true, driverId: true, plateNumber: true,asssignDate:true }, });

//         if (!currentVehicle) {
//           return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
//         }
//         if (!currentVehicle.driverId) {
//           return NextResponse.json(
//             { ok: false, message: "Vehicle has no driver assigned" },
//             { status: 400 }
//           );
//         }
        
//         const driverId =  currentVehicle?.driverId as string
//         const asssignDate =  currentVehicle?.asssignDate as Date




//         const truckdriver=await prisma.truckDriver.create({ 
//           data: 
//           {
//             vehicleId: id,
//             driverId: driverId,
//             from: asssignDate ,
//             to: new Date
//           },
//         select: { id: true, vehicle:true },
//       });


//       if(truckdriver){
//         const updatedvehicle=await prisma.vehicle.update({ where: { id: id }, data: { driverId: null },
//         select: { id: true, driverId:true },});
//         console.log("removing driver from vehicle", updatedvehicle)
//         return NextResponse.json({ ok: true, }, { status: 200 });
//       }else{
//         return NextResponse.json({ ok: false, message: "Error" }, { status: 401 });
//       }

        
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
//   }
// }

// ── PATCH: Remove (unassign) driver from a vehicle ───────────────────────
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || (session as any).user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const id = await params.id;
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
