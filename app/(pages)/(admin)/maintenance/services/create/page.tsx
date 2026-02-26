// src/app/admin/maintenance/services/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const SERVICE_TYPES = ["OIL_CHANGE", "PERIODIC_INSPECTION", "AIR_FILTER", "FULL_SERVICE", "GENERATOR", "OTHER"] as const;
const SERVICE_STATUSES = ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

const ServiceSchema = z.object({
  vehicleId:       z.string().uuid("Select a vehicle"),
  driverId:        z.uuid().optional(),
  serviceType:     z.enum(SERVICE_TYPES),
  status:          z.enum(SERVICE_STATUSES),
  description:     z.string().optional().nullable(),
  odometerKm:      z.number().int().nonnegative().optional().nullable(),
  nextServiceKm:   z.number().int().nonnegative().optional().nullable(),
  nextServiceDate: z.string().optional().nullable(),
  laborCost:       z.number().nonnegative().optional().nullable(),
  partsCost:       z.number().nonnegative().optional().nullable(),
  totalCost:       z.number().nonnegative().optional().nullable(),
  garage:          z.string().optional().nullable(),
  garagePhone:     z.string().optional().nullable(),
  scheduledDate:   z.string().optional().nullable(),
  completedDate:   z.string().optional().nullable(),
  notes:           z.string().optional().nullable(),
});

type FormValues = z.infer<typeof ServiceSchema>;
type Vehicle = { id: string; plateNumber: string; cap_no: string; currentOdo?: number | null };
type Driver  = { id: string; name: string };

const TYPE_META: Record<string, { label: string; icon: string; desc: string }> = {
  OIL_CHANGE:          { label: "Oil Change",   icon: "🛢️", desc: "Engine oil & filter replacement" },
  PERIODIC_INSPECTION: { label: "Inspection",   icon: "🔍", desc: "Scheduled vehicle inspection" },
  AIR_FILTER:          { label: "Air Filter",   icon: "💨", desc: "Air filter cleaning or replacement" },
  FULL_SERVICE:        { label: "Full Service", icon: "🔧", desc: "Comprehensive maintenance service" },
  GENERATOR:           { label: "Generator",    icon: "⚡", desc: "Generator service / maintenance" },
  OTHER:               { label: "Other",        icon: "📋", desc: "Other maintenance work" },
};

function Field({ label, error, children, hint, required }: { label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children}
      {hint && !error && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`} />;
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return <select {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 focus:outline-none transition-colors appearance-none ${error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}>{children}</select>;
}

export default function CreateServicePage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers]   = useState<Driver[]>([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: { serviceType: "OIL_CHANGE", status: "COMPLETED", scheduledDate: new Date().toISOString().slice(0, 10) },
  });

  const serviceType = watch("serviceType");
  const laborCost   = watch("laborCost");
  const partsCost   = watch("partsCost");
  const vehicleId   = watch("vehicleId");
  const status      = watch("status");

  // Auto-compute totalCost
  useEffect(() => {
    const total = (laborCost ?? 0) + (partsCost ?? 0);
    setValue("totalCost", +total.toFixed(2));
  }, [laborCost, partsCost]);

  // Auto-fill odometer from selected vehicle
  useEffect(() => {
    const v = vehicles.find(v => v.id === vehicleId);
    if (v?.currentOdo) setValue("odometerKm", v.currentOdo);
  }, [vehicleId, vehicles]);

  useEffect(() => {
    (async () => {
      try {
        const [vRes, dRes] = await Promise.all([fetch("/api/vehicles?limit=200"), fetch("/api/auth/users/driver?limit=200")]);
        const [vJson, dJson] = await Promise.all([vRes.json(), dRes.json()]);
        if (vRes.ok) setVehicles(vJson.items ?? []);
        if (dRes.ok) setDrivers(dJson.items ?? []);
      } catch { /* non-critical */ }
    })();
  }, []);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res  = await fetch("/api/maintenance/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) { toast.success("Service logged"); router.push("/maintenance/services"); return; }
      toast.error(json?.message ?? "Failed to create service");
    } catch (err: any) { toast.error(err?.message ?? "Server error"); }
    finally { setLoading(false); }
  }

  const totalCost = (laborCost ?? 0) + (partsCost ?? 0);

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div><h1 className="text-base font-bold tracking-wider">Log Service</h1><p className="text-xs text-zinc-500 mt-0.5">Record a planned or completed maintenance service</p></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Section 1: Vehicle & Driver */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vehicle & Driver</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vehicle" error={(errors.vehicleId as any)?.message} required>
                  <SelectInput {...register("vehicleId")} error={!!errors.vehicleId}>
                    <option value="">— Select vehicle —</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.plateNumber} · {v.cap_no}</option>)}
                  </SelectInput>
                </Field>
                <Field label="Driver" hint="Optional — driver present at service">
                  <SelectInput {...register("driverId")}>
                    <option value="">— None —</option>
                    {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </SelectInput>
                </Field>
              </div>
            </div>

            {/* Section 2: Service type picker */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Service Type</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_TYPES.map(t => (
                  <button key={t} type="button" onClick={() => setValue("serviceType", t, { shouldDirty: true })}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${serviceType === t ? "border-[#C8A96E] bg-[#C8A96E]/10" : "border-white/[0.06] hover:border-white/20"}`}>
                    <span className="text-xl">{TYPE_META[t].icon}</span>
                    <div>
                      <div className={`text-xs font-bold ${serviceType === t ? "text-[#C8A96E]" : "text-zinc-300"}`}>{TYPE_META[t].label}</div>
                      <div className="text-[10px] text-zinc-600 mt-0.5">{TYPE_META[t].desc}</div>
                    </div>
                  </button>
                ))}
              </div>
              <Field label="Description" hint="Additional details about this service">
                <textarea {...register("description")} rows={2} placeholder={`Details about this ${TYPE_META[serviceType]?.label ?? "service"}…`}
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none" />
              </Field>
            </div>

            {/* Section 3: Status & Dates */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Status & Schedule</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SERVICE_STATUSES.map(s => (
                  <button key={s} type="button" onClick={() => setValue("status", s, { shouldDirty: true })}
                    className={`py-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all ${status === s ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#C8A96E]" : "border-white/[0.06] text-zinc-600 hover:text-zinc-300 hover:border-white/20"}`}>
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Scheduled Date">
                  <TextInput {...register("scheduledDate")} type="date" />
                </Field>
                <Field label="Completed Date" hint="Fill when service is done">
                  <TextInput {...register("completedDate")} type="date" />
                </Field>
              </div>
            </div>

            {/* Section 4: Odometer & Next Service */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Odometer & Next Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Odometer at Service (km)" hint="Auto-filled from vehicle">
                  <TextInput {...register("odometerKm", { valueAsNumber: true })} type="number" placeholder="Current km" />
                </Field>
                <Field label="Next Service at (km)" hint="Odometer reading for next due">
                  <TextInput {...register("nextServiceKm", { valueAsNumber: true })} type="number" placeholder="e.g. 50000" />
                </Field>
                <Field label="Next Service Date" hint="Date-based reminder">
                  <TextInput {...register("nextServiceDate")} type="date" />
                </Field>
              </div>
            </div>

            {/* Section 5: Cost & Garage */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cost & Garage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Labour Cost (₦)">
                  <TextInput {...register("laborCost", { valueAsNumber: true })} type="number" step="0.01" placeholder="0.00" />
                </Field>
                <Field label="Parts Cost (₦)" hint="Manual entry or from parts log">
                  <TextInput {...register("partsCost", { valueAsNumber: true })} type="number" step="0.01" placeholder="0.00" />
                </Field>
                <Field label="Total Cost (₦)" hint="Auto-computed">
                  <div className="w-full bg-[#0D1117]/60 border border-white/[0.04] rounded-lg px-3 py-2.5 text-xs font-mono text-[#C8A96E] font-bold">
                    ₦{totalCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </div>
                  <input type="hidden" {...register("totalCost", { valueAsNumber: true })} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Garage / Workshop">
                  <TextInput {...register("garage")} placeholder="Workshop name" />
                </Field>
                <Field label="Garage Phone">
                  <TextInput {...register("garagePhone")} type="tel" placeholder="+234…" />
                </Field>
              </div>
              <Field label="Notes" hint="Optional">
                <textarea {...register("notes")} rows={2} placeholder="Any additional notes…" className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none" />
              </Field>
            </div>

            <div className="flex items-center gap-3 pb-10">
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {loading ? "Saving…" : "Log Service"}
              </button>
              <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white transition-colors">Cancel</button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
