// src/app/admin/maintenance/tires/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type TireRow = {
  id: string;
  brand?: string | null;
  size?: string | null;
  serialNumber?: string | null;
  position: string;
  status: string;
  fittedOdometerKm?: number | null;
  removedOdometerKm?: number | null;
  kmCovered?: number | null;
  treadDepthMm?: number | null;
  expectedLifeKm?: number | null;
  unitCost?: number | null;
  fittedDate?: string | null;
  removedDate?: string | null;
  vehicle?: { id: string; plateNumber: string; cap_no: string } | null;
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  FITTED:    "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  REPLACED:  "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  RETREADED: "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  SCRAPPED:  "bg-red-900/20 text-red-400 border border-red-800/30",
};

const POSITION_LABELS: Record<string, string> = {
  FRONT_LEFT: "FL", FRONT_RIGHT: "FR", REAR_LEFT_INNER: "RLI", REAR_LEFT_OUTER: "RLO",
  REAR_RIGHT_INNER: "RRI", REAR_RIGHT_OUTER: "RRO", SPARE: "SP", OTHER: "—",
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

function LifeBar({ km, expected }: { km?: number | null; expected?: number | null }) {
  if (!km || !expected) return <span className="text-zinc-600 text-[10px]">—</span>;
  const pct = Math.min(100, Math.round((km / expected) * 100));
  const color = pct >= 90 ? "#8C3E3E" : pct >= 70 ? "#C8A96E" : "#5C9669";
  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-[10px]">
        <span className="text-zinc-500">{km.toLocaleString("en-NG")} km</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden w-20">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function TiresListPage() {
  const router = useRouter();
  const [items, setItems]   = useState<TireRow[]>([]);
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
      const qs  = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ, ...(status !== "ALL" ? { status } : {}) });
      const res  = await fetch(`/api/maintenance/tires?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []); setTotal(json.total ?? 0);
    } catch (err: any) { toast.error(err?.message ?? "Failed to load tires"); }
    finally { setLoading(false); }
  }, [page, debouncedQ, status]);

  useEffect(() => { load(); }, [load]);

  async function deleteTire(id: string) {
    const res = await fetch(`/api/maintenance/tires/${id}`, { method: "DELETE" });
    if (!res.ok) { toast.error("Delete failed"); return; }
    toast.success("Tire deleted"); load();
  }

  const totalPages    = Math.max(1, Math.ceil(total / limit));
  const fittedCount   = items.filter(t => t.status === "FITTED").length;
  const wornCount     = items.filter(t => t.kmCovered && t.expectedLifeKm && (t.kmCovered / t.expectedLifeKm) >= 0.9).length;
  const totalSpend    = items.reduce((s:number, t) => s + (t.unitCost ?? 0), 0);

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div><h1 className="text-base font-bold tracking-wider">Tires</h1><p className="text-xs text-zinc-500 mt-0.5">{total} tire records</p></div>
            <button onClick={() => router.push("/maintenance/tires/create")} className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors">+ Log Tire</button>
          </div>
          {wornCount > 0 && (
            <div className="max-w-7xl mx-auto px-6 pb-3">
              <div className="flex items-center gap-3 bg-amber-900/20 border border-amber-700/30 rounded-lg px-4 py-2">
                <span className="text-amber-400 text-xs">⚠</span>
                <span className="text-xs text-amber-300">{wornCount} tire{wornCount > 1 ? "s" : ""} at or near end of expected life — inspect & replace</span>
              </div>
            </div>
          )}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search brand, size, serial, vehicle…" className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40" />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>
            {["ALL", "FITTED", "REPLACED", "RETREADED", "SCRAPPED"].map(s => (
              <button key={s} onClick={() => { setStatus(s); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${status === s ? "bg-[#C8A96E] text-[#0D1117]" : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"}`}>
                {s === "ALL" ? "All" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Tires",    value: total,               icon: "⭕", accent: "#3E6B8C" },
              { label: "Fitted",         value: fittedCount,         icon: "✓",  accent: "#5C9669" },
              { label: "Near End of Life", value: wornCount,         icon: "⚠", accent: "#8C6E3E", alert: wornCount > 0 },
              { label: "Total Spend",    value: fmtCost(totalSpend), icon: "₦",  accent: "#C8A96E" },
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
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">{items.length} tire{items.length !== 1 ? "s" : ""}</span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-white/[0.06]">
                  {["Tire", "Vehicle", "Position", "Status", "Life Used", "Tread", "Cost", "Fitted", ""].map(h => (
                    <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((tire, i) => (
                      <motion.tr key={tire.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.015 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-semibold text-zinc-200">{tire.brand ?? "—"}</div>
                          <div className="text-zinc-600 text-[10px] font-mono mt-0.5">{tire.size ?? "—"}</div>
                          {tire.serialNumber && <div className="text-zinc-700 text-[10px]">{tire.serialNumber}</div>}
                        </td>
                        <td className="py-3.5 px-5">
                          {tire.vehicle ? <button onClick={() => router.push(`/vehicles/${tire.vehicle!.id}`)} className="text-left hover:text-[#C8A96E] transition-colors"><div className="font-mono text-[#C8A96E]">{tire.vehicle.plateNumber}</div><div className="text-zinc-600 text-[10px]">{tire.vehicle.cap_no}</div></button> : <span className="text-zinc-600">—</span>}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                            {POSITION_LABELS[tire.position] ?? tire.position}
                          </span>
                        </td>
                        <td className="py-3.5 px-5"><span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${STATUS_STYLES[tire.status] ?? STATUS_STYLES.FITTED}`}>{tire.status}</span></td>
                        <td className="py-3.5 px-5"><LifeBar km={tire.kmCovered} expected={tire.expectedLifeKm} /></td>
                        <td className="py-3.5 px-5 font-mono text-zinc-400">{tire.treadDepthMm ? `${tire.treadDepthMm} mm` : "—"}</td>
                        <td className="py-3.5 px-5 font-mono text-zinc-300">{tire.unitCost ? fmtCost(tire.unitCost) : "—"}</td>
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{tire.fittedDate ? fmt(tire.fittedDate) : "—"}</td>
                        <td className="py-3.5 px-5"><div className="flex items-center gap-2"><button onClick={() => router.push(`/maintenance/tires/${tire.id}`)} className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors">Edit</button><ConfirmDeleteButton onConfirm={() => deleteTire(tire.id)} /></div></td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {!loading && items.length === 0 && <tr><td colSpan={9} className="py-16 text-center text-zinc-600">{q ? `No tires matching "${q}"` : "No tires logged yet"}</td></tr>}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} tires</span>
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
