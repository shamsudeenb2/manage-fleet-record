// src/app/admin/maintenance/repairs/[id]/edit/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUSES   = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

// ─── Zod schema — mirrors UpdateRepairSchema on the API exactly ───────────────
// partsCost is intentionally excluded — it is a server-side rollup from Part[]
// and is NOT editable here. It is displayed read-only from the fetched repair.
const EditRepairSchema = z.object({
  vehicleId:     z.string().uuid("Select a vehicle"),
  driverId:      z.string().uuid().optional().nullable(),
  status:        z.enum(STATUSES),
  priority:      z.enum(PRIORITIES),
  faultDesc:     z.string().min(1, "Fault description is required"),
  repairDesc:    z.string().optional().nullable(),
  odometerKm:    z.number().int().nonnegative().optional().nullable(),
  laborCost:     z.number().nonnegative().optional().nullable(),
  garage:        z.string().optional().nullable(),
  garagePhone:   z.string().optional().nullable(),
  reportedDate:  z.string().min(1, "Required"),
  startedDate:   z.string().optional().nullable(),
  completedDate: z.string().optional().nullable(),
  notes:         z.string().optional().nullable(),
});

type FormValues = z.infer<typeof EditRepairSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────
type Vehicle = { id: string; plateNumber: string; cap_no: string };
type Driver   = { id: string; name: string };
type Part     = {
  id: string; name: string; partNumber?: string | null;
  category?: string | null; quantity: number;
  unitCost: number; totalCost: number;
};
type Repair   = {
  id: string; vehicleId: string; driverId?: string | null;
  status: string; priority: string;
  faultDesc: string; repairDesc?: string | null;
  odometerKm?: number | null;
  laborCost?: number | null; partsCost?: number | null; totalCost?: number | null;
  garage?: string | null; garagePhone?: string | null;
  reportedDate: string; startedDate?: string | null; completedDate?: string | null;
  notes?: string | null;
  parts: Part[];
  vehicle: Vehicle; driver?: Driver | null;
};

// ─── Status metadata ──────────────────────────────────────────────────────────
const STATUS_META: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  OPEN:        { label: "Open",        color: "text-zinc-300",  bg: "bg-zinc-800/60",   border: "border-zinc-700",   dot: "bg-zinc-400" },
  IN_PROGRESS: { label: "In Progress", color: "text-sky-300",   bg: "bg-sky-900/30",    border: "border-sky-700/60", dot: "bg-sky-400" },
  COMPLETED:   { label: "Completed",   color: "text-emerald-300", bg: "bg-emerald-900/20", border: "border-emerald-700/50", dot: "bg-emerald-400" },
  CANCELLED:   { label: "Cancelled",   color: "text-zinc-500",  bg: "bg-zinc-900/40",   border: "border-zinc-800",   dot: "bg-zinc-600" },
};

// ─── Priority metadata ────────────────────────────────────────────────────────
const PRIORITY_META: Record<string, { color: string; icon: string; desc: string }> = {
  LOW:      { color: "text-zinc-400",  icon: "●",  desc: "Schedule when convenient" },
  MEDIUM:   { color: "text-sky-400",   icon: "●",  desc: "Address within a few days" },
  HIGH:     { color: "text-amber-400", icon: "▲",  desc: "Address within 24 hours" },
  CRITICAL: { color: "text-red-400",   icon: "🚨", desc: "Immediate — vehicle off-road" },
};

// ─── Shared UI primitives (inline, no shadcn) ─────────────────────────────────
function Field({ label, error, children, hint, required }: {
  label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint  && !error && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {error &&           <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200
        placeholder-zinc-600 focus:outline-none transition-colors
        ${error
          ? "border-red-700/60 focus:border-red-500"
          : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}
    />
  );
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200
        focus:outline-none transition-colors appearance-none
        ${error
          ? "border-red-700/60 focus:border-red-500"
          : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}
    >
      {children}
    </select>
  );
}

function ReadField({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
      <div className={`w-full bg-[#0D1117]/60 border border-white/[0.04] rounded-lg px-3 py-2.5 text-xs font-mono font-bold
        ${accent ? "text-[#C8A96E]" : "text-zinc-400"}`}>
        {value}
      </div>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-white/[0.04] animate-pulse rounded-lg ${className}`} />;
}

// ─── toDateInput: convert ISO datetime string → "YYYY-MM-DD" for <input type="date"> ──
function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function EditRepairPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const repairId = params.id;

  const [fetching,  setFetching]  = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [repair,    setRepair]    = useState<Repair | null>(null);
  const [vehicles,  setVehicles]  = useState<Vehicle[]>([]);
  const [drivers,   setDrivers]   = useState<Driver[]>([]);
  const [notFound,  setNotFound]  = useState(false);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(EditRepairSchema) });

  const status    = watch("status");
  const priority  = watch("priority");
  const laborCost = watch("laborCost");

  // ── Derived read-only cost display ──────────────────────────────────────────
  const partsCost  = repair?.partsCost  ?? 0;
  const totalCostDisplay = ((laborCost ?? 0) + partsCost).toFixed(2);

  // ── Fetch repair + dropdowns in parallel ────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [repairRes, vRes, dRes] = await Promise.all([
          fetch(`/api/maintenance/repairs/${repairId}`),
          fetch("/api/vehicles?limit=200"),
          fetch("/api/auth/users/driver?limit=200"),
        ]);

        if (repairRes.status === 404) { setNotFound(true); return; }

        const [repairJson, vJson, dJson] = await Promise.all([
          repairRes.json(), vRes.json(), dRes.json(),
        ]);

        if (!repairRes.ok) { setNotFound(true); return; }

        const r: Repair = repairJson.repair;
        setRepair(r);
        if (vRes.ok) setVehicles(vJson.items ?? []);
        if (dRes.ok) setDrivers(dJson.items  ?? []);

        // Pre-fill every form field from the fetched repair
        reset({
          vehicleId:     r.vehicleId,
          driverId:      r.driverId      ?? null,
          status:        r.status        as any,
          priority:      r.priority      as any,
          faultDesc:     r.faultDesc,
          repairDesc:    r.repairDesc    ?? null,
          odometerKm:    r.odometerKm    ?? null,
          laborCost:     r.laborCost     ?? null,
          garage:        r.garage        ?? null,
          garagePhone:   r.garagePhone   ?? null,
          reportedDate:  toDateInput(r.reportedDate),
          startedDate:   toDateInput(r.startedDate),
          completedDate: toDateInput(r.completedDate),
          notes:         r.notes         ?? null,
        });
      } catch {
        toast.error("Failed to load repair");
      } finally {
        setFetching(false);
      }
    })();
  }, [repairId]);

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    setSaving(true);
    try {
      const res  = await fetch(`/api/maintenance/repairs/${repairId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Repair updated");
        // Update local repair so partsCost / parts stay in sync
        if (json.repair) setRepair(prev => ({ ...prev!, ...json.repair }));
        router.push("/maintenance/repairs");
        return;
      }
      toast.error(json?.message ?? "Failed to update repair");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setSaving(false);
    }
  }

  // ── Not found ────────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#0D1117] flex items-center justify-center" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="text-center space-y-3">
            <p className="text-4xl">🔧</p>
            <p className="text-zinc-300 text-sm font-bold">Repair not found</p>
            <p className="text-zinc-600 text-xs">It may have been deleted or never existed.</p>
            <button onClick={() => router.push("/maintenance/repairs")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#C8A96E] text-[#0D1117] text-xs font-bold">
              Back to Repairs
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ── Loading skeleton ─────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#0D1117]" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="border-b border-white/[0.06] px-6 py-4 max-w-3xl mx-auto flex items-center gap-4">
            <Skeleton className="w-6 h-6" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
            {[160, 140, 200, 160, 180].map((h, i) => (
              <Skeleton key={i} className={`w-full rounded-xl`}  /> //style={{ height: h }}
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const sm = STATUS_META[status] ?? STATUS_META.OPEN;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* ── Sticky header ───────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()}
              className="text-zinc-500 hover:text-white transition-colors text-lg leading-none">
              ←
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold tracking-wider truncate">Edit Repair</h1>
              <p className="text-[10px] text-zinc-500 mt-0.5 truncate">
                {repair?.vehicle?.plateNumber} · {repair?.vehicle?.cap_no}
              </p>
            </div>
            {/* Live status badge in header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${sm.color} ${sm.bg} ${sm.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${sm.dot} ${status === "IN_PROGRESS" ? "animate-pulse" : ""}`} />
                {sm.label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* ── Section 1: Status (primary action — top of page) ──────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Repair Status</h2>
                <span className="text-[10px] text-zinc-600">Tap to change</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STATUSES.map(s => {
                  const meta = STATUS_META[s];
                  const active = status === s;
                  return (
                    <button
                      key={s} type="button"
                      onClick={() => setValue("status", s, { shouldDirty: true })}
                      className={`relative py-3 px-2 rounded-xl border text-center transition-all duration-200
                        ${active
                          ? `${meta.border} ${meta.bg} ${meta.color}`
                          : "border-white/[0.06] text-zinc-600 hover:text-zinc-400 hover:border-white/20"}`}
                    >
                      {active && (
                        <motion.div
                          layoutId="status-highlight"
                          className="absolute inset-0 rounded-xl border border-[#C8A96E]/40 bg-[#C8A96E]/5"
                        />
                      )}
                      <div className="relative">
                        <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${active ? meta.dot : "bg-zinc-700"}
                          ${s === "IN_PROGRESS" && active ? "animate-pulse" : ""}`} />
                        <div className={`text-[10px] font-bold uppercase tracking-wider`}>
                          {s.replace("_", " ")}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Context hint based on status */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] text-zinc-600 border-t border-white/[0.04] pt-3"
                >
                  {status === "OPEN"        && "⏳ Repair reported — awaiting mechanic assignment."}
                  {status === "IN_PROGRESS" && "🔧 Work in progress. Started date will auto-set if not provided."}
                  {status === "COMPLETED"   && "✅ Repair complete. Completed date will auto-set if not provided."}
                  {status === "CANCELLED"   && "✕ Repair cancelled or written off."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Section 2: Priority ───────────────────────────────────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Priority</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRIORITIES.map(p => {
                  const meta  = PRIORITY_META[p];
                  const active = priority === p;
                  return (
                    <button
                      key={p} type="button"
                      onClick={() => setValue("priority", p, { shouldDirty: true })}
                      className={`p-3 rounded-xl border text-center transition-all
                        ${active
                          ? "border-[#C8A96E] bg-[#C8A96E]/10"
                          : "border-white/[0.06] hover:border-white/20"}`}
                    >
                      <div className={`text-base ${meta.color}`}>{meta.icon}</div>
                      <div className={`text-[10px] font-bold mt-1 uppercase tracking-wider
                        ${active ? "text-[#C8A96E]" : "text-zinc-400"}`}>
                        {p}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-0.5 leading-tight">{meta.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Section 3: Vehicle & Driver ───────────────────────────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Vehicle & Driver</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vehicle" error={(errors.vehicleId as any)?.message} required>
                  <SelectInput {...register("vehicleId")} error={!!errors.vehicleId}>
                    <option value="">— Select vehicle —</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.plateNumber} · {v.cap_no}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Driver Reporting" hint="Optional — driver who reported the fault">
                  <SelectInput {...register("driverId")}>
                    <option value="">— None —</option>
                    {drivers.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </SelectInput>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Reported Date" required error={(errors.reportedDate as any)?.message}>
                  <TextInput {...register("reportedDate")} type="date" error={!!errors.reportedDate} />
                </Field>
                <Field label="Odometer at Breakdown (km)">
                  <TextInput
                    {...register("odometerKm", { valueAsNumber: true })}
                    type="number" placeholder="km reading"
                  />
                </Field>
              </div>
            </div>

            {/* ── Section 4: Fault & Repair Details ────────────────────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Fault & Repair Details</h2>
              <Field
                label="Fault Description" required
                error={(errors.faultDesc as any)?.message}
                hint="What failed — as reported by driver"
              >
                <textarea
                  {...register("faultDesc")}
                  rows={3}
                  placeholder="e.g. Engine overheating, brake failure, burst tyre…"
                  className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200
                    placeholder-zinc-600 focus:outline-none transition-colors resize-none
                    ${errors.faultDesc ? "border-red-700/60" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}
                />
              </Field>
              <Field label="Repair Description" hint="What was done to fix it — fill when completing the repair">
                <textarea
                  {...register("repairDesc")}
                  rows={3}
                  placeholder="e.g. Replaced radiator hose, bled brake lines, fitted new pads…"
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs
                    text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none"
                />
              </Field>
            </div>

            {/* ── Section 5: Timeline ───────────────────────────────────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Timeline</h2>
                <span className="text-[10px] text-zinc-600">Started & completed auto-set on status change</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Reported Date" required error={(errors.reportedDate as any)?.message}>
                  <TextInput {...register("reportedDate")} type="date" error={!!errors.reportedDate} />
                </Field>
                <Field label="Started Date" hint="When mechanic began">
                  <TextInput {...register("startedDate")} type="date" />
                </Field>
                <Field label="Completed Date" hint="When repair finished">
                  <TextInput {...register("completedDate")} type="date" />
                </Field>
              </div>
            </div>

            {/* ── Section 6: Cost & Garage ──────────────────────────────── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Cost & Garage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Labour Cost (₦)">
                  <TextInput
                    {...register("laborCost", { valueAsNumber: true })}
                    type="number" step="0.01" placeholder="0.00"
                  />
                </Field>
                <ReadField
                  label="Parts Cost (₦)"
                  value={`₦${partsCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
                />
                <ReadField
                  label="Total Cost (₦)"
                  value={`₦${Number(totalCostDisplay).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
                  accent
                />
              </div>

              {/* Parts cost hint */}
              <p className="text-[10px] text-zinc-600 border-t border-white/[0.04] pt-3">
                Parts cost is auto-computed from logged parts and cannot be edited directly.
                {repair?.parts?.length
                  ? ` (${repair.parts.length} part${repair.parts.length !== 1 ? "s" : ""} logged)`
                  : " No parts logged yet."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Garage / Workshop">
                  <TextInput {...register("garage")} placeholder="Workshop name" />
                </Field>
                <Field label="Garage Phone">
                  <TextInput {...register("garagePhone")} type="tel" placeholder="+234…" />
                </Field>
              </div>

              <Field label="Notes">
                <textarea
                  {...register("notes")}
                  rows={2}
                  placeholder="Any additional notes…"
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs
                    text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none"
                />
              </Field>
            </div>

            {/* ── Section 7: Linked Parts (read-only) ───────────────────── */}
            {repair?.parts && repair.parts.length > 0 && (
              <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Linked Parts</h2>
                  <span className="text-[10px] text-zinc-600">{repair.parts.length} part{repair.parts.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-2">
                  {repair.parts.map((part, i) => (
                    <motion.div
                      key={part.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between bg-[#0D1117]/60 border border-white/[0.04]
                        rounded-lg px-3 py-2.5 gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-zinc-200 font-medium truncate">{part.name}</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">
                          {part.category && <span className="mr-2">{part.category}</span>}
                          {part.partNumber && <span className="text-zinc-700">#{part.partNumber}</span>}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-zinc-400">
                          {part.quantity} × ₦{part.unitCost.toLocaleString("en-NG")}
                        </p>
                        <p className="text-[10px] text-[#C8A96E] font-bold">
                          ₦{part.totalCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Actions ───────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-10">
              <button
                type="submit"
                disabled={saving || !isDirty}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold
                  hover:bg-[#d4b880] transition-colors disabled:opacity-40 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                )}
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400
                  hover:text-white transition-colors"
              >
                Cancel
              </button>
              {!isDirty && (
                <span className="text-[10px] text-zinc-600 ml-1">No changes yet</span>
              )}
            </div>

          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
