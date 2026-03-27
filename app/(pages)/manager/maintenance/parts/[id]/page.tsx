// // src/app/admin/parts/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import DashboardLayout from "@/components/layout/Dashboard";
// import { useParams, useRouter } from "next/navigation";
// import DateField from "@/components/utils/DateComponent";

// const PartSchema = z.object({
//   name: z.string().min(1),
//   serialNumber: z.string().min(1),
//   description: z.string().optional(),
//   brand: z.string().optional(),
//   model: z.string().optional(),
//   unitCost: z.number().optional(),
//   supplier: z.string().optional(),
//   vehicleId:z.string().optional(),
//   dateReplaced:z.iso.datetime("Use the calendar to pick a date"),
// });

// type PartForm = z.infer<typeof PartSchema>;
// type Vehicle = {
//     cap_no: string,
//     plateNumber:string
//     driver:{
//         name:string
//     }
// }

// export default function PartsPage() {
//   const { id } = useParams() as { id: string };
//   const [parts, setParts] = useState<any[]>([]);
//   const [vehicle, setVehicle] = useState<Vehicle>();
//   const [loading, setLoading] = useState(false);
//   const [creating, setCreating] = useState(false);

//   const { register, handleSubmit,watch,setValue, reset, formState: { errors } } = useForm<PartForm>({
//     resolver: zodResolver(PartSchema),
//     defaultValues: { name: "", serialNumber: "", description: "", brand: "",model:"", unitCost: 0, supplier: "" },
//   });


//     async function fetchVehicle() {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/vehicles/${id}`);
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed");
//       setVehicle(json.vehicle ?? json.items ?? json);
      
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to load parts");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function load() {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/maintenance/parts/${id}`);
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed");
      
//       setParts(json?.items ?? json?.part ?? json);
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to load parts");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { load();fetchVehicle(); }, []);

//   async function onCreate(data: PartForm) {
//     setCreating(true);
//     try {
//       const payload: any = { ...data };
//       payload.vehicleId = id;
//       const res = await fetch("/api/maintenance/parts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Create failed");
//       toast.success("Part added");
//       reset();
//       load();
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to create part");
//     } finally { setCreating(false); }
//   }

//   async function handleDelete(id: string) {
//     if (!confirm("Delete part?")) return;
//     const res = await fetch(`/api/maintenance/parts/${id}`, { method: "DELETE" });
//     if (!res.ok) {
//       const j = await res.json().catch(()=>({}));
//       toast.error(j?.message || "Delete failed");
//       return;
//     }
//     toast.success("Deleted");
//     load();
//   }

//   return (
//     <>
//     <DashboardLayout>
//       <Toaster />
//       <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
//         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <Card className="p-4 mb-4">
//             <h2 className="text-lg font-semibold">Replace Parts for Truck {vehicle?.plateNumber}</h2>
//             <h2 className="text-sm font-semibold mb-3">Driver: {vehicle?.driver?.name ?? "No Driver"}</h2>
//             <form onSubmit={handleSubmit(onCreate)}>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
//             <div>
//               <Label>Part Name</Label>
//                <select {...register("name")} className="w-full border p-2 rounded">
//                   <option value="Tire">Tire</option>
//                   <option value="Fuel Pump">Fuel Pump</option>
//                   <option value="Battery">Battery</option>
//                   <option value="Injector">Injector</option>
//                   <option value="Key Starter">Key Starter</option>
//                 </select>
//                 {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}   
//                 </div>
//                 <div>
//                 <Label>Brand</Label>
//                 <Input  {...register("brand")} />
//                 {errors.brand && <p className="text-sm text-red-600">{errors.brand.message}</p>}
//               </div>
//                 <div>
//                 <Label>Model</Label>
//                 <Input {...register("model")} />
//                 {errors.model && <p className="text-sm text-red-600">{errors.model.message}</p>}
//               </div>
//               <div>
//                 <Label>Serial Number</Label>
//                 <Input {...register("serialNumber")} />
//                 {errors.serialNumber && <p className="text-sm text-red-600">{errors.serialNumber.message}</p>}
//               </div>

              
//               <div>
//                 <Label>Unit Price</Label>
//                 <Input type="number" step="0.01" {...register("unitCost", { valueAsNumber: true })} />
//               </div>
//               <div>
//                 <Label>Supplier</Label>
//                 <Input {...register("supplier")} />
//               </div>
//               <div>
//                 <DateField
//                 label="Replaced Date"
//                 value={watch(`dateReplaced` as const)}
//                 onSelectISO={(iso) => setValue(`dateReplaced`as const, iso, { shouldValidate: true })}
//                 />                
//                 </div>
//               <div >
//                 <Label>Description</Label>
//                 <Input {...register("description")} />
//               </div>
//               </div>
//               <div className="flex gap-2 mt-5">
//                 <Button type="submit" disabled={creating}>{creating ? "Adding..." : "Add Part"}</Button>
//                 <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
//               </div>
//             </form>
//           </Card>

//           <Card className="p-4">
//             <table className="w-full">
//               <thead>
//                 <tr className=" text-left bg-gray-100">
//                   <th className="p-2">Part Name</th>
//                   <th className="p-2">Brand</th>
//                   <th className="p-2">Model</th>
//                   <th className="p-2">Serial Number</th>
//                   <th className="p-2">Unit Price</th>
//                   <th className="p-2">Supplier</th>
//                   <th className="p-2">Replace Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {parts?.map(p => (
//                   <tr key={p.id} className="border-t">
//                     <td className="p-2">{p.name}</td>
//                     <td className="p-2">{p?.brand}</td>
//                     <td className="p-2">{p?.model}</td>
//                     <td className="p-2">{p?.serialNumber}</td>
//                     <td className="p-2">{p.unitCost ?? "-"}</td>
//                     <td className="p-2">{p.supplier ?? "-"}</td>
//                     <td className="p-2">{p.DateTime ?? "-"}</td>
                    
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }


// src/app/admin/maintenance/parts/[id]/edit/page.tsx
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
const CATEGORIES = ["Engine", "Brakes", "Electrical", "Tyres", "Suspension", "Body", "Other"] as const;

const CAT_ICONS: Record<string, string> = {
  Engine: "⚙️", Brakes: "🛑", Electrical: "⚡",
  Tyres: "⭕", Suspension: "🔩", Body: "🚛", Other: "📦",
};

// ─── Zod schema — mirrors UpdatePartSchema on the API ─────────────────────────
// vehicleId and repairId are NOT editable after creation (structural FKs)
// totalCost is server-derived from quantity × unitCost, shown read-only
const EditPartSchema = z.object({
  name:           z.string().min(1, "Part name is required"),
  partNumber:     z.string().optional().nullable(),
  category:       z.enum(CATEGORIES),
  quantity:       z.number().int().positive("Must be at least 1"),
  unitCost:       z.number().nonnegative("Unit cost is required"),
  supplier:       z.string().optional().nullable(),
  supplierPhone:  z.string().optional().nullable(),
  purchaseDate:   z.string().optional().nullable(),
  fittedDate:     z.string().optional().nullable(),
  warrantyExpiry: z.string().optional().nullable(),
  notes:          z.string().optional().nullable(),
});

type FormValues = z.infer<typeof EditPartSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────
type Part = {
  id: string;
  name: string;
  partNumber?: string | null;
  category?: string | null;
  quantity: number;
  unitCost: number;
  totalCost?: number | null;
  supplier?: string | null;
  supplierPhone?: string | null;
  purchaseDate?: string | null;
  fittedDate?: string | null;
  warrantyExpiry?: string | null;
  notes?: string | null;
  repairId?: string | null;
  vehicle: { id: string; plateNumber: string; cap_no: string };
  repair?: { id: string; faultDesc: string; status: string } | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

function warrantyStatus(expiry?: string | null): "valid" | "expiring" | "expired" | "none" {
  if (!expiry) return "none";
  const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 86_400_000);
  if (days < 0)  return "expired";
  if (days <= 30) return "expiring";
  return "valid";
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
export default function EditPartPage() {
  const router  = useRouter();
  const params  = useParams<{ id: string }>();
  const partId  = params.id;

  const [fetching,  setFetching]  = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [part,      setPart]      = useState<Part | null>(null);
  const [notFound,  setNotFound]  = useState(false);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(EditPartSchema) });

  const qty      = watch("quantity");
  const unitCost = watch("unitCost");
  const category = watch("category");

  // Live-computed total — display only, server re-derives on save
  const totalCostDisplay = ((qty ?? 0) * (unitCost ?? 0)).toFixed(2);

  // Warranty display state
  const warrantyExpiry = watch("warrantyExpiry");
  const wStatus = warrantyStatus(warrantyExpiry);

  // ── Fetch part ──────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/maintenance/parts/${partId}`);
        if (res.status === 404) { setNotFound(true); return; }
        const json = await res.json();
        if (!res.ok) { setNotFound(true); return; }

        const p: Part = json.part;
        setPart(p);

        reset({
          name:           p.name,
          partNumber:     p.partNumber     ?? null,
          category:       (p.category as any) ?? "Other",
          quantity:       p.quantity,
          unitCost:       p.unitCost,
          supplier:       p.supplier       ?? null,
          supplierPhone:  p.supplierPhone  ?? null,
          purchaseDate:   toDateInput(p.purchaseDate),
          fittedDate:     toDateInput(p.fittedDate),
          warrantyExpiry: toDateInput(p.warrantyExpiry),
          notes:          p.notes          ?? null,
        });
      } catch {
        toast.error("Failed to load part");
      } finally {
        setFetching(false);
      }
    })();
  }, [partId]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    setSaving(true);
    try {
      const res  = await fetch(`/api/maintenance/parts/${partId}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Part updated");
        if (json.part) setPart(prev => ({ ...prev!, ...json.part }));
        router.push("/maintenance/parts");
        return;
      }
      toast.error(json?.message ?? "Failed to update part");
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
            <p className="text-4xl">🔩</p>
            <p className="text-[#2C2825] text-sm font-bold">Part not found</p>
            <p className="text-[#9C9590] text-xs">It may have been deleted or never existed.</p>
            <button onClick={() => router.push("/maintenance/parts")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#B8860B] text-[#1C1917] text-xs font-bold">
              Back to Parts
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
            {[160, 200, 160, 180, 140].map((h, i) => (
              <Skeleton key={i} className="w-full rounded-xl"  /> 
              // style={{ height: h } as any}
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
              <h1 className="text-sm font-bold tracking-wider truncate">Edit Part</h1>
              <p className="text-[10px] text-[#9C9590] mt-0.5 truncate">
                {part?.vehicle?.plateNumber} · {part?.vehicle?.cap_no}
                {part?.repair && (
                  <span className="ml-2 text-[#9C9590]">
                    · Linked to repair: {part.repair.faultDesc.slice(0, 40)}
                  </span>
                )}
              </p>
            </div>
            {/* Warranty status badge */}
            <AnimatePresence mode="wait">
              {wStatus !== "none" && (
                <motion.div
                  key={wStatus}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    wStatus === "valid"
                      ? "bg-emerald-50 border-emerald-700/40 text-emerald-300"
                      : wStatus === "expiring"
                      ? "bg-amber-50 border-amber-700/40 text-amber-300 animate-pulse"
                      : "bg-red-50 border-red-700/40 text-red-300"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    wStatus === "valid" ? "bg-emerald-400" :
                    wStatus === "expiring" ? "bg-amber-400 animate-pulse" :
                    "bg-red-400"
                  }`}/>
                  {wStatus === "valid"    ? "Warranty Valid" :
                   wStatus === "expiring" ? "Warranty Expiring" :
                   "Warranty Expired"}
                </motion.div>
              )}
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

            {/* ── Section 1: Read-only context ──────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Vehicle & Repair Link</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ReadField
                  label="Vehicle"
                  value={`${part?.vehicle?.plateNumber ?? "—"} · ${part?.vehicle?.cap_no ?? ""}`}
                  sub="Vehicle cannot be changed after creation"
                />
                {part?.repair ? (
                  <ReadField
                    label="Linked Repair"
                    value={part.repair.faultDesc.slice(0, 60)}
                    sub={`Status: ${part.repair.status}`}
                  />
                ) : (
                  <ReadField
                    label="Linked Repair"
                    value="None — standalone part"
                    sub="Repair link cannot be changed after creation"
                  />
                )}
              </div>
            </div>

            {/* ── Section 2: Part Details ───────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Part Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Part Name" required error={(errors.name as any)?.message}>
                  <TextInput
                    {...register("name")}
                    placeholder="e.g. Air Filter, Engine Belt"
                    error={!!errors.name}
                  />
                </Field>
                <Field label="Part Number / OEM Code" hint="Manufacturer or OEM part number">
                  <TextInput {...register("partNumber")} placeholder="e.g. AF-2241-B" />
                </Field>
              </div>

              {/* Category picker */}
              <Field label="Category" required error={(errors.category as any)?.message}>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c} type="button"
                      onClick={() => setValue("category", c, { shouldDirty: true })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-[10px] font-bold
                        uppercase tracking-wider transition-all
                        ${category === c
                          ? "border-[#B8860B] bg-[#B8860B]/10 text-[#B8860B]"
                          : "border-[#E8E2D9] text-[#9C9590] hover:text-[#2C2825] hover:border-[#B8860B]/30"}`}
                    >
                      <span className="text-base">{CAT_ICONS[c]}</span>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* ── Section 3: Cost ───────────────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Cost</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Quantity" required error={(errors.quantity as any)?.message}>
                  <TextInput
                    {...register("quantity", { valueAsNumber: true })}
                    type="number" min="1" placeholder="1"
                    error={!!errors.quantity}
                  />
                </Field>
                <Field label="Unit Cost (₦)" required error={(errors.unitCost as any)?.message}>
                  <TextInput
                    {...register("unitCost", { valueAsNumber: true })}
                    type="number" step="0.01" min="0" placeholder="0.00"
                    error={!!errors.unitCost}
                  />
                </Field>
                <ReadField
                  label="Total Cost (₦)"
                  value={`₦${Number(totalCostDisplay).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`}
                  accent
                  sub="Auto-computed: qty × unit cost"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Supplier / Vendor">
                  <TextInput {...register("supplier")} placeholder="Supplier name" />
                </Field>
                <Field label="Supplier Phone">
                  <TextInput {...register("supplierPhone")} type="tel" placeholder="+234…" />
                </Field>
              </div>
            </div>

            {/* ── Section 4: Dates ──────────────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Dates</h2>
                {/* Warranty status inline hint */}
                <AnimatePresence mode="wait">
                  {warrantyExpiry && (
                    <motion.span
                      key={wStatus}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-[10px] font-bold ${
                        wStatus === "valid"    ? "text-emerald-400" :
                        wStatus === "expiring" ? "text-amber-400" :
                        "text-red-400"
                      }`}
                    >
                      {wStatus === "valid"    ? "✓ Warranty in effect" :
                       wStatus === "expiring" ? "⚠ Warranty expiring soon" :
                       "✕ Warranty expired"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Purchase Date">
                  <TextInput {...register("purchaseDate")} type="date" />
                </Field>
                <Field label="Fitted Date" hint="When physically installed on vehicle">
                  <TextInput {...register("fittedDate")} type="date" />
                </Field>
                <Field label="Warranty Expiry" hint="Leave blank if no warranty">
                  <TextInput
                    {...register("warrantyExpiry")}
                    type="date"
                    className={`w-full bg-[#F8F6F1] border rounded-lg px-3 py-2.5 text-xs text-[#1C1917]
                      placeholder-[#B0AAA4] focus:outline-none transition-colors
                      ${wStatus === "expired"  ? "border-red-700/50 focus:border-red-500" :
                        wStatus === "expiring" ? "border-amber-700/50 focus:border-amber-500" :
                        "border-[#E8E2D9] focus:border-[#B8860B]/50"}`}
                  />
                </Field>
              </div>

              <Field label="Notes" hint="Optional">
                <textarea
                  {...register("notes")}
                  rows={2}
                  placeholder="Any notes about this part…"
                  className="w-full bg-[#F8F6F1] border border-[#E8E2D9] rounded-lg px-3 py-2.5 text-xs
                    text-[#1C1917] placeholder-[#B0AAA4] focus:outline-none focus:border-[#B8860B]/50 resize-none"
                />
              </Field>
            </div>

            {/* ── Section 5: Repair context (read-only) ─────────────────── */}
            {part?.repair && (
              <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-3">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Linked Repair</h2>
                <div className="bg-[#F8F6F1]/60 border border-[#EDE8E0] rounded-lg px-4 py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#1C1917] font-medium">{part.repair.faultDesc}</p>
                    <p className="text-[10px] text-[#9C9590] mt-0.5">
                      {part.vehicle.plateNumber} · {part.vehicle.cap_no}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    part.repair.status === "COMPLETED"
                      ? "bg-emerald-50 text-emerald-400 border-emerald-700/30"
                      : part.repair.status === "IN_PROGRESS"
                      ? "bg-sky-900/20 text-sky-400 border-sky-700/30"
                      : part.repair.status === "OPEN"
                      ? "bg-red-50 text-red-400 border-red-700/30"
                      : "bg-zinc-700/30 text-[#6B6560] border-zinc-600/30"
                  }`}>
                    {part.repair.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-[10px] text-[#9C9590]">
                  This part's cost flows into the linked repair's total. The repair link cannot be changed here.
                </p>
              </div>
            )}

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
