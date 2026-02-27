// src/app/api/admin/drivers/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import  prisma  from "@/components/lib/db";
import { z } from "zod";
import  {getSession}  from "@/app/config/auth";
import { addDays, startOfDay, endOfDay } from "date-fns";

const UpdateDriverSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  bank: z.string().optional(),
  notes: z.string().optional(),
  profileImage: z.string().optional(),
  licenseNo: z.string().optional(),
  licenseImage: z.string().optional(),
  guarantorForm: z.string().optional(),
  fingerPrint: z.string().optional(),
  vehicle: z.string().uuid().optional().nullable(), // allow unassign by null
});


// ─── Date helpers ──────────────────────────────────────────────────────────────
function adddDays(d: Date, n: number) {
  return new Date(d.getTime() + n * 86_400_000);
}
function startOf(d: Date) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}
function endOf(d: Date) {
  const r = new Date(d);
  r.setHours(23, 59, 59, 999);
  return r;
}


// ─── number of trip this driver drove on a vehicle: from eventDate → filterEnd ─────────────
async function tripFromEventToEnd(
  driverId: string,
  vehicleId: string,
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

// ─── km this driver drove on a vehicle: from eventDate → filterEnd ─────────────
async function kmFromEventToEnd(
  driverId: string,
  vehicleId: string,
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
  const km = trips.reduce((s: number, t) => {
    const d =
      t.totaldistanceKm ??
      (t.odoEnd && t.odoStart ? t.odoEnd - t.odoStart : 0);
    return s + (d || 0);
  }, 0);
  return +km.toFixed(1);
}

// ─── Route ─────────────────────────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      );

    const {id}  = await params;
    const url = new URL(req.url);
    const now = new Date();

    // ── Trip date range ────────────────────────────────────────────────────────
    const start = startOf(
      new Date(url.searchParams.get("from") ?? adddDays(now, -180).toISOString())
    );
    const end = endOf(
      new Date(url.searchParams.get("to") ?? now.toISOString())
    );

    // ── Maintenance date filter ────────────────────────────────────────────────
    const mFromStr = url.searchParams.get("mFrom");
    const mToStr = url.searchParams.get("mTo");
    const mFrom = mFromStr ? startOf(new Date(mFromStr)) : null;
    const mTo = mToStr ? endOf(new Date(mToStr)) : endOf(now); // defaults to today

    // ── Driver ────────────────────────────────────────────────────────────────
    const driver = await prisma.driver.findUnique({
      where: { id, deletedAt: null },
      include: {
        vehicle: {
          select: {
            id: true,
            plateNumber: true,
            cap_no: true,
            make: true,
            model: true,
            year: true,
            fuelType: true,
            vehicleImg: true,
            currentOdo: true,
          },
        
        },services:{select:{nextServiceDate: true,
            nextServiceKm: true,}}
      },
    });
    if (!driver)
      return NextResponse.json(
        { ok: false, message: "Driver not found" },
        { status: 404 }
      );

    // ── License status ─────────────────────────────────────────────────────────
    let licenseStatus: "valid" | "expiring_soon" | "expired" | "unknown" =
      "unknown";
    let daysUntilLicenseExpiry: number | null = null;
    if (driver.licenseExp) {
      daysUntilLicenseExpiry = Math.ceil(
        (new Date(driver.licenseExp).getTime() - now.getTime()) / 86_400_000
      );
      licenseStatus =
        daysUntilLicenseExpiry < 0
          ? "expired"
          : daysUntilLicenseExpiry <= 30
          ? "expiring_soon"
          : "valid";
    }

    // ── Trips ─────────────────────────────────────────────────────────────────
    const tripSelect = {
      id: true,
      vehicleId: true,
      despatchDate: true,
      status: true,
      loadingPlant: true,
      destination: true,
      totaldistanceKm: true,
      odoStart: true,
      odoEnd: true,
      waybill_no: true,
      atcNo: true,
      totalCO2Kg: true,
      fuels: { select: { type: true, qtyGiven: true, fuelCost: true } },
      vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
    } as const;

    const [allTrips, filteredTrips] = await Promise.all([
      prisma.trip.findMany({
        where: { driverId: id },
        select: tripSelect,
        orderBy: { despatchDate: "desc" },
      }),
      prisma.trip.findMany({
        where: { driverId: id, despatchDate: { gte: start, lte: end } },
        select: tripSelect,
        orderBy: { despatchDate: "desc" },
      }),
    ]);

    const dist = (t: any): number =>
      t.totaldistanceKm ??
      (t.odoEnd && t.odoStart ? t.odoEnd - t.odoStart : 0);

    // Totals
    const totalDistanceAllTime = +allTrips
      .reduce((s: number, t) => s + (dist(t) || 0), 0)
      .toFixed(2);
    const totalDistanceInRange = +filteredTrips
      .reduce((s: number, t) => s + (dist(t) || 0), 0)
      .toFixed(2);
    const allFuels = filteredTrips.flatMap((t) => t.fuels);
    const totalFuelQty = +allFuels
      .reduce((s: number, f) => s + (f.qtyGiven ?? 0), 0)
      .toFixed(2);
    const totalFuelCost = +allFuels
      .reduce((s: number, f) => s + (f.fuelCost ?? 0), 0)
      .toFixed(2);
    const fuelEfficiency =
      totalFuelQty > 0
        ? +(totalDistanceInRange / totalFuelQty).toFixed(2)
        : 0;
    const estimatedCO2Kg = +allTrips
      .reduce((s: number, t) => s + (t.totalCO2Kg ?? 0), 0)
      .toFixed(2);

    // Fuel by type
    const fuelByType: Record<string, { qtyConsume: number; cost: number }> = {};
    for (const f of allFuels) {
      if (!fuelByType[f.type]) fuelByType[f.type] = { qtyConsume: 0, cost: 0 };
      fuelByType[f.type].qtyConsume += f.qtyGiven ?? 0;
      fuelByType[f.type].cost += f.fuelCost ?? 0;
    }

    // Chart data
    const tripMonthMap: Record<string, number> = {};
    const fuelTrendMap: Record<string, { cost: number; qty: number }> = {};
    const plantMap: Record<string, number> = {};
    const destMap: Record<string, number> = {};
    const statusMap: Record<string, number> = {};
    const vehicleTripMap: Record<
      string,
      { vehicleId: string; plate: string; cap_no: string; trips: number; km: number }
    > = {};

    for (const t of allTrips) {
      const month = new Date(t.despatchDate).toISOString().slice(0, 7);
      tripMonthMap[month] = (tripMonthMap[month] ?? 0) + 1;
      if (t.loadingPlant) plantMap[t.loadingPlant] = (plantMap[t.loadingPlant] ?? 0) + 1;
      if (t.destination) destMap[t.destination] = (destMap[t.destination] ?? 0) + 1;
      statusMap[t.status || "UNKNOWN"] = (statusMap[t.status || "UNKNOWN"] ?? 0) + 1;
      if (!vehicleTripMap[t.vehicleId]) {
        vehicleTripMap[t.vehicleId] = {
          vehicleId: t.vehicleId,
          plate: t.vehicle?.plateNumber ?? t.vehicleId,
          cap_no: t.vehicle?.cap_no ?? "",
          trips: 0,
          km: 0,
        };
      }
      vehicleTripMap[t.vehicleId].trips++;
      vehicleTripMap[t.vehicleId].km += dist(t) || 0;
      for (const f of t.fuels) {
        if (!fuelTrendMap[month]) fuelTrendMap[month] = { cost: 0, qty: 0 };
        fuelTrendMap[month].cost += f.fuelCost ?? 0;
        fuelTrendMap[month].qty += f.qtyGiven ?? 0;
      }
    }

    const tripTrend = Object.entries(tripMonthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }));
    const fuelTrend = Object.entries(fuelTrendMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({ month, ...v }));
    const loadingPlantChart = Object.entries(plantMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }));
    const destinationChart = Object.entries(destMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
    const tripStatusChart = Object.entries(statusMap).map(([name, value]) => ({
      name,
      value,
    }));
    const vehicleDistribution = Object.values(vehicleTripMap)
      .sort((a, b) => b.trips - a.trips)
      .map((v) => ({
        vehicleId: v.vehicleId,
        name: v.plate,
        cap_no: v.cap_no,
        value: v.trips,
        km: +v.km.toFixed(1),
      }));

    const recentTrips = filteredTrips.slice(0, 20).map((t) => ({
      id: t.id,
      waybill_no: t.waybill_no,
      atcNo: t.atcNo,
      destination: t.destination,
      loadingPlant: t.loadingPlant,
      distanceKm: dist(t) || null,
      despatchDate: t.despatchDate,
      status: t.status,
      vehicle: {
        id: t.vehicle?.id ?? null,
        plateNumber: t.vehicle?.plateNumber ?? null,
        cap_no: t.vehicle?.cap_no ?? null,
      },
      fuelCost: t.fuels.reduce((s: number, f) => s + (f.fuelCost ?? 0), 0),
    }));

    // ── Vehicle history (TruckDriver) ─────────────────────────────────────────
    const truckDriverHistory = await prisma.truckDriver.findMany({
      where: { driverId: id },
      include: {
        vehicle: {
          select: {
            id: true,
            plateNumber: true,
            cap_no: true,
            make: true,
            model: true,
            year: true,
            fuelType: true,
            vehicleImg: true,
          },
        },
      },
      orderBy: { from: "desc" },
    });

    const vehicleHistory = truckDriverHistory.map((dh) => {
      const from = new Date(dh.from??now);
      const to = new Date(dh.to ?? now);
      const tripsOnVehicle = allTrips.filter(
        (t) =>
          t.vehicleId === dh.vehicleId &&
          new Date(t.despatchDate) >= from &&
          new Date(t.despatchDate) <= to
      ).length;
      const kmOnVehicle = allTrips
        .filter(
          (t) =>
            t.vehicleId === dh.vehicleId &&
            new Date(t.despatchDate) >= from &&
            new Date(t.despatchDate) <= to
        )
        .reduce((s: number, t) => s + (dist(t) || 0), 0);
      return {
        id: dh.id,
        vehicleId: dh.vehicleId,
        plateNumber: dh.vehicle?.plateNumber ?? "—",
        cap_no: dh.vehicle?.cap_no ?? "—",
        make: dh.vehicle?.make ?? null,
        model: dh.vehicle?.model ?? null,
        year: dh.vehicle?.year ?? null,
        fuelType: dh.vehicle?.fuelType ?? null,
        vehicleImg: dh.vehicle?.vehicleImg ?? null,
        from: dh.from,
        to: dh.to,
        daysAssigned: Math.ceil(
          (to.getTime() - from.getTime()) / 86_400_000
        ),
        tripsOnVehicle,
        kmOnVehicle: +kmOnVehicle.toFixed(1),
      };
    });

    // All vehicles ever driven by this driver (for maintenance queries)
    const uniqueVehicleIds = [
      ...new Set(truckDriverHistory.map((dh) => dh.vehicleId)),
    ];

    // ── Maintenance date filter builder ────────────────────────────────────────
    const buildMaintWhere = (
      dateField: string,
      extra: Record<string, any> = {}
    ) => ({
      vehicleId: { in: uniqueVehicleIds },
      deletedAt: null,
      ...extra,
      ...(mFrom || mToStr
        ? {
            [dateField]: {
              ...(mFrom ? { gte: mFrom } : {}),
              ...(mToStr ? { lte: mTo } : {}),
            },
          }
        : {}),
    });

    // ── 1. REPAIRS ─────────────────────────────────────────────────────────────
    const repairsRaw = await prisma.repair.findMany({
      where: buildMaintWhere("reportedDate"),
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver: { select: { id: true, name: true } }, // reporter / supervisor
      },
      orderBy: [{ status: "asc" }, { reportedDate: "desc" }],
    });

    const repairs = await Promise.all(
      repairsRaw.map(async (r) => {
        const eventDate = new Date(r.reportedDate);
        const kmDrivenFromEvent = await kmFromEventToEnd(
          id,
          r.vehicleId,
          eventDate,
          mTo
        );
        const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          r.vehicleId,
          eventDate,
          mTo
        );
        return {
          id: r.id,
          faultDesc: r.faultDesc,
          repairDesc: r.repairDesc,
          priority: r.priority,
          status: r.status,
          odometerKm: r.odometerKm,
          laborCost: r.laborCost,
          partsCost: r.partsCost,
          totalCost: r.totalCost,
          garage: r.garage,
          garagePhone: r.garagePhone,
          reportedDate: r.reportedDate,
          startedDate: r.startedDate,
          completedDate: r.completedDate,
          notes: r.notes,
          // vehicle being maintained
          vehicleId: r.vehicleId,
          vehiclePlate: r.vehicle?.plateNumber ?? "—",
          vehicleCapNo: r.vehicle?.cap_no ?? "—",
          // who reported/supervised the repair
          reporterDriverId: r.driver?.id ?? null,
          reporterDriverName: r.driver?.name ?? null,
          // km this dashboard-driver drove on that vehicle from event → filter end
          kmDrivenFromEvent,
          tripsDrivenFromEvent,
        };
      })
    );

    // ── 2. SERVICES ───────────────────────────────────────────────────────────
    const servicesRaw = await prisma.service.findMany({
      where: buildMaintWhere("scheduledDate"),
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        driver: { select: { id: true, name: true } }, // supervisor
      },
      orderBy: { scheduledDate: "desc" },
    });

    const services = await Promise.all(
      servicesRaw.map(async (s) => {
        const eventDate = new Date(
          s.completedDate ?? s.scheduledDate ?? s.createdAt
        );
        const kmDrivenFromEvent = await kmFromEventToEnd(
          id,
          s.vehicleId,
          eventDate,
          mTo
        );
        const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          s.vehicleId,
          eventDate,
          mTo
        );
        return {
          id: s.id,
          serviceType: s.serviceType,
          status: s.status,
          description: s.description,
          odometerKm: s.odometerKm,
          nextServiceKm: s.nextServiceKm,
          nextServiceDate: s.nextServiceDate,
          laborCost: s.laborCost,
          partsCost: s.partsCost,
          totalCost: s.totalCost,
          garage: s.garage,
          garagePhone: s.garagePhone,
          scheduledDate: s.scheduledDate,
          completedDate: s.completedDate,
          notes: s.notes,
          vehicleId: s.vehicleId,
          vehiclePlate: s.vehicle?.plateNumber ?? "—",
          vehicleCapNo: s.vehicle?.cap_no ?? "—",
          reporterDriverId: s.driver?.id ?? null,
          reporterDriverName: s.driver?.name ?? null,
          kmDrivenFromEvent,
          tripsDrivenFromEvent,
        };
      })
    );

    // ── 3. PARTS ──────────────────────────────────────────────────────────────
    // Parts have no direct driverId — reporter comes from the linked Repair's driverId
    const partsRaw = await prisma.part.findMany({
      where: buildMaintWhere("fittedDate"),
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
        repair: {
          include: { driver: { select: { id: true, name: true } } },
        },
      },
      orderBy: { purchaseDate: "desc" },
    });

    const parts = await Promise.all(
      partsRaw.map(async (p) => {
        const eventDate = new Date(
          p.fittedDate ?? p.purchaseDate ?? p.createdAt
        );
        const kmDrivenFromEvent = await kmFromEventToEnd(
          id,
          p.vehicleId,
          eventDate,
          mTo
        );
        const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          p.vehicleId,
          eventDate,
          mTo
        );
        const warrantyExpired = p.warrantyExpiry
          ? new Date(p.warrantyExpiry) < now
          : false;
        return {
          id: p.id,
          name: p.name,
          partNumber: p.partNumber,
          category: p.category,
          quantity: p.quantity,
          unitCost: p.unitCost,
          totalCost: p.totalCost,
          supplier: p.supplier,
          supplierPhone: p.supplierPhone,
          purchaseDate: p.purchaseDate,
          fittedDate: p.fittedDate,
          warrantyExpiry: p.warrantyExpiry,
          warrantyExpired,
          repairId: p.repairId,
          notes: p.notes,
          vehicleId: p.vehicleId,
          vehiclePlate: p.vehicle?.plateNumber ?? "—",
          vehicleCapNo: p.vehicle?.cap_no ?? "—",
          // reporter from linked repair
          reporterDriverId: p.repair?.driver?.id ?? null,
          reporterDriverName: p.repair?.driver?.name ?? null,
          kmDrivenFromEvent,
          tripsDrivenFromEvent,
        };
      })
    );

    // ── 4. TIRES ──────────────────────────────────────────────────────────────
    // No driverId FK on Tire — reporter inferred from nearest trip ±7 days
    const tiresRaw = await prisma.tire.findMany({
      where: buildMaintWhere("fittedDate"),
      include: {
        vehicle: { select: { id: true, plateNumber: true, cap_no: true } },
      },
      orderBy: { fittedDate: "desc" },
    });

    const tires = await Promise.all(
      tiresRaw.map(async (tire) => {
        const eventDate = new Date(tire.fittedDate ?? tire.createdAt);

        // Reporter = driver on nearest trip for that vehicle ±7 days
        const nearTrip = await prisma.trip.findFirst({
          where: {
            vehicleId: tire.vehicleId,
            despatchDate: {
              gte: adddDays(eventDate, -7),
              lte: adddDays(eventDate, 7),
            },
          },
          select: {
            driver: { select: { id: true, name: true } },
          },
          orderBy: { despatchDate: "desc" },
        });

        const kmDrivenFromEvent = await kmFromEventToEnd(
          id,
          tire.vehicleId,
          eventDate,
          mTo
        );
        const tripsDrivenFromEvent = await tripFromEventToEnd(
          id,
          tire.vehicleId,
          eventDate,
          mTo
        );
        const lifePct =
          tire.expectedLifeKm && tire.kmCovered
            ? Math.min(
                100,
                Math.round((tire.kmCovered / tire.expectedLifeKm) * 100)
              )
            : null;

        return {
          id: tire.id,
          brand: tire.brand,
          size: tire.size,
          serialNumber: tire.serialNumber,
          position: tire.position,
          status: tire.status,
          fittedOdometerKm: tire.fittedOdometerKm,
          removedOdometerKm: tire.removedOdometerKm,
          kmCovered: tire.kmCovered,
          expectedLifeKm: tire.expectedLifeKm,
          treadDepthMm: tire.treadDepthMm,
          treadDepthAtRemoval: tire.treadDepthAtRemoval,
          unitCost: tire.unitCost,
          supplier: tire.supplier,
          fittedDate: tire.fittedDate,
          removedDate: tire.removedDate,
          lifePct,
          notes: tire.notes,
          vehicleId: tire.vehicleId,
          vehiclePlate: tire.vehicle?.plateNumber ?? "—",
          vehicleCapNo: tire.vehicle?.cap_no ?? "—",
          // reporter from nearest trip
          reporterDriverId: nearTrip?.driver?.id ?? null,
          reporterDriverName: nearTrip?.driver?.name ?? null,
          kmDrivenFromEvent,
          tripsDrivenFromEvent,
        };
      })
    );

    // ── Cost totals ────────────────────────────────────────────────────────────
    const totalRepairCost = +repairs
      .reduce((s: number, r) => s + (r.totalCost ?? 0), 0)
      .toFixed(2);
    const totalServiceCost = +services
      .reduce((s: number, sv) => s + (sv.totalCost ?? 0), 0)
      .toFixed(2);
    const totalPartsCost = +parts
      .reduce((s: number, p) => s + (p.totalCost ?? 0), 0)
      .toFixed(2);
    const totalTireCost = +tires
      .reduce((s: number, t) => s + (t.unitCost ?? 0), 0)
      .toFixed(2);
    const totalMaintenanceCost = +(
      totalRepairCost +
      totalServiceCost +
      totalPartsCost +
      totalTireCost
    ).toFixed(2);

    return NextResponse.json(
      {
        ok: true,
        data: {
          driver: { ...driver, licenseStatus, daysUntilLicenseExpiry },
          totals: {
            totalTrips: allTrips.length,
            totalDistanceAllTime,
            totalDistanceInRange,
            totalFuelQty,
            totalFuelCost,
            fuelEfficiency,
            estimatedCO2Kg,
            uniqueVehiclesCount: uniqueVehicleIds.length,
            costPerKm:
              totalDistanceInRange > 0
                ? +(totalFuelCost / totalDistanceInRange).toFixed(2)
                : 0,
          },
          fuelByType,
          tripTrend,
          fuelTrend,
          loadingPlantChart,
          destinationChart,
          tripStatusChart,
          vehicleDistribution,
          recentTrips,
          vehicleHistory,
          maintenance: {
            repairs,
            services,
            parts,
            tires,
            totalRepairCost,
            totalServiceCost,
            totalPartsCost,
            totalTireCost,
            totalMaintenanceCost,
            // echo active maintenance window back to UI
            mFrom: mFrom?.toISOString() ?? null,
            mTo: mTo?.toISOString() ?? null,
          },
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[driver-details GET]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}


// ── PATCH: Update driver fields ───────────────────────────────────────────
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getSession();
    const sessionRole   = (session as any)?.user?.role;
    const sessionUserId = (session as any)?.user?.id;

    if (!session || !["ADMIN", "DATA_ENTRY"].includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const body   = await req.json().catch(() => ({}));
    const parsed = UpdateDriverSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    // Verify driver exists and is not deleted
    const existing = await prisma.driver.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
    }

    // Build the update payload — strip undefined values so we don't
    // accidentally null out fields that weren't included in the request
    const dataToUpdate: Record<string, any> = {};

    for (const [key, value] of Object.entries(parsed.data)) {
      if (value !== undefined) {
        dataToUpdate[key] = value;
      }
    }

    // Convert licenseExp string to Date object if provided
    if (dataToUpdate.licenseExp) {
      dataToUpdate.licenseExp = new Date(dataToUpdate.licenseExp);
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { ok: false, message: "No fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.driver.update({
      where: { id },
      data: dataToUpdate,
      include: {
        vehicle: {
          select: { id: true, plateNumber: true, cap_no: true },
        },
      },
    });

    return NextResponse.json({ ok: true, driver: updated }, { status: 200 });
  } catch (err: any) {
    console.error("[driver PATCH]", err);
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// ── DELETE: Soft-delete a driver ──────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify driver exists and is not already deleted
    const existing = await prisma.driver.findUnique({
      where: { id, deletedAt: null },
      select: { id: true, vehicle: { select: { id: true } } },
    });

    if (!existing) {
      return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      // If driver is currently assigned to a vehicle, unassign them first
      if (existing.vehicle) {
        // Close open TruckDriver history record
        await tx.truckDriver.updateMany({
          where: {
            driverId: id,
            to: new Date("9999-12-31"),
          },
          data: { to: new Date() },
        });

        // Detach vehicle from driver
        await tx.vehicle.update({
          where: { id: existing.vehicle.id },
          data: { driverId: null, asssignDate: null },
        });
      }

      // Soft-delete the driver
      await tx.driver.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    });

    return NextResponse.json({ ok: true, message: "Driver deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("[driver DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}