// src/app/admin/maintenance/services/[id]/edit/page.tsx
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
const SERVICE_TYPES = [
  "OIL_CHANGE", "PERIODIC_INSPECTION", "AIR_FILTER",
  "FULL_SERVICE", "GENERATOR", "OTHER",
] as const;

const SERVICE_STATUSES = ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

const TYPE_META: Record<string, { label: string; icon: string; desc: string }> = {
  OIL_CHANGE:          { label: "Oil Change",   icon: "🛢️", desc: "Engine oil & filter replacement" },
  PERIODIC_INSPECTION: { label: "Inspection",   icon: "🔍", desc: "Scheduled vehicle inspection" },
  AIR_FILTER:          { label: "Air Filter",   icon: "💨", desc: "Air filter cleaning or replacement" },
  FULL_SERVICE:        { label: "Full Service", icon: "🔧", desc: "Comprehensive maintenance service" },
  GENERATOR:           { label: "Generator",    icon: "⚡", desc: "Generator service / maintenance" },
  OTHER:               { label: "Other",        icon: "📋", desc: "Other maintenance work" },
};

const STATUS_META: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  SCHEDULED:   { label: "Scheduled",   color: "text-amber-300",   bg: "bg-amber-50",   border: "border-amber-700/50",   dot: "bg-amber-400" },
  IN_PROGRESS: { label: "In Progress", color: "text-sky-300",     bg: "bg-sky-50",     border: "border-sky-700/60",     dot: "bg-sky-400" },
  COMPLETED:   { label: "Completed",   color: "text-emerald-300", bg: "bg-emerald-50", border: "border-emerald-700/50", dot: "bg-emerald-400" },
  CANCELLED:   { label: "Cancelled",   color: "text-[#9C9590]",    bg: "bg-zinc-100",    border: "border-zinc-800",       dot: "bg-zinc-600" },
};

// ─── Zod schema — mirrors UpdateServiceSchema on the API ─────────────────────
const EditServiceSchema = z.object({
  vehicleId:       z.string().uuid("Select a vehicle"),
  driverId:        z.string().uuid().optional().nullable(),
  serviceType:     z.enum(SERVICE_TYPES),
  status:          z.enum(SERVICE_STATUSES),
  description:     z.string().optional().nullable(),
  odometerKm:      z.number().int().nonnegative().optional().nullable(),
  nextServiceKm:   z.number().int().nonnegative().optional().nullable(),
  nextServiceDate: z.string().optional().nullable(),
  laborCost:       z.number().nonnegative().optional().nullable(),
  partsCost:       z.number().nonnegative().optional().nullable(),
  garage:          z.string().optional().nullable(),
  garagePhone:     z.string().optional().nullable(),
  scheduledDate:   z.string().optional().nullable(),
  completedDate:   z.string().optional().nullable(),
  notes:           z.string().optional().nullable(),
});

type FormValues = z.infer<typeof EditServiceSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────
type Vehicle = { id: string; plateNumber: string; cap_no: string; currentOdo?: number | null };
type Driver  = { id: string; name: string };
type Service = {
  id: string;
  vehicleId: string;
  driverId?: string | null;
  serviceType: string;
  status: string;
  description?: string | null;
  odometerKm?: number | null;
  nextServiceKm?: number | null;
  nextServiceDate?: string | null;
  laborCost?: number | null;
  partsCost?: number | null;
  totalCost?: number | null;
  garage?: string | null;
  garagePhone?: string | null;
  scheduledDate?: string | null;
  completedDate?: string | null;
  notes?: string | null;
  vehicle: Vehicle;
  driver?: Driver | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────
function Field({ label, error, children, hint, required }: {
  label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9C9590]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint  && !error && <p className="text-[10px] text-[#9C9590]">{hint}</p>}
      {error &&           <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#F8F6F1] border rounded-lg px-3 py-2.5 text-xs text-[#1C1917]
        placeholder-[#B0AAA4] focus:outline-none transition-colors
        ${error
          ? "border-red-700/60 focus:border-red-500"
          : "border-[#E8E2D9] focus:border-[#B8860B]/50"}`}
    />
  );
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={`w-full bg-[#F8F6F1] border rounded-lg px-3 py-2.5 text-xs text-[#1C1917]
        focus:outline-none transition-colors appearance-none
        ${error
          ? "border-red-700/60 focus:border-red-500"
          : "border-[#E8E2D9] focus:border-[#B8860B]/50"}`}
    >
      {children}
    </select>
  );
}

function ReadField({ label, value, accent, sub }: {
  label: string; value: string; accent?: boolean; sub?: string;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C9590]">{label}</p>
      <div className={`w-full bg-[#F8F6F1]/60 border border-[#EDE8E0] rounded-lg px-3 py-2.5 text-xs font-mono font-bold
        ${accent ? "text-[#B8860B]" : "text-[#6B6560]"}`}>
        {value}
      </div>
      {sub && <p className="text-[10px] text-[#9C9590]">{sub}</p>}
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-[#EBEBEB] animate-pulse rounded-lg ${className}`} />;
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function EditServicePage() {
  const router    = useRouter();
  const params    = useParams<{ id: string }>();
  const serviceId = params.id;

  const [fetching,  setFetching]  = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [service,   setService]   = useState<Service | null>(null);
  const [vehicles,  setVehicles]  = useState<Vehicle[]>([]);
  const [drivers,   setDrivers]   = useState<Driver[]>([]);
  const [notFound,  setNotFound]  = useState(false);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(EditServiceSchema) });

  const status      = watch("status");
  const serviceType = watch("serviceType");
  const laborCost   = watch("laborCost");
  const partsCost   = watch("partsCost");
  const vehicleId   = watch("vehicleId");

  // Live-computed total — display only, server re-derives on save
  const totalCostDisplay = ((laborCost ?? 0) + (partsCost ?? 0)).toFixed(2);

  // Auto-fill odometer when vehicle selection changes
  useEffect(() => {
    const v = vehicles.find((v) => v.id === vehicleId);
    if (v?.currentOdo != null) {
      setValue("odometerKm", v.currentOdo, { shouldDirty: false });
    }
  }, [vehicleId, vehicles]);

  // ── Fetch service + dropdowns in parallel ───────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [svcRes, vRes, dRes] = await Promise.all([
          fetch(`/api/maintenance/services/${serviceId}`),
          fetch("/api/vehicles?limit=200"),
          fetch("/api/auth/users/driver?limit=200"),
        ]);

        if (svcRes.status === 404) { setNotFound(true); return; }

        const [svcJson, vJson, dJson] = await Promise.all([
          svcRes.json(), vRes.json(), dRes.json(),
        ]);

        if (!svcRes.ok) { setNotFound(true); return; }

        const s: Service = svcJson.service;
        setService(s);
        if (vRes.ok) setVehicles(vJson.items ?? []);
        if (dRes.ok) setDrivers(dJson.items  ?? []);

        // Pre-fill every form field from the fetched service
        reset({
          vehicleId:       s.vehicleId,
          driverId:        s.driverId        ?? null,
          serviceType:     s.serviceType     as any,
          status:          s.status          as any,
          description:     s.description     ?? null,
          odometerKm:      s.odometerKm      ?? null,
          nextServiceKm:   s.nextServiceKm   ?? null,
          nextServiceDate: toDateInput(s.nextServiceDate),
          laborCost:       s.laborCost       ?? null,
          partsCost:       s.partsCost       ?? null,
          garage:          s.garage          ?? null,
          garagePhone:     s.garagePhone     ?? null,
          scheduledDate:   toDateInput(s.scheduledDate),
          completedDate:   toDateInput(s.completedDate),
          notes:           s.notes           ?? null,
        });
      } catch {
        toast.error("Failed to load service");
      } finally {
        setFetching(false);
      }
    })();
  }, [serviceId]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    setSaving(true);
    try {
      const res  = await fetch(`/api/maintenance/services/${serviceId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Service updated");
        if (json.service) setService(prev => ({ ...prev!, ...json.service }));
        router.push("/maintenance/services");
        return;
      }
      toast.error(json?.message ?? "Failed to update service");
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
        <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center"
          style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="text-center space-y-3">
            <p className="text-4xl">⚙️</p>
            <p className="text-[#2C2825] text-sm font-bold">Service not found</p>
            <p className="text-[#9C9590] text-xs">It may have been deleted or never existed.</p>
            <button onClick={() => router.push("/maintenance/services")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#B8860B] text-[#1C1917] text-xs font-bold">
              Back to Services
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
        <div className="min-h-screen bg-[#F8F6F1]" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="border-b border-[#E8E2D9] px-6 py-4 max-w-3xl mx-auto flex items-center gap-4">
            <Skeleton className="w-6 h-6" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
            {[160, 200, 160, 180, 180, 160].map((h, i) => (
              <Skeleton key={i} className="w-full rounded-xl"  />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const sm = STATUS_META[status] ?? STATUS_META.SCHEDULED;
  const wasCompleted = service?.status === "COMPLETED";

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#F8F6F1] text-[#1C1917]"
        style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* ── Sticky header ───────────────────────────────────────────────── */}
        <div className="border-b border-[#E8E2D9] bg-[#F8F6F1]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()}
              className="text-[#9C9590] hover:text-[#1C1917] transition-colors text-lg leading-none">
              ←
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold tracking-wider truncate">Edit Service</h1>
              <p className="text-[10px] text-[#9C9590] mt-0.5 truncate">
                {service?.vehicle?.plateNumber} · {service?.vehicle?.cap_no}
                {service?.serviceType && (
                  <span className="ml-2">· {TYPE_META[service.serviceType]?.label ?? service.serviceType}</span>
                )}
              </p>
            </div>
            {/* Live status badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider
                  ${sm.color} ${sm.bg} ${sm.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}
                  ${status === "IN_PROGRESS" ? "animate-pulse" : ""}`}/>
                {sm.label}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Completed vehicle-mirror notice ─────────────────────────────── */}
        {wasCompleted && (
          <div className="max-w-3xl mx-auto px-6 pt-5">
            <div className="bg-emerald-900/10 border border-emerald-700/30 rounded-xl px-4 py-3 flex items-start gap-3">
              <span className="text-emerald-400 text-base mt-0.5">✅</span>
              <div>
                <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Service already completed
                </p>
                <p className="text-[10px] text-[#9C9590] mt-0.5">
                  Odometer, next service date and next service km were mirrored to the vehicle
                  when this service was marked complete. Editing these fields now will update
                  the service record but will NOT re-mirror to the vehicle automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 py-6">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* ── Section 1: Status (primary action — top of page) ──────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Service Status</h2>
                <span className="text-[10px] text-[#9C9590]">Tap to change</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICE_STATUSES.map((s) => {
                  const meta   = STATUS_META[s];
                  const active = status === s;
                  return (
                    <button
                      key={s} type="button"
                      onClick={() => setValue("status", s, { shouldDirty: true })}
                      className={`relative py-3 px-2 rounded-xl border text-center transition-all duration-200
                        ${active
                          ? `${meta.border} ${meta.bg} ${meta.color}`
                          : "border-[#E8E2D9] text-[#9C9590] hover:text-[#6B6560] hover:border-[#B8860B]/30"}`}
                    >
                      {active && (
                        <motion.div
                          layoutId="service-status-highlight"
                          className="absolute inset-0 rounded-xl border border-[#B8860B]/40 bg-[#B8860B]/5"
                        />
                      )}
                      <div className="relative">
                        <div className={`w-2 h-2 rounded-full mx-auto mb-1.5
                          ${active ? meta.dot : "bg-zinc-700"}
                          ${s === "IN_PROGRESS" && active ? "animate-pulse" : ""}`}/>
                        <div className="text-[10px] font-bold uppercase tracking-wider">
                          {s.replace(/_/g, " ")}
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
                  className="text-[10px] text-[#9C9590] border-t border-[#EDE8E0] pt-3"
                >
                  {status === "SCHEDULED"   && "📅 Service is planned — vehicle can remain in operation."}
                  {status === "IN_PROGRESS" && "🔧 Service underway. Vehicle may be off-road."}
                  {status === "COMPLETED"   && "✅ Service done. Completed date auto-set if not provided. Odometer & next service km will be mirrored to the vehicle."}
                  {status === "CANCELLED"   && "✕ Service cancelled or no longer required."}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Section 2: Service Type ───────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Service Type</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_TYPES.map((t) => (
                  <button
                    key={t} type="button"
                    onClick={() => setValue("serviceType", t, { shouldDirty: true })}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all
                      ${serviceType === t
                        ? "border-[#B8860B] bg-[#B8860B]/10"
                        : "border-[#E8E2D9] hover:border-[#B8860B]/30"}`}
                  >
                    <span className="text-xl">{TYPE_META[t].icon}</span>
                    <div>
                      <div className={`text-xs font-bold ${serviceType === t ? "text-[#B8860B]" : "text-[#2C2825]"}`}>
                        {TYPE_META[t].label}
                      </div>
                      <div className="text-[10px] text-[#9C9590] mt-0.5">{TYPE_META[t].desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <Field label="Description" hint="Additional details about this service">
                <textarea
                  {...register("description")}
                  rows={2}
                  placeholder={`Details about this ${TYPE_META[serviceType]?.label ?? "service"}…`}
                  className="w-full bg-[#F8F6F1] border border-[#E8E2D9] rounded-lg px-3 py-2.5 text-xs
                    text-[#1C1917] placeholder-[#B0AAA4] focus:outline-none focus:border-[#B8860B]/50 resize-none"
                />
              </Field>
            </div>

            {/* ── Section 3: Vehicle & Driver ───────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Vehicle & Driver</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vehicle" required error={(errors.vehicleId as any)?.message}>
                  <SelectInput {...register("vehicleId")} error={!!errors.vehicleId}>
                    <option value="">— Select vehicle —</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>{v.plateNumber} · {v.cap_no}</option>
                    ))}
                  </SelectInput>
                </Field>
                <Field label="Driver / Supervisor" hint="Optional — driver present at service">
                  <SelectInput {...register("driverId")}>
                    <option value="">— None —</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </SelectInput>
                </Field>
              </div>
            </div>

            {/* ── Section 4: Odometer & Next Service ───────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Odometer & Next Service</h2>
                {status === "COMPLETED" && (
                  <span className="text-[10px] text-emerald-400/70 font-bold">
                    ↗ Will mirror to vehicle on save
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Odometer at Service (km)" hint="Auto-filled from selected vehicle">
                  <TextInput
                    {...register("odometerKm", { valueAsNumber: true })}
                    type="number" placeholder="Current km reading"
                  />
                </Field>
                <Field label="Next Service at (km)" hint="Odometer reading for next service">
                  <TextInput
                    {...register("nextServiceKm", { valueAsNumber: true })}
                    type="number" placeholder="e.g. 250000"
                  />
                </Field>
                <Field label="Next Service Date" hint="Date-based service reminder">
                  <TextInput {...register("nextServiceDate")} type="date" />
                </Field>
              </div>
            </div>

            {/* ── Section 5: Schedule & Timeline ───────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Schedule & Timeline</h2>
                <span className="text-[10px] text-[#9C9590]">Completed date auto-set on status → Completed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Scheduled Date">
                  <TextInput {...register("scheduledDate")} type="date" />
                </Field>
                <Field label="Completed Date" hint="When service was finished">
                  <TextInput {...register("completedDate")} type="date" />
                </Field>
              </div>
            </div>

            {/* ── Section 6: Cost & Garage ──────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Cost & Garage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Labour Cost (₦)">
                  <TextInput
                    {...register("laborCost", { valueAsNumber: true })}
                    type="number" step="0.01" placeholder="0.00"
                  />
                </Field>
                <Field label="Parts Cost (₦)" hint="Parts used in this service">
                  <TextInput
                    {...register("partsCost", { valueAsNumber: true })}
                    type="number" step="0.01" placeholder="0.00"
                  />
                </Field>
                <ReadField
                  label="Total Cost (₦)"
                  value={`₦${Number(totalCostDisplay).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
                  accent
                  sub="Auto-computed: labour + parts"
                />
              </div>

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
                  className="w-full bg-[#F8F6F1] border border-[#E8E2D9] rounded-lg px-3 py-2.5 text-xs
                    text-[#1C1917] placeholder-[#B0AAA4] focus:outline-none focus:border-[#B8860B]/50 resize-none"
                />
              </Field>
            </div>

            {/* ── Actions ───────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-10">
              <button
                type="submit"
                disabled={saving || !isDirty}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#B8860B] text-[#1C1917] font-bold
                  hover:bg-[#C9960D] transition-colors disabled:opacity-40 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                )}
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-[#E8E2D9] text-[#6B6560]
                  hover:text-[#1C1917] transition-colors"
              >
                Cancel
              </button>
              {!isDirty && (
                <span className="text-[10px] text-[#9C9590] ml-1">No changes yet</span>
              )}
            </div>

          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
