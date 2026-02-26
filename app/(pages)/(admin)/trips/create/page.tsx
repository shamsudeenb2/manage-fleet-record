// src/app/admin/trips/create/page.tsx
// src/app/admin/trips/create/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";
import {
  getEstimatedFuelConsumption,
  estimateCO2,
  toDieselEquivalent,
  costPerKm,
  getFuelUnitInfo,
  efficiencyRating,
  DEFAULT_FUEL_UNIT,
  FUEL_CONFIG,
  type FuelType,
} from "@/components/utils/fuelCalculations";

// ─── Schema ──────────────────────────────────────────────────────────────────
const FUEL_TYPES = ["DIESEL", "PETROL", "CNG", "ELECTRIC", "LPG", "OTHER"] as const;

const FuelRowSchema = z.object({
  type:              z.enum(FUEL_TYPES),
  qtyGiven:          z.number().nonnegative("Required"),
  unitPrice:         z.number().nonnegative("Required"),
  fuelCost:          z.number().nonnegative(),          // auto-computed
  unit:              z.string().min(1),                  // auto-filled from FUEL_CONFIG
  distanceKm:        z.number().nonnegative().optional(), // auto-estimated
  estimatedCO2:      z.number().nonnegative().optional(), // auto-computed
  dieselEquivalentL: z.number().nonnegative().optional(), // auto-computed
});

const CustomerSchema = z.object({
  customerName: z.string().min(1, "Required"),
  company:      z.string().min(1, "Required"),
  noOfBags:     z.number().int().nonnegative(),
});

const TripSchema = z.object({
  vehicleId:        z.string().uuid("Select a driver first"),
  driverId:         z.string().uuid("Select a driver"),
  loadingPlant:     z.string().min(1, "Required"),
  waybill_no:       z.string().min(1, "Required"),
  atcNo:            z.string().min(1, "Required"),
  destination:      z.string().min(1, "Required"),
  despatchDate:     z.string().min(1, "Required"),
  uploadDate:       z.string().optional(),
  totaldistanceKm:  z.number().positive().optional(),
  totalFuelCost:    z.number().nonnegative().optional(), // trip-level rollup saved to DB
  totalCO2Kg:       z.number().nonnegative().optional(), // trip-level rollup saved to DB
  odoStart:         z.number().int().nonnegative().optional().nullable(),
  odoEnd:           z.number().int().nonnegative().optional().nullable(),
  fuels:            z.array(FuelRowSchema).min(1),
  customer:         z.array(CustomerSchema).min(1),
  notes:            z.string().optional(),
});

type TripForm = z.infer<typeof TripSchema>;

type DriverWithVehicle = {
  id: string;
  name: string;
  phone?: string | null;
  vehicle?: {
    id: string;
    plateNumber: string;
    cap_no: string;
    fuelType: string;
    fuelEfficiencyKmPerUnit?: number | null;
  } | null;
};

// ─── UI helpers ───────────────────────────────────────────────────────────────

function Field({
  label, error, children, hint, required,
}: {
  label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({
  error, className = "", ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
        error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
      } ${className}`}
    />
  );
}

function SelectInput({
  error, children, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 focus:outline-none transition-colors appearance-none ${
        error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    >
      {children}
    </select>
  );
}

// Read-only computed value display
function ReadField({ label, value, hint, accent }: {
  label: string; value: string; hint?: string; accent?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</label>
      <div className={`w-full bg-[#0D1117]/60 border border-white/[0.04] rounded-lg px-3 py-2.5 text-xs font-mono ${accent ? "text-[#C8A96E]" : "text-zinc-400"}`}>
        {value || "—"}
      </div>
      {hint && <p className="text-[10px] text-zinc-700">{hint}</p>}
    </div>
  );
}

function EfficiencyBadge({ rating }: { rating: "good" | "average" | "poor" | null }) {
  if (!rating) return null;
  const styles = {
    good:    "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
    average: "bg-amber-900/20 text-amber-400 border border-amber-700/30",
    poor:    "bg-red-900/20 text-red-400 border border-red-800/30",
  };
  const icons = { good: "✓", average: "~", poor: "↓" };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[rating]}`}>
      {icons[rating]} {rating} efficiency
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreateTripPage() {
  const router = useRouter();
  const [submitLoading, setSubmitLoading]       = useState(false);
  const [drivers, setDrivers]                   = useState<DriverWithVehicle[]>([]);
  const [driversLoading, setDriversLoading]     = useState(true);
  const [selectedVehicle, setSelectedVehicle]   = useState<DriverWithVehicle["vehicle"] | null>(null);

  const {
    register, control, handleSubmit, watch, reset, setValue,
    formState: { errors },
  } = useForm<TripForm>({
    resolver: zodResolver(TripSchema),
    defaultValues: {
      vehicleId: "", driverId: "", loadingPlant: "", waybill_no: "",
      atcNo: "", destination: "",odoStart:null, odoEnd:null,
      despatchDate: new Date().toISOString().slice(0, 16),
      fuels: [{
        type: "DIESEL", qtyGiven: 0, unitPrice: 0, fuelCost: 0,
        unit: "L", distanceKm: 0, estimatedCO2: 0, dieselEquivalentL: 0,
      }],
      customer: [{ customerName: "", company: "", noOfBags: 0 }],
    },
  });

  const fuelFA     = useFieldArray({ control, name: "fuels" });
  const customerFA = useFieldArray({ control, name: "customer" });

  const driverId = watch("driverId");
  const fuels    = watch("fuels");
  const odoStart = watch("odoStart");
  const odoEnd   = watch("odoEnd");

  // ── Load drivers (only those with an assigned vehicle) ────────────────────
  useEffect(() => {
    (async () => {
      setDriversLoading(true);
      try {
        const res  = await fetch("/api/auth/users/driver/list-with-vehicle");
        const json = await res.json();
        if (res.ok) setDrivers(json.drivers ?? []);
      } catch { /* non-critical */ }
      finally { setDriversLoading(false); }
    })();
  }, []);

  // ── Helper: compute a single row's derived values ─────────────────────────
  function recomputeSingleFuel(
    idx: number,
    qty: number,
    price: number,
    fuelType: string,
    unit: string,
    customKmPerUnit?: number | null,
  ) {
    const cost    = isFinite(qty * price) ? +(qty * price).toFixed(2) : 0;
    const estDist = getEstimatedFuelConsumption(fuelType, unit, qty, customKmPerUnit) ?? 0;
    const co2     = estimateCO2(fuelType, qty)       ?? 0;
    const lde     = toDieselEquivalent(fuelType, qty) ?? 0;

    setValue(`fuels.${idx}.fuelCost`,          cost,    { shouldDirty: true });
    setValue(`fuels.${idx}.distanceKm`,        estDist, { shouldDirty: true });
    setValue(`fuels.${idx}.estimatedCO2`,      co2,     { shouldDirty: true });
    setValue(`fuels.${idx}.dieselEquivalentL`, lde,     { shouldDirty: true });
  }

  // ── When driver changes → auto-fill vehicle + reset fuel rows ─────────────
  useEffect(() => {
    if (!driverId) { setSelectedVehicle(null); return; }
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver?.vehicle) { setSelectedVehicle(null); return; }

    const v = driver.vehicle;
    setSelectedVehicle(v);
    setValue("vehicleId", v.id, { shouldValidate: true });

    // Update every fuel row to match vehicle fuel type
    const fuelType = v.fuelType as FuelType;
    const unit     = DEFAULT_FUEL_UNIT[fuelType] ?? "L";

    fuels.forEach((f, idx) => {
      setValue(`fuels.${idx}.type`, fuelType as any, { shouldDirty: true });
      setValue(`fuels.${idx}.unit`, unit,             { shouldDirty: true });
      recomputeSingleFuel(idx, f.qtyGiven ?? 0, f.unitPrice ?? 0, fuelType, unit, v.fuelEfficiencyKmPerUnit);
    });
  }, [driverId, drivers]);

  // ── Odometer → auto-compute total distance ────────────────────────────────
  useEffect(() => {
    if (
      typeof odoStart === "number" && !isNaN(odoStart) &&
      typeof odoEnd   === "number" && !isNaN(odoEnd)   &&
      odoEnd > odoStart
    ) {
      setValue("totaldistanceKm", odoEnd - odoStart, { shouldDirty: true });
    }
  }, [odoStart, odoEnd]);

  // ── Recompute all rows + trip-level rollups whenever qty/price changes ─────
  // Stringify key fields into a stable signature React can diff without loops
  const fuelSignature = fuels
    .map((f) => `${f.unitPrice ?? 0}|${f.type}`)
    .join(",");

  const recomputeAll = useCallback(() => {
    let totalDist = 0;
    let totalCO2  = 0;
    let totalCost = 0;

    fuels.forEach((fuel, idx) => {
      const fuelType        = fuel.type ?? "DIESEL";
      const unit            = DEFAULT_FUEL_UNIT[fuelType] ?? fuel.unit ?? "L";
      const qty             = fuel.qtyGiven  ?? 0;
      const price           = fuel.unitPrice ?? 0;
      const customKmPerUnit = selectedVehicle?.fuelEfficiencyKmPerUnit ?? null;

      recomputeSingleFuel(idx, qty, price, fuelType, unit, customKmPerUnit);

      totalDist += getEstimatedFuelConsumption(fuelType, unit, qty, customKmPerUnit) ?? 0;
      totalCO2  += estimateCO2(fuelType, qty) ?? 0;
      totalCost += isFinite(qty * price) ? qty * price : 0;
    });

    // Only overwrite totaldistanceKm from fuel when odometer isn't driving it
    const hasOdo =
      typeof odoStart === "number" && !isNaN(odoStart) &&
      typeof odoEnd   === "number" && !isNaN(odoEnd)   &&
      odoEnd > odoStart;

    if (!hasOdo && totalDist > 0) {
      setValue("totaldistanceKm", +totalDist.toFixed(1), { shouldDirty: true });
    }
    setValue("totalFuelCost", +totalCost.toFixed(2), { shouldDirty: true });
    setValue("totalCO2Kg",    +totalCO2.toFixed(2),  { shouldDirty: true });
  }, [fuels, selectedVehicle, odoStart, odoEnd, setValue]);

  useEffect(() => { recomputeAll(); }, [fuels[0].qtyGiven,fuelSignature]);

  // ── Derived display values ────────────────────────────────────────────────
  const watchedTotalFuelCost = watch("totalFuelCost") ?? 0;
  const watchedTotalCO2      = watch("totalCO2Kg")    ?? 0;
  const watchedTotalDist     = watch("totaldistanceKm");

  const tripCostPerKm = costPerKm(watchedTotalFuelCost, watchedTotalDist ?? 0);

  const primaryFuel       = fuels[0];
  const primaryActualKmPu =
    (primaryFuel?.qtyGiven ?? 0) > 0 && (primaryFuel?.distanceKm ?? 0) > 0
      ? (primaryFuel.distanceKm!) / primaryFuel.qtyGiven!
      : null;
  const primaryRating = primaryActualKmPu
    ? efficiencyRating(primaryFuel?.type ?? "DIESEL", primaryActualKmPu)
    : null;

  // ── Submit ────────────────────────────────────────────────────────────────
  async function onSubmit(data: TripForm) {
    setSubmitLoading(true);
    try {
      if (!data.uploadDate) data.uploadDate = new Date().toISOString();

      const res  = await fetch("/api/trips", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.status === 201) {
        toast.success("Trip logged successfully");
        reset();
        router.push("/trips");
        return;
      }
      if (res.status === 409) {
        toast.error(json?.message ?? "Waybill or ATC number already exists");
        return;
      }
      toast.error(json?.message ?? "Failed to create trip");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setSubmitLoading(false);
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* HEADER */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div>
              <h1 className="text-base font-bold tracking-wider">Log Trip</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Record a new dispatch trip</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* ═══ SECTION 1: Driver & Vehicle ══════════════════════════════ */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Driver & Vehicle</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Driver" error={(errors.driverId as any)?.message} required>
                  <SelectInput {...register("driverId")} disabled={driversLoading} error={!!errors.driverId}>
                    <option value="">{driversLoading ? "Loading drivers…" : "— Select a driver —"}</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id} disabled={!d.vehicle}>
                        {d.name}{d.vehicle ? ` · ${d.vehicle.plateNumber}` : " (no vehicle)"}
                      </option>
                    ))}
                  </SelectInput>
                </Field>

                <Field label="Assigned Vehicle" hint="Auto-filled when driver is selected">
                  <TextInput
                    value={selectedVehicle ? `${selectedVehicle.plateNumber} · ${selectedVehicle.cap_no}` : ""}
                    readOnly placeholder="Select a driver first"
                    className="opacity-60 cursor-not-allowed" error={false}
                  />
                  <input type="hidden" {...register("vehicleId")} />
                </Field>
              </div>

              {/* Vehicle card */}
              <AnimatePresence>
                {selectedVehicle && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0D1117] rounded-xl px-4 py-4 border border-[#C8A96E]/20"
                  >
                    {[
                      { label: "Plate",     value: selectedVehicle.plateNumber, gold: true  },
                      { label: "CAP No",    value: selectedVehicle.cap_no,      gold: false },
                      { label: "Fuel Type", value: selectedVehicle.fuelType,    gold: false },
                      {
                        label: "Efficiency",
                        value: selectedVehicle.fuelEfficiencyKmPerUnit
                          ? `${selectedVehicle.fuelEfficiencyKmPerUnit} km/${DEFAULT_FUEL_UNIT[selectedVehicle.fuelType] ?? "L"} (vehicle)`
                          : `${FUEL_CONFIG[selectedVehicle.fuelType as FuelType]?.defaultKmPerUnit ?? "—"} km/${DEFAULT_FUEL_UNIT[selectedVehicle.fuelType] ?? "L"} (fleet default)`,
                        gold: false,
                      },
                    ].map((row) => (
                      <div key={row.label}>
                        <p className="text-[10px] text-zinc-600">{row.label}</p>
                        <p className={`text-xs font-mono font-semibold ${row.gold ? "text-[#C8A96E]" : "text-zinc-300"}`}>
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ═══ SECTION 2: Trip Details ═══════════════════════════════════ */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Trip Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Loading Plant" error={(errors.loadingPlant as any)?.message} required>
                  <TextInput {...register("loadingPlant")} placeholder="e.g. Kano Depot" error={!!errors.loadingPlant} />
                </Field>
                <Field label="Destination" error={(errors.destination as any)?.message} required>
                  <TextInput {...register("destination")} placeholder="e.g. Lagos" error={!!errors.destination} />
                </Field>
                <Field label="Waybill No" error={(errors.waybill_no as any)?.message} required>
                  <TextInput {...register("waybill_no")} placeholder="Waybill number" error={!!errors.waybill_no} />
                </Field>
                <Field label="ATC No" error={(errors.atcNo as any)?.message} required>
                  <TextInput {...register("atcNo")} placeholder="ATC number" error={!!errors.atcNo} />
                </Field>
                <Field label="Dispatch Date & Time" error={(errors.despatchDate as any)?.message} required>
                  <TextInput {...register("despatchDate")} type="datetime-local" error={!!errors.despatchDate} />
                </Field>
                <Field
                  label="Total Distance (km)"
                  hint={
                    odoStart && odoEnd && (odoEnd > odoStart)
                      ? `Auto-set from odometer: ${odoEnd - odoStart} km`
                      : "Auto-estimated from fuel — or enter manually to override"
                  }
                >
                  <TextInput
                    {...register("totaldistanceKm", { valueAsNumber: true })}
                    type="number" step="0.1" placeholder="km"
                  />
                </Field>
              </div>

              {/* Odometer */}
              <div className="pt-3 border-t border-white/[0.04] space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Odometer readings — optional, overrides fuel-estimated distance
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="ODO Start (km)">
                    <TextInput {...register("odoStart", { valueAsNumber: true })} type="number" placeholder="Start reading" />
                  </Field>
                  <Field label="ODO End (km)">
                    <TextInput {...register("odoEnd", { valueAsNumber: true })} type="number" placeholder="End reading" />
                  </Field>
                </div>
              </div>

              <Field label="Notes" hint="Optional">
                <textarea
                  {...register("notes")} rows={2} placeholder="Any notes about this trip…"
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 transition-colors resize-none"
                />
              </Field>
            </div>

            {/* ═══ SECTION 3: Customers ══════════════════════════════════════ */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Customers
                  <span className="ml-2 text-zinc-600 font-normal normal-case tracking-normal">
                    ({customerFA.fields.length})
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={() => customerFA.append({ customerName: "", company: "", noOfBags: 0 })}
                  className="px-3 py-1 rounded-lg text-[10px] border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors font-semibold"
                >
                  + Add Customer
                </button>
              </div>

              <div className="space-y-3">
                {customerFA.fields.map((field, idx) => (
                  <div key={field.id} className="bg-[#0D1117] rounded-xl border border-white/[0.04] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Customer {idx + 1}</span>
                      {idx > 0 && (
                        <button type="button" onClick={() => customerFA.remove(idx)} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field label="Company" error={(errors.customer?.[idx]?.company as any)?.message} required>
                        <TextInput {...register(`customer.${idx}.company`)} placeholder="Company name" error={!!errors.customer?.[idx]?.company} />
                      </Field>
                      <Field label="Customer Name" error={(errors.customer?.[idx]?.customerName as any)?.message} required>
                        <TextInput {...register(`customer.${idx}.customerName`)} placeholder="Contact name" error={!!errors.customer?.[idx]?.customerName} />
                      </Field>
                      <Field label="No. of Bags">
                        <TextInput {...register(`customer.${idx}.noOfBags`, { valueAsNumber: true })} type="number" placeholder="0" />
                      </Field>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══ SECTION 4: Fuel Records ═══════════════════════════════════ */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fuel Records</h2>
                  <p className="text-[10px] text-zinc-600 mt-0.5">
                    {selectedVehicle
                      ? `${selectedVehicle.fuelType} · measured in ${DEFAULT_FUEL_UNIT[selectedVehicle.fuelType] ?? "L"} · ${selectedVehicle.fuelEfficiencyKmPerUnit ?? FUEL_CONFIG[selectedVehicle.fuelType as FuelType]?.defaultKmPerUnit} km/${DEFAULT_FUEL_UNIT[selectedVehicle.fuelType] ?? "L"}`
                      : "Select a driver first to auto-fill fuel type"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const ft   = (selectedVehicle?.fuelType ?? "DIESEL") as FuelType;
                    const unit = DEFAULT_FUEL_UNIT[ft] ?? "L";
                    fuelFA.append({ type: ft as any, qtyGiven: 0, unitPrice: 0, fuelCost: 0, unit, distanceKm: 0, estimatedCO2: 0, dieselEquivalentL: 0 });
                  }}
                  className="px-3 py-1 rounded-lg text-[10px] border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors font-semibold"
                >
                  + Add Fuel
                </button>
              </div>

              <div className="space-y-4">
                {fuelFA.fields.map((field, idx) => {
                  const fuel      = fuels[idx];
                  const fuelType  = fuel?.type ?? "DIESEL";
                  const unitInfo  = getFuelUnitInfo(fuelType);
                  const qty       = fuel?.qtyGiven   ?? 0;
                  const dist      = fuel?.distanceKm ?? 0;
                  const actualEff = qty > 0 && dist > 0 ? dist / qty : null;
                  const rowRating = actualEff ? efficiencyRating(fuelType, actualEff) : null;

                  return (
                    <div key={field.id} className="bg-[#0D1117] rounded-xl border border-white/[0.04] p-4 space-y-4">
                      {/* Row header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                            Fuel Entry {idx + 1}
                          </span>
                          {rowRating && <EfficiencyBadge rating={rowRating} />}
                        </div>
                        {idx > 0 && (
                          <button type="button" onClick={() => fuelFA.remove(idx)} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Input grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                        {/* Fuel type — locked to vehicle, hidden inputs carry all computed values */}
                        <Field label="Fuel Type" hint={`Unit: ${unitInfo.unit}`}>
                          <TextInput
                            value={fuelType}
                            readOnly className="opacity-60 cursor-not-allowed" error={false}
                          />
                          <input type="hidden" {...register(`fuels.${idx}.type`)} />
                          <input type="hidden" {...register(`fuels.${idx}.unit`)} />
                          <input type="hidden" {...register(`fuels.${idx}.fuelCost`,          { valueAsNumber: true })} />
                          <input type="hidden" {...register(`fuels.${idx}.estimatedCO2`,      { valueAsNumber: true })} />
                          <input type="hidden" {...register(`fuels.${idx}.dieselEquivalentL`, { valueAsNumber: true })} />
                        </Field>

                        {/* Qty */}
                        <Field
                          label={`Qty Given (${fuel?.unit ?? unitInfo.unit})`}
                          error={(errors.fuels?.[idx]?.qtyGiven as any)?.message}
                          hint={unitInfo.hint}
                          required
                        >
                          <TextInput
                            {...register(`fuels.${idx}.qtyGiven`, { valueAsNumber: true })}
                            type="number" step="0.01" min="0"
                            placeholder={unitInfo.placeholder}
                            error={!!errors.fuels?.[idx]?.qtyGiven}
                          />
                        </Field>

                        {/* Unit price */}
                        <Field
                          label={`Price per ${fuel?.unit ?? unitInfo.unit} (₦)`}
                          error={(errors.fuels?.[idx]?.unitPrice as any)?.message}
                          required
                        >
                          <TextInput
                            {...register(`fuels.${idx}.unitPrice`, { valueAsNumber: true })}
                            type="number" step="0.01" min="0" placeholder="0.00"
                            error={!!errors.fuels?.[idx]?.unitPrice}
                          />
                        </Field>

                        {/* Computed: fuel cost */}
                        <ReadField
                          label="Fuel Cost (₦)"
                          value={`₦${(fuel?.fuelCost ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
                          hint="qty × unit price"
                          accent
                        />

                        {/* Computed: estimated distance */}
                        <ReadField
                          label="Est. Distance (km)"
                          value={dist > 0 ? `${dist.toLocaleString("en-NG")} km` : "—"}
                          hint={
                            selectedVehicle?.fuelEfficiencyKmPerUnit
                              ? `Vehicle rate: ${selectedVehicle.fuelEfficiencyKmPerUnit} km/${fuel?.unit ?? unitInfo.unit}`
                              : `Fleet default: ${FUEL_CONFIG[fuelType as FuelType]?.defaultKmPerUnit} km/${fuel?.unit ?? unitInfo.unit}`
                          }
                        />

                        {/* Computed: CO₂ */}
                        <ReadField
                          label="Est. CO₂ (kg)"
                          value={(fuel?.estimatedCO2 ?? 0) > 0
                            ? `${(fuel!.estimatedCO2!).toLocaleString("en-NG", { minimumFractionDigits: 1 })} kg`
                            : "—"}
                          hint={`${FUEL_CONFIG[fuelType as FuelType]?.co2PerUnit} kg CO₂ per ${fuel?.unit ?? unitInfo.unit}`}
                        />
                      </div>

                      {/* Diesel equivalent note for non-diesel fuels */}
                      {fuelType !== "DIESEL" && (fuel?.dieselEquivalentL ?? 0) > 0 && (
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 bg-[#161B22] rounded-lg px-3 py-2 border border-white/[0.04]">
                          <span className="text-zinc-500">⇌</span>
                          <span>
                            {(fuel!.dieselEquivalentL!).toLocaleString("en-NG", { minimumFractionDigits: 2 })} L diesel equivalent
                            &nbsp;·&nbsp;{FUEL_CONFIG[fuelType as FuelType]?.ldePerUnit} LDE per {fuel?.unit ?? "unit"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Trip-level summary */}
              <AnimatePresence>
                {fuels.some((f) => (f.qtyGiven ?? 0) > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0D1117] rounded-xl px-4 py-4 border border-[#C8A96E]/20"
                  >
                    <div>
                      <p className="text-[10px] text-zinc-600">Total Fuel Cost</p>
                      <p className="font-mono text-[#C8A96E] font-bold text-sm">
                        ₦{watchedTotalFuelCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600">Est. Distance</p>
                      <p className="font-mono text-zinc-300 text-sm">
                        {watchedTotalDist ? `${Number(watchedTotalDist).toLocaleString("en-NG")} km` : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600">Cost per km</p>
                      <p className="font-mono text-zinc-300 text-sm">
                        {tripCostPerKm ? `₦${tripCostPerKm.toLocaleString("en-NG")}` : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-600">Est. CO₂</p>
                      <p className="font-mono text-zinc-300 text-sm">
                        {watchedTotalCO2 > 0 ? `${watchedTotalCO2.toLocaleString("en-NG")} kg` : "—"}
                      </p>
                    </div>
                    {primaryRating && (
                      <div className="col-span-2 sm:col-span-4 flex items-center gap-2">
                        <EfficiencyBadge rating={primaryRating} />
                        <span className="text-[10px] text-zinc-600">
                          vs {FUEL_CONFIG[primaryFuel?.type as FuelType]?.defaultKmPerUnit} km/{primaryFuel?.unit ?? "L"} fleet benchmark
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Actions ── */}
            <div className="flex items-center gap-3 pb-10">
              <button
                type="submit" disabled={submitLoading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitLoading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {submitLoading ? "Creating…" : "Log Trip"}
              </button>
              <button
                type="button" onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
