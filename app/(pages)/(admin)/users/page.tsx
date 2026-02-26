// src/app/admin/users/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type UserRow = {
  id: string;
  email: string;
  name?: string;
  role: string;
  profileImage?: string;
  createdAt: string;
};

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  DATA_ENTRY: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  MANAGER: "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
};

const fmt = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function ConfirmDeleteButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
  const [phase, setPhase] = useState<"idle" | "confirm" | "loading">("idle");

  async function handleConfirm() {
    setPhase("loading");
    try {
      await onConfirm();
    } catch {
      setPhase("idle");
    }
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

  return (
    <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
  );
}

export default function UsersPage() {
  const router = useRouter();
  const [items, setItems] = useState<UserRow[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(q);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedQ,
      });
      const res = await fetch(`/api/auth/users/register?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    const res = await fetch(`/api/auth/users/register/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j?.message ?? "Delete failed");
    }
    toast.success("User deleted");
    load();
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Client-side role filter (since API doesn't support it yet)
  const filtered = roleFilter === "ALL" ? items : items.filter((u) => u.role === roleFilter);

  const roleCounts = items.reduce(
    (acc, u) => { acc[u.role] = (acc[u.role] ?? 0) + 1; return acc; },
    {} as Record<string, number>
  );

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-base font-bold tracking-wider">Users</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{total} total registered users</p>
            </div>
            <button
              onClick={() => router.push("/users/create")}
              className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
            >
              + Create User
            </button>
          </div>

          {/* Search + Filter bar */}
          <div className="max-w-6xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name or email…"
                className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-3 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Role filter pills */}
            <div className="flex gap-1">
              {["ALL", "ADMIN", "DATA_ENTRY", "MANAGER"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    roleFilter === r
                      ? "bg-[#C8A96E] text-[#0D1117]"
                      : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {r === "ALL" ? `All (${total})` : `${r.replace("_", " ")} (${roleCounts[r] ?? 0})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Users", value: total, accent: "#3E6B8C", icon: "👥" },
              { label: "Admins", value: roleCounts["ADMIN"] ?? 0, accent: "#C8A96E", icon: "🔐" },
              { label: "Data Entry", value: roleCounts["DATA_ENTRY"] ?? 0, accent: "#3E7B8C", icon: "📋" },
              { label: "MANAGERs", value: roleCounts["MANAGER"] ?? 0, accent: "#5C9669", icon: "🚛" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative bg-[#161B22] border border-white/[0.06] rounded-xl p-4 overflow-hidden"
              >
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

          {/* ── TABLE ── */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {filtered.length} user{filtered.length !== 1 ? "s" : ""}
                {roleFilter !== "ALL" ? ` · ${roleFilter.replace("_", " ")}` : ""}
              </span>
              {loading && (
                <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["User", "Email", "Role", "Created", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((u, i) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                      >
                        {/* User */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full bg-center bg-cover border border-white/10 flex-shrink-0 bg-[#0D1117]"
                              style={{
                                backgroundImage: u.profileImage
                                  ? `url(${u.profileImage})`
                                  : undefined,
                              }}
                            >
                              {!u.profileImage && (
                                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm rounded-full">
                                  {(u.name ?? u.email)[0].toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">{u.name ?? "—"}</div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-5 font-mono text-zinc-400">{u.email}</td>

                        {/* Role */}
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              ROLE_STYLES[u.role] ?? "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30"
                            }`}
                          >
                            {u.role.replace("_", " ")}
                          </span>
                        </td>

                        {/* Created */}
                        <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{fmt(u.createdAt)}</td>

                        {/* Actions */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            {/* <button
                              onClick={() => router.push(`/users/${u.id}`)}
                              className="px-2 py-1 rounded text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                            >
                              View
                            </button> */}
                            <button
                              onClick={() => router.push(`/users/update/${u.id}`)}
                              className="px-2 py-1 rounded text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors"
                            >
                              Edit
                            </button>
                            <ConfirmDeleteButton onConfirm={() => handleDelete(u.id)} />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>

                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-16 text-center text-zinc-600">
                        {q ? `No users matching "${q}"` : "No users found"}
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
                  Page {page} of {totalPages} · {total} users
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
