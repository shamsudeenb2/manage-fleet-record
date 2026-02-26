// src/app/admin/maintenance/tires/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const STATUSES   = ["FITTED", "REPLACED", "RETREADED", "SCRAPPED"] as const;
const POSITIONS  = [
  "FRONT_LEFT", "FRONT_RIGHT",
  "MIDDLE_LEFT_INNER", "MIDDLE_LEFT_OUTER",
  "MIDDLE_RIGHT_INNER", "MIDDLE_RIGHT_OUTER",
  "REAR_LEFT_INNER", "REAR_LEFT_OUTER",
  "REAR_RIGHT_INNER", "REAR_RIGHT_OUTER",
  "SPARE", "OTHER",
] as const;

const TireSchema = z.object({
  vehicleId:              z.string().uuid("Select a vehicle"),
  brand:                  z.string().optional().nullable(),
  size:                   z.string().optional().nullable(),
  serialNumber:           z.string().optional().nullable(),
  position:               z.enum(POSITIONS),
  status:                 z.enum(STATUSES),
  fittedOdometerKm:       z.number().int().nonnegative().optional().nullable(),
  removedOdometerKm:      z.number().int().nonnegative().optional().nullable(),
  kmCovered:              z.number().int().nonnegative().optional().nullable(), // server-computed
  treadDepthMm:           z.number().nonnegative().optional().nullable(),
  treadDepthAtRemoval:    z.number().nonnegative().optional().nullable(),
  expectedLifeKm:         z.number().int().nonnegative().optional().nullable(),
  unitCost:               z.number().nonnegative().optional().nullable(),
  supplier:               z.string().optional().nullable(),
  purchaseDate:           z.string().optional().nullable(),
  fittedDate:             z.string().optional().nullable(),
  removedDate:            z.string().optional().nullable(),
  notes:                  z.string().optional().nullable(),
});

type FormValues = z.infer<typeof TireSchema>;
type Vehicle = { id: string; plateNumber: string; cap_no: string; currentOdo?: number | null };

// ─── Axle position diagram labels ────────────────────────────────────────────
const POSITION_META: Record<string, { label: string; short: string; desc: string }> = {
  FRONT_LEFT:       { label: "Front Left",        short: "FL",  desc: "Steer axle, left" },
  FRONT_RIGHT:      { label: "Front Right",       short: "FR",  desc: "Steer axle, right" },
  MIDDLE_LEFT_INNER:  { label: "Middle Left Inner",   short: "MLI", desc: "Drive axle, middle left inner" },
  MIDDLE_LEFT_OUTER:  { label: "Middle Left Outer",   short: "MLO", desc: "Drive axle, middle left outer" },
  MIDDLE_RIGHT_INNER: { label: "Middle Right Inner",  short: "MRI", desc: "Drive axle, middle right inner" },
  MIDDLE_RIGHT_OUTER: { label: "Middle Right Outer",  short: "MRO", desc: "Drive axle, middle right outer" },
  REAR_LEFT_INNER:  { label: "Rear Left Inner",   short: "RLI", desc: "Drive axle, left inner" },
  REAR_LEFT_OUTER:  { label: "Rear Left Outer",   short: "RLO", desc: "Drive axle, left outer" },
  REAR_RIGHT_INNER: { label: "Rear Right Inner",  short: "RRI", desc: "Drive axle, right inner" },
  REAR_RIGHT_OUTER: { label: "Rear Right Outer",  short: "RRO", desc: "Drive axle, right outer" },
  SPARE:            { label: "Spare",             short: "SP",  desc: "Spare / emergency tire" },
  OTHER:            { label: "Other",             short: "—",   desc: "Trailer or unlisted position" },
};

const STATUS_META: Record<string, { color: string; icon: string; desc: string }> = {
  FITTED:    { color: "text-emerald-400", icon: "✓", desc: "Currently on the vehicle" },
  REPLACED:  { color: "text-sky-400",    icon: "↺", desc: "Removed and replaced" },
  RETREADED: { color: "text-[#C8A96E]",  icon: "⟳", desc: "Sent for retreading" },
  SCRAPPED:  { color: "text-red-400",    icon: "✕", desc: "Written off / disposed" },
};

// ─── UI helpers ───────────────────────────────────────────────────────────────
function Field({ label, error, children, hint, required }: {
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

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
      error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
    }`} />
  );
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 focus:outline-none transition-colors appearance-none ${
      error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
    }`}>{children}</select>
  );
}

// Visual truck axle diagram for position picking
function AxleDiagram({ selected, onSelect }: {
  selected: string;
  onSelect: (pos: typeof POSITIONS[number]) => void;
}) {
  type Slot = { pos: typeof POSITIONS[number]; label: string; x: number; y: number };

  const slots: Slot[] = [
    { pos: "FRONT_LEFT",       label: "FL",  x: 1, y: 0 },
    { pos: "FRONT_RIGHT",      label: "FR",  x: 3, y: 0 },
    { pos: "MIDDLE_LEFT_INNER",  label: "MLI", x: 1, y: 2 },
    { pos: "MIDDLE_LEFT_OUTER",  label: "MLO", x: 0, y: 2 },
    { pos: "MIDDLE_RIGHT_INNER",  label: "MLI", x: 1, y: 2 },
    { pos: "MIDDLE_RIGHT_OUTER",  label: "MLO", x: 0, y: 2 },
    { pos: "REAR_LEFT_INNER",  label: "RLI", x: 1, y: 2 },
    { pos: "REAR_LEFT_OUTER",  label: "RLO", x: 0, y: 2 },
    { pos: "REAR_RIGHT_INNER", label: "RRI", x: 3, y: 2 },
    { pos: "REAR_RIGHT_OUTER", label: "RRO", x: 4, y: 2 },
    { pos: "SPARE",            label: "SP",  x: 2, y: 4 },
    { pos: "OTHER",            label: "—",   x: 4, y: 4 },
  ];

  return (
    <div className="bg-[#0D1117] rounded-xl border border-white/[0.06] p-4">
      <p className="text-[10px] text-zinc-600 mb-3 uppercase tracking-wider">Click position on truck diagram</p>
      {/* Simple CSS grid diagram */}
      <div className="flex flex-col items-center gap-2">
        {/* Steer axle */}
        <div className="text-[10px] text-zinc-600 self-start pl-2">Steer Axle</div>
        <div className="flex items-center gap-2">
          <TireSlot slot={slots[0]} selected={selected} onSelect={onSelect} />
          <div className="w-24 h-3 bg-white/[0.04] border border-white/[0.06] rounded flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white/10" /></div>
          <TireSlot slot={slots[1]} selected={selected} onSelect={onSelect} />
        </div>
        {/* Chassis */}
        <div className="w-0.5 h-6 bg-white/[0.06]" />
        {/* Drive axle */}
        <div className="text-[10px] text-zinc-600 self-start pl-2">Drive Axle</div>
        <div className="flex items-center gap-1">
          <TireSlot slot={slots[3]} selected={selected} onSelect={onSelect} />
          <TireSlot slot={slots[2]} selected={selected} onSelect={onSelect} />
          <div className="w-20 h-3 bg-white/[0.04] border border-white/[0.06] rounded" />
          <TireSlot slot={slots[4]} selected={selected} onSelect={onSelect} />
          <TireSlot slot={slots[5]} selected={selected} onSelect={onSelect} />
        </div>
        <div className="flex items-center gap-1">
          <TireSlot slot={slots[7]} selected={selected} onSelect={onSelect} />
          <TireSlot slot={slots[6]} selected={selected} onSelect={onSelect} />
          <div className="w-20 h-3 bg-white/[0.04] border border-white/[0.06] rounded" />
          <TireSlot slot={slots[9]} selected={selected} onSelect={onSelect} />
          <TireSlot slot={slots[8]} selected={selected} onSelect={onSelect} />
        </div>
        {/* Spare / Other */}
        <div className="w-0.5 h-4 bg-white/[0.06]" />
        <div className="flex items-center gap-4">
          <TireSlot slot={slots[6]} selected={selected} onSelect={onSelect} />
          <TireSlot slot={slots[7]} selected={selected} onSelect={onSelect} />
        </div>
      </div>
      {/* Selected label */}
      <p className="text-[10px] text-[#C8A96E] font-mono mt-3 text-center">
        Selected: {POSITION_META[selected]?.label ?? "—"} · {POSITION_META[selected]?.desc}
      </p>
    </div>
  );
}

function TireSlot({ slot, selected, onSelect }: {
  slot: { pos: typeof POSITIONS[number]; label: string };
  selected: string;
  onSelect: (pos: typeof POSITIONS[number]) => void;
}) {
  const active = selected === slot.pos;
  return (
    <button type="button" onClick={() => onSelect(slot.pos)}
      className={`w-10 h-14 rounded border-2 text-[10px] font-bold transition-all flex items-center justify-center ${
        active
          ? "border-[#C8A96E] bg-[#C8A96E]/20 text-[#C8A96E]"
          : "border-white/[0.10] bg-white/[0.03] text-zinc-600 hover:border-white/30 hover:text-zinc-400"
      }`}>
      {slot.label}
    </button>
  );
}

// Life expectancy progress bar preview
function LifePreview({ expected }: { expected?: number | null }) {
  if (!expected) return null;
  return (
    <div className="flex items-center gap-3 bg-[#0D1117] rounded-lg px-3 py-2 border border-white/[0.04]">
      <div className="text-[10px] text-zinc-600">Expected life</div>
      <div className="font-mono text-zinc-300 text-xs">{expected.toLocaleString("en-NG")} km</div>
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full">
        <div className="h-full rounded-full bg-[#5C9669] w-0" />
      </div>
      <div className="text-[10px] text-zinc-600">0%</div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function CreateTirePage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const {
    register, handleSubmit, watch, setValue, formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(TireSchema),
    defaultValues: {
      position: "OTHER",
      status:   "FITTED",
      fittedDate: new Date().toISOString().slice(0, 10),
    },
  });

  const position       = watch("position");
  const status         = watch("status");
  const vehicleId      = watch("vehicleId");
  const fittedOdo      = watch("fittedOdometerKm");
  const removedOdo     = watch("removedOdometerKm");
  const expectedLifeKm = watch("expectedLifeKm");

  // Auto-compute kmCovered when both odometer readings available
  useEffect(() => {
    if (
      typeof fittedOdo  === "number" && !isNaN(fittedOdo)  &&
      typeof removedOdo === "number" && !isNaN(removedOdo) &&
      removedOdo > fittedOdo
    ) {
      setValue("kmCovered", removedOdo - fittedOdo, { shouldDirty: true });
    }
  }, [fittedOdo, removedOdo, setValue]);

  // Auto-fill fitted odometer from selected vehicle
  useEffect(() => {
    const v = vehicles.find(v => v.id === vehicleId);
    if (v?.currentOdo) setValue("fittedOdometerKm", v.currentOdo);
  }, [vehicleId, vehicles]);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch("/api/vehicles?limit=200");
        const json = await res.json();
        if (res.ok) setVehicles(json.items ?? []);
      } catch { /* non-critical */ }
    })();
  }, []);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res  = await fetch("/api/maintenance/tires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) {
        toast.success("Tire logged");
        router.push("/maintenance/tires");
        return;
      }
      toast.error(json?.message ?? "Failed to create tire record");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  }

  const kmCoveredPreview = (
    typeof fittedOdo  === "number" && !isNaN(fittedOdo)  &&
    typeof removedOdo === "number" && !isNaN(removedOdo) &&
    removedOdo > fittedOdo
  ) ? removedOdo - fittedOdo : null;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* Header */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div>
              <h1 className="text-base font-bold tracking-wider">Log Tire</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Record a tire fitment, replacement or disposal</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)} className="space-y-5"
          >

            {/* ── Section 1: Vehicle ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vehicle</h2>
              <Field label="Vehicle" error={(errors.vehicleId as any)?.message} required>
                <SelectInput {...register("vehicleId")} error={!!errors.vehicleId}>
                  <option value="">— Select vehicle —</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plateNumber} · {v.cap_no}</option>
                  ))}
                </SelectInput>
              </Field>
            </div>

            {/* ── Section 2: Tire Info ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tire Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Brand" hint="e.g. Michelin, Bridgestone, Toyo, Dunlop">
                  <TextInput {...register("brand")} placeholder="Brand name" />
                </Field>
                <Field label="Size" hint="e.g. 315/80R22.5 or 12R22.5">
                  <TextInput {...register("size")} placeholder="Tire size specification" />
                </Field>
                <Field label="Serial / DOT Number" hint="For warranty claims and recall notices">
                  <TextInput {...register("serialNumber")} placeholder="DOT serial number" />
                </Field>
                <Field label="Expected Life (km)" hint="Manufacturer recommended lifespan">
                  <TextInput
                    {...register("expectedLifeKm", { valueAsNumber: true })}
                    type="number" placeholder="e.g. 150000"
                  />
                </Field>
              </div>
              {expectedLifeKm && <LifePreview expected={expectedLifeKm} />}
            </div>

            {/* ── Section 3: Position (axle diagram) ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Axle Position</h2>
              <AxleDiagram
                selected={position}
                onSelect={pos => setValue("position", pos, { shouldDirty: true })}
              />
              <input type="hidden" {...register("position")} />
            </div>

            {/* ── Section 4: Status ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Status</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATUSES.map(s => (
                  <button key={s} type="button"
                    onClick={() => setValue("status", s, { shouldDirty: true })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      status === s ? "border-[#C8A96E] bg-[#C8A96E]/10" : "border-white/[0.06] hover:border-white/20"
                    }`}>
                    <div className={`text-lg ${STATUS_META[s].color}`}>{STATUS_META[s].icon}</div>
                    <div className={`text-xs font-bold mt-1 ${status === s ? "text-[#C8A96E]" : "text-zinc-400"}`}>{s}</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5 leading-tight">{STATUS_META[s].desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Section 5: Odometer & Tread ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Odometer & Tread</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Odometer at Fitting (km)" hint="Auto-filled from vehicle current ODO">
                  <TextInput
                    {...register("fittedOdometerKm", { valueAsNumber: true })}
                    type="number" placeholder="km reading when fitted"
                  />
                </Field>
                <Field label="Odometer at Removal (km)" hint="Fill when tire is removed">
                  <TextInput
                    {...register("removedOdometerKm", { valueAsNumber: true })}
                    type="number" placeholder="km reading when removed"
                  />
                </Field>
              </div>

              {/* km covered live preview */}
              {kmCoveredPreview !== null && (
                <div className="flex items-center gap-3 bg-[#0D1117] rounded-lg px-3 py-2 border border-[#C8A96E]/20">
                  <span className="text-[10px] text-zinc-600">km covered</span>
                  <span className="font-mono text-[#C8A96E] font-bold text-sm">{kmCoveredPreview.toLocaleString("en-NG")} km</span>
                  {expectedLifeKm && (
                    <span className="text-[10px] text-zinc-600">
                      · {Math.round((kmCoveredPreview / expectedLifeKm) * 100)}% of expected life
                    </span>
                  )}
                </div>
              )}
              <input type="hidden" {...register("kmCovered", { valueAsNumber: true })} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Tread Depth at Fitting (mm)" hint="New tire tread depth">
                  <TextInput
                    {...register("treadDepthMm", { valueAsNumber: true })}
                    type="number" step="0.1" placeholder="e.g. 16.0"
                  />
                </Field>
                <Field label="Tread Depth at Removal (mm)" hint="Worn tread depth when removed">
                  <TextInput
                    {...register("treadDepthAtRemoval", { valueAsNumber: true })}
                    type="number" step="0.1" placeholder="e.g. 3.2 (legal minimum ~1.6mm)"
                  />
                </Field>
              </div>
            </div>

            {/* ── Section 6: Cost, Supplier, Dates ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cost, Supplier & Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Unit Cost per Tire (₦)">
                  <TextInput
                    {...register("unitCost", { valueAsNumber: true })}
                    type="number" step="0.01" placeholder="0.00"
                  />
                </Field>
                <Field label="Supplier">
                  <TextInput {...register("supplier")} placeholder="Supplier / tyre shop name" />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Purchase Date">
                  <TextInput {...register("purchaseDate")} type="date" />
                </Field>
                <Field label="Fitted Date">
                  <TextInput {...register("fittedDate")} type="date" />
                </Field>
                <Field label="Removed Date" hint="Fill when removed">
                  <TextInput {...register("removedDate")} type="date" />
                </Field>
              </div>
              <Field label="Notes" hint="Optional — retreading details, damage notes, etc.">
                <textarea
                  {...register("notes")} rows={2}
                  placeholder="Any notes about this tire…"
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none"
                />
              </Field>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pb-10">
              <button
                type="submit" disabled={loading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {loading ? "Saving…" : "Log Tire"}
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
