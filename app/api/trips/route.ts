// // src/app/api/trips/route.ts
// import { NextResponse } from "next/server";
// import  prisma  from "@/components/lib/db";
// import { z } from "zod";
// import { getSession } from "@/app/config/auth";
// import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";



// const FuelInput = z.object({
//   type: z.enum(["DIESEL","PETROL","CNG","ELECTRIC","OTHER"]),
//   qtyGiven: z.number().nonnegative(),
//   unitPrice: z.number().optional(), //
//   fuelCost: z.number().nonnegative(),
//   // qtyConsume: z.number().nonnegative().optional(),
//   // qtyLeft :z.number().optional(), // optional; server can compute
//   unit: z.string().min(1), // "litre" or "cubic" etc
//   distanceKm: z.number().positive().optional(),
// });

// const CustomerSchema = z.object({
//   customerName: z.string().min(1),
//   company: z.string().min(1),
//   noOfBags: z.number(),
// });

// const CreateTripSchema = z.object({
//   vehicleId: z.string().uuid(),
//   driverId: z.string().uuid(),
//   loadingPlant: z.string().min(1),
//   waybill_no: z.string().min(1),
//   atcNo: z.string().min(1),
//   // company: z.string().optional(),
//   destination: z.string().min(1),
//   // customerName: z.string().optional(),
//   despatchDate: z.string(), // ISO date string
//   uploadDate: z.string().optional(), // optional
//   totaldistanceKm: z.number().positive().optional(), // optional if odo provided
//   odoStart: z.number().int().nonnegative().optional(),
//   odoEnd: z.number().int().nonnegative().optional(),
//   fuels: z.array(FuelInput).min(1),
//   customer: z.array(CustomerSchema).min(1),
//   notes: z.string().optional(),
// });

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const page = Number(url.searchParams.get("page") ?? 1);
//     const limit = Math.min(Number(url.searchParams.get("limit") ?? 20), 200);
//     const search = url.searchParams.get("search") ?? "";

//     const where: any = {};

//     if (search) {
//       where.OR = [
//         { waybill_no: { contains: search, mode: "insensitive" } },
//         { atcNo: { contains: search, mode: "insensitive" } },
//         { destination: { contains: search, mode: "insensitive" } },
//       ];
//     }

//     const [items, total] = await Promise.all([
//       prisma.trip.findMany({
//         where,
//         skip: (page - 1) * limit,
//         take: limit,
//         orderBy: { createdAt: "desc" },
//         include: {
//           vehicle: { select: { id: true, plateNumber: true, fuelType: true, fuelEfficiencyKmPerUnit: true } },
//           driver: { select: { id: true, name: true, phone: true } },
//           fuels: true,
//         },
//       }),
//       prisma.trip.count({ where }),
//     ]);

//     return NextResponse.json({ ok: true, items, page, total, limit }, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/trips error", err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     // require role
//     const session = await getSession();

//     console.log("name it lets see", session?.user?.role)
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any).user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }


//     const body = await req.json().catch(() => ({}));
//     const parsed = CreateTripSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
//     }
//     const payload = parsed.data;

//     // basic entity checks
//     const vehicle = await prisma.vehicle.findUnique({ where: { id: payload.vehicleId } });
//     if (!vehicle) return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });

//     const driver = await prisma.driver.findUnique({ where: { id: payload.driverId } });
//     if (!driver) return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });


//     const capLoading = capitalizeFirstLetter(payload.loadingPlant)
//     const capDistination = capitalizeFirstLetter(payload.destination)

//     // Compute distance: prefer explicit distanceKm; else if odoStart & odoEnd provided compute distance
//     // let distanceKm = payload.distanceKm ?? null;
//     // if (distanceKm == null && typeof payload.odoStart === "number" && typeof payload.odoEnd === "number") {
//     //   distanceKm = Math.max(0, payload.odoEnd - payload.odoStart);
//     // }

//     // // validation: ensure either distanceKm available or fuels have qtyConsume set (we need some consumption info)
//     // if (distanceKm == null && !payload.fuels.some(f => typeof f.qtyConsume === "number")) {
//     //   return NextResponse.json({ ok: false, message: "Distance not provided and no fuel qtyConsume supplied" }, { status: 400 });
//     // }

//     // Build transaction: create trip, create fuel rows, update vehicle.currentOdo if needed
//     const tripResult = await prisma.$transaction(async (tx: any) => {
//       // create trip
//       const trip = await tx.trip.create({
//         data: {
//           vehicleId: payload.vehicleId,
//           driverId: payload.driverId,
//           loadingPlant: capLoading,
//           waybill_no: payload.waybill_no,
//           atcNo: payload.atcNo,
//           destination: capDistination,
//           despatchDate: new Date(payload.despatchDate),
//           uploadDate: payload.uploadDate ? new Date(payload.uploadDate) : new Date(),
//           totaldistanceKm:payload.totaldistanceKm,
//           odoStart: payload.odoStart,
//           odoEnd: payload.odoEnd,
//           notes: payload.notes,
//         },
//       });

//            // Create fuels — compute qtyConsume when not provided for fossil fuels using vehicle.fuelEfficiencyKmPerUnit
//       const customerCreates = payload.customer.map(f => {
//         // if qtyConsume not provided and we have distance and an efficiency number, compute
//         //if (qtyConsume == null && distanceKm != null && (f.type === "DIESEL" || f.type === "PETROL" || f.type === "OTHER")) {
//           // use vehicle.fuelEfficiencyKmPerUnit (default fallback to 2 km per unit)
//         //  const kmPerUnit = vehicle.fuelEfficiencyKmPerUnit ?? 2.0;
//          // qtyConsume = +(distanceKm / kmPerUnit);
//        // }
//         return tx.customer.create({
//           data: {
//             company: f.company,
//             tripId: trip.id,
//             customerName: f.customerName,
//             noOfBags: f.noOfBags
//           },
//         });
//       });
//       await Promise.all(customerCreates);


//       // Create fuels — compute qtyConsume when not provided for fossil fuels using vehicle.fuelEfficiencyKmPerUnit
//       const fuelCreates = payload.fuels.map(f => {
//         // if qtyConsume not provided and we have distance and an efficiency number, compute
//         //if (qtyConsume == null && distanceKm != null && (f.type === "DIESEL" || f.type === "PETROL" || f.type === "OTHER")) {
//           // use vehicle.fuelEfficiencyKmPerUnit (default fallback to 2 km per unit)
//         //  const kmPerUnit = vehicle.fuelEfficiencyKmPerUnit ?? 2.0;
//          // qtyConsume = +(distanceKm / kmPerUnit);
//        // }
//         return tx.fuel.create({
//           data: {
//             type: f.type,
//             tripId: trip.id,
//             fuelCost: f.fuelCost,
//             qtyGiven: f.qtyGiven,
//             distanceKm:f.distanceKm, 
//             unit: f.unit,
//             unitPrice:f.unitPrice
//           },
//         });
//       });

//       await Promise.all(fuelCreates);

//       // update vehicle current odo if end provided
//       // if (typeof payload.odoEnd === "number") {
//       //   // only update if it's greater than existing
//       //   await tx.vehicle.update({
//       //     where: { id: vehicle.id },
//       //     data: { currentOdo: { set: payload.odoEnd } },
//       //   });
//       // }

//       // Return the trip with fuels and relations
//       return tx.trip.findUnique({
//         where: { id: trip.id },
//         include: { fuels: true, customer: true, vehicle: true, driver: true },
//       });
//     });

//     return NextResponse.json({ ok: true, trip: tripResult }, { status: 201 });
//   } catch (err: any) {
//     console.error("POST /api/trips error", err);
//     // detect Prisma uniqueness error for waybill/atc
//     if (err?.code === "P2002") {
//       const target = (err?.meta?.target ?? []).join(", ");
//       return NextResponse.json({ ok: false, message: `Unique constraint failed: ${target}` }, { status: 409 });
//     }
//     return NextResponse.json({ ok: false, message: err?.message || "Server error" }, { status: 500 });
//   }
// }
// src/app/api/trips/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/components/lib/db";
// import { z } from "zod";
// import { getSession } from "@/app/config/auth";
// import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

// const FuelInput = z.object({
//   type:       z.enum(["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"]),
//   qtyGiven:   z.number().nonnegative("Qty given must be ≥ 0"),
//   unitPrice:  z.number().nonnegative().optional(),
//   fuelCost:   z.number().nonnegative(),
//   unit:       z.string().min(1, "Unit is required"),
//   distanceKm: z.number().nonnegative().optional(),
// });

// const CustomerInput = z.object({
//   customerName: z.string().min(1, "Customer name is required"),
//   company:      z.string().min(1, "Company is required"),
//   noOfBags:     z.number().int().nonnegative(),
// });

// const CreateTripSchema = z.object({
//   vehicleId:       z.string().uuid("Invalid vehicle ID"),
//   driverId:        z.string().uuid("Invalid driver ID"),
//   loadingPlant:    z.string().min(1, "Loading plant is required"),
//   waybill_no:      z.string().min(1, "Waybill number is required"),
//   atcNo:           z.string().min(1, "ATC number is required"),
//   destination:     z.string().min(1, "Destination is required"),
//   despatchDate:    z.string().min(1, "Dispatch date is required"),
//   uploadDate:      z.string().optional(),
//   totaldistanceKm: z.number().positive().optional(),
//   odoStart:        z.number().int().nonnegative().optional(),
//   odoEnd:          z.number().int().nonnegative().optional(),
//   fuels:           z.array(FuelInput).min(1, "At least one fuel entry is required"),
//   customer:        z.array(CustomerInput).min(1, "At least one customer is required"),
//   notes:           z.string().optional(),
// });

// // ── GET: List trips with pagination, search, status filter ───────────────
// export async function GET(req: Request) {
//   try {
//     const url    = new URL(req.url);
//     const page   = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
//     const limit  = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 20)), 200);
//     const search = url.searchParams.get("search") ?? "";
//     const status = url.searchParams.get("status");
//     const vehicleId = url.searchParams.get("vehicleId");
//     const driverId  = url.searchParams.get("driverId");

//     // Date range filters
//     const from = url.searchParams.get("from");
//     const to   = url.searchParams.get("to");

//     const where: any = {};

//     if (search) {
//       where.OR = [
//         { waybill_no:    { contains: search, mode: "insensitive" } },
//         { atcNo:         { contains: search, mode: "insensitive" } },
//         { destination:   { contains: search, mode: "insensitive" } },
//         { loadingPlant:  { contains: search, mode: "insensitive" } },
//       ];
//     }

//     if (status && status !== "ALL") where.status = status;
//     if (vehicleId)                  where.vehicleId = vehicleId;
//     if (driverId)                   where.driverId  = driverId;

//     if (from || to) {
//       where.despatchDate = {};
//       if (from) where.despatchDate.gte = new Date(from);
//       if (to)   where.despatchDate.lte = new Date(to);
//     }

//     const [items, total] = await Promise.all([
//       prisma.trip.findMany({
//         where,
//         skip:    (page - 1) * limit,
//         take:    limit,
//         orderBy: { despatchDate: "desc" },
//         include: {
//           vehicle:  { select: { id: true, plateNumber: true, cap_no: true, fuelType: true, fuelEfficiencyKmPerUnit: true } },
//           driver:   { select: { id: true, name: true, phone: true } },
//           fuels:    true,
//           customer: true,
//         },
//       }),
//       prisma.trip.count({ where }),
//     ]);

//     return NextResponse.json(
//       { ok: true, items, page, total, limit, pages: Math.ceil(total / limit) },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("[trips GET]", err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// // ── POST: Create a new trip ──────────────────────────────────────────────
// export async function POST(req: Request) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const body   = await req.json().catch(() => ({}));
//     const parsed = CreateTripSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { ok: false, errors: parsed.error.format(), message: "Validation failed" },
//         { status: 400 }
//       );
//     }

//     const payload = parsed.data;

//     // ── Entity checks ──────────────────────────────────────────────────────
//     const [vehicle, driver] = await Promise.all([
//       prisma.vehicle.findUnique({ where: { id: payload.vehicleId, deletedAt: null } }),
//       prisma.driver.findUnique({  where: { id: payload.driverId,  deletedAt: null } }),
//     ]);

//     if (!vehicle) return NextResponse.json({ ok: false, message: "Vehicle not found" },  { status: 404 });
//     if (!driver)  return NextResponse.json({ ok: false, message: "Driver not found" },   { status: 404 });

//     // ── Capitalize route strings ───────────────────────────────────────────
//     const loadingPlant  = capitalizeFirstLetter(payload.loadingPlant);
//     const destination   = capitalizeFirstLetter(payload.destination);

//     // ── Derive distance from odometer if not explicitly provided ──────────
//     let distanceKm = payload.totaldistanceKm ?? null;
//     if (
//       distanceKm == null &&
//       typeof payload.odoStart === "number" &&
//       typeof payload.odoEnd   === "number" &&
//       payload.odoEnd > payload.odoStart
//     ) {
//       distanceKm = payload.odoEnd - payload.odoStart;
//     }

//     // ── Transaction: create trip + fuel rows + customers ─────────────────
//     const tripResult = await prisma.$transaction(async (tx) => {
//       const trip = await tx.trip.create({
//         data: {
//           vehicleId:       payload.vehicleId,
//           driverId:        payload.driverId,
//           loadingPlant,
//           waybill_no:      payload.waybill_no,
//           atcNo:           payload.atcNo,
//           destination,
//           despatchDate:    new Date(payload.despatchDate),
//           uploadDate:      payload.uploadDate ? new Date(payload.uploadDate) : new Date(),
//           totaldistanceKm: distanceKm,
//           odoStart:        payload.odoStart,
//           odoEnd:          payload.odoEnd,
//           notes:           payload.notes,
//         },
//       });

//       // Create fuel rows
//       await Promise.all(
//         payload.fuels.map((f) =>
//           tx.fuel.create({
//             data: {
//               tripId:     trip.id,
//               type:       f.type,
//               qtyGiven:   f.qtyGiven,
//               unitPrice:  f.unitPrice,
//               fuelCost:   f.fuelCost,
//               unit:       f.unit,
//               distanceKm: f.distanceKm,
//             },
//           })
//         )
//       );

//       // Create customer rows
//       await Promise.all(
//         payload.customer.map((c) =>
//           tx.customer.create({
//             data: {
//               tripId:       trip.id,
//               customerName: c.customerName,
//               company:      c.company,
//               noOfBags:     c.noOfBags,
//             },
//           })
//         )
//       );

//       // Update vehicle odometer if odoEnd is provided and greater than current
//       if (typeof payload.odoEnd === "number") {
//         await tx.vehicle.update({
//           where: { id: vehicle.id },
//           data:  { currentOdo: { set: payload.odoEnd } },
//         });
//       }

//       return tx.trip.findUnique({
//         where:   { id: trip.id },
//         include: { fuels: true, customer: true, vehicle: true, driver: true },
//       });
//     });

//     return NextResponse.json({ ok: true, trip: tripResult }, { status: 201 });
//   } catch (err: any) {
//     console.error("[trips POST]", err);

//     if (err?.code === "P2002") {
//       const target = (err?.meta?.target ?? []).join(", ");
//       return NextResponse.json(
//         { ok: false, message: `A trip with that ${target} already exists` },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { ok: false, message: err?.message ?? "Server error" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/trips/route.ts
import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from "zod";
import { getSession } from "@/app/config/auth";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

// ─── Import server-side fuel utilities ───────────────────────────────────────
// These run on the server to validate and re-derive computed values independently
// of what the client sends — preventing spoofed totals.
import {
  getEstimatedFuelConsumption,
  estimateCO2,
  toDieselEquivalent,
  costPerKm,
  DEFAULT_FUEL_UNIT,
} from "@/components/utils/fuelCalculations";

// ─── Validation schemas ───────────────────────────────────────────────────────

const FUEL_TYPES = ["DIESEL", "PETROL", "CNG", "ELECTRIC", "LPG", "OTHER"] as const;

const FuelInput = z.object({
  type:              z.enum(FUEL_TYPES),
  qtyGiven:          z.number().nonnegative("Qty given must be ≥ 0"),
  unitPrice:         z.number().nonnegative().optional(),
  fuelCost:          z.number().nonnegative(),      // accepted from client but re-verified
  unit:              z.string().min(1),
  distanceKm:        z.number().nonnegative().optional(),
  estimatedCO2:      z.number().nonnegative().optional(),
  dieselEquivalentL: z.number().nonnegative().optional(),
});

const CustomerInput = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  company:      z.string().min(1, "Company is required"),
  noOfBags:     z.number().int().nonnegative(),
});

const CreateTripSchema = z.object({
  vehicleId:        z.string().uuid("Invalid vehicle ID"),
  driverId:         z.string().uuid("Invalid driver ID"),
  loadingPlant:     z.string().min(1, "Loading plant is required"),
  waybill_no:       z.string().min(1, "Waybill number is required"),
  atcNo:            z.string().min(1, "ATC number is required"),
  destination:      z.string().min(1, "Destination is required"),
  despatchDate:     z.string().min(1, "Dispatch date is required"),
  uploadDate:       z.string().optional(),
  totaldistanceKm:  z.number().positive().optional(),
  totalFuelCost:    z.number().nonnegative().optional().nullable(),
  totalCO2Kg:       z.number().nonnegative().optional(),
  odoStart:         z.number().int().nonnegative().optional().nullable(),
  odoEnd:           z.number().int().nonnegative().optional().nullable(),
  fuels:            z.array(FuelInput).min(1, "At least one fuel entry is required"),
  customer:         z.array(CustomerInput).min(1, "At least one customer is required"),
  notes:            z.string().optional(),
});

// ── GET: List trips ───────────────────────────────────────────────────────────
export async function GET(req: Request) {
  try {
    const url       = new URL(req.url);
    const page      = Math.max(1, Number(url.searchParams.get("page")  ?? 1));
    const limit     = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 20)), 200);
    const search    = url.searchParams.get("search")    ?? "";
    const status    = url.searchParams.get("status");
    const vehicleId = url.searchParams.get("vehicleId");
    const driverId  = url.searchParams.get("driverId");
    const from      = url.searchParams.get("from");
    const to        = url.searchParams.get("to");

    const where: any = {};

    if (search) {
      where.OR = [
        { waybill_no:   { contains: search, mode: "insensitive" } },
        { atcNo:        { contains: search, mode: "insensitive" } },
        { destination:  { contains: search, mode: "insensitive" } },
        { loadingPlant: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status && status !== "ALL") where.status    = status;
    if (vehicleId)                  where.vehicleId = vehicleId;
    if (driverId)                   where.driverId  = driverId;

    if (from || to) {
      where.despatchDate = {};
      if (from) where.despatchDate.gte = new Date(from);
      if (to)   where.despatchDate.lte = new Date(to);
    }

    const [items, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip:    (page - 1) * limit,
        take:    limit,
        orderBy: { despatchDate: "desc" },
        include: {
          vehicle:  { select: { id: true, plateNumber: true, cap_no: true, fuelType: true, fuelEfficiencyKmPerUnit: true } },
          driver:   { select: { id: true, name: true, phone: true } },
          fuels:    true,
          customer: true,
        },
      }),
      prisma.trip.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, page, total, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[trips GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── POST: Create a trip ───────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body   = await req.json().catch(() => ({}));
    const parsed = CreateTripSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // ── Entity checks (parallel) ──────────────────────────────────────────
    const [vehicle, driver] = await Promise.all([
      prisma.vehicle.findUnique({ where: { id: payload.vehicleId, deletedAt: null } }),
      prisma.driver.findUnique({  where: { id: payload.driverId,  deletedAt: null } }),
    ]);

    if (!vehicle) return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });
    if (!driver)  return NextResponse.json({ ok: false, message: "Driver not found"  }, { status: 404 });

    // ── Capitalize route strings ──────────────────────────────────────────
    const loadingPlant = capitalizeFirstLetter(payload.loadingPlant);
    const destination  = capitalizeFirstLetter(payload.destination);

    // ── Resolve total distance (priority: odometer > explicit > fuel estimate) ──
    let resolvedDistanceKm: number | null = null;

    // 1. Odometer reading (most accurate — real hardware measurement)
    if (
      typeof payload.odoStart === "number" &&
      typeof payload.odoEnd   === "number" &&
      payload.odoEnd > payload.odoStart
    ) {
      resolvedDistanceKm = payload.odoEnd - payload.odoStart;
    }

    // 2. Explicitly provided by dispatcher (manual entry)
    if (resolvedDistanceKm == null && payload.totaldistanceKm != null) {
      resolvedDistanceKm = payload.totaldistanceKm;
    }

    // 3. Sum of per-fuel estimated distances (last resort)
    if (resolvedDistanceKm == null) {
      const fromFuel = payload.fuels.reduce((sum:number, f) => {
        const unit        = DEFAULT_FUEL_UNIT[f.type] ?? f.unit;
        const customKmPU  = vehicle.fuelEfficiencyKmPerUnit ?? null;
        return sum + (getEstimatedFuelConsumption(f.type, unit, f.qtyGiven, customKmPU) ?? 0);
      }, 0);
      if (fromFuel > 0) resolvedDistanceKm = +fromFuel.toFixed(1);
    }

    // ── Server-side re-derive fuel row values ────────────────────────────
    // We do NOT blindly trust client-computed values.
    // Re-compute fuelCost, estimatedCO2, dieselEquivalentL independently.
    const verifiedFuels = payload.fuels.map((f) => {
      const unit        = DEFAULT_FUEL_UNIT[f.type] ?? f.unit;
      const customKmPU  = vehicle.fuelEfficiencyKmPerUnit ?? null;

      const serverFuelCost   = isFinite((f.unitPrice ?? 0) * f.qtyGiven)
        ? +((f.unitPrice ?? 0) * f.qtyGiven).toFixed(2)
        : f.fuelCost;

      const serverDistanceKm  = getEstimatedFuelConsumption(f.type, unit, f.qtyGiven, customKmPU) ?? f.distanceKm ?? 0;
      const serverCO2         = estimateCO2(f.type, f.qtyGiven)          ?? 0;
      const serverLDE         = toDieselEquivalent(f.type, f.qtyGiven)   ?? 0;

      return {
        ...f,
        unit,
        fuelCost:          serverFuelCost,
        distanceKm:        serverDistanceKm,
        estimatedCO2:      serverCO2,
        dieselEquivalentL: serverLDE,
      };
    });

    // ── Trip-level rollups ────────────────────────────────────────────────
    const serverTotalFuelCost = +verifiedFuels
      .reduce((s:number, f) => s + f.fuelCost, 0)
      .toFixed(2);

    const serverTotalCO2 = +verifiedFuels
      .reduce((s:number, f) => s + f.estimatedCO2, 0)
      .toFixed(2);

    const serverCostPerKm = costPerKm(serverTotalFuelCost, resolvedDistanceKm ?? 0);

    // ── Transaction ───────────────────────────────────────────────────────
    const tripResult = await prisma.$transaction(async (tx) => {

      // 1. Create trip record
      const trip = await tx.trip.create({
        data: {
          vehicleId:       payload.vehicleId,
          driverId:        payload.driverId,
          loadingPlant,
          waybill_no:      payload.waybill_no,
          atcNo:           payload.atcNo,
          destination,
          despatchDate:    new Date(payload.despatchDate),
          uploadDate:      payload.uploadDate ? new Date(payload.uploadDate) : new Date(),
          totaldistanceKm: resolvedDistanceKm,
          totalFuelCost:   serverTotalFuelCost,
          totalCO2Kg:      serverTotalCO2,
          costPerKm:       serverCostPerKm,
          odoStart:        payload.odoStart,
          odoEnd:          payload.odoEnd,
          notes:           payload.notes,
        },
      });

      // 2. Create fuel rows (server-verified values)
      await Promise.all(
        verifiedFuels.map((f) =>
          tx.fuel.create({
            data: {
              tripId:            trip.id,
              type:              f.type,
              qtyGiven:          f.qtyGiven,
              unitPrice:         f.unitPrice,
              fuelCost:          f.fuelCost,
              unit:              f.unit,
              distanceKm:        f.distanceKm,
              estimatedCO2:      f.estimatedCO2,
              dieselEquivalentL: f.dieselEquivalentL,
            },
          })
        )
      );

      // 3. Create customer rows
      await Promise.all(
        payload.customer.map((c) =>
          tx.customer.create({
            data: {
              tripId:       trip.id,
              customerName: c.customerName,
              company:      c.company,
              noOfBags:     c.noOfBags,
            },
          })
        )
      );

      // 4. Update vehicle odometer if odoEnd provided
      if (typeof payload.odoEnd === "number") {
        await tx.vehicle.update({
          where: { id: vehicle.id },
          data:  { currentOdo: { set: payload.odoEnd } },
        });
      }

      return tx.trip.findUnique({
        where:   { id: trip.id },
        include: { fuels: true, customer: true, vehicle: true, driver: true },
      });
    });

    return NextResponse.json({ ok: true, trip: tripResult }, { status: 201 });

  } catch (err: any) {
    console.error("[trips POST]", err);

    if (err?.code === "P2002") {
      const target = (err?.meta?.target ?? []).join(", ");
      return NextResponse.json(
        { ok: false, message: `A trip with that ${target} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
