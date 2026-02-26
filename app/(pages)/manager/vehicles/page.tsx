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

// type VehicleRow = { id:string; make:string; model?:string; year:string; cap_no?:string; plateNumber:string; fuelType:string; driverId:string; };

// export default function UsersPage() {
//   const [items, setItems] = useState<VehicleRow[]>([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [total, setTotal] = useState(0);
//   const [q, setQ] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   async function load() {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/vehicles?page=${page}&limit=${limit}&search=${encodeURIComponent(q)}`);
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed");
//       console.log("list of trucks",json.items)
//       setItems(json.items || []);
//       setTotal(json.total || 0);
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Failed to load users");
//     } finally { setLoading(false); }
//   }

//   useEffect(()=>{ load() }, [page, q]);

//   async function handleDelete(id:string) {
//     const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
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
//       <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
//         <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}>
//           <Card className="p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold">Users</h2>
//               <div className="flex items-center gap-2">
//                 <input className="border px-2 py-1 rounded" placeholder="Search vin, cap or plate number" value={q} onChange={(e)=>setQ(e.target.value)} />
//                 <Button onClick={()=>router.push("/vehicles/create")}>Upload truck</Button>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="text-left">
//                     <th className="p-2">Make</th>
//                     <th className="p-2">Model</th>
//                     <th className="p-2">Year</th>
//                     <th className="p-2">Cap Number No</th>
//                     <th className="p-2">Fuel Type</th>
                    
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map(u => (
//                     <tr key={u.id} className="border-t">
//                       <td className="p-2">{u.make || "—"}</td>
//                       <td className="p-2">{u.model}</td>
//                       <td className="p-2">{u.year}</td>
//                       <td className="p-2">{u.cap_no}</td>
//                       <td className="p-2">{u.fuelType}</td>
//                       {/* <td className="p-2">{new Date(u.createdAt).toLocaleString()}</td> */}
//                       <td className="p-2 flex gap-2">
//                         <Button onClick={()=>router.push(`/vehicles/${u.id}`)}>Truck Detail</Button>
//                         {/* <Button onClick={()=>router.push(`/vehicles/update/${u.id}`)}>Assign</Button> */}
                        
//                         {/* {u.driverId?(
//                           <>
//                             <ConfirmButton onConfirm={()=>removeDriver(u.id)} label="Remove driver" confirmText="Are Sure you want to Remove driver from this truck" />
//                               </>
//                             ):("")} */}
//                         <ConfirmButton onConfirm={()=>handleDelete(u.id)} label="Delete" confirmText="Delete this Truck? This action is reversible via Restore only by DB." />
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

// src/app/admin/vehicles/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type VehicleRow = {
  id: string;
  vin?: string | null;
  plateNumber: string;
  cap_no: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  fuelType: string;
  currentOdo?: number | null;
  vehicleImg?: string | null;
  driverId?: string | null;
  driver?: { id: string; name: string; phone?: string; profileImage?: string } | null;
  createdAt: string;
};

// ─── Constants ──────────────────────────────────────────────────────────────
const FUEL_STYLES: Record<string, string> = {
  DIESEL:   "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  PETROL:   "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  CNG:      "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  ELECTRIC: "bg-[#7B4E8C]/20 text-purple-400 border border-[#7B4E8C]/30",
  OTHER:    "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
};

const FUEL_ICONS: Record<string, string> = {
  DIESEL: "⛽", PETROL: "🔴", CNG: "💨", ELECTRIC: "⚡", OTHER: "🔧",
};

const fmt = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

// ─── Inline confirm-delete ───────────────────────────────────────────────────
function ConfirmDeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [phase, setPhase] = useState<"idle" | "confirm" | "loading">("idle");

  async function handleConfirm() {
    setPhase("loading");
    try { await onConfirm(); } catch { setPhase("idle"); }
  }

  if (phase === "idle")
    return (
      <button
        onClick={() => setPhase("confirm")}
        className="px-2 py-1 rounded text-xs border border-red-800/40 text-red-400 hover:bg-red-900/20 transition-colors"
      >
        Delete
      </button>
    );

  if (phase === "confirm")
    return (
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-zinc-500">Sure?</span>
        <button
          onClick={handleConfirm}
          className="px-2 py-1 rounded text-xs bg-red-900/40 text-red-400 border border-red-700/40 hover:bg-red-900/60 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={() => setPhase("idle")}
          className="px-2 py-1 rounded text-xs border border-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          No
        </button>
      </div>
    );

  return <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />;
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function VehiclesListPage() {
  const router = useRouter();
  const [items, setItems] = useState<VehicleRow[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [fuelFilter, setFuelFilter] = useState("ALL");
  const [driverFilter, setDriverFilter] = useState<"ALL" | "ASSIGNED" | "UNASSIGNED">("ALL");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ });
      const res = await fetch(`/api/vehicles?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ]);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/vehicles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j?.message ?? "Delete failed");
    }
    toast.success("Vehicle deleted");
    load();
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Client-side filters
  const filtered = items.filter((v) => {
    if (fuelFilter !== "ALL" && v.fuelType !== fuelFilter) return false;
    if (driverFilter === "ASSIGNED" && !v.driverId) return false;
    if (driverFilter === "UNASSIGNED" && v.driverId) return false;
    return true;
  });

  // Counts for summary cards
  const fuelCounts = items.reduce((acc, v) => { acc[v.fuelType] = (acc[v.fuelType] ?? 0) + 1; return acc; }, {} as Record<string, number>);
  const assignedCount = items.filter((v) => v.driverId).length;
  const unassignedCount = items.filter((v) => !v.driverId).length;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-base font-bold tracking-wider">Vehicles</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{total} total trucks in fleet</p>
            </div>
            {/* <button
              onClick={() => router.push("/vehicles/create")}
              className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
            >
              + Upload Truck
            </button> */}
          </div>

          {/* Search + Filter bar */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search plate, VIN or CAP no…"
                className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40"
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>
              )}
            </div>

            {/* Fuel filter */}
            <div className="flex gap-1 flex-wrap">
              {["ALL", "DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFuelFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    fuelFilter === f
                      ? "bg-[#C8A96E] text-[#0D1117]"
                      : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {f === "ALL" ? `All Fuel` : `${FUEL_ICONS[f]} ${f}`}
                </button>
              ))}
            </div>

            {/* Driver assignment filter */}
            <div className="flex gap-1 ml-auto">
              {(["ALL", "ASSIGNED", "UNASSIGNED"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDriverFilter(d)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    driverFilter === d
                      ? "bg-[#C8A96E] text-[#0D1117]"
                      : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {d === "ALL" ? "All" : d === "ASSIGNED" ? `✓ Assigned (${assignedCount})` : `○ No Driver (${unassignedCount})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Vehicles", value: total, accent: "#3E6B8C", icon: "🚛" },
              { label: "Assigned",       value: assignedCount, accent: "#5C9669", icon: "✅" },
              { label: "Unassigned",     value: unassignedCount, accent: "#8C3E3E", icon: "⚠️", alert: unassignedCount > 0 },
              { label: "Fuel Types",     value: Object.keys(fuelCounts).length, accent: "#C8A96E", icon: "⛽" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`relative bg-[#161B22] border rounded-xl p-4 overflow-hidden ${
                  s.alert ? "border-amber-700/40" : "border-white/[0.06]"
                }`}
              >
                {s.alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }}
                />
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

          {/* ── Fuel breakdown mini bar ── */}
          {Object.keys(fuelCounts).length > 0 && total > 0 && (
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Fleet Fuel Breakdown</span>
              </div>
              <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                {Object.entries(fuelCounts).map(([fuel, count], i) => {
                  const PALETTE = ["#C8A96E", "#3E6B8C", "#5C9669", "#7B4E8C", "#8C3E3E"];
                  return (
                    <div
                      key={fuel}
                      className="h-full transition-all"
                      style={{ width: `${(count / total) * 100}%`, background: PALETTE[i % PALETTE.length] }}
                      title={`${fuel}: ${count}`}
                    />
                  );
                })}
              </div>
              <div className="flex gap-4 mt-2 flex-wrap">
                {Object.entries(fuelCounts).map(([fuel, count], i) => {
                  const PALETTE = ["#C8A96E", "#3E6B8C", "#5C9669", "#7B4E8C", "#8C3E3E"];
                  return (
                    <div key={fuel} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                      <span className="text-[10px] text-zinc-500">{FUEL_ICONS[fuel]} {fuel} ({count})</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── TABLE ── */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
                {fuelFilter !== "ALL" ? ` · ${fuelFilter}` : ""}
                {driverFilter !== "ALL" ? ` · ${driverFilter.toLowerCase()}` : ""}
              </span>
              {loading && (
                <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Vehicle", "Plate / CAP", "Year & VIN", "Fuel Type", "Odometer", "Driver", "Added", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((v, i) => (
                      <motion.tr
                        key={v.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                      >
                        {/* Vehicle image + make/model */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-lg bg-[#0D1117] border border-white/10 flex-shrink-0 bg-center bg-cover"
                              style={{ backgroundImage: v.vehicleImg ? `url(${v.vehicleImg})` : undefined }}
                            >
                              {!v.vehicleImg && (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-base rounded-lg">
                                  🚛
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {[v.make, v.model].filter(Boolean).join(" ") || "Unknown"}
                              </div>
                              <div className="text-zinc-600 text-[10px]">ID: {v.id.slice(0, 8)}…</div>
                            </div>
                          </div>
                        </td>

                        {/* Plate / CAP */}
                        <td className="py-3.5 px-5">
                          <div className="font-mono text-[#C8A96E] font-semibold">{v.plateNumber}</div>
                          <div className="text-zinc-500 text-[10px] mt-0.5">{v.cap_no}</div>
                        </td>

                        {/* Year + VIN */}
                        <td className="py-3.5 px-5">
                          <div className="text-zinc-300">{v.year ?? "—"}</div>
                          {v.vin && <div className="text-zinc-600 text-[10px] font-mono mt-0.5">{v.vin}</div>}
                        </td>

                        {/* Fuel type */}
                        <td className="py-3.5 px-5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${FUEL_STYLES[v.fuelType] ?? FUEL_STYLES.OTHER}`}>
                            {FUEL_ICONS[v.fuelType]} {v.fuelType}
                          </span>
                        </td>

                        {/* Odometer */}
                        <td className="py-3.5 px-5 font-mono text-zinc-400">
                          {v.currentOdo != null ? `${Number(v.currentOdo).toLocaleString("en-NG")} km` : "—"}
                        </td>

                        {/* Driver */}
                        <td className="py-3.5 px-5">
                          {v.driver ? (
                            <div
                              className="flex items-center gap-2 cursor-pointer group/driver"
                              onClick={(e) => { e.stopPropagation(); router.push(`/manager/drivers/${v.driver!.id}`); }}
                            >
                              <div
                                className="w-6 h-6 rounded-full border border-white/10 bg-[#0D1117] flex-shrink-0 bg-center bg-cover"
                                style={{ backgroundImage: v.driver.profileImage ? `url(${v.driver.profileImage})` : undefined }}
                              >
                                {!v.driver.profileImage && (
                                  <div className="w-full h-full flex items-center justify-center text-zinc-500 text-[10px] rounded-full">
                                    {v.driver.name[0].toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="text-zinc-300 group-hover/driver:text-[#C8A96E] transition-colors">{v.driver.name}</div>
                                {v.driver.phone && <div className="text-zinc-600 text-[10px] font-mono">{v.driver.phone}</div>}
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] text-amber-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              No driver
                            </span>
                          )}
                        </td>

                        {/* Added */}
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{fmt(v.createdAt)}</td>

                        {/* Actions */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => router.push(`/manager/vehicles/${v.id}`)}
                              className="px-2 py-1 rounded text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors whitespace-nowrap"
                            >
                              Details
                            </button>
                            {/* <button
                              onClick={() => router.push(`/manager/vehicles/update/${v.id}`)}
                              className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors whitespace-nowrap"
                            >
                              {v.driverId ? "Reassign" : "Assign"}
                            </button>
                            <ConfirmDeleteButton onConfirm={() => handleDelete(v.id)} /> */}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-zinc-600">
                        {q ? `No vehicles matching "${q}"` : "No vehicles found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  Page {page} of {totalPages} · {total} vehicles
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                    const p = start + i;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-7 h-7 rounded text-xs font-mono transition-colors ${
                          p === page
                            ? "bg-[#C8A96E] text-[#0D1117] font-bold"
                            : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
