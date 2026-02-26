// // src/app/api/drivers/route.ts
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import  prisma  from "@/components/lib/db";
// import { getServerSession } from "next-auth";
// import  {getSession}  from "@/app/config/auth";

// const CreateDriverSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().optional().nullable(),
//   address: z.string().min(5),
//   profileImage: z.string().optional().nullable(),
//   licenseNo: z.string().optional().nullable(),
//   licenseExp: z.iso.datetime("Use the calendar to pick a date"),
//   licenseImage: z.string().optional().nullable(),
//   accountName: z.string().optional().nullable(),
//   accountNumber: z.string().optional().nullable(),
//   bank: z.string().optional().nullable(),
//   guarantorForm: z.string().optional().nullable(),
//   fingerPrint: z.string().optional().nullable(), // either URL or template string
//   notes: z.string().optional().nullable(),
//   vehicleId: z.string().uuid().optional(),
// });

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const page = Number(url.searchParams.get("page") ?? 1);
//     const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 100);
//     const search = url.searchParams.get("search") ?? "";

//     const where: any = { deletedAt: null };
//     if (search) {
//       where.OR = [{ name: { contains: search, mode: "insensitive" } }, { phone: { contains: search } }, { licenseNo: { contains: search } }];
//     }

//     const [items, total] = await Promise.all([
//       prisma.driver.findMany({
//         where,
//         skip: (page - 1) * limit,
//         take: limit,
//         orderBy: { createdAt: "desc" },
//         include: { vehicle: true },
//       }),
//       prisma.driver.count({ where }),
//     ]);

//     return NextResponse.json({ ok: true, items, total, page, limit }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     // Require authenticated user with role ADMIN or DATA_ENTRY
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json().catch(() => ({}));
//     const parsed = CreateDriverSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
//     }

//     const {name,phone,address,profileImage,licenseNo,licenseExp,licenseImage,accountName,accountNumber,
//         bank,guarantorForm,fingerPrint, notes
//      } = parsed.data; 

//     // You may run additional business checks here (e.g. unique licenseNo) if needed:
//     if (licenseNo) {
//       const existing = await prisma.driver.findFirst({ where: { licenseNo: licenseNo } });
//       if (existing) {
//         return NextResponse.json({ ok: false, message: "Driver with this license already exists" }, { status: 409 });
//       }
//     }

//     let created;
//     // if (vehicleId) {
//     //   // transaction: create driver then link vehicle (validate)
//     //   created = await prisma.$transaction(async (tx) => {
//     //     const v = await tx.vehicle.findUnique({ where: { id: vehicleId } });
//     //     if (!v) throw new Error("Vehicle not found");
//     //     // ensure vehicle not assigned already
//     //     if (v.driverId) throw new Error("Vehicle already assigned");

//     //     const d = await tx.driver.create({ data:{
//     //     name,
//     //     phone,
//     //     address,
//     //     profileImage: profileImage as any,
//     //     licenseNo,
//     //     licenseImage:licenseImage as any,
//     //     accountName: accountName as any,
//     //     accountNumber: accountNumber as any,
//     //     bank: bank as any,
//     //     guarantorForm:guarantorForm as any,
//     //     fingerPrint:"" as any,
//     //     notes
//     //    }});
//     //     await tx.driver.update({ where: { id: d.id }, data: { vehicleId } });
//     //     await tx.vehicle.update({ where: { id: vehicleId }, data: { driverId: d.id } });
//     //     return tx.driver.findUnique({ where: { id: d.id }, include: { vehicle: true } });
//     //   });
//     // } else {
//       created = await prisma.driver.create({ data:{
//         name,
//         phone,
//         address,
//         profileImage: profileImage as any,
//         licenseNo,
//         licenseExp,
//         licenseImage:licenseImage as any,
//         accountName: accountName as any,
//         accountNumber: accountNumber as any,
//         bank: bank as any,
//         guarantorForm:guarantorForm as any,
//         fingerPrint:"" as any,
//         notes
//     }, include: { vehicle: true } });
//     // }

//     return NextResponse.json({ ok: true, driver: created }, { status: 201 });
//   } catch (err: any) {
//     console.error(err);
//     const msg = err?.message ?? "Server error";
//     return NextResponse.json({ ok: false, message: msg }, { status: 500 });
//   }
// }


// src/app/api/auth/users/driver/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

const CreateDriverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional().nullable(),
  address: z.string().min(5, "Address is required"),
  profileImage: z.string().optional().nullable(),
  licenseNo: z.string().optional().nullable(),
  licenseExp: z.string().min(1, "License expiry is required"),
  licenseImage: z.string().optional().nullable(),
  accountName: z.string().optional().nullable(),
  accountNumber: z.string().optional().nullable(),
  bank: z.string().optional().nullable(),
  guarantorForm: z.string().optional().nullable(),
  fingerPrint: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

// ── GET: List drivers with pagination + search ──────────────────────────
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page   = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
    const limit  = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 10)), 100);
    const search = url.searchParams.get("search") ?? "";
    const hasVehicle = url.searchParams.get("hasVehicle"); // "true" | "false"

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { name:      { contains: search, mode: "insensitive" } },
        { phone:     { contains: search, mode: "insensitive" } },
        { licenseNo: { contains: search, mode: "insensitive" } },
        { address:   { contains: search, mode: "insensitive" } },
      ];
    }

    if (hasVehicle === "true")  where.vehicle = { isNot: null };
    if (hasVehicle === "false") where.vehicle = { is: null };

    const [items, total] = await Promise.all([
      prisma.driver.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          vehicle: {
            select: { id: true, plateNumber: true, cap_no: true },
          },
        },
      }),
      prisma.driver.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[drivers GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── POST: Create (onboard) a new driver ────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = CreateDriverSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const {
      name, phone, address, profileImage, licenseNo, licenseExp,
      licenseImage, accountName, accountNumber, bank,
      guarantorForm, fingerPrint, notes,
    } = parsed.data;

    // Check for duplicate license number
    if (licenseNo) {
      const existing = await prisma.driver.findFirst({
        where: { licenseNo, deletedAt: null },
      });
      if (existing) {
        return NextResponse.json(
          { ok: false, message: "A driver with this license number already exists" },
          { status: 409 }
        );
      }
    }

    const created = await prisma.driver.create({
      data: {
        name,
        phone,
        address,
        profileImage: profileImage ?? "",
        licenseNo,
        licenseExp: licenseExp ? new Date(licenseExp) : undefined,
        licenseImage: licenseImage ?? "",
        accountName :accountName ?? "",
        accountNumber:accountNumber ?? "",
        bank:bank ?? "",
        guarantorForm:guarantorForm ?? "",
        fingerPrint: fingerPrint ?? "",
        notes,
      },
      include: {
        vehicle: {
          select: { id: true, plateNumber: true, cap_no: true },
        },
      },
    });

    return NextResponse.json({ ok: true, driver: created }, { status: 201 });
  } catch (err: any) {
    console.error("[drivers POST]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}
