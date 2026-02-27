
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
    const totalDistance = +tripsInRange.reduce((s:number, t) => s + (dist(t) || 0), 0).toFixed(2);

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
    const totalFuelGiven      = +Object.values(fuelByType).reduce((s:number, v) => s + v.qtyGiven, 0).toFixed(2);
    const totalFuelCost       = +Object.values(fuelByType).reduce((s:number, v) => s + v.fuelCost, 0).toFixed(2);
    const fleetFuelEfficiency = totalFuelGiven > 0 ? +(totalDistance / totalFuelGiven).toFixed(2) : 0;
    const estimatedCO2Kg      = +tripsInRange.reduce((s:number, t) => s + (t.totalCO2Kg ?? 0), 0).toFixed(2);

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
      const fQty  = t.fuels.reduce((s:number, f) => s + (f.qtyGiven ?? 0), 0);
      const fCost = t.fuels.reduce((s:number, f) => s + (f.fuelCost ?? 0), 0);
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
