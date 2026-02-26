// src/app/admin/maintenance/repairs/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const STATUSES   = ["OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

const RepairSchema = z.object({
  vehicleId:    z.string().uuid("Select a vehicle"),
  driverId:     z.string().uuid().optional().nullable(),
  status:       z.enum(STATUSES),
  priority:     z.enum(PRIORITIES),
  faultDesc:    z.string().min(1, "Fault description is required"),
  repairDesc:   z.string().optional().nullable(),
  odometerKm:   z.number().int().nonnegative().optional().nullable(),
  laborCost:    z.number().nonnegative().optional().nullable(),
  partsCost:    z.number().nonnegative().optional().nullable(),
  totalCost:    z.number().nonnegative().optional().nullable(),
  garage:       z.string().optional().nullable(),
  garagePhone:  z.string().optional().nullable(),
  reportedDate: z.string().min(1, "Required"),
  startedDate:  z.string().optional().nullable(),
  completedDate:z.string().optional().nullable(),
  notes:        z.string().optional().nullable(),
});

type FormValues = z.infer<typeof RepairSchema>;
type Vehicle = { id: string; plateNumber: string; cap_no: string; currentOdo?: number | null };
type Driver  = { id: string; name: string };

const PRIORITY_META: Record<string, { color: string; icon: string; desc: string }> = {
  LOW:      { color: "text-zinc-400",   icon: "●",  desc: "Non-urgent, schedule when convenient" },
  MEDIUM:   { color: "text-sky-400",    icon: "●",  desc: "Address within a few days" },
  HIGH:     { color: "text-amber-400",  icon: "▲",  desc: "Address within 24 hours" },
  CRITICAL: { color: "text-red-400",    icon: "🚨", desc: "Immediate — vehicle off-road" },
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

export default function CreateRepairPage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers]   = useState<Driver[]>([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(RepairSchema),
    defaultValues: { status: "OPEN", priority: "MEDIUM", reportedDate: new Date().toISOString().slice(0, 10) },
  });

  const priority  = watch("priority");
  const status    = watch("status");
  const vehicleId = watch("vehicleId");
  const laborCost = watch("laborCost");
  const partsCost = watch("partsCost");

  useEffect(() => {
    const total = (laborCost ?? 0) + (partsCost ?? 0);
    setValue("totalCost", +total.toFixed(2));
  }, [laborCost, partsCost]);

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
      const res  = await fetch("/api/maintenance/repairs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) { toast.success("Repair logged"); router.push("/maintenance/repairs"); return; }
      toast.error(json?.message ?? "Failed to create repair");
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
            <div><h1 className="text-base font-bold tracking-wider">Log Repair</h1><p className="text-xs text-zinc-500 mt-0.5">Report a fault or breakdown repair</p></div>
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
                <Field label="Driver Reporting" hint="Optional — driver who reported the fault">
                  <SelectInput {...register("driverId")}>
                    <option value="">— None —</option>
                    {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </SelectInput>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Reported Date" required error={(errors.reportedDate as any)?.message}>
                  <TextInput {...register("reportedDate")} type="date" error={!!errors.reportedDate} />
                </Field>
                <Field label="Odometer at Breakdown (km)" hint="Auto-filled from vehicle">
                  <TextInput {...register("odometerKm", { valueAsNumber: true })} type="number" placeholder="km reading" />
                </Field>
              </div>
            </div>

            {/* Section 2: Priority */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Priority</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRIORITIES.map(p => (
                  <button key={p} type="button" onClick={() => setValue("priority", p, { shouldDirty: true })}
                    className={`p-3 rounded-xl border text-center transition-all ${priority === p ? "border-[#C8A96E] bg-[#C8A96E]/10" : "border-white/[0.06] hover:border-white/20"}`}>
                    <div className={`text-lg ${PRIORITY_META[p].color}`}>{PRIORITY_META[p].icon}</div>
                    <div className={`text-xs font-bold mt-1 ${priority === p ? "text-[#C8A96E]" : "text-zinc-400"}`}>{p}</div>
                    <div className="text-[10px] text-zinc-600 mt-0.5 leading-tight">{PRIORITY_META[p].desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: Fault & Repair */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fault & Repair Details</h2>
              <Field label="Fault Description" error={(errors.faultDesc as any)?.message} required hint="What failed or broke — as reported by driver">
                <textarea {...register("faultDesc")} rows={3} placeholder="e.g. Engine overheating, brake failure, burst tyre…"
                  className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors resize-none ${errors.faultDesc ? "border-red-700/60" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`} />
              </Field>
              <Field label="Repair Description" hint="What was done to fix it — fill when repair is completed">
                <textarea {...register("repairDesc")} rows={2} placeholder="e.g. Replaced radiator hose, bled brake lines…"
                  className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none" />
              </Field>
            </div>

            {/* Section 4: Status & Dates */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Status & Timeline</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STATUSES.map(s => (
                  <button key={s} type="button" onClick={() => setValue("status", s, { shouldDirty: true })}
                    className={`py-2 px-3 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all ${status === s ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#C8A96E]" : "border-white/[0.06] text-zinc-600 hover:text-zinc-300 hover:border-white/20"}`}>
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Started Date" hint="When mechanic began work">
                  <TextInput {...register("startedDate")} type="date" />
                </Field>
                <Field label="Completed Date" hint="When repair was finished">
                  <TextInput {...register("completedDate")} type="date" />
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
                <Field label="Parts Cost (₦)" hint="From parts log or manual entry">
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
              <Field label="Notes">
                <textarea {...register("notes")} rows={2} placeholder="Any additional notes…" className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none" />
              </Field>
            </div>

            <div className="flex items-center gap-3 pb-10">
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {loading ? "Saving…" : "Log Repair"}
              </button>
              <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white transition-colors">Cancel</button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
