// // src/app/api/vehicles/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import  prisma  from "@/components/lib/db";
// import { hashPassword } from "@/app/lib/auth";
// import  {getSession}  from "@/app/config/auth";

// const CreateVehicleSchema = z.object({
//   vin: z.string().optional().nullable(),
//   plateNumber: z.string().min(2),
//   cap_no: z.string().min(1),
//   make: z.string().optional().nullable(),
//   model: z.string().optional().nullable(),
//   fuelType: z.string().optional(),
//   year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
//   assignDriverId: z.string().uuid().optional().nullable(), // optional driver to assign
//   vehicleImg: z.string().optional().nullable(),
// });

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const page = Number(url.searchParams.get("page") ?? 1);
//     const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 100);
//     const search = url.searchParams.get("search") ?? "";

//     const where: any = { deletedAt: null };
//     if (search) {
//       where.OR = [{ plateNumber: { contains: search, mode: "insensitive" } }, { vin: { contains: search } }, { cap_no: { contains: search } }];
//     }

//     const [items, total] = await Promise.all([
//       prisma.vehicle.findMany({
//         where,
//         skip: (page - 1) * limit,
//         take: limit,
//         orderBy: { createdAt: "desc" },
//         include: { driver: true },
//       }),
//       prisma.vehicle.count({ where }),
//     ]);

//     return NextResponse.json({ ok: true, items, total, page, limit }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }


// export async function POST(req: Request) {
//   try {
//     // require authenticated user with proper role
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json().catch(() => ({}));
//     const parsed = CreateVehicleSchema.safeParse({
//       ...body,
//       // ensure year from string to number if necessary
//       year: body?.year ? Number(body.year) : undefined,
//     });

//     if (!parsed.success) {
//       return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
//     }

//     const { vin, plateNumber, cap_no, make, model, year, assignDriverId, fuelType,vehicleImg } = parsed.data;

//     // Business rules:
//     // - cap_no, plateNumber, vin are unique (Prisma will throw if duplicates)
//     // - if assignDriverId provided: ensure driver exists and does not already have a vehicle
//     let asssignDate: Date
//     if (assignDriverId) {  
//       const driver = await prisma.driver.findUnique({ where: { id: assignDriverId }, include:{vehicle:true}});
//       if (!driver) {
//         return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
//       }
//        asssignDate = new Date()
//       if (driver?.vehicle) {
//         return NextResponse.json({ ok: false, message: "Driver already assigned to a vehicle" }, { status: 409 });
//       }
//     }


//     // Use transaction: create vehicle, then link driver (if provided)
//     const created = await prisma.$transaction(async (tx) => {
//       const vehicle = await tx.vehicle.create({
//         data: {
//           vin,
//           plateNumber,
//           cap_no,
//           make,
//           model,
//           year,
//           vehicleImg,
//           asssignDate: asssignDate?? null,
//           fuelType:fuelType as any,
//           driverId: assignDriverId
//         },
//       });

//       // if (assignDriverId) {
//       //   // set driver's vehicleId (one-to-one)
//       //   await tx.driver.update({
//       //     where: { id: assignDriverId },
//       //     data: { vehicle: vehicle },
//       //   });

//       //   // Optionally set vehicle.driverId if you keep that field
//       //   await tx.vehicle.update({
//       //     where: { id: vehicle.id },
//       //     data: { driverId: assignDriverId },
//       //   });
//       // }

//       return tx.vehicle.findUnique({
//         where: { id: vehicle.id },
//         include: { driver: true },
//       });
//     });

//     return NextResponse.json({ ok: true, vehicle: created }, { status: 201 });

//   } catch (err: any) {
//     console.error("POST /api/vehicles error:", err);

//     // Prisma unique constraint error
//     if (err?.code === "P2002") {
//       const target = (err?.meta?.target ?? []).join(", ");
//       return NextResponse.json({ ok: false, message: `Unique constraint failed: ${target}` }, { status: 409 });
//     }

//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/vehicles/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

const CreateVehicleSchema = z.object({
  vin: z.string().min(1).optional().nullable(),
  plateNumber: z.string().min(2, "Plate number is required"),
  cap_no: z.string().min(1, "CAP number is required"),
  make: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
  fuelType: z
    .enum(["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"])
    .default("DIESEL"),
  fuelEfficiencyKmPerUnit: z.number().positive().optional().nullable(),
  vehicleImg: z.string().optional().nullable(),
  assignDriverId: z.string().uuid("Invalid driver ID format").optional().nullable(),
});

// ── GET: List vehicles with pagination, search, and optional filters ─────
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page  = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
    const limit = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 10)), 100);
    const search     = url.searchParams.get("search")     ?? "";
    const fuelType   = url.searchParams.get("fuelType");   // optional filter
    const hasDriver  = url.searchParams.get("hasDriver");  // "true" | "false"

    const where: Record<string, unknown> = { deletedAt: null };

    if (search) {
      where.OR = [
        { plateNumber: { contains: search, mode: "insensitive" } },
        { vin:         { contains: search, mode: "insensitive" } },
        { cap_no:      { contains: search, mode: "insensitive" } },
        { make:        { contains: search, mode: "insensitive" } },
        { model:       { contains: search, mode: "insensitive" } },
      ];
    }

    if (fuelType && fuelType !== "ALL") {
      where.fuelType = fuelType;
    }

    if (hasDriver === "true")  where.driverId = { not: null };
    if (hasDriver === "false") where.driverId = null;

    const [items, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          driver: {
            select: { id: true, name: true, phone: true, profileImage: true },
          },
        },
      }),
      prisma.vehicle.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[vehicles GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── POST: Create a new vehicle ────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes(session?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    const parsed = CreateVehicleSchema.safeParse({
      ...body,
      year: body?.year != null ? Number(body.year) : undefined,
      fuelEfficiencyKmPerUnit: body?.fuelEfficiencyKmPerUnit != null
        ? Number(body.fuelEfficiencyKmPerUnit)
        : undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const {
      vin,
      plateNumber,
      cap_no,
      make,
      model,
      year,
      fuelType,
      fuelEfficiencyKmPerUnit,
      vehicleImg,
      assignDriverId,
    } = parsed.data;

    // Validate driver if provided
    let assignDate: Date | null = null;
    if (assignDriverId) {
      const driver = await prisma.driver.findUnique({
        where: { id: assignDriverId },
        include: { vehicle: true },
      });
      if (!driver) {
        return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
      }
      if (driver.vehicle) {
        return NextResponse.json(
          { ok: false, message: `Driver is already assigned to vehicle ${driver.vehicle.plateNumber}` },
          { status: 409 }
        );
      }
      assignDate = new Date();
    }

    const created = await prisma.$transaction(async (tx) => {
      const vehicle = await tx.vehicle.create({
        data: {
          vin,
          plateNumber,
          cap_no,
          make,
          model,
          year,
          vehicleImg,
          fuelType,
          fuelEfficiencyKmPerUnit,
          asssignDate: assignDate,
          driverId: assignDriverId ?? null,
        },
      });

      // Create TruckDriver history record if driver is being assigned
      if (assignDriverId && assignDate) {
        await tx.truckDriver.create({
          data: {
            vehicleId: vehicle.id,
            driverId: assignDriverId,
            from: assignDate,
            // "to" is set far in the future to represent an open-ended assignment
            to: new Date("9999-12-31"),
          },
        });
      }

      return tx.vehicle.findUnique({
        where: { id: vehicle.id },
        include: {
          driver: {
            select: { id: true, name: true, phone: true, profileImage: true },
          },
        },
      });
    });

    return NextResponse.json({ ok: true, vehicle: created }, { status: 201 });
  } catch (err: any) {
    console.error("[vehicles POST]", err);

    if (err?.code === "P2002") {
      const fields = (err?.meta?.target ?? []).join(", ");
      return NextResponse.json(
        { ok: false, message: `A vehicle with that ${fields} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
