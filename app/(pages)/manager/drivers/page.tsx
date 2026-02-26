// // src/app/admin/users/page.tsx
// "use client";
// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import Pagination from "@/components/Pagination";
// import ConfirmButton from "@/components/ComfirmButton";
// import { useRouter } from "next/navigation";
// import DashboardLayout from "@/components/layout/Dashboard";

// type DriverRow = { id:string; name:string; phone?:string; address:string; profileImage?:string; licenseNo:string; createdAt:string; };

// export default function UsersPage() {
//   const [items, setItems] = useState<DriverRow[]>([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [q, setQ] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function load() {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/auth/users/driver?page=${page}&limit=${limit}&search=${encodeURIComponent(q)}`);
//       const json = await res.json();
//       console.log("drivers",json)
//       if (!res.ok) throw new Error(json?.message || "Failed");
//       setItems(json.items || []);
//       setTotal(json.total || 0);
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to load users");
//     } finally { setLoading(false); }
//   }

//   useEffect(()=>{ load() }, [page, q]);

//   async function handleDelete(id:string) {
//     const res = await fetch(`/api/auth/users/driver/${id}`, { method: "DELETE" });
//     if (!res.ok) {
//       const j = await res.json().catch(()=>({}));
//       throw new Error(j?.message || "Delete failed");
//     }
//     toast.success("Deleted");
//     load();
//   }

//   return (
//     <>
//       <Toaster />
//       <DashboardLayout>
//       <main className="p-6">
//         <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}>
//           <Card className="p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">Users</h2>
//               <div className="flex items-center gap-2">
//                 <input className="border px-2 py-1 rounded" placeholder="Search name or email" value={q} onChange={(e)=>setQ(e.target.value)} />
//                 <Button onClick={()=>router.push("/drivers/create")}>Add driver</Button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="text-left">
//                     <th className="p-2">Name</th>
//                     <th className="p-2">Phone</th>
//                     <th className="p-2">address</th>
//                     <th className="p-2">License No</th>
//                     {/* <th className="p-2">Actions</th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map(u => (
//                     <tr key={u.id} className="border-t">
//                       <td className="p-2">{u.name || "—"}</td>
//                       <td className="p-2">{u.phone}</td>
//                       <td className="p-2 ">{u.address}</td>
//                       <td className="p-2">{u.licenseNo}</td>
//                       {/* <td className="p-2">{new Date(u.createdAt).toLocaleString()}</td> */}
//                       <td className="p-2 flex gap-2">
//                         <Button onClick={()=>router.push(`/drivers/${u.id}`)}>View</Button>
//                         {/* <Button onClick={()=>router.push(`/drivers/update/${u.id}`)}>Edit</Button> */}
//                         <ConfirmButton onConfirm={()=>handleDelete(u.id)} label="Delete" confirmText="Delete this user? This action is reversible via Restore only by DB." />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <Pagination page={page} total={total} limit={limit} onPage={(p)=>setPage(p)} />
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }

// src/app/admin/drivers/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type DriverRow = {
  id: string;
  name: string;
  phone?: string | null;
  address: string;
  profileImage?: string | null;
  licenseNo?: string | null;
  licenseExp?: string | null;
  createdAt: string;
  vehicle?: { id: string; plateNumber: string; cap_no: string } | null;
};

const fmt = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

function licensePill(exp?: string | null) {
  if (!exp) return <span className="text-zinc-600 text-[10px]">—</span>;
  const now = Date.now();
  const expMs = new Date(exp).getTime();
  const daysLeft = Math.ceil((expMs - now) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-900/30 text-red-400 border border-red-700/40">
        ✕ Expired
      </span>
    );
  if (daysLeft <= 30)
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-900/30 text-amber-400 border border-amber-700/40 animate-pulse">
        ⚠ {daysLeft}d left
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30">
      ✓ Valid
    </span>
  );
}

function ConfirmDeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [phase, setPhase] = useState<"idle" | "confirm" | "loading">("idle");
  async function go() {
    setPhase("loading");
    try { await onConfirm(); } catch { setPhase("idle"); }
  }
  if (phase === "idle")
    return (
      <button onClick={() => setPhase("confirm")} className="px-2 py-1 rounded text-xs border border-red-800/40 text-red-400 hover:bg-red-900/20 transition-colors">
        Delete
      </button>
    );
  if (phase === "confirm")
    return (
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-zinc-500">Sure?</span>
        <button onClick={go} className="px-2 py-1 rounded text-xs bg-red-900/40 text-red-400 border border-red-700/40 hover:bg-red-900/60 transition-colors">Yes</button>
        <button onClick={() => setPhase("idle")} className="px-2 py-1 rounded text-xs border border-white/10 text-zinc-500 hover:text-zinc-300 transition-colors">No</button>
      </div>
    );
  return <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />;
}

export default function DriversListPage() {
  const router = useRouter();
  const [items, setItems] = useState<DriverRow[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [assignFilter, setAssignFilter] = useState<"ALL" | "ASSIGNED" | "UNASSIGNED">("ALL");
  const [licenseFilter, setLicenseFilter] = useState<"ALL" | "EXPIRED" | "EXPIRING">("ALL");

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ });
      const res = await fetch(`/api/auth/users/driver?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load drivers");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/auth/users/driver/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j?.message ?? "Delete failed");
    }
    toast.success("Driver deleted");
    load();
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const now = Date.now();

  const filtered = items.filter((d) => {
    if (assignFilter === "ASSIGNED" && !d.vehicle) return false;
    if (assignFilter === "UNASSIGNED" && d.vehicle) return false;
    if (licenseFilter === "EXPIRED") {
      if (!d.licenseExp || new Date(d.licenseExp).getTime() > now) return false;
    }
    if (licenseFilter === "EXPIRING") {
      if (!d.licenseExp) return false;
      const days = Math.ceil((new Date(d.licenseExp).getTime() - now) / (1000 * 60 * 60 * 24));
      if (days < 0 || days > 30) return false;
    }
    return true;
  });

  const assignedCount = items.filter((d) => d.vehicle).length;
  const expiredCount = items.filter((d) => d.licenseExp && new Date(d.licenseExp).getTime() < now).length;
  const expiringCount = items.filter((d) => {
    if (!d.licenseExp) return false;
    const days = Math.ceil((new Date(d.licenseExp).getTime() - now) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 30;
  }).length;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* Alert banner */}
        {(expiredCount > 0 || expiringCount > 0) && (
          <div className="flex items-center justify-center gap-2 text-xs py-2 font-semibold tracking-widest uppercase bg-amber-900/60 text-amber-300 border-b border-amber-700">
            <span>⚠</span>
            <span>
              {expiredCount > 0 && `${expiredCount} expired license(s) · `}
              {expiringCount > 0 && `${expiringCount} expiring within 30 days`}
            </span>
            <button onClick={() => setLicenseFilter("EXPIRED")} className="underline underline-offset-2 hover:text-white">
              View →
            </button>
          </div>
        )}

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-base font-bold tracking-wider">Drivers</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{total} registered drivers</p>
            </div>
            {/* <button
              onClick={() => router.push("/drivers/create")}
              className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
            >
              + Add Driver
            </button> */}
          </div>

          {/* Filter bar */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, phone or license…"
                className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40"
              />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>

            {(["ALL", "ASSIGNED", "UNASSIGNED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setAssignFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                  assignFilter === f ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {f === "ALL" ? "All" : f === "ASSIGNED" ? `✓ Assigned (${assignedCount})` : `○ No Vehicle (${total - assignedCount})`}
              </button>
            ))}

            {(["ALL", "EXPIRED", "EXPIRING"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setLicenseFilter(f)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                  licenseFilter === f
                    ? f === "EXPIRED" ? "bg-red-700 text-white" : f === "EXPIRING" ? "bg-amber-700 text-white" : "bg-[#C8A96E] text-[#0D1117]"
                    : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {f === "ALL" ? "All Licenses" : f === "EXPIRED" ? `✕ Expired (${expiredCount})` : `⚠ Expiring (${expiringCount})`}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Drivers", value: total, accent: "#3E6B8C", icon: "👤" },
              { label: "Assigned to Truck", value: assignedCount, accent: "#5C9669", icon: "🚛" },
              { label: "Expired Licenses", value: expiredCount, accent: "#8C3E3E", icon: "❌", alert: expiredCount > 0 },
              { label: "Expiring Soon", value: expiringCount, accent: "#C8A96E", icon: "⚠️", alert: expiringCount > 0 },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative bg-[#161B22] border rounded-xl p-4 overflow-hidden ${s.alert ? "border-amber-700/40" : "border-white/[0.06]"}`}
              >
                {s.alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</span>
                    <span>{s.icon}</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">{s.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── TABLE ── */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {filtered.length} driver{filtered.length !== 1 ? "s" : ""}
              </span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Driver", "Contact", "License", "Assigned Vehicle", "Added", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((d, i) => (
                      <motion.tr
                        key={d.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Driver */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full border border-white/10 bg-[#0D1117] flex-shrink-0 bg-center bg-cover"
                              style={{ backgroundImage: d.profileImage ? `url(${d.profileImage})` : undefined }}
                            >
                              {!d.profileImage && (
                                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm rounded-full font-bold">
                                  {d.name[0].toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">{d.name}</div>
                              <div className="text-zinc-600 text-[10px] truncate max-w-[140px]">{d.address}</div>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-5">
                          <div className="font-mono text-zinc-400">{d.phone ?? "—"}</div>
                        </td>

                        {/* License */}
                        <td className="py-3.5 px-5">
                          <div className="text-zinc-300 font-mono text-[10px] mb-1">{d.licenseNo ?? "—"}</div>
                          {licensePill(d.licenseExp)}
                          {d.licenseExp && (
                            <div className="text-[10px] text-zinc-600 mt-0.5">{fmt(d.licenseExp)}</div>
                          )}
                        </td>

                        {/* Vehicle */}
                        <td className="py-3.5 px-5">
                          {d.vehicle ? (
                            <div
                              className="cursor-pointer group"
                              onClick={(e) => { e.stopPropagation(); router.push(`/manager/vehicles/${d.vehicle!.id}`); }}
                            >
                              <div className="font-mono text-[#C8A96E] font-semibold group-hover:underline">{d.vehicle.plateNumber}</div>
                              <div className="text-zinc-500 text-[10px]">{d.vehicle.cap_no}</div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              Unassigned
                            </span>
                          )}
                        </td>

                        {/* Added */}
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{fmt(d.createdAt)}</td>

                        {/* Actions */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => router.push(`/manager/drivers/${d.id}`)}
                              className="px-2 py-1 rounded text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                            >
                              View
                            </button>
                            {/* <button
                              onClick={() => router.push(`/manager/drivers/update/${d.id}`)}
                              className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors"
                            >
                              Edit
                            </button> */}
                            {/* <ConfirmDeleteButton onConfirm={() => handleDelete(d.id)} /> */}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-zinc-600">
                        {q ? `No drivers matching "${q}"` : "No drivers found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} drivers</span>
                <div className="flex items-center gap-1">
                  <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">← Prev</button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                    const p = start + i;
                    return (
                      <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded text-xs font-mono transition-colors ${p === page ? "bg-[#C8A96E] text-[#0D1117] font-bold" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>{p}</button>
                    );
                  })}
                  <button disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">Next →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
