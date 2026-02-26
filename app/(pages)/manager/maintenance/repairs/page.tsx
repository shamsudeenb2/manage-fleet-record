// src/app/admin/maintenance/repairs/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type RepairRow = {
  id: string;
  status: string;
  priority: string;
  faultDesc: string;
  repairDesc?: string | null;
  odometerKm?: number | null;
  laborCost?: number | null;
  totalCost?: number | null;
  garage?: string | null;
  reportedDate: string;
  completedDate?: string | null;
  vehicle?: { id: string; plateNumber: string; cap_no: string } | null;
  driver?: { id: string; name: string } | null;
  parts?: { id: string; name: string; totalCost: number }[];
};

const STATUS_STYLES: Record<string, string> = {
  OPEN:        "bg-red-900/20 text-red-400 border border-red-800/30",
  IN_PROGRESS: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  COMPLETED:   "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  CANCELLED:   "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
};

const PRIORITY_STYLES: Record<string, string> = {
  LOW:      "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30",
  MEDIUM:   "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  HIGH:     "bg-amber-900/20 text-amber-400 border border-amber-700/30",
  CRITICAL: "bg-red-900/30 text-red-300 border border-red-700/40 animate-pulse",
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

export default function RepairsListPage() {
  const router = useRouter();
  const [items, setItems]     = useState<RepairRow[]>([]);
  const [total, setTotal]     = useState(0);
  const [page, setPage]       = useState(1);
  const [q, setQ]             = useState("");
  const [debouncedQ, setDQ]   = useState("");
  const [status, setStatus]   = useState("ALL");
  const [priority, setPriority] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => { const t = setTimeout(() => { setDQ(q); setPage(1); }, 350); return () => clearTimeout(t); }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ, ...(status !== "ALL" ? { status } : {}), ...(priority !== "ALL" ? { priority } : {}) });
      const res  = await fetch(`/api/maintenance/repairs?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []); setTotal(json.total ?? 0);
    } catch (err: any) { toast.error(err?.message ?? "Failed to load repairs"); }
    finally { setLoading(false); }
  }, [page, debouncedQ, status, priority]);

  useEffect(() => { load(); }, [load]);

  async function deleteRepair(id: string) {
    const res = await fetch(`/api/maintenance/repairs/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    toast.success("Repair deleted"); load();
  }

  const totalPages    = Math.max(1, Math.ceil(total / limit));
  const openCount     = items.filter(r => r.status === "OPEN").length;
  const criticalCount = items.filter(r => r.priority === "CRITICAL" && r.status !== "COMPLETED").length;
  const totalSpend    = items.reduce((s, r) => s + (r.totalCost ?? 0), 0);

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div><h1 className="text-base font-bold tracking-wider">Repairs</h1><p className="text-xs text-zinc-500 mt-0.5">{total} repair records</p></div>
            <button onClick={() => router.push("/maintenance/repairs/create")} className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors">+ Log Repair</button>
          </div>
          {criticalCount > 0 && (
            <div className="max-w-7xl mx-auto px-6 pb-3">
              <div className="flex items-center gap-3 bg-red-900/30 border border-red-700/50 rounded-lg px-4 py-2 animate-pulse">
                <span className="text-red-300 text-xs">🚨</span>
                <span className="text-xs text-red-300 font-bold">{criticalCount} CRITICAL repair{criticalCount > 1 ? "s" : ""} require immediate attention</span>
              </div>
            </div>
          )}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search fault, vehicle, garage…" className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40" />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>
            {["ALL", "OPEN", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(s => (
              <button key={s} onClick={() => { setStatus(s); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${status === s ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>
                {s === "ALL" ? "All Status" : s.replace("_", " ")}
              </button>
            ))}
            <div className="w-px h-4 bg-white/[0.06]" />
            {["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"].map(p => (
              <button key={p} onClick={() => { setPriority(p); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${priority === p ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>
                {p === "ALL" ? "All Priority" : p}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Repairs",  value: total,                  icon: "🔨", accent: "#3E6B8C" },
              { label: "Open",           value: openCount,              icon: "⚠", accent: "#8C3E3E", alert: openCount > 0 },
              { label: "Critical",       value: criticalCount,          icon: "🚨", accent: "#8C3E3E", alert: criticalCount > 0 },
              { label: "Total Spend",    value: fmtCost(totalSpend),    icon: "₦",  accent: "#C8A96E" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`relative bg-[#161B22] border rounded-xl p-4 overflow-hidden ${s.alert ? "border-red-700/40" : "border-white/[0.06]"}`}>
                {s.alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" />}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }} />
                <div className="relative"><div className="flex items-center justify-between mb-2"><span className="text-xs text-zinc-500 uppercase tracking-wider">{s.label}</span><span>{s.icon}</span></div><div className="text-xl font-bold font-mono text-white">{s.value}</div></div>
              </motion.div>
            ))}
          </div>

          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{items.length} repair{items.length !== 1 ? "s" : ""}</span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.06]">
                  {["Vehicle", "Fault", "Priority", "Status", "Cost", "Garage", "Reported", ""].map(h => (
                    <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((repair, i) => (
                      <motion.tr key={repair.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.015 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5">
                          {repair.vehicle ? <button onClick={() => router.push(`/vehicles/${repair.vehicle!.id}`)} className="text-left hover:text-[#C8A96E] transition-colors"><div className="font-mono text-[#C8A96E]">{repair.vehicle.plateNumber}</div><div className="text-zinc-600 text-[10px]">{repair.vehicle.cap_no}</div></button> : <span className="text-zinc-600">—</span>}
                          {repair.driver && <div className="text-zinc-600 text-[10px] mt-0.5">{repair.driver.name}</div>}
                        </td>
                        <td className="py-3.5 px-5 max-w-[200px]"><div className="text-zinc-300 truncate">{repair.faultDesc}</div>{repair.parts && repair.parts.length > 0 && <div className="text-zinc-600 text-[10px] mt-0.5">{repair.parts.length} part{repair.parts.length > 1 ? "s" : ""}</div>}</td>
                        <td className="py-3.5 px-5"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${PRIORITY_STYLES[repair.priority] ?? PRIORITY_STYLES.MEDIUM}`}>{repair.priority}</span></td>
                        <td className="py-3.5 px-5"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[repair.status] ?? STATUS_STYLES.OPEN}`}>{repair.status.replace("_", " ")}</span></td>
                        <td className="py-3.5 px-5 font-mono text-zinc-300">{repair.totalCost ? fmtCost(repair.totalCost) : "—"}</td>
                        <td className="py-3.5 px-5 text-zinc-500 truncate max-w-[120px]">{repair.garage ?? "—"}</td>
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{fmt(repair.reportedDate)}</td>
                        <td className="py-3.5 px-5"><div className="flex items-center gap-2">
                          <button onClick={() => router.push(`/maintenance/repairs/${repair.id}`)} className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors">Edit</button>
                        <ConfirmDeleteButton onConfirm={() => deleteRepair(repair.id)} /></div></td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {!loading && items.length === 0 && <tr><td colSpan={8} className="py-16 text-center text-zinc-600">{q ? `No repairs matching "${q}"` : "No repairs logged yet"}</td></tr>}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} repairs</span>
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
