// src/app/admin/maintenance/parts/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const CATEGORIES = ["Engine", "Brakes", "Electrical", "Tyres", "Suspension", "Body", "Other"] as const;

const PartSchema = z.object({
  vehicleId:      z.string().uuid("Select a vehicle"),
  repairId:       z.string().uuid().optional().nullable(),
  name:           z.string().min(1, "Part name is required"),
  partNumber:     z.string().optional().nullable(),
  category:       z.enum(CATEGORIES),
  quantity:       z.number().int().positive("Must be ≥ 1"),
  unitCost:       z.number().nonnegative("Required"),
  totalCost:      z.number().nonnegative(),  // server-computed
  supplier:       z.string().optional().nullable(),
  supplierPhone:  z.string().optional().nullable(),
  purchaseDate:   z.string().optional().nullable(),
  fittedDate:     z.string().optional().nullable(),
  warrantyExpiry: z.string().optional().nullable(),
  notes:          z.string().optional().nullable(),
});

type FormValues = z.infer<typeof PartSchema>;
type Vehicle = { id: string; plateNumber: string; cap_no: string };
type Repair  = { id: string; faultDesc: string; vehicle: { plateNumber: string } };

function Field({ label, error, children, hint, required }: { label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean }) {
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
    <input {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`} />
  );
}

function SelectInput({ error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select {...props} className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 focus:outline-none transition-colors appearance-none ${error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}>
      {children}
    </select>
  );
}

const CAT_ICONS: Record<string, string> = { Engine: "⚙️", Brakes: "🛑", Electrical: "⚡", Tyres: "⭕", Suspension: "🔩", Body: "🚛", Other: "📦" };

export default function CreatePartPage() {
  const router = useRouter();
  const [loading, setLoading]   = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [repairs, setRepairs]   = useState<Repair[]>([]);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(PartSchema),
    defaultValues: { category: "Other", quantity: 1, unitCost: 0, totalCost: 0 },
  });

  const qty      = watch("quantity");
  const unitCost = watch("unitCost");
  const category = watch("category");

  // Auto-compute totalCost
  useEffect(() => {
    const total = (qty ?? 0) * (unitCost ?? 0);
    setValue("totalCost", +total.toFixed(2), { shouldDirty: true });
  }, [qty, unitCost]);

  // Load vehicles + open repairs
  useEffect(() => {
    (async () => {
      try {
        const [vRes, rRes] = await Promise.all([
          fetch("/api/vehicles?limit=200"),
          fetch("/api/maintenance/repairs?status=OPEN&limit=100"),
        ]);
        const [vJson, rJson] = await Promise.all([vRes.json(), rRes.json()]);
        if (vRes.ok) setVehicles(vJson.items ?? []);
        if (rRes.ok) setRepairs(rJson.items ?? []);
      } catch { /* non-critical */ }
    })();
  }, []);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res  = await fetch("/api/maintenance/parts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) { toast.success("Part logged"); router.push("/maintenance/parts"); return; }
      toast.error(json?.message ?? "Failed to create part");
    } catch (err: any) { toast.error(err?.message ?? "Server error"); }
    finally { setLoading(false); }
  }

  const totalCost = (qty ?? 0) * (unitCost ?? 0);

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div><h1 className="text-base font-bold tracking-wider">Log Part</h1><p className="text-xs text-zinc-500 mt-0.5">Record a spare part purchase & fitment</p></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Section 1: Vehicle */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vehicle & Repair Link</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Vehicle" error={(errors.vehicleId as any)?.message} required>
                  <SelectInput {...register("vehicleId")} error={!!errors.vehicleId}>
                    <option value="">— Select vehicle —</option>
                    {vehicles.map(v => <option key={v.id} value={v.id}>{v.plateNumber} · {v.cap_no}</option>)}
                  </SelectInput>
                </Field>
                <Field label="Link to Repair" hint="Optional — attach to an open repair job">
                  <SelectInput {...register("repairId")}>
                    <option value="">— None (standalone part) —</option>
                    {repairs.map(r => <option key={r.id} value={r.id}>{r.vehicle.plateNumber} · {r.faultDesc.slice(0, 40)}</option>)}
                  </SelectInput>
                </Field>
              </div>
            </div>

            {/* Section 2: Part details */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Part Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Part Name" error={(errors.name as any)?.message} required>
                  <TextInput {...register("name")} placeholder="e.g. Air Filter, Engine Belt" error={!!errors.name} />
                </Field>
                <Field label="Part Number / OEM Code" hint="Manufacturer part number">
                  <TextInput {...register("partNumber")} placeholder="e.g. AF-2241-B" />
                </Field>
              </div>

              {/* Category picker */}
              <Field label="Category" required>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {CATEGORIES.map(c => (
                    <button key={c} type="button" onClick={() => setValue("category", c, { shouldDirty: true })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-[10px] font-semibold uppercase tracking-wider transition-all ${category === c ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#C8A96E]" : "border-white/[0.06] text-zinc-600 hover:text-zinc-300 hover:border-white/20"}`}>
                      <span className="text-base">{CAT_ICONS[c]}</span>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Section 3: Cost */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cost</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Quantity" error={(errors.quantity as any)?.message} required>
                  <TextInput {...register("quantity", { valueAsNumber: true })} type="number" min="1" placeholder="1" error={!!errors.quantity} />
                </Field>
                <Field label="Unit Cost (₦)" error={(errors.unitCost as any)?.message} required>
                  <TextInput {...register("unitCost", { valueAsNumber: true })} type="number" step="0.01" min="0" placeholder="0.00" error={!!errors.unitCost} />
                </Field>
                <Field label="Total Cost (₦)" hint="Auto-computed">
                  <div className="w-full bg-[#0D1117]/60 border border-white/[0.04] rounded-lg px-3 py-2.5 text-xs font-mono text-[#C8A96E] font-bold">
                    ₦{totalCost.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </div>
                  <input type="hidden" {...register("totalCost", { valueAsNumber: true })} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Supplier / Vendor">
                  <TextInput {...register("supplier")} placeholder="Supplier name" />
                </Field>
                <Field label="Supplier Phone">
                  <TextInput {...register("supplierPhone")} placeholder="+234…" type="tel" />
                </Field>
              </div>
            </div>

            {/* Section 4: Dates */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Purchase Date">
                  <TextInput {...register("purchaseDate")} type="date" />
                </Field>
                <Field label="Fitted Date" hint="When physically installed">
                  <TextInput {...register("fittedDate")} type="date" />
                </Field>
                <Field label="Warranty Expiry" hint="Leave blank if no warranty">
                  <TextInput {...register("warrantyExpiry")} type="date" />
                </Field>
              </div>
              <Field label="Notes" hint="Optional">
                <textarea {...register("notes")} rows={2} placeholder="Any notes…" className="w-full bg-[#0D1117] border border-white/[0.06] rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/50 resize-none" />
              </Field>
            </div>

            <div className="flex items-center gap-3 pb-10">
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 flex items-center gap-2">
                {loading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {loading ? "Saving…" : "Log Part"}
              </button>
              <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors">Cancel</button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
