// src/app/admin/vehicles/deleted/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Types ────────────────────────────────────────────────────────────────────
type DeletedVehicle = {
  id: string;
  vin?: string | null;
  plateNumber: string;
  cap_no: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  fuelType: string;
  vehicleImg?: string | null;
  currentOdo?: number | null;
  deletedAt: string;
  createdAt: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const FUEL_STYLES: Record<string, string> = {
  DIESEL:   "bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30",
  PETROL:   "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  CNG:      "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  ELECTRIC: "bg-[#7B4E8C]/20 text-purple-400 border border-[#7B4E8C]/30",
  OTHER:    "bg-zinc-700/30 text-[#6B6560] border border-zinc-600/30",
};

const FUEL_ICONS: Record<string, string> = {
  DIESEL: "⛽", PETROL: "🔴", CNG: "💨", ELECTRIC: "⚡", OTHER: "🔧",
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

const timeAgo = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30)  return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

// ─── Inline confirm restore ───────────────────────────────────────────────────
function ConfirmRestoreButton({ onConfirm, loading }: {
  onConfirm: () => Promise<void>; loading?: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "confirm">("idle");

  async function handle() {
    setPhase("idle");
    await onConfirm();
  }

  if (phase === "idle")
    return (
      <button
        onClick={() => setPhase("confirm")}
        className="px-2 py-1 rounded text-xs border border-emerald-700/40 text-emerald-400
          hover:bg-emerald-900/20 transition-colors whitespace-nowrap"
      >
        Restore
      </button>
    );

  return (
    <div className="flex items-center gap-1">
      <span className="text-[10px] text-[#9C9590]">Restore?</span>
      <button
        onClick={handle}
        disabled={loading}
        className="px-2 py-1 rounded text-xs bg-emerald-900/40 text-emerald-400
          border border-emerald-700/40 hover:bg-emerald-900/60 transition-colors
          disabled:opacity-50 flex items-center gap-1"
      >
        {loading && <div className="w-2.5 h-2.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />}
        Yes
      </button>
      <button
        onClick={() => setPhase("idle")}
        className="px-2 py-1 rounded text-xs border border-white/10 text-[#9C9590]
          hover:text-[#2C2825] transition-colors"
      >
        No
      </button>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-white/[0.04] animate-pulse rounded-lg ${className}`} />;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DeletedVehiclesPage() {
  const router = useRouter();
  const [items,      setItems]      = useState<DeletedVehicle[]>([]);
  const [total,      setTotal]      = useState(0);
  const [page,       setPage]       = useState(1);
  const [q,          setQ]          = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [restoring,  setRestoring]  = useState<string | null>(null);
  const limit = 10;

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  // ── Fetch deleted vehicles ──────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit), search: debouncedQ });
      const res = await fetch(`/api/vehicles/deleted?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed to load");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load deleted vehicles");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ]);

  useEffect(() => { load(); }, [load]);

  // ── Restore vehicle ─────────────────────────────────────────────────────────
  async function handleRestore(id: string) {
    setRestoring(id);
    try {
      const res  = await fetch(`/api/vehicles/deleted/${id}`, { method: "PATCH" });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Vehicle restored successfully");
        load();
        return;
      }
      toast.error(json?.message ?? "Restore failed");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setRestoring(null);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#F8F6F1] text-[#1C1917]"
        style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="border-b border-[#E8E2D9] bg-[#F8F6F1]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.push("/vehicles")}
              className="text-[#9C9590] hover:text-[#1C1917] transition-colors text-lg leading-none">←</button>
            <div className="flex-1">
              <h1 className="text-base font-bold tracking-wider flex items-center gap-2">
                <span className="text-red-400">🗑</span> Deleted Vehicles
              </h1>
              <p className="text-xs text-[#9C9590] mt-0.5">
                {total} vehicle{total !== 1 ? "s" : ""} soft-deleted · Admin only
              </p>
            </div>
            <button
              onClick={() => router.push("/vehicles")}
              className="px-4 py-2 rounded-lg text-xs border border-[#E8E2D9] text-[#6B6560]
                hover:text-[#1C1917] hover:border-[#B8860B]/30 transition-colors"
            >
              ← Active Vehicles
            </button>
          </div>

          {/* Search bar */}
          <div className="max-w-7xl mx-auto px-6 pb-3">
            <div className="relative max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9C9590] text-xs">🔍</span>
              <input
                type="text" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search plate, VIN or CAP no…"
                className="w-full bg-white border border-[#E8E2D9] rounded-lg pl-7 pr-7 py-1.5
                  text-xs text-[#2C2825] placeholder-[#B0AAA4] focus:outline-none focus:border-[#B8860B]/40"
              />
              {q && (
                <button onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9C9590] hover:text-[#2C2825]">✕</button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">

          {/* ── INFO BANNER ──────────────────────────────────────────────── */}
          <div className="bg-amber-900/10 border border-amber-700/30 rounded-xl px-5 py-4
            flex items-start gap-3">
            <span className="text-amber-400 text-base mt-0.5">⚠</span>
            <div>
              <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-0.5">
                Soft-deleted records
              </p>
              <p className="text-[10px] text-[#9C9590] leading-relaxed">
                These vehicles were soft-deleted and are hidden from all active fleet views.
                All trips, maintenance records, and driver history linked to them are preserved.
                Restoring a vehicle makes it fully active again. Only admins can restore vehicles.
              </p>
            </div>
          </div>

          {/* ── STAT CARDS ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Deleted",   value: total,                                                      icon: "🗑",  accent: "#8C3E3E" },
              { label: "Deleted Today",   value: items.filter(v => timeAgo(v.deletedAt) === "Today").length, icon: "📅", accent: "#B8860B" },
              { label: "Older Than 30d",  value: items.filter(v => {
                const days = Math.floor((Date.now() - new Date(v.deletedAt).getTime()) / 86_400_000);
                return days > 30;
              }).length, icon: "📦", accent: "#3E6B8C" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative bg-white border border-[#E8E2D9] rounded-xl p-4 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 80% 20%, ${s.accent} 0%, transparent 70%)` }} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9C9590] uppercase tracking-wider">{s.label}</span>
                    <span>{s.icon}</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#1C1917]">{s.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── TABLE ────────────────────────────────────────────────────── */}
          <div className="bg-white border border-[#E8E2D9] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E8E2D9] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6560]">
                {items.length} result{items.length !== 1 ? "s" : ""}
                {q && ` for "${q}"`}
              </span>
              {loading && (
                <div className="w-4 h-4 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            {loading && items.length === 0 ? (
              <div className="p-6 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E2D9]">
                      {["Vehicle", "Plate / CAP", "Year & VIN", "Fuel", "Odometer", "Deleted", "Actions"].map((h) => (
                        <th key={h}
                          className="text-left py-3 px-5 text-[#9C9590] font-semibold uppercase
                            tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {items.map((v, i) => (
                        <motion.tr
                          key={v.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.02 }}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                        >
                          {/* Vehicle image + make/model */}
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-9 h-9 rounded-lg border border-white/10 flex-shrink-0
                                  bg-[#F8F6F1] bg-center bg-cover opacity-60"
                                style={{ backgroundImage: v.vehicleImg ? `url(${v.vehicleImg})` : undefined }}
                              >
                                {!v.vehicleImg && (
                                  <div className="w-full h-full flex items-center justify-center text-[#9C9590] text-base rounded-lg">
                                    🚛
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-[#6B6560]">
                                  {[v.make, v.model].filter(Boolean).join(" ") || "Unknown"}
                                </div>
                                <div className="text-[#B0AAA4] text-[10px]">Added {fmt(v.createdAt)}</div>
                              </div>
                            </div>
                          </td>

                          {/* Plate / CAP */}
                          <td className="py-3.5 px-5">
                            <div className="font-mono text-[#6B6560] font-semibold line-through decoration-red-700/50">
                              {v.plateNumber}
                            </div>
                            <div className="text-[#9C9590] text-[10px] mt-0.5">{v.cap_no}</div>
                          </td>

                          {/* Year + VIN */}
                          <td className="py-3.5 px-5">
                            <div className="text-[#9C9590]">{v.year ?? "—"}</div>
                            {v.vin && <div className="text-[#B0AAA4] text-[10px] font-mono mt-0.5">{v.vin}</div>}
                          </td>

                          {/* Fuel */}
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded
                              text-[10px] font-bold uppercase tracking-wider opacity-70
                              ${FUEL_STYLES[v.fuelType] ?? FUEL_STYLES.OTHER}`}>
                              {FUEL_ICONS[v.fuelType]} {v.fuelType}
                            </span>
                          </td>

                          {/* Odometer */}
                          <td className="py-3.5 px-5 font-mono text-[#9C9590]">
                            {v.currentOdo != null
                              ? `${Number(v.currentOdo).toLocaleString("en-NG")} km`
                              : "—"}
                          </td>

                          {/* Deleted */}
                          <td className="py-3.5 px-5">
                            <div className="text-red-400 font-bold text-[10px]">{timeAgo(v.deletedAt)}</div>
                            <div className="text-[#B0AAA4] text-[10px] font-mono">{fmt(v.deletedAt)}</div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-5">
                            <ConfirmRestoreButton
                              onConfirm={() => handleRestore(v.id)}
                              loading={restoring === v.id}
                            />
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>

                    {!loading && items.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-20 text-center">
                          <div className="space-y-2">
                            <p className="text-3xl">✅</p>
                            <p className="text-[#9C9590] text-sm font-bold">No deleted vehicles</p>
                            <p className="text-[#B0AAA4] text-xs">
                              {q ? `No results for "${q}"` : "All vehicles are currently active"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── PAGINATION ── */}
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-[#E8E2D9] flex items-center justify-between">
                <span className="text-xs text-[#9C9590] font-mono">
                  Page {page} of {totalPages} · {total} deleted
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded text-xs border border-[#E8E2D9] text-[#9C9590]
                      hover:text-[#2C2825] disabled:opacity-30 transition-colors"
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                    const p = start + i;
                    return (
                      <button key={p} onClick={() => setPage(p)}
                        className={`w-7 h-7 rounded text-xs font-mono transition-colors ${
                          p === page
                            ? "bg-[#B8860B] text-[#0D1117] font-bold"
                            : "border border-[#E8E2D9] text-[#9C9590] hover:text-[#2C2825]"
                        }`}>
                        {p}
                      </button>
                    );
                  })}
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded text-xs border border-[#E8E2D9] text-[#9C9590]
                      hover:text-[#2C2825] disabled:opacity-30 transition-colors"
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
