// // src/app/admin/services/create/page.tsx
// "use client";
// import { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { error } from "console";
// import DashboardLayout from "@/components/layout/Dashboard";

// const PartLine = z.object({
//   partId: z.string().uuid(),
//   qtyUsed: z.number().int().positive(),
//   notes: z.string().optional(),
// });

// const FormSchema = z.object({
//   vehicleId: z.string().uuid(),
//   serviceType: z.string().min(1),
//   serviceDate: z.string(),
//   odometerReadingKm: z.number(),
//   cost: z.number().optional(),
//   provider: z.string().optional(),
//   notes: z.string().optional(),
//   partsUsed: z.array(PartLine).optional(),
// });

// type FormValues = z.infer<typeof FormSchema>;

// export default function CreateService() {
//   const [vehicles, setVehicles] = useState<any[]>([]);
//   const [parts, setParts] = useState<any[]>([]);
//   const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: { partsUsed: [] as any[] , serviceDate: new Date().toISOString().slice(0,16) },
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: "partsUsed" });

//   useEffect(() => {
//     async function load() {
//       const [vres, pres] = await Promise.all([fetch("/api/vehicles"), fetch("/api/maintenance/parts")]);
//       const vjson = await vres.json(); const pjson = await pres.json();
//       setVehicles(vjson.items ?? vjson.vehicles ?? []);
//       setParts(pjson.items ?? pjson.items ?? pjson);
//     }
//     load();
//   }, []);

//   async function onSubmit(data: FormValues) {
//     try {
//       const res = await fetch("/api/maintenance/services", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed");
//       toast.success("Service recorded");
//       // redirect to services list
//       window.location.href = "/admin/services";
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to record service");
//     }
//   }

  

//   return (
//     <>
//     <DashboardLayout>
//       <Toaster />
//       <main className="p-6">
//         <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="max-w-4xl mx-auto">
//           <Card className="p-4">
//             <h2 className="text-lg font-semibold mb-3">Record Service</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               <div>
//                 <Label>Vehicle</Label>
//                 <select {...register("vehicleId")} className="w-full border p-2 rounded">
//                   <option value="">Select vehicle</option>
//                   {vehicles.map(v => <option key={v.id} value={v.id}>{v.plateNumber}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <Label>Service Type</Label>
//                 <select {...register(`serviceType`)} className="w-full border p-2 rounded">
//                   <option value="">Select part</option>
//                   <option value="Oil Change">Oil Change</option>
//                   <option value="Major Inspection">Major Inspection</option>
//                   <option value="others">Others</option>
                    
//                   </select>
                
//               </div>
//               <div>
//                 <Label>Service Date</Label>
//                 <Input type="datetime-local" {...register("serviceDate")} />
//               </div>
//               <div>
//                 <Label>Odometer</Label>
//                 <Input type="number" {...register("odometerReadingKm", { valueAsNumber: true })} />
//               </div>
//               <div>
//                 <Label>Provider</Label>
//                 <Input {...register("provider")} />
//               </div>
//               <div>
//                 <Label>Cost</Label>
//                 <Input type="number" step="0.01" {...register("cost", { valueAsNumber: true })} />
//               </div>

//               <div className="md:col-span-2">
//                 <Label>Parts Used</Label>
//                 <div className="space-y-2">
//                   {fields.map((f, idx) => (
//                     <div key={f.id} className="grid grid-cols-4 gap-2 items-end">
//                       <select {...register(`partsUsed.${idx}.partId` as const)} className="border p-2 rounded">
//                         <option value="">Select part</option>
//                         {parts.map(p => <option key={p.id} value={p.id}>{p.name} (qty: {p.quantity})</option>)}
//                       </select>
//                       <input type="number" step="1" {...register(`partsUsed.${idx}.qtyUsed` as const, { valueAsNumber: true })} className="border p-2 rounded" placeholder="qty" />
//                       <input  {...register(`partsUsed.${idx}.notes`)} className="border p-2 rounded" placeholder="write note" />
//                       <div className="flex gap-2">
//                         <Button type="button" variant="ghost" onClick={() => remove(idx)}>Remove</Button>
//                       </div>
//                     </div>
//                   ))}
//                   <Button type="button" onClick={() => append({ partId: "", qtyUsed: 1, notes: "" })}>Add part</Button>
//                 </div>
//               </div>

//               <div className="md:col-span-2">
//                 <Label>Notes</Label>
//                 <textarea {...register("notes")} className="w-full border p-2 rounded" />
//               </div>

//               <div className="md:col-span-2 flex gap-2 mt-3">
//                 <Button type="submit">Record service</Button>
//                 <Button type="button" variant="secondary" onClick={() => window.history.back()}>Cancel</Button>
//               </div>
//             </form>
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }

// src/app/admin/maintenance/services/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type ServiceRow = {
  id: string;
  serviceType: string;
  status: string;
  description?: string | null;
  odometerKm?: number | null;
  nextServiceKm?: number | null;
  nextServiceDate?: string | null;
  laborCost?: number | null;
  totalCost?: number | null;
  garage?: string | null;
  scheduledDate?: string | null;
  completedDate?: string | null;
  vehicle?: { id: string; plateNumber: string; cap_no: string } | null;
  driver?: { id: string; name: string } | null;
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  SCHEDULED:   "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  IN_PROGRESS: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  COMPLETED:   "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  CANCELLED:   "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
};
const STATUS_ICONS: Record<string, string> = { SCHEDULED: "◷", IN_PROGRESS: "↻", COMPLETED: "✓", CANCELLED: "✕" };

const TYPE_LABELS: Record<string, string> = {
  OIL_CHANGE: "Oil Change", PERIODIC_INSPECTION: "Inspection", AIR_FILTER: "Air Filter",
  FULL_SERVICE: "Full Service", GENERATOR: "Generator", OTHER: "Other",
};

const fmt     = (d: string) => new Date(d).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });
const fmtCost = (n: number) => `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

function ConfirmDeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [phase, setPhase] = useState<"idle" | "confirm" | "loading">("idle");
  async function go() { setPhase("loading"); try { await onConfirm(); } catch { setPhase("idle"); } }
  if (phase === "idle")    return <button onClick={() => setPhase("confirm")} className="px-2 py-1 rounded text-xs border border-red-800/40 text-red-400 hover:bg-red-900/20 transition-colors">Delete</button>;
  if (phase === "confirm") return <div className="flex items-center gap-1"><span className="text-[10px] text-zinc-500">Sure?</span><button onClick={go} className="px-2 py-1 rounded text-xs bg-red-900/40 text-red-400 border border-red-700/40">Yes</button><button onClick={() => setPhase("idle")} className="px-2 py-1 rounded text-xs border border-white/10 text-zinc-500">No</button></div>;
  return <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />;
}

function DuePill({ date, km, currentOdo }: { date?: string | null; km?: number | null; currentOdo?: number | null }) {
  const parts = [];
  if (date) {
    const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
    if (days < 0)        parts.push(<span key="d" className="text-red-400 text-[10px]">⚠ Overdue {fmt(date)}</span>);
    else if (days <= 14) parts.push(<span key="d" className="text-amber-400 text-[10px] animate-pulse">⚠ Due {fmt(date)}</span>);
    else                 parts.push(<span key="d" className="text-zinc-500 text-[10px]">{fmt(date)}</span>);
  }
  if (km) parts.push(<span key="k" className="text-zinc-500 text-[10px]">{km.toLocaleString("en-NG")} km</span>);
  return parts.length > 0 ? <div className="flex flex-col gap-0.5">{parts}</div> : <span className="text-zinc-600 text-[10px]">—</span>;
}

export default function ServicesListPage() {
  const router = useRouter();
  const [items, setItems]   = useState<ServiceRow[]>([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [q, setQ]           = useState("");
  const [debouncedQ, setDQ] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => { const t = setTimeout(() => { setDQ(q); setPage(1); }, 350); return () => clearTimeout(t); }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ, ...(status !== "ALL" ? { status } : {}) });
      const res  = await fetch(`/api/maintenance/services?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []); setTotal(json.total ?? 0);
    } catch (err: any) { toast.error(err?.message ?? "Failed to load services"); }
    finally { setLoading(false); }
  }, [page, debouncedQ, status]);

  useEffect(() => { load(); }, [load]);

  async function deleteService(id: string) {
    const res = await fetch(`/api/maintenance/services/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    toast.success("Service deleted"); load();
  }

  const totalPages       = Math.max(1, Math.ceil(total / limit));
  const scheduled        = items.filter(s => s.status === "SCHEDULED").length;
  const inProgress       = items.filter(s => s.status === "IN_PROGRESS").length;
  const totalSpend       = items.reduce((s, i) => s + (i.totalCost ?? 0), 0);
  const overdueServices  = items.filter(s => s.nextServiceDate && new Date(s.nextServiceDate) < new Date() && s.status !== "COMPLETED").length;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div><h1 className="text-base font-bold tracking-wider">Services</h1><p className="text-xs text-zinc-500 mt-0.5">{total} service records</p></div>
            <button onClick={() => router.push("/maintenance/services/create")} className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors">+ Log Service</button>
          </div>
          {overdueServices > 0 && (
            <div className="max-w-7xl mx-auto px-6 pb-3">
              <div className="flex items-center gap-3 bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-2">
                <span className="text-red-400 text-xs">⚠</span>
                <span className="text-xs text-red-300">{overdueServices} service{overdueServices > 1 ? "s" : ""} overdue — immediate attention required</span>
              </div>
            </div>
          )}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search vehicle, garage, description…" className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40" />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>
            {["ALL", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(s => (
              <button key={s} onClick={() => { setStatus(s); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${status === s ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>
                {s === "ALL" ? "All" : `${STATUS_ICONS[s]} ${s.replace("_", " ")}`}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Services",  value: total,         icon: "🔧", accent: "#3E6B8C" },
              { label: "Scheduled",       value: scheduled,     icon: "◷",  accent: "#C8A96E", alert: scheduled > 0 },
              { label: "In Progress",     value: inProgress,    icon: "↻",  accent: "#3E6B8C" },
              { label: "Total Spend",     value: fmtCost(totalSpend), icon: "₦", accent: "#5C9669" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`relative bg-[#161B22] border rounded-xl p-4 overflow-hidden ${s.alert ? "border-amber-700/40" : "border-white/[0.06]"}`}>
                {s.alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }} />
                <div className="relative"><div className="flex items-center justify-between mb-2"><span className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</span><span>{s.icon}</span></div><div className="text-xl font-bold font-mono text-white">{s.value}</div></div>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{items.length} service{items.length !== 1 ? "s" : ""}</span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.06]">
                  {["Vehicle", "Service Type", "Status", "Cost", "Next Due", "Date", ""].map(h => (
                    <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((svc, i) => (
                      <motion.tr key={svc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.015 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5">
                          {svc.vehicle ? <button onClick={() => router.push(`/vehicles/${svc.vehicle!.id}`)} className="text-left hover:text-[#C8A96E] transition-colors"><div className="font-mono text-[#C8A96E]">{svc.vehicle.plateNumber}</div><div className="text-zinc-600 text-[10px]">{svc.vehicle.cap_no}</div></button> : <span className="text-zinc-600">—</span>}
                          {svc.driver && <div className="text-zinc-600 text-[10px] mt-0.5">{svc.driver.name}</div>}
                        </td>
                        <td className="py-3.5 px-5"><div className="text-zinc-300">{TYPE_LABELS[svc.serviceType] ?? svc.serviceType}</div>{svc.description && <div className="text-zinc-600 text-[10px] mt-0.5 truncate max-w-[180px]">{svc.description}</div>}</td>
                        <td className="py-3.5 px-5"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[svc.status] ?? STATUS_STYLES.CANCELLED}`}>{STATUS_ICONS[svc.status]} {svc.status.replace("_", " ")}</span></td>
                        <td className="py-3.5 px-5 font-mono text-zinc-300">{svc.totalCost ? fmtCost(svc.totalCost) : "—"}</td>
                        <td className="py-3.5 px-5"><DuePill date={svc.nextServiceDate} km={svc.nextServiceKm} /></td>
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{svc.scheduledDate ? fmt(svc.scheduledDate) : "—"}</td>
                        <td className="py-3.5 px-5"><div className="flex items-center gap-2">
                          {svc.status==="COMPLETED"?(<></>):(<button onClick={() => router.push(`/maintenance/services/${svc.id}`)} className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors">Edit</button>)}
                        <ConfirmDeleteButton onConfirm={() => deleteService(svc.id)} /></div></td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {!loading && items.length === 0 && <tr><td colSpan={7} className="py-16 text-center text-zinc-600">{q ? `No services matching "${q}"` : "No services logged yet"}</td></tr>}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} services</span>
                <div className="flex items-center gap-1">
                  <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 transition-colors">← Prev</button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { const start = Math.max(1, Math.min(page - 2, totalPages - 4)); const p = start + i; return <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded text-xs font-mono transition-colors ${p === page ? "bg-[#C8A96E] text-[#0D1117] font-bold" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>{p}</button>; })}
                  <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 transition-colors">Next →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
