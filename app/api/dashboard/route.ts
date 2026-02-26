

// // src/app/api/dashboard/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/components/lib/db";
// import { addDays, startOfDay, endOfDay } from "date-fns";

// function parseDateOrDefault(s?: string | null) {
//   if (!s) return null;
//   const d = new Date(s);
//   return isNaN(d.getTime()) ? null : d;
// }

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const startQ = url.searchParams.get("startDate");
//     const endQ = url.searchParams.get("endDate");

//     const now = new Date();
//     const defaultStart = startOfDay(addDays(now, -30));
//     const defaultEnd = endOfDay(now);

//     const start = startOfDay(parseDateOrDefault(startQ) ?? defaultStart);
//     const end = endOfDay(parseDateOrDefault(endQ) ?? defaultEnd);

//     // ── Basic totals ──────────────────────────────────────────────
//     const [totalVehicles, totalDrivers, totalTrips] = await Promise.all([
//       prisma.vehicle.count({ where: { deletedAt: null } }),
//       prisma.driver.count({ where: { deletedAt: null } }),
//       prisma.trip.count({ where: { despatchDate: { gte: start, lte: end } } }),
//     ]);

//     // ── Total distance ────────────────────────────────────────────
//     const distanceAgg = await prisma.trip.aggregate({
//       _sum: { totaldistanceKm: true },
//       where: { despatchDate: { gte: start, lte: end } },
//     });
//     const totalDistance = distanceAgg._sum.totaldistanceKm ?? 0;

//     // ── Active vehicles (had at least one trip in range) ──────────
//     const activeVehicleIds = await prisma.trip.findMany({
//       where: { despatchDate: { gte: start, lte: end } },
//       select: { vehicleId: true },
//       distinct: ["vehicleId"],
//     });
//     const activeVehicles = activeVehicleIds.length;

//     // ── Fuel by type ──────────────────────────────────────────────
//     const fuelTypes = ["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"] as const;
//     const fuelResults = await Promise.all(
//       fuelTypes.map((t) =>
//         prisma.fuel.aggregate({
//           _sum: { qtyGiven: true, fuelCost: true },
//           where: {
//             type: t,
//             trip: { despatchDate: { gte: start, lte: end } },
//           },
//         })
//       )
//     );
//     const fuelByType: Record<string, { qtyGiven: number; fuelCost: number }> = {};
//     fuelTypes.forEach((t, i) => {
//       const qty = +(fuelResults[i]._sum.qtyGiven ?? 0);
//       const cost = +(fuelResults[i]._sum.fuelCost ?? 0);
//       if (qty > 0 || cost > 0) {
//         fuelByType[t] = { qtyGiven: qty, fuelCost: cost };
//       }
//     });

//     const totalFuelGiven = Object.values(fuelByType).reduce((s, v) => s + v.qtyGiven, 0);
//     const totalFuelCost = Object.values(fuelByType).reduce((s, v) => s + v.fuelCost, 0);

//     // ── Fleet fuel efficiency (total distance / total fuel) ───────
//     const fleetFuelEfficiency =
//       totalFuelGiven > 0 ? Number((totalDistance / totalFuelGiven).toFixed(2)) : 0;

//     // ── Estimated CO2 (diesel qty × 2.68 kg) ─────────────────────
//     const dieselQty = fuelByType["DIESEL"]?.qtyGiven ?? 0;
//     const estimatedCO2Kg = Number((dieselQty * 2.68).toFixed(2));

//     // ── Tire actions ──────────────────────────────────────────────
//     // const [tireInstalled, tireRotated, tireRemoved] = await Promise.all([
//     //   prisma.tireAction.count({
//     //     where: { actionDate: { gte: start, lte: end }, tireActionType: "Installed" },
//     //   }).catch(() => 0),
//     //   prisma.tireAction.count({
//     //     where: { actionDate: { gte: start, lte: end }, tireActionType: "Rotated" },
//     //   }).catch(() => 0),
//     //   prisma.tireAction.count({
//     //     where: { actionDate: { gte: start, lte: end }, tireActionType: "Removed" },
//     //   }).catch(() => 0),
//     // ]);

//     // ── Vehicles currently in repair (distinct, in range) ─────────
//     const vehiclesInRepairsRes = await prisma.repair.findMany({
//       where: { startedDate: { gte: start, lte: end }, status: "OPEN" },
//       select: { vehicleId: true },
//       distinct: ["vehicleId"],
//     });
//     const vehiclesInRepairs = vehiclesInRepairsRes.length;

//     // ── Open/pending repairs count ────────────────────────────────
//     const openRepairs = await prisma.repair.count({
//       where: { status: "OPEN" },
//     });

//     // ── Top 5 vehicles by trips ───────────────────────────────────
//     const topVehiclesRaw = await prisma.trip.groupBy({
//       by: ["vehicleId"],
//       where: { despatchDate: { gte: start, lte: end } },
//       _count: { vehicleId: true },
//       orderBy: { _count: { vehicleId: "desc" } },
//       take: 5,
//     });
//     const topVehicles = await Promise.all(
//       topVehiclesRaw.map(async (tv) => {
//         const v = await prisma.vehicle.findUnique({
//           where: { id: tv.vehicleId },
//           select: { id: true, plateNumber: true, cap_no: true, make: true, model: true },
//         });
//         return { vehicle: v, trips: tv._count.vehicleId };
//       })
//     );

//     // ── Top 5 drivers by trips ────────────────────────────────────
//     const topDriversRaw = await prisma.trip.groupBy({
//       by: ["driverId"],
//       where: { despatchDate: { gte: start, lte: end } },
//       _count: { driverId: true },
//       orderBy: { _count: { driverId: "desc" } },
//       take: 5,
//     });
//     const topDrivers = await Promise.all(
//       topDriversRaw.map(async (td) => {
//         const d = await prisma.driver.findUnique({
//           where: { id: td.driverId },
//           select: { id: true, name: true, phone: true, profileImage: true },
//         });
//         return { driver: d, trips: td._count.driverId };
//       })
//     );

//     // ── Driver license status ─────────────────────────────────────
//     const soon = addDays(now, 30);
//     const [expiredDrivers, aboutToExpireDrivers] = await Promise.all([
//       prisma.driver
//         .findMany({
//           where: { licenseExp: { lt: now }, deletedAt: null },
//           select: { id: true, name: true, licenseExp: true, phone: true },
//         })
//         .catch(() => [] as any[]),
//       prisma.driver
//         .findMany({
//           where: { licenseExp: { gte: now, lte: soon }, deletedAt: null },
//           select: { id: true, name: true, licenseExp: true, phone: true },
//         })
//         .catch(() => [] as any[]),
//     ]);

//     // ── Service types breakdown ───────────────────────────────────
//     const serviceGroup = await prisma.service.groupBy({
//       by: ["serviceType"],
//       where: { completedDate: { gte: start, lte: end } },
//       _count: { serviceType: true },
//       orderBy: { _count: { serviceType: "desc" } },
//     });

//     // ── Trip trend by day ─────────────────────────────────────────
//     const tripsInRange = await prisma.trip.findMany({
//       where: { despatchDate: { gte: start, lte: end } },
//       select: { id: true, despatchDate: true },
//       orderBy: { despatchDate: "asc" },
//     });
//     const dayCounts: Record<string, number> = {};
//     for (const t of tripsInRange) {
//       const d = new Date(t.despatchDate).toISOString().slice(0, 10);
//       dayCounts[d] = (dayCounts[d] || 0) + 1;
//     }
//     const days: string[] = [];
//     for (let dt = new Date(start); dt <= end; dt = addDays(dt, 1)) {
//       days.push(new Date(dt).toISOString().slice(0, 10));
//     }
//     const tripTrend = days.map((day) => ({ date: day, count: dayCounts[day] ?? 0 }));

//     // ── Monthly trip trend (for area chart) ──────────────────────
//     const monthlyMap: Record<string, number> = {};
//     for (const t of tripsInRange) {
//       const key = new Date(t.despatchDate).toISOString().slice(0, 7);
//       monthlyMap[key] = (monthlyMap[key] || 0) + 1;
//     }
//     const monthlyTripTrend = Object.entries(monthlyMap)
//       .sort(([a], [b]) => a.localeCompare(b))
//       .map(([month, count]) => ({ month, count }));

//     // ── Loading plant distribution ────────────────────────────────
//     const loadingPlantsRaw = await prisma.trip.groupBy({
//       by: ["loadingPlant"],
//       where: { despatchDate: { gte: start, lte: end } },
//       _count: { loadingPlant: true },
//       orderBy: { _count: { loadingPlant: "desc" } },
//       take: 10,
//     });
//     const loadingPlantChart = loadingPlantsRaw.map((p) => ({
//       name: p.loadingPlant || "Unknown",
//       value: p._count.loadingPlant,
//     }));

//     // ── Destination distribution ──────────────────────────────────
//     const destinationsRaw = await prisma.trip.groupBy({
//       by: ["destination"],
//       where: { despatchDate: { gte: start, lte: end } },
//       _count: { destination: true },
//       orderBy: { _count: { destination: "desc" } },
//       take: 8,
//     });
//     const destinationChart = destinationsRaw.map((d) => ({
//       name: d.destination || "Unknown",
//       value: d._count.destination,
//     }));

//     // ── Trip status breakdown ─────────────────────────────────────
//     const tripStatusRaw = await prisma.trip.groupBy({
//       by: ["status"],
//       where: { despatchDate: { gte: start, lte: end } },
//       _count: { status: true },
//     });
//     const tripStatusChart = tripStatusRaw.map((s) => ({
//       name: s.status,
//       value: s._count.status,
//     }));

//     // ── Parts cost (PartUsedInRepair) ─────────────────────────────
//     // Fetch parts directly from Part table (cost × quantity)
//     const partsInRange = await prisma.part.findMany({
//       where: {fittedDate: { gte: start, lte: end },
//       },
//       include: { repair: { select: { totalCost : true } } },
//     }).catch(() => [] as any[]);

//     let totalPartsCost = 0;
//     for (const p of partsInRange) {
//       const unit = p.part?.unitCost ?? 0;
//       const qty = p.qtyUsed ?? 1;
//       totalPartsCost += unit * qty;
//     }

//     // ── Repair & service aggregated cost ──────────────────────────
//     const [repairSum, serviceSum] = await Promise.all([
//       prisma.repair.aggregate({
//         _sum: { totalCost: true },
//         where: { repairDate: { gte: start, lte: end } },
//       }),
//       prisma.service.aggregate({
//         _sum: { cost: true },
//         where: { serviceDate: { gte: start, lte: end } },
//       }),
//     ]);
//     const totalRepairCost = repairSum._sum.totalCost ?? 0;
//     const totalServiceCost = serviceSum._sum.cost ?? 0;
//     const totalMaintenanceCost = totalPartsCost + totalRepairCost + totalServiceCost;

//     // ── Cost per km ───────────────────────────────────────────────
//     const costPerKm =
//       totalDistance > 0
//         ? Number(((totalFuelCost + totalMaintenanceCost) / totalDistance).toFixed(2))
//         : 0;

//     // ── Top 5 vehicles by fuel consumption ───────────────────────
//     const fuelByVehicleRaw = await prisma.fuel.groupBy({
//       by: ["tripId"],
//       where: { trip: { despatchDate: { gte: start, lte: end } } },
//       _sum: { qtyGiven: true, fuelCost: true },
//     });
//     const tripToVehicle = await prisma.trip.findMany({
//       where: { id: { in: fuelByVehicleRaw.map((f) => f.tripId) } },
//       select: { id: true, vehicleId: true },
//     });
//     const vehicleFuelMap = new Map<string, { qty: number; cost: number }>();
//     for (const f of fuelByVehicleRaw) {
//       const trip = tripToVehicle.find((t) => t.id === f.tripId);
//       if (!trip) continue;
//       const prev = vehicleFuelMap.get(trip.vehicleId) ?? { qty: 0, cost: 0 };
//       vehicleFuelMap.set(trip.vehicleId, {
//         qty: prev.qty + (f._sum.qtyGiven ?? 0),
//         cost: prev.cost + (f._sum.fuelCost ?? 0),
//       });
//     }
//     const topFuelVehiclesRaw = Array.from(vehicleFuelMap.entries())
//       .map(([vehicleId, v]) => ({ vehicleId, ...v }))
//       .sort((a, b) => b.qty - a.qty)
//       .slice(0, 5);
//     const topFuelVehicles = await Promise.all(
//       topFuelVehiclesRaw.map(async (v) => ({
//         vehicle: await prisma.vehicle.findUnique({
//           where: { id: v.vehicleId },
//           select: { id: true, plateNumber: true, cap_no: true },
//         }),
//         qty: v.qty,
//         cost: v.cost,
//       }))
//     );

//     // ── Monthly maintenance cost trend ────────────────────────────
//     const repairsInRange = await prisma.repair.findMany({
//       where: { repairDate: { gte: start, lte: end } },
//       select: { repairDate: true, totalCost: true },
//     });
//     const servicesInRange = await prisma.service.findMany({
//       where: { serviceDate: { gte: start, lte: end } },
//       select: { serviceDate: true, cost: true },
//     });
//     const maintMonthMap: Record<string, number> = {};
//     for (const r of repairsInRange) {
//       const key = new Date(r.repairDate).toISOString().slice(0, 7);
//       maintMonthMap[key] = (maintMonthMap[key] || 0) + (r.totalCost || 0);
//     }
//     for (const s of servicesInRange) {
//       const key = new Date(s.serviceDate).toISOString().slice(0, 7);
//       maintMonthMap[key] = (maintMonthMap[key] || 0) + (s.cost || 0);
//     }
//     const maintenanceTrend = Object.entries(maintMonthMap)
//       .sort(([a], [b]) => a.localeCompare(b))
//       .map(([month, cost]) => ({ month, cost }));

//     // ── Vehicles with no trips in range (idle) ────────────────────
//     const activeVehicleIdSet = new Set(activeVehicleIds.map((v) => v.vehicleId));
//     const idleVehicles = await prisma.vehicle.count({
//       where: {
//         deletedAt: null,
//         id: { notIn: Array.from(activeVehicleIdSet) },
//       },
//     });

//     // ── Build response ────────────────────────────────────────────
//     return NextResponse.json(
//       {
//         ok: true,
//         data: {
//           start: start.toISOString(),
//           end: end.toISOString(),

//           totals: {
//             totalVehicles,
//             totalDrivers,
//             totalTrips,
//             totalDistance: Number(totalDistance.toFixed(2)),
//             activeVehicles,
//             idleVehicles,
//             openRepairs,
//           },

//           fuel: {
//             byType: fuelByType,
//             totalFuelGiven: Number(totalFuelGiven.toFixed(2)),
//             totalFuelCost: Number(totalFuelCost.toFixed(2)),
//             fleetFuelEfficiency,
//             estimatedCO2Kg,
//           },

//           tires: {
//             installed: tireInstalled,
//             rotated: tireRotated,
//             removed: tireRemoved,
//           },

//           costs: {
//             totalPartsCost: Number(totalPartsCost.toFixed(2)),
//             totalRepairCost: Number(totalRepairCost.toFixed(2)),
//             totalServiceCost: Number(totalServiceCost.toFixed(2)),
//             totalMaintenanceCost: Number(totalMaintenanceCost.toFixed(2)),
//             costPerKm,
//           },

//           vehiclesInRepairs,
//           topVehicles,
//           topDrivers,
//           topFuelVehicles,

//           license: {
//             expired: expiredDrivers,
//             aboutToExpire: aboutToExpireDrivers,
//           },

//           services: serviceGroup.map((s) => ({
//             serviceType: s.serviceType,
//             count: s._count.serviceType,
//           })),

//           tripTrend,
//           monthlyTripTrend,
//           loadingPlantChart,
//           destinationChart,
//           tripStatusChart,
//           maintenanceTrend,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error("dashboard metrics error", err);
//     return NextResponse.json(
//       { ok: false, message: err?.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseDate(s?: string | null): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}
function startOf(d: Date) { const r = new Date(d); r.setHours(0,0,0,0);      return r; }
function endOf(d: Date)   { const r = new Date(d); r.setHours(23,59,59,999); return r; }
function addDays(d: Date, n: number) { return new Date(d.getTime() + n * 86_400_000); }

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

    const url   = new URL(req.url);
    const now   = new Date();
    const start = startOf(parseDate(url.searchParams.get("from")) ?? addDays(now, -30));
    const end   = endOf(parseDate(url.searchParams.get("to"))     ?? now);

    // ── 1. Fleet totals (all-time, unfiltered) ─────────────────────────────────
    const [totalVehicles, totalDrivers] = await Promise.all([
      prisma.vehicle.count({ where: { deletedAt: null } }),
      prisma.driver.count({  where: { deletedAt: null } }),
    ]);

    // ── 2. Trips in range ──────────────────────────────────────────────────────
    const tripsInRange = await prisma.trip.findMany({
      where:  { despatchDate: { gte: start, lte: end } },
      select: {
        id: true, vehicleId: true, driverId: true,
        despatchDate: true, status: true,
        totaldistanceKm: true, odoStart: true, odoEnd: true,
        loadingPlant: true, destination: true,
        totalFuelCost: true, totalCO2Kg: true,
        fuels: { select: { type: true, qtyGiven: true, fuelCost: true } },
        driver:  { select: { id: true, name: true, profileImage: true, phone: true } },
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
      },
    });


    const dist = (t: any) =>
      t.totaldistanceKm ?? ((t.odoEnd && t.odoStart) ? t.odoEnd - t.odoStart : 0);

    const totalTrips    = tripsInRange.length;
    const totalDistance = +tripsInRange.reduce((s, t) => s + (dist(t) || 0), 0).toFixed(2);

    const activeVehicleIdSet = new Set(tripsInRange.map(t => t.vehicleId));
    const activeVehicles     = activeVehicleIdSet.size;
    const idleVehicles       = Math.max(0, totalVehicles - activeVehicles);

    // ── 3. Fuel breakdown ──────────────────────────────────────────────────────
    const fuelByType: Record<string, { qtyGiven: number; fuelCost: number }> = {};
    for (const t of tripsInRange) {
      for (const f of t.fuels) {
        if (!fuelByType[f.type]) fuelByType[f.type] = { qtyGiven: 0, fuelCost: 0 };
        fuelByType[f.type].qtyGiven += f.qtyGiven ?? 0;
        fuelByType[f.type].fuelCost += f.fuelCost ?? 0;
      }
    }

    console.log("fuel type", fuelByType["DIESEL"])
    const totalFuelGiven      = +Object.values(fuelByType).reduce((s, v) => s + v.qtyGiven, 0).toFixed(2);
    const totalFuelCost       = +Object.values(fuelByType).reduce((s, v) => s + v.fuelCost, 0).toFixed(2);
    const fleetFuelEfficiency = totalFuelGiven > 0 ? +(totalDistance / totalFuelGiven).toFixed(2) : 0;
    const estimatedCO2Kg      = +tripsInRange.reduce((s, t) => s + (t.totalCO2Kg ?? 0), 0).toFixed(2);

    // ── 4. Maintenance costs ──────────────────────────────────────────────────
    const [repairAgg, serviceAgg, partsAgg, tireAgg] = await Promise.all([
      prisma.repair.aggregate({
        _sum:  { totalCost: true },
        where: { reportedDate: { gte: start, lte: end }, deletedAt: null },
      }),
      prisma.service.aggregate({
        _sum:  { totalCost: true },
        where: { scheduledDate: { gte: start, lte: end }, deletedAt: null },
      }),
      prisma.part.aggregate({
        _sum:  { totalCost: true },
        where: { purchaseDate: { gte: start, lte: end }, deletedAt: null },
      }),
      prisma.tire.aggregate({
        _sum:  { unitCost: true },
        where: { fittedDate: { gte: start, lte: end }, deletedAt: null },
      }),
    ]);
    const totalRepairCost      = repairAgg._sum.totalCost  ?? 0;
    const totalServiceCost     = serviceAgg._sum.totalCost ?? 0;
    const totalPartsCost       = partsAgg._sum.totalCost   ?? 0;
    const totalTireCost        = tireAgg._sum.unitCost     ?? 0;
    const totalMaintenanceCost = +(totalRepairCost + totalServiceCost + totalPartsCost + totalTireCost).toFixed(2);
    const costPerKm            = totalDistance > 0
      ? +((totalFuelCost + totalMaintenanceCost) / totalDistance).toFixed(2) : 0;

    // ── 5. Repair status counts ────────────────────────────────────────────────
    const [openRepairs, criticalRepairs, vehiclesInRepairsRaw] = await Promise.all([
      prisma.repair.count({ where: { status: "OPEN", deletedAt: null } }),
      prisma.repair.count({ where: { priority: "CRITICAL", status: { in: ["OPEN", "IN_PROGRESS"] }, deletedAt: null } }),
      prisma.repair.findMany({
        where:    { status: { in: ["OPEN", "IN_PROGRESS"] }, deletedAt: null },
        select:   { vehicleId: true },
        distinct: ["vehicleId"],
      }),
    ]);
    const vehiclesInRepairs = vehiclesInRepairsRaw.length;

    // ── 6. Repair by priority breakdown (for priority chart) ──────────────────
    const repairPriorityBreakdown = await prisma.repair.groupBy({
      by:    ["priority"],
      where: { status: { in: ["OPEN", "IN_PROGRESS"] }, deletedAt: null },
      _count: { priority: true },
    });

    // ── 7. Service type breakdown ──────────────────────────────────────────────
    const serviceGroup = await prisma.service.groupBy({
      by:      ["serviceType"],
      where:   { scheduledDate: { gte: start, lte: end }, deletedAt: null },
      _count:  { serviceType: true },
      orderBy: { _count: { serviceType: "desc" } },
    });

    // ── 8. Vehicles due for service soon (next 30 days) ────────────────────────
    const soon = addDays(now, 30);
    const vehiclesDueService = await prisma.service.findMany({
      where:  { nextServiceDate: { lte: soon }, deletedAt: null },
      include:{vehicle:{
        select: { id: true, plateNumber: true, cap_no: true, currentOdo: true },
      }},
      orderBy:{ nextServiceDate: "asc" },
    });

    // ── 9. Top vehicles & drivers ──────────────────────────────────────────────
    const vehicleTripMap = new Map<string, { count: number; km: number; fuelQty: number; fuelCost: number; vehicle: any }>();
    const driverTripMap  = new Map<string, { count: number; km: number; driver: any }>();

    for (const t of tripsInRange) {
      const d = dist(t) || 0;
      // vehicles
      const prev = vehicleTripMap.get(t.vehicleId) ?? { count: 0, km: 0, fuelQty: 0, fuelCost: 0, vehicle: t.vehicle };
      const fQty  = t.fuels.reduce((s, f) => s + (f.qtyGiven ?? 0), 0);
      const fCost = t.fuels.reduce((s, f) => s + (f.fuelCost ?? 0), 0);
      vehicleTripMap.set(t.vehicleId, { count: prev.count + 1, km: prev.km + d, fuelQty: prev.fuelQty + fQty, fuelCost: prev.fuelCost + fCost, vehicle: prev.vehicle ?? t.vehicle });
      // drivers
      if (t.driverId) {
        const pd = driverTripMap.get(t.driverId) ?? { count: 0, km: 0, driver: t.driver };
        driverTripMap.set(t.driverId, { count: pd.count + 1, km: pd.km + d, driver: pd.driver ?? t.driver });
      }
    }

    const topVehicles = [...vehicleTripMap.values()].sort((a,b)=>b.count-a.count).slice(0,5).map(v=>({
      vehicle: v.vehicle, trips: v.count, km: +v.km.toFixed(1), fuelQty: +v.fuelQty.toFixed(2), fuelCost: +v.fuelCost.toFixed(2),
    }));
    const topDrivers = [...driverTripMap.values()].sort((a,b)=>b.count-a.count).slice(0,5).map(d=>({
      driver: d.driver, trips: d.count, km: +d.km.toFixed(1),
    }));
    const topFuelVehicles = [...vehicleTripMap.values()].sort((a,b)=>b.fuelCost-a.fuelCost).slice(0,5).map(v=>({
      vehicle: v.vehicle, qty: +v.fuelQty.toFixed(2), cost: +v.fuelCost.toFixed(2),
    }));

    // ── 10. License alerts ─────────────────────────────────────────────────────
    const [expiredDrivers, aboutToExpireDrivers] = await Promise.all([
      prisma.driver.findMany({
        where: { licenseExp: { lt: now }, deletedAt: null },
        select: { id:true, name:true, licenseExp:true, phone:true },
      }),
      prisma.driver.findMany({
        where: { licenseExp: { gte: now, lte: soon }, deletedAt: null },
        select: { id:true, name:true, licenseExp:true, phone:true },
      }),
    ]);

    // ── 11. Chart data ─────────────────────────────────────────────────────────
    const monthlyTripMap:  Record<string, number>                   = {};
    const fuelTrendMap: Record<string, Record<string, { cost: number; qty: number }>> = {};
    const plantMap:        Record<string, number>                   = {};
    const destMap:         Record<string, number>                   = {};
    const statusMap:       Record<string, number>                   = {};

    // for (const t of tripsInRange) {
    //   const month = new Date(t.despatchDate).toISOString().slice(0,7);
    //   monthlyTripMap[month] = (monthlyTripMap[month] ?? 0) + 1;
    //   if (t.loadingPlant) plantMap[t.loadingPlant] = (plantMap[t.loadingPlant] ?? 0) + 1;
    //   if (t.destination)  destMap[t.destination]   = (destMap[t.destination]   ?? 0) + 1;
    //   statusMap[t.status || "UNKNOWN"] = (statusMap[t.status || "UNKNOWN"] ?? 0) + 1;
    //   for (const f of t.fuels) {
    //     if (!fuelTrendMap[month]) fuelTrendMap[month] = { cost: 0, qty: 0 };
    //     fuelTrendMap[month].cost += f.fuelCost ?? 0;
    //     fuelTrendMap[month].qty  += f.qtyGiven ?? 0;
    //   }
    // }
    for (const t of tripsInRange) {
      const month = new Date(t.despatchDate).toISOString().slice(0, 7);
      monthlyTripMap[month] = (monthlyTripMap[month] ?? 0) + 1;
      if (t.loadingPlant) plantMap[t.loadingPlant] = (plantMap[t.loadingPlant] ?? 0) + 1;
      if (t.destination)  destMap[t.destination]   = (destMap[t.destination]   ?? 0) + 1;
      statusMap[t.status || "UNKNOWN"] = (statusMap[t.status || "UNKNOWN"] ?? 0) + 1;

      for (const f of t.fuels) {
        if (!fuelTrendMap[month]) fuelTrendMap[month] = {};
        const type = f.type ?? "UNKNOWN";
        if (!fuelTrendMap[month][type]) fuelTrendMap[month][type] = { cost: 0, qty: 0 };
        fuelTrendMap[month][type].cost += f.fuelCost ?? 0;
        fuelTrendMap[month][type].qty  += f.qtyGiven ?? 0;
      }
    }
    // Flatten into chart-friendly rows: { month, DIESEL_cost, DIESEL_qty, PETROL_cost, ... }
    // Also collect all unique fuel types seen
    const allFuelTypes = [...new Set(
      Object.values(fuelTrendMap).flatMap(m => Object.keys(m))
    )].sort();

    const fuelTrend = Object.entries(fuelTrendMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, byType]) => {
        const row: Record<string, any> = { month };
        for (const type of allFuelTypes) {
          row[`${type}_cost`] = byType[type]?.cost ?? 0;
          row[`${type}_qty`]  = byType[type]?.qty  ?? 0;
        }
        return row;
      });

// Include fuelTypes list so the frontend knows which keys to render
// Return alongside fuelTrend:
// fuelTrend, fuelTypes: allFuelTypes
    const monthlyTripTrend  = Object.entries(monthlyTripMap).sort(([a],[b])=>a.localeCompare(b)).map(([month,count])=>({month,count}));
    // const fuelTrend         = Object.entries(fuelTrendMap).sort(([a],[b])=>a.localeCompare(b)).map(([month,v])=>({month,...v}));
    const loadingPlantChart = Object.entries(plantMap).sort(([,a],[,b])=>b-a).slice(0,10).map(([name,value])=>({name,value}));
    const destinationChart  = Object.entries(destMap).sort(([,a],[,b])=>b-a).slice(0,8).map(([name,value])=>({name,value}));
    const tripStatusChart   = Object.entries(statusMap).map(([name,value])=>({name,value}));

    // ── 12. Monthly maintenance cost trend (split by category) ────────────────
    const [repairsForTrend, servicesForTrend, partsForTrend] = await Promise.all([
      prisma.repair.findMany({
        where:  { reportedDate: { gte: start, lte: end }, deletedAt: null },
        select: { reportedDate: true, totalCost: true },
      }),
      prisma.service.findMany({
        where:  { scheduledDate: { gte: start, lte: end }, deletedAt: null },
        select: { scheduledDate: true, totalCost: true },
      }),
      prisma.part.findMany({
        where:  { purchaseDate: { gte: start, lte: end }, deletedAt: null },
        select: { purchaseDate: true, totalCost: true },
      }),
    ]);

    const maintMonthMap: Record<string, { repair: number; service: number; parts: number }> = {};
    const ensureMonth = (m: string) => {
      if (!maintMonthMap[m]) maintMonthMap[m] = { repair: 0, service: 0, parts: 0 };
    };
    for (const r of repairsForTrend) {
      const m = new Date(r.reportedDate).toISOString().slice(0,7);
      ensureMonth(m); maintMonthMap[m].repair += r.totalCost ?? 0;
    }
    for (const s of servicesForTrend) {
      if (!s.scheduledDate) continue;
      const m = new Date(s.scheduledDate).toISOString().slice(0,7);
      ensureMonth(m); maintMonthMap[m].service += s.totalCost ?? 0;
    }
    for (const p of partsForTrend) {
      if (!p.purchaseDate) continue;
      const m = new Date(p.purchaseDate).toISOString().slice(0,7);
      ensureMonth(m); maintMonthMap[m].parts += p.totalCost ?? 0;
    }
    const maintenanceTrend = Object.entries(maintMonthMap)
      .sort(([a],[b])=>a.localeCompare(b))
      .map(([month,v])=>({ month, repair: +v.repair.toFixed(2), service: +v.service.toFixed(2), parts: +v.parts.toFixed(2), total: +(v.repair+v.service+v.parts).toFixed(2) }));

    // ── 13. Tire activity ──────────────────────────────────────────────────────
    const [tiresFitted, tiresReplaced, tiresRetreaded, tiresScrapped] = await Promise.all([
      prisma.tire.count({ where: { status:"FITTED",    fittedDate:{ gte:start, lte:end }, deletedAt:null } }),
      prisma.tire.count({ where: { status:"REPLACED",  fittedDate:{ gte:start, lte:end }, deletedAt:null } }),
      prisma.tire.count({ where: { status:"RETREADED", fittedDate:{ gte:start, lte:end }, deletedAt:null } }),
      prisma.tire.count({ where: { status:"SCRAPPED",  fittedDate:{ gte:start, lte:end }, deletedAt:null } }),
    ]);

    // ── 14. Warranty alerts ────────────────────────────────────────────────────
    const [expiredWarranties, expiringWarranties] = await Promise.all([
      prisma.part.count({ where: { warrantyExpiry: { lt: now }, deletedAt: null } }),
      prisma.part.count({ where: { warrantyExpiry: { gte: now, lte: soon }, deletedAt: null } }),
    ]);

    // ── 15. Open repairs list (for compliance tab) ────────────────────────────
    const openRepairsList = await prisma.repair.findMany({
      where:   { status: { in: ["OPEN", "IN_PROGRESS"] }, deletedAt: null },
      select:  {
        id: true, faultDesc: true, priority: true, status: true, reportedDate: true,
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver:  { select: { id: true, name: true } },
      },
      orderBy: [{ priority: "desc" }, { reportedDate: "asc" }],
      take: 20,
    });

    return NextResponse.json({
      ok: true,
      data: {
        start: start.toISOString(),
        end:   end.toISOString(),

        totals: {
          totalVehicles, totalDrivers, totalTrips,
          totalDistance,
          activeVehicles, idleVehicles,
          openRepairs, criticalRepairs, vehiclesInRepairs,
        },

        fuel: {
          byType:             fuelByType,
          totalFuelGiven,
          totalFuelCost,
          fleetFuelEfficiency,
          estimatedCO2Kg,
        },

        fuelTrend,        // array of { month, DIESEL_cost, DIESEL_qty, PETROL_cost, ... }
        fuelTypes: allFuelTypes,  // ["CNG", "DIESEL", "PETROL", ...]

        tires: { fitted: tiresFitted, replaced: tiresReplaced, retreaded: tiresRetreaded, scrapped: tiresScrapped },

        costs: {
          totalPartsCost:       +totalPartsCost.toFixed(2),
          totalRepairCost:      +totalRepairCost.toFixed(2),
          totalServiceCost:     +totalServiceCost.toFixed(2),
          totalTireCost:        +totalTireCost.toFixed(2),
          totalMaintenanceCost,
          costPerKm,
        },

        warranty: { expired: expiredWarranties, expiring: expiringWarranties },

        repairPriorityBreakdown: repairPriorityBreakdown.map(r => ({ priority: r.priority, count: r._count.priority })),
        openRepairsList,

        vehiclesDueService: vehiclesDueService.map(v => ({
          id: v.id, plateNumber: v.vehicle.plateNumber, cap_no: v.vehicle.cap_no,
          nextServiceDate: v.nextServiceDate?.toISOString() ?? null,
          nextServiceKm:   v.nextServiceKm ?? null,
          currentOdo:      v.vehicle.currentOdo ?? null,
          daysUntilDue:    v.nextServiceDate ? Math.ceil((v.nextServiceDate.getTime() - now.getTime()) / 86_400_000) : null,
        })),

        topVehicles, topDrivers, topFuelVehicles,

        license: {
          expired:       expiredDrivers.map(d => ({ ...d, licenseExp: d.licenseExp?.toISOString() ?? null })),
          aboutToExpire: aboutToExpireDrivers.map(d => ({
            ...d,
            licenseExp: d.licenseExp?.toISOString() ?? null,
            daysLeft: d.licenseExp ? Math.ceil((d.licenseExp.getTime() - now.getTime()) / 86_400_000) : null,
          })),
        },

        services: serviceGroup.map(s => ({ serviceType: s.serviceType, count: s._count.serviceType })),

        monthlyTripTrend,
        loadingPlantChart, destinationChart, tripStatusChart,
        maintenanceTrend,
      },
    }, { status: 200 });

  } catch (err: any) {
    console.error("[dashboard GET]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}
