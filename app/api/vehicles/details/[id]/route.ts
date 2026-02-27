
// src/app/api/vehicles/details/[id]/route.ts
//
// Returns all data for the Vehicle Dashboard page.
//
// MAINTENANCE SECTION (uses the full maintenance schema):
//   Repairs  → reportedDate, faultDesc, repairDesc, priority, status, odometerKm, laborCost, partsCost, totalCost, garage, notes
//   Services → scheduledDate, completedDate, serviceType, status, description, odometerKm, laborCost, partsCost, totalCost, garage, nextServiceKm
//   Parts    → purchaseDate, fittedDate, name, partNumber, category, quantity, unitCost, totalCost, warrantyExpiry, supplier
//   Tires    → fittedDate, removedDate, brand, size, position, status, fittedOdometerKm, removedOdometerKm, kmCovered, unitCost
//
// For each maintenance record the API enriches with:
//   driverId / driverName — FK on repairs/services; for parts via repair FK; for tires via nearest trip
//   kmDrivenNearEvent     — total km the linked driver drove this vehicle in a ±30d window around the event date

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

function addDays(d: Date, n: number) { return new Date(d.getTime() + n * 86_400_000); }
function startOf(d: Date) { const r = new Date(d); r.setHours(0,0,0,0);      return r; }
function endOf(d: Date)   { const r = new Date(d); r.setHours(23,59,59,999); return r; }


// ─── number of trip this driver drove on a vehicle: from eventDate → filterEnd ─────────────
async function tripFromEventToEnd(
  vehicleId: string,
  driverId: string,
  eventDate: Date,
  filterEnd: Date
): Promise<number> {
  const trips = await prisma.trip.findMany({
    where: {
      driverId,
      vehicleId,
      despatchDate: { gte: startOf(eventDate), lte: endOf(filterEnd) },
    },
    select: { totaldistanceKm: true, odoStart: true, odoEnd: true },
  });

  return trips.length
}

// ── km driven by a driver on this vehicle in a date window ────────────────────
async function kmDriverInWindow(vehicleId: string, driverId: string | null, center: Date, windowDays = 30): Promise<number | null> {
  if (!driverId) return null;
  const from = startOf(addDays(center, -windowDays));
  const to   = endOf(addDays(center, windowDays));
  const trips = await prisma.trip.findMany({
    where:  { vehicleId, driverId, despatchDate: { gte: from, lte: to } },
    select: { totaldistanceKm: true, odoStart: true, odoEnd: true },
  });
  const km = trips.reduce((s:number, t) => {
    const d = t.totaldistanceKm ?? ((t.odoEnd && t.odoStart) ? t.odoEnd - t.odoStart : 0);
    return s + (d || 0);
  }, 0);
  return km > 0 ? +km.toFixed(1) : 0;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

    const  {id}  = await params;
    const url    = new URL(req.url);
    const now    = new Date();

    // Trip range (default last 6 months)
    const start = startOf(new Date(url.searchParams.get("from") ?? addDays(now, -180).toISOString()));
    const end   = endOf(new Date(url.searchParams.get("to")     ?? now.toISOString()));

    // Maintenance date filter — separate params so maintenance tab can filter independently
    const mFromStr = url.searchParams.get("mFrom");
    const mToStr   = url.searchParams.get("mTo");
    const mFrom    = mFromStr ? startOf(new Date(mFromStr)) : null;
    const mTo      = mToStr   ? endOf(new Date(mToStr))     : null;

    // ── Vehicle ────────────────────────────────────────────────────────────────
    const vehicle = await prisma.vehicle.findUnique({
      where:   { id, deletedAt: null },
      include: { driver: { select: { id: true, name: true, phone: true, profileImage: true } } },
    });
    if (!vehicle) return NextResponse.json({ ok: false, message: "Vehicle not found" }, { status: 404 });

    // ── Trips — all-time for charts/totals, filtered for display ──────────────
    const [allTrips, filteredTrips] = await Promise.all([
      prisma.trip.findMany({
        where:   { vehicleId: id },
        select:  {
          id: true, driverId: true, despatchDate: true, status: true,
          loadingPlant: true, destination: true,
          totaldistanceKm: true, odoStart: true, odoEnd: true,
          waybill_no: true, atcNo: true,
          totalFuelCost: true, totalCO2Kg: true,
          fuels:  { select: { type: true, qtyGiven: true, fuelCost: true } },
          driver: { select: { id: true, name: true } },
        },
        orderBy: { despatchDate: "desc" },
      }),
      prisma.trip.findMany({
        where:   { vehicleId: id, despatchDate: { gte: start, lte: end } },
        select:  {
          id: true, driverId: true, despatchDate: true, status: true,
          loadingPlant: true, destination: true,
          totaldistanceKm: true, odoStart: true, odoEnd: true,
          waybill_no: true, atcNo: true,
          totalFuelCost: true,
          fuels:  { select: { type: true, qtyGiven: true, fuelCost: true } },
          driver: { select: { id: true, name: true } },
        },
        orderBy: { despatchDate: "desc" },
      }),
    ]);

    const dist = (t: any): number =>
      t.totaldistanceKm ?? ((t.odoEnd && t.odoStart) ? t.odoEnd - t.odoStart : 0);

    const totalDistanceAllTime  = +allTrips.reduce((s:number,t)      => s + (dist(t)||0), 0).toFixed(2);
    const totalDistanceInRange  = +filteredTrips.reduce((s:number,t) => s + (dist(t)||0), 0).toFixed(2);

    const allFuels      = filteredTrips.flatMap(t => t.fuels);
    const totalFuelQty  = +allFuels.reduce((s:number,f) => s + (f.qtyGiven ?? 0), 0).toFixed(2);
    const totalFuelCost = +allFuels.reduce((s:number,f) => s + (f.fuelCost ?? 0), 0).toFixed(2);
    const fuelEfficiency = totalFuelQty > 0 ? +(totalDistanceInRange / totalFuelQty).toFixed(2) : (vehicle.fuelEfficiencyKmPerUnit ?? 0);
    const estimatedCO2Kg = +allTrips.reduce((s:number,t) => s + (t.totalCO2Kg ?? 0), 0).toFixed(2);

    // Fuel by type
    const fuelByType: Record<string, { qtyConsume: number; cost: number }> = {};
    for (const f of allFuels) {
      if (!fuelByType[f.type]) fuelByType[f.type] = { qtyConsume: 0, cost: 0 };
      fuelByType[f.type].qtyConsume += f.qtyGiven ?? 0;
      fuelByType[f.type].cost       += f.fuelCost ?? 0;
    }

    // Charts
    const tripMonthMap: Record<string,number>                       = {};
    const fuelTrendMap: Record<string,{ cost:number; qty:number }>  = {};
    const plantMap:     Record<string,number>                       = {};
    const destMap:      Record<string,number>                       = {};
    const statusMap:    Record<string,number>                       = {};
    const driverMap:    Record<string,{ driver:any; trips:number; km:number }> = {};

    for (const t of allTrips) {
      const month = new Date(t.despatchDate).toISOString().slice(0,7);
      tripMonthMap[month] = (tripMonthMap[month]??0)+1;
      if (t.loadingPlant) plantMap[t.loadingPlant] = (plantMap[t.loadingPlant]??0)+1;
      if (t.destination)  destMap[t.destination]   = (destMap[t.destination]??0)+1;
      statusMap[t.status||"UNKNOWN"] = (statusMap[t.status||"UNKNOWN"]??0)+1;
      if (t.driverId) {
        if (!driverMap[t.driverId]) driverMap[t.driverId] = { driver: t.driver, trips: 0, km: 0 };
        driverMap[t.driverId].trips++;
        driverMap[t.driverId].km += dist(t) || 0;
      }
      for (const f of t.fuels) {
        if (!fuelTrendMap[month]) fuelTrendMap[month] = { cost: 0, qty: 0 };
        fuelTrendMap[month].cost += f.fuelCost ?? 0;
        fuelTrendMap[month].qty  += f.qtyGiven ?? 0;
      }
    }

    const tripTrend         = Object.entries(tripMonthMap).sort(([a],[b])=>a.localeCompare(b)).map(([month,count])=>({month,count}));
    const fuelTrend         = Object.entries(fuelTrendMap).sort(([a],[b])=>a.localeCompare(b)).map(([month,v])=>({month,...v}));
    const loadingPlantChart = Object.entries(plantMap).sort(([,a],[,b])=>b-a).slice(0,10).map(([name,value])=>({name,value}));
    const destinationChart  = Object.entries(destMap).sort(([,a],[,b])=>b-a).slice(0,8).map(([name,value])=>({name,value}));
    const tripStatusChart   = Object.entries(statusMap).map(([name,value])=>({name,value}));
    const topDrivers        = Object.values(driverMap)
      .sort((a,b)=>b.trips-a.trips).slice(0,5)
      .map(d=>({ driver:d.driver, trips:d.trips, km:+d.km.toFixed(1) }));

    // Recent trips
    const recentTrips = filteredTrips.slice(0,20).map(t => ({
      id: t.id, waybill_no: t.waybill_no, atcNo: t.atcNo,
      destination: t.destination, loadingPlant: t.loadingPlant,
      distanceKm: dist(t) || null,
      despatchDate: t.despatchDate, status: t.status,
      driver: { id: t.driver?.id, name: t.driver?.name ?? null },
      fuelCost: t.fuels.reduce((s:number,f)=>s+(f.fuelCost??0),0),
    }));

    // ── Driver history (TruckDriver table) ────────────────────────────────────
    const truckDriverHistory = await prisma.truckDriver.findMany({
      where:   { vehicleId: id },
      include: { driver: { select: { id:true, name:true, phone:true } } },
      orderBy: { from: "desc" },
    });
    const driverHistory = truckDriverHistory.map(dh => {
      const from = new Date(dh.from?? now);
      const to   = new Date(dh.to ?? now);
      return {
        id:           dh.id,
        driverId:     dh.driverId,
        driverName:   dh.driver?.name  ?? "Unknown",
        driverPhone:  dh.driver?.phone ?? null,
        from:         dh.from,
        to:           dh.to,
        daysAssigned: Math.ceil((to.getTime() - from.getTime()) / 86_400_000),
      };
    });

    // ── Maintenance date filter helper ────────────────────────────────────────
    const maintWhere = (dateField: string) => ({
      vehicleId: id,
      deletedAt: null,
      ...(mFrom || mTo ? {
        [dateField]: {
          ...(mFrom ? { gte: mFrom } : {}),
          ...(mTo   ? { lte: mTo   } : {}),
        },
      } : {}),
    });

    // ── 1. REPAIRS ────────────────────────────────────────────────────────────
    const repairsRaw = await prisma.repair.findMany({
      where:   maintWhere("completedDate"),
      include: { driver: { select: { id:true, name:true } } },
      orderBy: [{ status: "asc" }, { completedDate: "desc" }],
    });

    const repairs = await Promise.all(repairsRaw.map(async r => {
      const kmDriven = await kmDriverInWindow(id, r.driverId, new Date(r.completedDate as Date));
      const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          r.driverId as string,
          r.completedDate as Date,
          mTo as Date
        );
      return {
        id:            r.id,
        faultDesc:     r.faultDesc,
        repairDesc:    r.repairDesc,
        priority:      r.priority,
        status:        r.status,
        odometerKm:    r.odometerKm,
        laborCost:     r.laborCost,
        partsCost:     r.partsCost,
        totalCost:     r.totalCost,
        garage:        r.garage,
        garagePhone:   r.garagePhone,
        reportedDate:  r.reportedDate,
        startedDate:   r.startedDate,
        completedDate: r.completedDate,
        driverId:      r.driverId,
        driverName:    r.driver?.name ?? null,
        kmDrivenNearEvent: kmDriven,
        tripsDrivenFromEvent,
        notes:         r.notes,
      };
    }));

    // ── 2. SERVICES ───────────────────────────────────────────────────────────
    const servicesRaw = await prisma.service.findMany({
      where:   maintWhere("scheduledDate"),
      include: { driver: { select: { id:true, name:true } } },
      orderBy: { scheduledDate: "desc" },
    });

    const services = await Promise.all(servicesRaw.map(async s => {
      const eventDate = s.completedDate ?? s.scheduledDate ?? new Date();
      const kmDriven  = await kmDriverInWindow(id, s.driverId, new Date(eventDate));
      const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          s.driverId as string,
          eventDate,
          mTo as Date
        );
      return {
        id:              s.id,
        serviceType:     s.serviceType,
        status:          s.status,
        description:     s.description,
        odometerKm:      s.odometerKm,
        nextServiceKm:   s.nextServiceKm,
        nextServiceDate: s.nextServiceDate,
        laborCost:       s.laborCost,
        partsCost:       s.partsCost,
        totalCost:       s.totalCost,
        garage:          s.garage,
        garagePhone:     s.garagePhone,
        scheduledDate:   s.scheduledDate,
        completedDate:   s.completedDate,
        driverId:        s.driverId,
        driverName:      s.driver?.name ?? null,
        kmDrivenNearEvent: kmDriven,
        tripsDrivenFromEvent,
        notes:           s.notes,
      };
    }));

    // ── 3. PARTS (driver context via linked repair) ───────────────────────────
    const partsRaw = await prisma.part.findMany({
      where:   maintWhere("purchaseDate"),
      include: { repair: { include: { driver: { select: { id:true, name:true } } } } },
      orderBy: { purchaseDate: "desc" },
    });

    const parts = await Promise.all(partsRaw.map(async p => {
      const eventDate  = p.fittedDate ?? p.purchaseDate ?? p.createdAt;
      const driverId   = p.repair?.driverId ?? null;
      const driverName = p.repair?.driver?.name ?? null;
      const kmDriven   = await kmDriverInWindow(id, driverId, new Date(eventDate));
      const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          driverId as string,
          eventDate,
          mTo as Date
        );
      return {
        id:             p.id,
        name:           p.name,
        partNumber:     p.partNumber,
        category:       p.category,
        quantity:       p.quantity,
        unitCost:       p.unitCost,
        totalCost:      p.totalCost,
        supplier:       p.supplier,
        supplierPhone:  p.supplierPhone,
        purchaseDate:   p.purchaseDate,
        fittedDate:     p.fittedDate,
        warrantyExpiry: p.warrantyExpiry,
        repairId:       p.repairId,
        driverId,
        driverName,
        kmDrivenNearEvent: kmDriven,
        tripsDrivenFromEvent,
        notes:          p.notes,
      };
    }));

    // ── 4. TIRES (driver from nearest trip in ±7 days) ────────────────────────
    const tiresRaw = await prisma.tire.findMany({
      where:   maintWhere("fittedDate"),
      orderBy: { fittedDate: "desc" },
    });

    const tires = await Promise.all(tiresRaw.map(async tire => {
      const eventDate = tire.fittedDate ?? tire.createdAt;
      const window7   = {
        gte: addDays(new Date(eventDate), -7),
        lte: addDays(new Date(eventDate), 7),
      };
      const nearTrip = await prisma.trip.findFirst({
        where:   { vehicleId: id, despatchDate: window7 },
        select:  { driverId: true, driver: { select: { id:true, name:true } } },
        orderBy: { despatchDate: "desc" },
      });
      const driverId   = nearTrip?.driverId    ?? null;
      const driverName = nearTrip?.driver?.name ?? null;
      const kmDriven   = await kmDriverInWindow(id, driverId, new Date(eventDate));
      const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          driverId as string,
          eventDate,
          mTo as Date
        );

      return {
        id:                  tire.id,
        brand:               tire.brand,
        size:                tire.size,
        serialNumber:        tire.serialNumber,
        position:            tire.position,
        status:              tire.status,
        fittedOdometerKm:    tire.fittedOdometerKm,
        removedOdometerKm:   tire.removedOdometerKm,
        kmCovered:           tire.kmCovered,
        expectedLifeKm:      tire.expectedLifeKm,
        treadDepthMm:        tire.treadDepthMm,
        treadDepthAtRemoval: tire.treadDepthAtRemoval,
        unitCost:            tire.unitCost,
        supplier:            tire.supplier,
        fittedDate:          tire.fittedDate,
        removedDate:         tire.removedDate,
        driverId,
        driverName,
        kmDrivenNearEvent:   kmDriven,
        tripsDrivenFromEvent,
        notes:               tire.notes,
      };
    }));

    // ── Cost aggregates ───────────────────────────────────────────────────────
    const repairCostTotal  = +repairs.reduce((s:number,r)  => s+(r.totalCost??0), 0).toFixed(2);
    const serviceCostTotal = +services.reduce((s:number,s2)=> s+(s2.totalCost??0), 0).toFixed(2);
    const partsCostTotal   = +parts.reduce((s:number,p)    => s+(p.totalCost??0), 0).toFixed(2);
    const tireCostTotal    = +tires.reduce((s:number,t)    => s+(t.unitCost??0),  0).toFixed(2);
    const totalMaintenanceCost = +(repairCostTotal + serviceCostTotal + partsCostTotal + tireCostTotal).toFixed(2);

    return NextResponse.json({
      ok: true,
      data: {
        vehicle: { ...vehicle },
        totals: {
          totalTrips:           allTrips.length,
          totalDistanceAllTime,
          totalDistanceInRange,
          totalFuelQty,
          totalFuelCost,
          fuelEfficiency,
          estimatedCO2Kg,
          costPerKm: totalDistanceInRange > 0 ? +(totalFuelCost / totalDistanceInRange).toFixed(2) : 0,
        },
        fuelByType,
        tripTrend, fuelTrend,
        loadingPlantChart, destinationChart, tripStatusChart,
        topDrivers, recentTrips, driverHistory,
        maintenance: {
          repairs,   repairCostTotal,
          services,  serviceCostTotal,
          parts,     partsCostTotal,
          tires,     tireCostTotal,
          totalMaintenanceCost,
          mFrom: mFrom?.toISOString() ?? null,
          mTo:   mTo?.toISOString()   ?? null,
        },
      },
    }, { status: 200 });

  } catch (err: any) {
    console.error("[vehicle-details GET]", err);
    return NextResponse.json({ ok: false, message: err?.message ?? "Server error" }, { status: 500 });
  }
}

