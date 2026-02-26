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

// const PartSchema = z.object({
//   name: z.string().min(1),
//   serialNumber: z.string().min(1),
//   description: z.string().optional(),
//   brand: z.string().optional(),
//   model: z.string().optional(),
//   unitCost: z.number().optional(),
//   supplier: z.string().optional()
// });

// type PartForm = z.infer<typeof PartSchema>;

// export default function PartsPage() {
//   const [parts, setParts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [creating, setCreating] = useState(false);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<PartForm>({
//     resolver: zodResolver(PartSchema),
//     defaultValues: { name: "", serialNumber: "", description: "", brand: "",model:"", unitCost: 0, supplier: "" },
//   });

//   async function load() {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/maintenance/parts");
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed");
//       setParts(json.items ?? json.items ?? json);
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to load parts");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => { load(); }, []);

//   async function onCreate(data: PartForm) {
//     setCreating(true);
//     try {
//       const res = await fetch("/api/maintenance/parts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
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
//       <main className="p-6">
//         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//           <Card className="p-4 mb-4">
//             <h2 className="text-lg font-semibold mb-3">Replace Parts</h2>
//             <form onSubmit={handleSubmit(onCreate)} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
//               <div>
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
//               <div >
//                 <Label>Description</Label>
//                 <Input {...register("description")} />
//               </div>
              
//               <div className="flex gap-2">
//                 <Button type="submit" disabled={creating}>{creating ? "Adding..." : "Add Part"}</Button>
//                 <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
//               </div>
//             </form>
//           </Card>

//           <Card className="p-4">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-1 text-left">Name</th>
//                   <th>Part Number</th>
//                   <th>Quantity</th>
//                   <th>Unit Price</th>
//                   <th>Supplier</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {parts.map(p => (
//                   <tr key={p.id} className="border-t">
//                     <td className="p-2">{p.name}</td>
//                     <td>{p.partNumber}</td>
//                     <td>{p.quantity}</td>
//                     <td>{p.unitCost ?? "-"}</td>
//                     <td>{p.supplier ?? "-"}</td>
//                     <td className="flex gap-2">
//                       <Button onClick={() => window.location.href = `/admin/parts/${p.id}`}>View</Button>
//                       <Button variant="destructive" onClick={() => handleDelete(p.id)}>Delete</Button>
//                     </td>
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

// src/app/admin/maintenance/parts/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type PartRow = {
  id: string;
  name: string;
  partNumber?: string | null;
  category?: string | null;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier?: string | null;
  purchaseDate?: string | null;
  fittedDate?: string | null;
  warrantyExpiry?: string | null;
  notes?: string | null;
  vehicle?: { id: string; plateNumber: string; cap_no: string } | null;
  repair?: { id: string; faultDesc: string } | null;
  createdAt: string;
};

const CATEGORY_STYLES: Record<string, string> = {
  Engine:     "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  Brakes:     "bg-red-900/20 text-red-400 border border-red-800/30",
  Electrical: "bg-[#7B4E8C]/20 text-purple-400 border border-[#7B4E8C]/30",
  Tyres:      "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  Suspension: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  Body:       "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
  Other:      "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
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

function WarrantyPill({ expiry }: { expiry?: string | null }) {
  if (!expiry) return <span className="text-zinc-600 text-[10px]">—</span>;
  const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 86400000);
  if (days < 0)  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-900/20 text-red-400 border border-red-800/30">✕ Expired</span>;
  if (days <= 30) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/20 text-amber-400 border border-amber-700/30 animate-pulse">⚠ {days}d left</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30">✓ {fmt(expiry)}</span>;
}

export default function PartsListPage() {
  const router = useRouter();
  const [items, setItems]   = useState<PartRow[]>([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [q, setQ]           = useState("");
  const [debouncedQ, setDQ] = useState("");
  const [category, setCat]  = useState("ALL");
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => { const t = setTimeout(() => { setDQ(q); setPage(1); }, 350); return () => clearTimeout(t); }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ, ...(category !== "ALL" ? { category } : {}) });
      const res  = await fetch(`/api/maintenance/parts?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) { toast.error(err?.message ?? "Failed to load parts"); }
    finally { setLoading(false); }
  }, [page, debouncedQ, category]);

  useEffect(() => { load(); }, [load]);

  async function deletePart(id: string) {
    const res = await fetch(`/api/maintenance/parts/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    toast.success("Part deleted");
    load();
  }

  const totalPages  = Math.max(1, Math.ceil(total / limit));
  const totalSpend  = items.reduce((s, p) => s + (p.totalCost ?? 0), 0);
  const expiredWarranty = items.filter(p => p.warrantyExpiry && new Date(p.warrantyExpiry) < new Date()).length;
  const expiringWarranty = items.filter(p => {
    if (!p.warrantyExpiry) return false;
    const d = Math.ceil((new Date(p.warrantyExpiry).getTime() - Date.now()) / 86400000);
    return d >= 0 && d <= 30;
  }).length;

  const CATS = ["ALL", "Engine", "Brakes", "Electrical", "Tyres", "Suspension", "Body", "Other"];

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* Header */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-base font-bold tracking-wider">Parts</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{total} spare parts records</p>
            </div>
            <button onClick={() => router.push("/maintenance/parts/create")} className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors">+ Log Part</button>
          </div>

          {/* Alerts */}
          {(expiredWarranty > 0 || expiringWarranty > 0) && (
            <div className="max-w-7xl mx-auto px-6 pb-3">
              <div className="flex items-center gap-3 bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-2">
                <span className="text-amber-400 text-xs">⚠</span>
                <span className="text-xs text-amber-300">
                  {expiredWarranty > 0 && <span className="mr-3">{expiredWarranty} expired warrant{expiredWarranty > 1 ? "ies" : "y"}</span>}
                  {expiringWarranty > 0 && <span>{expiringWarranty} warrant{expiringWarranty > 1 ? "ies" : "y"} expiring within 30 days</span>}
                </span>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, part no, supplier…" className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40" />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>
            {CATS.map(c => (
              <button key={c} onClick={() => { setCat(c); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${category === c ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Parts",      value: total,                                  icon: "🔩", accent: "#3E6B8C" },
              { label: "Total Spend",      value: fmtCost(totalSpend),                    icon: "₦",  accent: "#C8A96E" },
              { label: "Expired Warranty", value: expiredWarranty,                        icon: "✕",  accent: "#8C3E3E", alert: expiredWarranty > 0 },
              { label: "Expiring Soon",    value: expiringWarranty,                       icon: "⚠", accent: "#8C6E3E", alert: expiringWarranty > 0 },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`relative bg-[#161B22] border rounded-xl p-4 overflow-hidden ${s.alert ? "border-amber-700/40" : "border-white/[0.06]"}`}>
                {s.alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</span>
                    <span>{s.icon}</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white">{s.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{items.length} part{items.length !== 1 ? "s" : ""}{category !== "ALL" ? ` · ${category}` : ""}</span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Part", "Category", "Vehicle", "Qty / Cost", "Warranty", "Fitted", ""].map(h => (
                      <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((part, i) => (
                      <motion.tr key={part.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.015 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-zinc-200">{part.name}</div>
                          {part.partNumber && <div className="text-zinc-600 text-[10px] font-mono mt-0.5">{part.partNumber}</div>}
                          {part.supplier && <div className="text-zinc-600 text-[10px] mt-0.5">{part.supplier}</div>}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${CATEGORY_STYLES[part.category ?? "Other"] ?? CATEGORY_STYLES.Other}`}>
                            {part.category ?? "Other"}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          {part.vehicle ? (
                            <button onClick={() => router.push(`/vehicles/${part.vehicle!.id}`)} className="text-left hover:text-[#C8A96E] transition-colors">
                              <div className="font-mono text-[#C8A96E]">{part.vehicle.plateNumber}</div>
                              <div className="text-zinc-600 text-[10px]">{part.vehicle.cap_no}</div>
                            </button>
                          ) : <span className="text-zinc-600">—</span>}
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="font-mono text-zinc-300">{part.quantity} × {fmtCost(part.unitCost)}</div>
                          <div className="font-mono text-[#C8A96E] font-bold text-[10px] mt-0.5">{fmtCost(part.totalCost)}</div>
                        </td>
                        <td className="py-3.5 px-5"><WarrantyPill expiry={part.warrantyExpiry} /></td>
                        <td className="py-3.5 px-5 text-zinc-500">{part.fittedDate ? fmt(part.fittedDate) : "—"}</td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <button onClick={() => router.push(`/maintenance/parts/${part.id}`)} className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors">Edit</button>
                            <ConfirmDeleteButton onConfirm={() => deletePart(part.id)} />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {!loading && items.length === 0 && (
                    <tr><td colSpan={7} className="py-16 text-center text-zinc-600">{q ? `No parts matching "${q}"` : "No parts logged yet"}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} parts</span>
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
