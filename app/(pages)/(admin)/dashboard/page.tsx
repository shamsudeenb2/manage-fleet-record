// // src/app/admin/dashboard/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { toast, Toaster } from "sonner";
// import { saveAs } from "file-saver";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { motion, AnimatePresence } from "framer-motion";
// import DashboardLayout from "@/components/layout/Dashboard";

// // ─── Types ─────────────────────────────────────────────────────────────────
// interface DashboardData {
//   start: string;
//   end: string;
//   totals: {
//     totalVehicles: number;
//     totalDrivers: number;
//     totalTrips: number;
//     totalDistance: number;
//     activeVehicles: number;
//     idleVehicles: number;
//     openRepairs: number;
//   };
//   fuel: {
//     byType: Record<string, { qtyGiven: number; fuelCost: number }>;
//     totalFuelGiven: number;
//     totalFuelCost: number;
//     fleetFuelEfficiency: number;
//     estimatedCO2Kg: number;
//   };
//   tires: { installed: number; rotated: number; removed: number };
//   costs: {
//     totalPartsCost: number;
//     totalRepairCost: number;
//     totalServiceCost: number;
//     totalMaintenanceCost: number;
//     costPerKm: number;
//   };
//   vehiclesInRepairs: number;
//   topVehicles: { vehicle: any; trips: number }[];
//   topDrivers: { driver: any; trips: number }[];
//   topFuelVehicles: { vehicle: any; qty: number; cost: number }[];
//   license: {
//     expired: { id: string; name: string; licenseExp: string; phone?: string }[];
//     aboutToExpire: { id: string; name: string; licenseExp: string; phone?: string }[];
//   };
//   services: { serviceType: string; count: number }[];
//   tripTrend: { date: string; count: number }[];
//   monthlyTripTrend: { month: string; count: number }[];
//   loadingPlantChart: { name: string; value: number }[];
//   destinationChart: { name: string; value: number }[];
//   tripStatusChart: { name: string; value: number }[];
//   maintenanceTrend: { month: string; cost: number }[];
// }

// // ─── Constants ─────────────────────────────────────────────────────────────
// const PALETTE = ["#C8A96E", "#3E6B8C", "#5C9669", "#8C5E3E", "#7B4E8C", "#8C3E3E", "#3E7B8C", "#6E8C3E"];

// const STATUS_COLORS: Record<string, string> = {
//   COMPLETED: "#5C9669",
//   IN_PROGRESS: "#C8A96E",
//   PLANNED: "#3E6B8C",
//   CANCELLED: "#8C3E3E",
// };

// const fmt = (n?: number | null, dec = 2) =>
//   n != null ? Number(n).toLocaleString("en-NG", { maximumFractionDigits: dec }) : "—";

// const naira = (n?: number | null) =>
//   n != null
//     ? `₦${Number(n).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
//     : "—";

// // ─── Sub-components ─────────────────────────────────────────────────────────
// function StatCard({
//   label,
//   value,
//   sub,
//   accent,
//   icon,
//   delay = 0,
//   alert,
//   onClick,
// }: {
//   label: string;
//   value: string | number;
//   sub?: string;
//   accent?: string;
//   icon?: string;
//   delay?: number;
//   alert?: boolean;
//   onClick?: () => void;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay }}
//       onClick={onClick}
//       className={`relative bg-[#161B22] border rounded-xl p-5 overflow-hidden ${
//         alert ? "border-red-700/50" : "border-white/[0.06]"
//       } ${onClick ? "cursor-pointer hover:border-white/20 transition-colors" : ""}`}
//     >
//       {alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" />}
//       <div
//         className="absolute inset-0 opacity-10 pointer-events-none"
//         style={{ background: `radial-gradient(circle at 80% 20%, ${accent ?? "#C8A96E"} 0%, transparent 70%)` }}
//       />
//       <div className="relative">
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">{label}</span>
//           <span className="text-zinc-600 text-lg">{icon}</span>
//         </div>
//         <div className="text-2xl font-bold text-white font-mono">{value}</div>
//         {sub && <div className="text-xs text-zinc-500 mt-1">{sub}</div>}
//       </div>
//     </motion.div>
//   );
// }

// function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
//   return (
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-400">{title}</h2>
//       {action}
//     </div>
//   );
// }

// function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`bg-[#161B22] border border-white/[0.06] rounded-xl p-5 ${className}`}>
//       {children}
//     </div>
//   );
// }

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-[#1C2330] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
//       <div className="text-zinc-400 mb-1">{label}</div>
//       {payload.map((p: any, i: number) => (
//         <div key={i} style={{ color: p.color }} className="font-mono">
//           {p.name}: {typeof p.value === "number" ? fmt(p.value) : p.value}
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── Main Page ──────────────────────────────────────────────────────────────
// export default function DashboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<DashboardData | null>(null);
//   const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "finance" | "compliance">("overview");
//   const [range, setRange] = useState(() => {
//     const now = new Date();
//     const end = now.toISOString().slice(0, 10);
//     const start = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
//     return { start, end };
//   });

//   const fetchData = useCallback(async (start?: string, end?: string) => {
//     setLoading(true);
//     try {
//       const qs = new URLSearchParams();
//       if (start) qs.set("startDate", new Date(start).toISOString());
//       if (end) qs.set("endDate", new Date(end).toISOString());
//       const res = await fetch(`/api/dashboard?${qs}`);
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message ?? "Failed");
//       setData(json.data);
//     } catch (err: any) {
//       toast.error(err?.message ?? "Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData(range.start, range.end);
//   }, []);

//   function exportCSV() {
//     if (!data) return toast.error("No data to export");
//     const rows: string[][] = [
//       ["Fleet Dashboard Report"],
//       ["Period", `${data.start} → ${data.end}`],
//       [],
//       ["Totals"],
//       ["Total Vehicles", String(data.totals.totalVehicles)],
//       ["Total Drivers", String(data.totals.totalDrivers)],
//       ["Total Trips", String(data.totals.totalTrips)],
//       ["Total Distance km", String(data.totals.totalDistance)],
//       ["Active Vehicles", String(data.totals.activeVehicles)],
//       ["Idle Vehicles", String(data.totals.idleVehicles)],
//       [],
//       ["Fuel"],
//       ["Total Fuel Given L", String(data.fuel.totalFuelGiven)],
//       ["Total Fuel Cost ₦", String(data.fuel.totalFuelCost)],
//       ["Fleet Efficiency km/L", String(data.fuel.fleetFuelEfficiency)],
//       ["Est. CO₂ kg", String(data.fuel.estimatedCO2Kg)],
//       [],
//       ["Costs"],
//       ["Parts Cost ₦", String(data.costs.totalPartsCost)],
//       ["Repair Cost ₦", String(data.costs.totalRepairCost)],
//       ["Service Cost ₦", String(data.costs.totalServiceCost)],
//       ["Total Maintenance ₦", String(data.costs.totalMaintenanceCost)],
//       ["Cost per km ₦", String(data.costs.costPerKm)],
//     ];
//     const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
//     saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `fleet_dashboard_${data.start.slice(0, 10)}.csv`);
//   }

//   const tabs = [
//     { key: "overview", label: "Overview" },
//     { key: "fleet", label: "Fleet & Drivers" },
//     { key: "finance", label: "Costs & Fuel" },
//     { key: "compliance", label: "Compliance" },
//   ] as const;

//   const licenseAlertCount =
//     (data?.license.expired.length ?? 0) + (data?.license.aboutToExpire.length ?? 0);

//   return (
//     <DashboardLayout>
//       <Toaster theme="dark" position="top-right" />
//       <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

//         {/* ── LICENSE / REPAIR ALERT BANNER ── */}
//         {!loading && licenseAlertCount > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-center justify-center gap-2 text-xs py-2 font-semibold tracking-widest uppercase bg-amber-900/60 text-amber-300 border-b border-amber-700"
//           >
//             <span>⚠</span>
//             <span>
//               {data!.license.expired.length > 0 &&
//                 `${data!.license.expired.length} driver license(s) EXPIRED · `}
//               {data!.license.aboutToExpire.length > 0 &&
//                 `${data!.license.aboutToExpire.length} expiring within 30 days`}
//             </span>
//             <button
//               onClick={() => setActiveTab("compliance")}
//               className="underline underline-offset-2 hover:text-white transition-colors"
//             >
//               View →
//             </button>
//           </motion.div>
//         )}

//         {/* ── HEADER ── */}
//         <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
//             <div>
//               <h1 className="text-base font-bold tracking-wider">Fleet Dashboard</h1>
//               <p className="text-xs text-zinc-500 mt-0.5">
//                 {data
//                   ? `${new Date(data.start).toLocaleDateString("en-NG")} → ${new Date(data.end).toLocaleDateString("en-NG")}`
//                   : "Loading…"}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-xs text-zinc-600 uppercase tracking-wider">Range</span>
//               <input
//                 type="date"
//                 value={range.start}
//                 onChange={(e) => setRange((r) => ({ ...r, start: e.target.value }))}
//                 className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"
//               />
//               <span className="text-zinc-600">→</span>
//               <input
//                 type="date"
//                 value={range.end}
//                 onChange={(e) => setRange((r) => ({ ...r, end: e.target.value }))}
//                 className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"
//               />
//               <button
//                 onClick={() => fetchData(range.start, range.end)}
//                 disabled={loading}
//                 className="px-3 py-1 rounded-lg text-xs bg-[#C8A96E]/10 text-[#C8A96E] border border-[#C8A96E]/30 hover:bg-[#C8A96E]/20 transition-colors disabled:opacity-50"
//               >
//                 {loading ? "Loading…" : "Apply"}
//               </button>
//               <button
//                 onClick={() => {
//                   const now = new Date();
//                   const newEnd = now.toISOString().slice(0, 10);
//                   const newStart = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
//                   setRange({ start: newStart, end: newEnd });
//                   fetchData(newStart, newEnd);
//                 }}
//                 className="px-3 py-1 rounded-lg text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={exportCSV}
//                 className="px-3 py-1 rounded-lg text-xs border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
//               >
//                 Export CSV
//               </button>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="max-w-7xl mx-auto px-6 flex gap-0 border-t border-white/[0.04]">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all relative ${
//                   activeTab === tab.key ? "text-[#C8A96E]" : "text-zinc-600 hover:text-zinc-400"
//                 }`}
//               >
//                 {tab.label}
//                 {tab.key === "compliance" && licenseAlertCount > 0 && (
//                   <span className="ml-1 px-1 py-0.5 text-[9px] bg-red-500 text-white rounded font-bold">
//                     {licenseAlertCount}
//                   </span>
//                 )}
//                 {activeTab === tab.key && (
//                   <motion.div
//                     layoutId="tab-indicator"
//                     className="absolute bottom-0 left-0 right-0 h-px bg-[#C8A96E]"
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── LOADING STATE ── */}
//         {loading && (
//           <div className="flex items-center justify-center py-32">
//             <div className="space-y-3 text-center">
//               <div className="w-10 h-10 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto" />
//               <p className="text-zinc-500 text-sm tracking-wider">LOADING FLEET DATA</p>
//             </div>
//           </div>
//         )}

//         {/* ── CONTENT ── */}
//         {!loading && data && (
//           <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
//             <AnimatePresence mode="wait">

//               {/* ── OVERVIEW TAB ── */}
//               {activeTab === "overview" && (
//                 <motion.div
//                   key="overview"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.25 }}
//                   className="space-y-6"
//                 >
//                   {/* KPI Row 1 */}
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     <StatCard
//                       label="Total Vehicles"
//                       value={fmt(data.totals.totalVehicles, 0)}
//                       sub={`${data.totals.activeVehicles} active · ${data.totals.idleVehicles} idle`}
//                       accent="#3E6B8C"
//                       icon="🚛"
//                       delay={0}
//                       onClick={() => router.push("/vehicles")}
//                     />
//                     <StatCard
//                       label="Total Drivers"
//                       value={fmt(data.totals.totalDrivers, 0)}
//                       sub="registered drivers"
//                       accent="#C8A96E"
//                       icon="👤"
//                       delay={0.05}
//                       onClick={() => router.push("/drivers")}
//                     />
//                     <StatCard
//                       label="Total Trips"
//                       value={fmt(data.totals.totalTrips, 0)}
//                       sub="in selected range"
//                       accent="#5C9669"
//                       icon="🗺️"
//                       delay={0.1}
//                     />
//                     <StatCard
//                       label="Total Distance"
//                       value={`${fmt(data.totals.totalDistance, 0)} km`}
//                       sub="in selected range"
//                       accent="#7B4E8C"
//                       icon="📍"
//                       delay={0.15}
//                     />
//                   </div>

//                   {/* KPI Row 2 */}
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     <StatCard
//                       label="Total Fuel Cost"
//                       value={naira(data.fuel.totalFuelCost)}
//                       sub={`${fmt(data.fuel.totalFuelGiven, 0)} litres consumed`}
//                       accent="#8C3E3E"
//                       icon="⛽"
//                       delay={0.2}
//                     />
//                     <StatCard
//                       label="Fleet Efficiency"
//                       value={`${fmt(data.fuel.fleetFuelEfficiency)} km/L`}
//                       sub="distance / fuel used"
//                       accent="#5C9669"
//                       icon="⚡"
//                       delay={0.25}
//                     />
//                     <StatCard
//                       label="Maintenance Cost"
//                       value={naira(data.costs.totalMaintenanceCost)}
//                       sub="parts + repairs + services"
//                       accent="#C8A96E"
//                       icon="🔧"
//                       delay={0.3}
//                     />
//                     <StatCard
//                       label="Vehicles in Repair"
//                       value={data.vehiclesInRepairs}
//                       sub={`${data.totals.openRepairs} open repair orders`}
//                       accent="#8C3E3E"
//                       icon="🛠️"
//                       delay={0.35}
//                       alert={data.vehiclesInRepairs > 0}
//                     />
//                   </div>

//                   {/* Trip Trend + Loading Plants */}
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     <Panel className="lg:col-span-2">
//                       <SectionHeader title="Monthly Trip Volume" />
//                       <div style={{ height: 240 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <AreaChart data={data.monthlyTripTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                             <defs>
//                               <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="#C8A96E" stopOpacity={0.3} />
//                                 <stop offset="95%" stopColor="#C8A96E" stopOpacity={0} />
//                               </linearGradient>
//                             </defs>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                             <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                             <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                             <Tooltip content={<CustomTooltip />} />
//                             <Area type="monotone" dataKey="count" stroke="#C8A96E" strokeWidth={2} fill="url(#tripGrad)" name="Trips" />
//                           </AreaChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </Panel>

//                     <Panel>
//                       <SectionHeader title="Loading Plants" />
//                       <div style={{ height: 240 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={data.loadingPlantChart}
//                               dataKey="value"
//                               nameKey="name"
//                               cx="50%"
//                               cy="50%"
//                               outerRadius={80}
//                               innerRadius={45}
//                               paddingAngle={2}
//                             >
//                               {data.loadingPlantChart.map((_, i) => (
//                                 <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
//                               ))}
//                             </Pie>
//                             <Tooltip
//                               contentStyle={{
//                                 background: "#1C2330",
//                                 border: "1px solid rgba(255,255,255,0.08)",
//                                 borderRadius: 8,
//                                 fontSize: 11,
//                               }}
//                             />
//                             <Legend
//                               iconSize={8}
//                               formatter={(v) => (
//                                 <span style={{ color: "#71717a", fontSize: 10 }}>
//                                   {String(v).length > 16 ? String(v).slice(0, 16) + "…" : v}
//                                 </span>
//                               )}
//                             />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </Panel>
//                   </div>

//                   {/* Maintenance trend + Trip status + Destinations */}
//                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                     <Panel className="lg:col-span-2">
//                       <SectionHeader title="Monthly Maintenance Cost" />
//                       <div style={{ height: 220 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <BarChart data={data.maintenanceTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                             <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                             <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                             <Tooltip content={<CustomTooltip />} />
//                             <Bar dataKey="cost" name="Cost (₦)" fill="#3E6B8C" radius={[4, 4, 0, 0]} />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </Panel>

//                     <div className="space-y-4">
//                       <Panel>
//                         <SectionHeader title="Trip Status" />
//                         <div className="space-y-2">
//                           {data.tripStatusChart.map((s) => (
//                             <div key={s.name} className="flex items-center justify-between">
//                               <div className="flex items-center gap-2">
//                                 <div
//                                   className="w-2 h-2 rounded-full"
//                                   style={{ background: STATUS_COLORS[s.name] ?? "#71717a" }}
//                                 />
//                                 <span className="text-xs text-zinc-400">{s.name}</span>
//                               </div>
//                               <span className="text-xs font-mono text-white">{s.value}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </Panel>

//                       <Panel>
//                         <SectionHeader title="Cost Breakdown" />
//                         <div className="space-y-2">
//                           {[
//                             { label: "Parts", value: data.costs.totalPartsCost, color: "#C8A96E" },
//                             { label: "Repairs", value: data.costs.totalRepairCost, color: "#8C3E3E" },
//                             { label: "Services", value: data.costs.totalServiceCost, color: "#3E6B8C" },
//                           ].map((item) => (
//                             <div key={item.label} className="flex items-center justify-between">
//                               <div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
//                                 <span className="text-xs text-zinc-400">{item.label}</span>
//                               </div>
//                               <span className="text-xs font-mono text-white">{naira(item.value)}</span>
//                             </div>
//                           ))}
//                           <div className="border-t border-white/[0.06] pt-2 flex justify-between">
//                             <span className="text-xs text-zinc-500">Cost / km</span>
//                             <span className="text-xs font-mono text-[#C8A96E]">{naira(data.costs.costPerKm)}</span>
//                           </div>
//                         </div>
//                       </Panel>
//                     </div>
//                   </div>

//                   {/* Service types + Destinations */}
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                     <Panel>
//                       <SectionHeader title="Service Types Distribution" />
//                       <div style={{ height: 220 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={data.services.map((s) => ({ name: s.serviceType, value: s.count }))}
//                               dataKey="value"
//                               nameKey="name"
//                               cx="50%"
//                               cy="50%"
//                               outerRadius={80}
//                               innerRadius={40}
//                               paddingAngle={2}
//                             >
//                               {data.services.map((_, i) => (
//                                 <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
//                               ))}
//                             </Pie>
//                             <Tooltip
//                               contentStyle={{
//                                 background: "#1C2330",
//                                 border: "1px solid rgba(255,255,255,0.08)",
//                                 borderRadius: 8,
//                                 fontSize: 11,
//                               }}
//                             />
//                             <Legend iconSize={8} formatter={(v) => <span style={{ color: "#71717a", fontSize: 10 }}>{v}</span>} />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </Panel>

//                     <Panel>
//                       <SectionHeader title="Top Destinations" />
//                       <div className="space-y-2">
//                         {data.destinationChart.map((d, i) => (
//                           <div key={d.name} className="flex items-center gap-3">
//                             <span className="text-[10px] text-zinc-600 w-3 flex-shrink-0">{i + 1}</span>
//                             <div className="flex-1 min-w-0">
//                               <div className="text-xs text-zinc-300 truncate">{d.name}</div>
//                               <div
//                                 className="h-1 rounded-full mt-1"
//                                 style={{
//                                   width: `${(d.value / (data.destinationChart[0]?.value || 1)) * 100}%`,
//                                   background: PALETTE[i % PALETTE.length],
//                                 }}
//                               />
//                             </div>
//                             <span className="text-xs font-mono text-zinc-400 flex-shrink-0">{d.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </Panel>
//                   </div>

//                   {/* Fuel summary */}
//                   <Panel>
//                     <SectionHeader title="Fuel Consumption by Type" />
//                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//                       {Object.entries(data.fuel.byType).map(([type, v], i) => (
//                         <div key={type} className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] text-center">
//                           <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{type}</div>
//                           <div className="text-lg font-bold font-mono" style={{ color: PALETTE[i % PALETTE.length] }}>
//                             {fmt(v.qtyGiven, 0)}
//                           </div>
//                           <div className="text-[10px] text-zinc-600">litres</div>
//                           <div className="text-xs font-mono text-zinc-400 mt-1">{naira(v.fuelCost)}</div>
//                         </div>
//                       ))}
//                       <div className="bg-[#0D1117] rounded-lg p-3 border border-[#C8A96E]/20 text-center">
//                         <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Est. CO₂</div>
//                         <div className="text-lg font-bold font-mono text-[#5C9669]">
//                           {fmt(data.fuel.estimatedCO2Kg, 0)}
//                         </div>
//                         <div className="text-[10px] text-zinc-600">kg</div>
//                         <div className="text-xs text-zinc-500 mt-1">estimated</div>
//                       </div>
//                     </div>
//                   </Panel>
//                 </motion.div>
//               )}

//               {/* ── FLEET & DRIVERS TAB ── */}
//               {activeTab === "fleet" && (
//                 <motion.div
//                   key="fleet"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.25 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                     {/* Top vehicles */}
//                     <Panel>
//                       <SectionHeader
//                         title="Top 5 Vehicles by Trips"
//                         action={
//                           <button
//                             onClick={() => router.push("/vehicles")}
//                             className="text-xs text-zinc-500 hover:text-[#C8A96E] transition-colors"
//                           >
//                             All Vehicles →
//                           </button>
//                         }
//                       />
//                       <div className="space-y-2">
//                         {data.topVehicles.map((tv, i) => (
//                           <div
//                             key={tv.vehicle?.id ?? i}
//                             className="flex items-center gap-3 bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors"
//                             onClick={() => tv.vehicle?.id && router.push(`/vehicles/${tv.vehicle.id}`)}
//                           >
//                             <span className="text-[#C8A96E] font-bold font-mono text-sm w-5">#{i + 1}</span>
//                             <div className="flex-1 min-w-0">
//                               <div className="text-sm font-medium text-white font-mono">
//                                 {tv.vehicle?.plateNumber ?? "Unknown"}
//                               </div>
//                               <div className="text-xs text-zinc-500">
//                                 {tv.vehicle?.cap_no} {tv.vehicle?.make && `· ${tv.vehicle.make}`}
//                               </div>
//                             </div>
//                             <div className="text-right">
//                               <div className="text-sm font-bold font-mono text-white">{tv.trips}</div>
//                               <div className="text-[10px] text-zinc-600">trips</div>
//                             </div>
//                           </div>
//                         ))}
//                         {data.topVehicles.length === 0 && (
//                           <div className="text-center text-zinc-600 text-sm py-4">No data in range</div>
//                         )}
//                       </div>
//                     </Panel>

//                     {/* Top drivers */}
//                     <Panel>
//                       <SectionHeader
//                         title="Top 5 Drivers by Trips"
//                         action={
//                           <button
//                             onClick={() => router.push("/drivers")}
//                             className="text-xs text-zinc-500 hover:text-[#C8A96E] transition-colors"
//                           >
//                             All Drivers →
//                           </button>
//                         }
//                       />
//                       <div className="space-y-2">
//                         {data.topDrivers.map((td, i) => (
//                           <div
//                             key={td.driver?.id ?? i}
//                             className="flex items-center gap-3 bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors"
//                             onClick={() => td.driver?.id && router.push(`/drivers/${td.driver.id}`)}
//                           >
//                             <span className="text-[#C8A96E] font-bold font-mono text-sm w-5">#{i + 1}</span>
//                             <div
//                               className="w-7 h-7 rounded-full bg-center bg-cover border border-white/10 flex-shrink-0"
//                               style={{ backgroundImage: `url(${td.driver?.profileImage ?? "/avatar-placeholder.png"})` }}
//                             />
//                             <div className="flex-1 min-w-0">
//                               <div className="text-sm font-medium text-white">{td.driver?.name ?? "Unknown"}</div>
//                               {td.driver?.phone && (
//                                 <div className="text-xs text-zinc-500 font-mono">{td.driver.phone}</div>
//                               )}
//                             </div>
//                             <div className="text-right">
//                               <div className="text-sm font-bold font-mono text-white">{td.trips}</div>
//                               <div className="text-[10px] text-zinc-600">trips</div>
//                             </div>
//                           </div>
//                         ))}
//                         {data.topDrivers.length === 0 && (
//                           <div className="text-center text-zinc-600 text-sm py-4">No data in range</div>
//                         )}
//                       </div>
//                     </Panel>
//                   </div>

//                   {/* Top fuel-consuming vehicles */}
//                   <Panel>
//                     <SectionHeader title="Top 5 Vehicles by Fuel Consumption" />
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-xs">
//                         <thead>
//                           <tr className="border-b border-white/[0.06]">
//                             {["Rank", "Vehicle", "CAP No", "Fuel Consumed (L)", "Fuel Cost"].map((h) => (
//                               <th key={h} className="text-left py-2 pr-6 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">
//                                 {h}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {data.topFuelVehicles.map((v, i) => (
//                             <tr
//                               key={v.vehicle?.id ?? i}
//                               className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
//                               onClick={() => v.vehicle?.id && router.push(`/vehicles/${v.vehicle.id}`)}
//                             >
//                               <td className="py-3 pr-6 font-mono text-[#C8A96E]">#{i + 1}</td>
//                               <td className="py-3 pr-6 font-mono text-white">{v.vehicle?.plateNumber ?? "—"}</td>
//                               <td className="py-3 pr-6 text-zinc-400">{v.vehicle?.cap_no ?? "—"}</td>
//                               <td className="py-3 pr-6 font-mono text-zinc-300">{fmt(v.qty, 2)} L</td>
//                               <td className="py-3 pr-6 font-mono text-[#C8A96E]">{naira(v.cost)}</td>
//                             </tr>
//                           ))}
//                           {data.topFuelVehicles.length === 0 && (
//                             <tr>
//                               <td colSpan={5} className="py-8 text-center text-zinc-600">No fuel data in range</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </Panel>

//                   {/* Tire actions */}
//                   <Panel>
//                     <SectionHeader title="Tire Actions (in range)" />
//                     <div className="grid grid-cols-3 gap-3">
//                       {[
//                         { label: "Installed", value: data.tires.installed, color: "#5C9669" },
//                         { label: "Rotated", value: data.tires.rotated, color: "#C8A96E" },
//                         { label: "Removed", value: data.tires.removed, color: "#8C3E3E" },
//                       ].map((item) => (
//                         <div key={item.label} className="bg-[#0D1117] rounded-lg p-4 border border-white/[0.04] text-center">
//                           <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{item.label}</div>
//                           <div className="text-3xl font-bold font-mono" style={{ color: item.color }}>
//                             {item.value}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Panel>
//                 </motion.div>
//               )}

//               {/* ── COSTS & FUEL TAB ── */}
//               {activeTab === "finance" && (
//                 <motion.div
//                   key="finance"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.25 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     <StatCard label="Total Fuel Cost" value={naira(data.fuel.totalFuelCost)} sub={`${fmt(data.fuel.totalFuelGiven, 0)} L consumed`} accent="#8C3E3E" icon="⛽" delay={0} />
//                     <StatCard label="Parts Cost" value={naira(data.costs.totalPartsCost)} accent="#C8A96E" icon="🔩" delay={0.05} />
//                     <StatCard label="Repairs Cost" value={naira(data.costs.totalRepairCost)} accent="#8C5E3E" icon="🔧" delay={0.1} />
//                     <StatCard label="Services Cost" value={naira(data.costs.totalServiceCost)} accent="#3E6B8C" icon="⚙️" delay={0.15} />
//                   </div>

//                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     <StatCard label="Total Maintenance" value={naira(data.costs.totalMaintenanceCost)} sub="parts + repairs + services" accent="#7B4E8C" icon="🛠️" delay={0.2} />
//                     <StatCard label="Cost per km" value={naira(data.costs.costPerKm)} sub="(fuel + maint) / distance" accent="#C8A96E" icon="📊" delay={0.25} />
//                     <StatCard label="Est. CO₂ Emitted" value={`${fmt(data.fuel.estimatedCO2Kg, 0)} kg`} sub="diesel × 2.68 kg/L" accent="#5C9669" icon="🌿" delay={0.3} />
//                   </div>

//                   {/* Fuel by type table */}
//                   <Panel>
//                     <SectionHeader title="Fuel Breakdown by Type" />
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-xs">
//                         <thead>
//                           <tr className="border-b border-white/[0.06]">
//                             {["Fuel Type", "Quantity (L)", "Total Cost", "% of Volume", "% of Cost"].map((h) => (
//                               <th key={h} className="text-left py-2 pr-6 text-zinc-500 font-semibold uppercase tracking-wider">
//                                 {h}
//                               </th>
//                             ))}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {Object.entries(data.fuel.byType).map(([type, v], i) => (
//                             <tr key={type} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
//                               <td className="py-3 pr-6">
//                                 <div className="flex items-center gap-2">
//                                   <div className="w-2 h-2 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
//                                   <span className="font-medium text-white">{type}</span>
//                                 </div>
//                               </td>
//                               <td className="py-3 pr-6 font-mono text-zinc-300">{fmt(v.qtyGiven, 2)}</td>
//                               <td className="py-3 pr-6 font-mono text-[#C8A96E]">{naira(v.fuelCost)}</td>
//                               <td className="py-3 pr-6 font-mono text-zinc-400">
//                                 {data.fuel.totalFuelGiven > 0
//                                   ? `${((v.qtyGiven / data.fuel.totalFuelGiven) * 100).toFixed(1)}%`
//                                   : "—"}
//                               </td>
//                               <td className="py-3 pr-6 font-mono text-zinc-400">
//                                 {data.fuel.totalFuelCost > 0
//                                   ? `${((v.fuelCost / data.fuel.totalFuelCost) * 100).toFixed(1)}%`
//                                   : "—"}
//                               </td>
//                             </tr>
//                           ))}
//                           <tr className="border-t border-white/[0.06]">
//                             <td className="py-3 pr-6 font-semibold text-zinc-300">Total</td>
//                             <td className="py-3 pr-6 font-mono font-bold text-white">{fmt(data.fuel.totalFuelGiven, 2)}</td>
//                             <td className="py-3 pr-6 font-mono font-bold text-[#C8A96E]">{naira(data.fuel.totalFuelCost)}</td>
//                             <td className="py-3 pr-6 text-zinc-600">100%</td>
//                             <td className="py-3 pr-6 text-zinc-600">100%</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </Panel>

//                   {/* Maintenance trend */}
//                   <Panel>
//                     <SectionHeader title="Maintenance Cost Trend (Monthly)" />
//                     <div style={{ height: 260 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data.maintenanceTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                           <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <Tooltip content={<CustomTooltip />} />
//                           <Bar dataKey="cost" name="Cost (₦)" fill="#C8A96E" radius={[4, 4, 0, 0]} />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>
//                 </motion.div>
//               )}

//               {/* ── COMPLIANCE TAB ── */}
//               {activeTab === "compliance" && (
//                 <motion.div
//                   key="compliance"
//                   initial={{ opacity: 0, y: 8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -8 }}
//                   transition={{ duration: 0.25 }}
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     <StatCard
//                       label="Expired Licenses"
//                       value={data.license.expired.length}
//                       sub="must not operate"
//                       accent="#8C3E3E"
//                       icon="❌"
//                       alert={data.license.expired.length > 0}
//                       delay={0}
//                     />
//                     <StatCard
//                       label="Expiring Soon"
//                       value={data.license.aboutToExpire.length}
//                       sub="within 30 days"
//                       accent="#C8A96E"
//                       icon="⚠️"
//                       alert={data.license.aboutToExpire.length > 0}
//                       delay={0.05}
//                     />
//                     <StatCard
//                       label="Vehicles in Repair"
//                       value={data.vehiclesInRepairs}
//                       sub="currently under repair"
//                       accent="#8C3E3E"
//                       icon="🔧"
//                       alert={data.vehiclesInRepairs > 0}
//                       delay={0.1}
//                     />
//                     <StatCard
//                       label="Open Repair Orders"
//                       value={data.totals.openRepairs}
//                       sub="pending completion"
//                       accent="#C8A96E"
//                       icon="📋"
//                       alert={data.totals.openRepairs > 0}
//                       delay={0.15}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                     {/* Expired licenses */}
//                     <Panel>
//                       <SectionHeader
//                         title={`Expired Licenses (${data.license.expired.length})`}
//                         action={
//                           data.license.expired.length > 0 ? (
//                             <span className="text-xs px-2 py-0.5 bg-red-900/40 text-red-400 border border-red-700/40 rounded">
//                               ACTION REQUIRED
//                             </span>
//                           ) : undefined
//                         }
//                       />
//                       {data.license.expired.length === 0 ? (
//                         <div className="text-center text-zinc-600 text-sm py-6 flex flex-col items-center gap-2">
//                           <span className="text-2xl">✅</span>
//                           No expired licenses
//                         </div>
//                       ) : (
//                         <div className="space-y-2">
//                           {data.license.expired.map((d) => (
//                             <div
//                               key={d.id}
//                               className="flex items-center justify-between bg-red-900/10 border border-red-800/30 rounded-lg p-3 cursor-pointer hover:bg-red-900/20 transition-colors"
//                               onClick={() => router.push(`/drivers/${d.id}`)}
//                             >
//                               <div>
//                                 <div className="text-sm font-medium text-white">{d.name}</div>
//                                 {d.phone && <div className="text-xs text-zinc-500 font-mono">{d.phone}</div>}
//                               </div>
//                               <div className="text-right">
//                                 <div className="text-xs font-mono text-red-400">
//                                   {new Date(d.licenseExp).toLocaleDateString("en-NG")}
//                                 </div>
//                                 <div className="text-[10px] text-zinc-600">expired</div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </Panel>

//                     {/* Expiring soon */}
//                     <Panel>
//                       <SectionHeader
//                         title={`Expiring Within 30 Days (${data.license.aboutToExpire.length})`}
//                         action={
//                           data.license.aboutToExpire.length > 0 ? (
//                             <span className="text-xs px-2 py-0.5 bg-amber-900/40 text-amber-400 border border-amber-700/40 rounded">
//                               RENEW SOON
//                             </span>
//                           ) : undefined
//                         }
//                       />
//                       {data.license.aboutToExpire.length === 0 ? (
//                         <div className="text-center text-zinc-600 text-sm py-6 flex flex-col items-center gap-2">
//                           <span className="text-2xl">✅</span>
//                           No licenses expiring soon
//                         </div>
//                       ) : (
//                         <div className="space-y-2">
//                           {data.license.aboutToExpire.map((d) => {
//                             const daysLeft = Math.ceil(
//                               (new Date(d.licenseExp).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
//                             );
//                             return (
//                               <div
//                                 key={d.id}
//                                 className="flex items-center justify-between bg-amber-900/10 border border-amber-800/30 rounded-lg p-3 cursor-pointer hover:bg-amber-900/20 transition-colors"
//                                 onClick={() => router.push(`/drivers/${d.id}`)}
//                               >
//                                 <div>
//                                   <div className="text-sm font-medium text-white">{d.name}</div>
//                                   {d.phone && <div className="text-xs text-zinc-500 font-mono">{d.phone}</div>}
//                                 </div>
//                                 <div className="text-right">
//                                   <div className="text-xs font-mono text-amber-400">
//                                     {new Date(d.licenseExp).toLocaleDateString("en-NG")}
//                                   </div>
//                                   <div className="text-[10px] text-amber-600">{daysLeft}d left</div>
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </Panel>
//                   </div>

//                   {/* Idle vehicles */}
//                   <Panel>
//                     <SectionHeader title="Fleet Utilisation Summary" />
//                     <div className="grid grid-cols-3 gap-3">
//                       {[
//                         { label: "Total Vehicles", value: data.totals.totalVehicles, color: "#3E6B8C" },
//                         { label: "Active in Range", value: data.totals.activeVehicles, color: "#5C9669" },
//                         { label: "Idle in Range", value: data.totals.idleVehicles, color: "#8C3E3E" },
//                       ].map((item) => (
//                         <div key={item.label} className="bg-[#0D1117] rounded-lg p-4 border border-white/[0.04] text-center">
//                           <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{item.label}</div>
//                           <div className="text-3xl font-bold font-mono" style={{ color: item.color }}>
//                             {item.value}
//                           </div>
//                           {data.totals.totalVehicles > 0 && (
//                             <div className="text-[10px] text-zinc-600 mt-1">
//                               {((item.value / data.totals.totalVehicles) * 100).toFixed(0)}% of fleet
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     {data.totals.totalVehicles > 0 && (
//                       <div className="mt-4 h-2 rounded-full bg-[#0D1117] overflow-hidden flex">
//                         <div
//                           className="h-full rounded-l-full transition-all"
//                           style={{
//                             width: `${(data.totals.activeVehicles / data.totals.totalVehicles) * 100}%`,
//                             background: "#5C9669",
//                           }}
//                         />
//                         <div
//                           className="h-full transition-all"
//                           style={{
//                             width: `${(data.totals.idleVehicles / data.totals.totalVehicles) * 100}%`,
//                             background: "#8C3E3E",
//                           }}
//                         />
//                       </div>
//                     )}
//                     <div className="flex gap-4 mt-2">
//                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#5C9669]" /><span className="text-[10px] text-zinc-500">Active</span></div>
//                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#8C3E3E]" /><span className="text-[10px] text-zinc-500">Idle</span></div>
//                     </div>
//                   </Panel>
//                 </motion.div>
//               )}

//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }

// //base on the current structure and corrections and addition made to this project, especially on trips, trucks and driver create pages and their api route. review and recreate the following pages and their api routes: dashboard page, vehicle dashboard page and truck dashboard page


// src/app/admin/dashboard/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DashboardData {
  start: string; end: string;
  totals: {
    totalVehicles: number; totalDrivers: number; totalTrips: number;
    totalDistance: number; activeVehicles: number; idleVehicles: number;
    openRepairs: number; criticalRepairs: number; vehiclesInRepairs: number;
  };
  fuel: {
    byType: Record<string, { qtyGiven: number; fuelCost: number }>;
    totalFuelGiven: number; totalFuelCost: number;
    fleetFuelEfficiency: number; estimatedCO2Kg: number;
  };
  fuelTrend:  Record<string, any>[];   // dynamic keys per fuel type
   fuelTypes:  string[];                 // list of types present in data
  // fuelTrend: { month: string; cost: number; qty: number }[];
  tires: { fitted: number; replaced: number; retreaded: number; scrapped: number };
  costs: {
    totalPartsCost: number; totalRepairCost: number; totalServiceCost: number;
    totalTireCost: number; totalMaintenanceCost: number; costPerKm: number;
  };
  warranty: { expired: number; expiring: number };
  repairPriorityBreakdown: { priority: string; count: number }[];
  openRepairsList: {
    id: string; faultDesc: string; priority: string; status: string; reportedDate: string;
    vehicle: { id: string; plateNumber: string; cap_no: string } | null;
    driver:  { id: string; name: string } | null;
  }[];
  vehiclesDueService: {
    id: string; plateNumber: string; cap_no: string;
    nextServiceDate: string | null; nextServiceKm: number | null;
    currentOdo: number | null; daysUntilDue: number | null;
  }[];
  topVehicles:     { vehicle: any; trips: number; km: number; fuelQty: number; fuelCost: number }[];
  topDrivers:      { driver:  any; trips: number; km: number }[];
  topFuelVehicles: { vehicle: any; qty: number; cost: number }[];
  license: {
    expired:       { id: string; name: string; licenseExp: string; phone?: string }[];
    aboutToExpire: { id: string; name: string; licenseExp: string; phone?: string; daysLeft?: number | null }[];
  };
  services: { serviceType: string; count: number }[];
  monthlyTripTrend: { month: string; count: number }[];
  loadingPlantChart: { name: string; value: number }[];
  destinationChart:  { name: string; value: number }[];
  tripStatusChart:   { name: string; value: number }[];
  maintenanceTrend: { month: string; repair: number; service: number; parts: number; total: number }[];
}




// ─── Constants ────────────────────────────────────────────────────────────────
const PAL = ["#C8A96E","#3E6B8C","#5C9669","#8C5E3E","#7B4E8C","#8C3E3E","#3E7B8C","#6E8C3E","#C85E3E","#3E8C6E"];
const STATUS_COLORS: Record<string,string> = {
  COMPLETED:"#5C9669", IN_PROGRESS:"#C8A96E", PLANNED:"#3E6B8C", CANCELLED:"#8C3E3E", OPEN:"#8C5E3E", PENDING:"#7B4E8C",
};
const PRIORITY_COLORS: Record<string,string> = {
  CRITICAL:"#ef4444", HIGH:"#f59e0b", MEDIUM:"#3E6B8C", LOW:"#71717a",
};

const n0 = (v?: number|null) => v != null ? Number(v).toLocaleString("en-NG",{maximumFractionDigits:0}) : "—";
const n2 = (v?: number|null) => v != null ? Number(v).toLocaleString("en-NG",{maximumFractionDigits:2}) : "—";
const naira = (v?: number|null) => v != null ? `₦${Number(v).toLocaleString("en-NG",{minimumFractionDigits:0,maximumFractionDigits:0})}` : "—";
const fmtDate = (s?:string|null) => s ? new Date(s).toLocaleDateString("en-NG",{day:"2-digit",month:"short",year:"numeric"}) : "—";

// ─── UI primitives ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent="#C8A96E", icon, delay=0, alert, onClick }: {
  label:string; value:string|number; sub?:string; accent?:string; icon?:string;
  delay?:number; alert?:boolean; onClick?:()=>void;
}) {
  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay}}
      onClick={onClick}
      className={`relative bg-[#161B22] border rounded-xl p-5 overflow-hidden
        ${alert ? "border-red-700/50" : "border-white/[0.06]"}
        ${onClick ? "cursor-pointer hover:border-white/20 transition-colors" : ""}`}>
      {alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse"/>}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{background:`radial-gradient(circle at 85% 15%,${accent},transparent 70%)`}}/>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">{label}</span>
          <span className="text-zinc-600 text-lg leading-none">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-white font-mono">{value}</div>
        {sub && <div className="text-[10px] text-zinc-500 mt-1">{sub}</div>}
      </div>
    </motion.div>
  );
}

function Panel({ children, className="" }: { children:React.ReactNode; className?:string }) {
  return <div className={`bg-[#161B22] border border-white/[0.06] rounded-xl p-5 ${className}`}>{children}</div>;
}
function SectionTitle({ title, sub, action }: { title:string; sub?:string; action?:React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">{title}</h2>
        {sub && <p className="text-[10px] text-zinc-700 mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C2330] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="text-zinc-400 mb-1.5 font-mono">{label}</div>
      {payload.map((p:any,i:number) => (
        <div key={i} style={{color:p.color}} className="font-mono">
          {p.name}: {typeof p.value==="number" ? (p.name?.includes("₦")||p.name?.toLowerCase().includes("cost") ? naira(p.value) : n0(p.value)) : p.value}
        </div>
      ))}
    </div>
  );
};

function Pill({ label, cls }: { label:string; cls:string }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${cls}`}>{label.replace(/_/g," ")}</span>;
}

const PRIORITY_PILL: Record<string,string> = {
  CRITICAL: "bg-red-900/30 text-red-300 border-red-700/40",
  HIGH:     "bg-amber-900/20 text-amber-400 border-amber-700/30",
  MEDIUM:   "bg-sky-900/20 text-sky-400 border-sky-700/30",
  LOW:      "bg-zinc-700/30 text-zinc-400 border-zinc-600/30",
};
const STATUS_PILL: Record<string,string> = {
  OPEN:        "bg-red-900/20 text-red-400 border-red-800/30",
  IN_PROGRESS: "bg-sky-900/20 text-sky-400 border-sky-700/30",
  COMPLETED:   "bg-emerald-900/20 text-emerald-400 border-emerald-700/30",
  CANCELLED:   "bg-zinc-700/30 text-zinc-400 border-zinc-600/30",
};

function Skeleton({ className="" }: { className?:string }) {
  return <div className={`bg-white/[0.04] animate-pulse rounded-xl ${className}`}/>;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FleetDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData]       = useState<DashboardData | null>(null);
  const [tab, setTab]         = useState<"overview"|"fleet"|"finance"|"compliance">("overview");
  const [range, setRange]     = useState(() => {
    const now = new Date();
    return {
      from: new Date(now.getTime()-30*86_400_000).toISOString().slice(0,10),
      to:   now.toISOString().slice(0,10),
    };
  });

  const load = useCallback(async (from:string, to:string) => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/dashboard?from=${from}&to=${to}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setData(json.data);
    } catch (e:any) { toast.error(e.message ?? "Failed to load dashboard"); }
    finally { setLoading(false); }
  }, []);

  // Fuel type colour palette — extend if you add more types
const FUEL_COLORS: Record<string, string> = {
  DIESEL:   "#C8A96E",
  PETROL:   "#3E6B8C",
  CNG:      "#5C9669",
  ELECTRIC: "#7B4E8C",
  LPG:      "#8C5E3E",
  UNKNOWN:  "#71717a",
};
// Fallback for types not in the map
const fuelColor = (type: string, i: number) =>
  FUEL_COLORS[type] ?? ["#C8A96E","#3E6B8C","#5C9669","#8C5E3E","#7B4E8C","#8C3E3E"][i % 6];

// Drop this inside your component where the chart lives:
const [fuelView, setFuelView] = useState<"cost" | "qty">("cost");

  useEffect(() => { load(range.from, range.to); }, []);

  const alertCount = (data?.license.expired.length ?? 0) + (data?.license.aboutToExpire.length ?? 0);

  const tabs = [
    { key:"overview",   label:"Overview" },
    { key:"fleet",      label:"Fleet & Drivers" },
    { key:"finance",    label:"Costs & Fuel" },
    { key:"compliance", label:"Compliance", badge: alertCount + (data?.totals.criticalRepairs ?? 0) },
  ] as const;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right"/>
      <div className="min-h-screen bg-[#0D1117] text-white" style={{fontFamily:"'DM Mono','Fira Mono',monospace"}}>

        {/* ── Alert banners ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {!loading && (data?.totals.criticalRepairs ?? 0) > 0 && (
            <motion.div key="crit" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className="flex items-center justify-center gap-3 text-xs py-2 font-bold tracking-wider uppercase bg-red-950/70 text-red-300 border-b border-red-800/50">
              <span className="animate-pulse">🚨</span>
              {data!.totals.criticalRepairs} CRITICAL REPAIR(S) OPEN — VEHICLES MAY BE OFF-ROAD
              <button onClick={()=>setTab("compliance")} className="underline hover:text-white ml-1">View →</button>
            </motion.div>
          )}
          {!loading && alertCount > 0 && (
            <motion.div key="lic" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              className="flex items-center justify-center gap-3 text-xs py-2 font-bold tracking-wider uppercase bg-amber-950/70 text-amber-300 border-b border-amber-800/50">
              ⚠
              {data!.license.expired.length > 0 && `${data!.license.expired.length} Expired License(s) · `}
              {data!.license.aboutToExpire.length > 0 && `${data!.license.aboutToExpire.length} Expiring Within 30 Days`}
              <button onClick={()=>setTab("compliance")} className="underline hover:text-white ml-1">View →</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sticky header ─────────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-sm font-bold tracking-wider">Fleet Dashboard</h1>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {data
                  ? `${fmtDate(data.start)} → ${fmtDate(data.end)}`
                  : loading ? "Loading…" : "Ogbe Trading Venture"}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-zinc-600 uppercase tracking-wider">Range</span>
              <input type="date" value={range.from}
                onChange={e=>setRange(r=>({...r,from:e.target.value}))}
                className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
              <span className="text-zinc-600 text-xs">→</span>
              <input type="date" value={range.to}
                onChange={e=>setRange(r=>({...r,to:e.target.value}))}
                className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
              <button onClick={()=>load(range.from,range.to)} disabled={loading}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50">
                {loading ? "…" : "Apply"}
              </button>
              <button onClick={()=>{
                const now=new Date();
                const nf=new Date(now.getTime()-30*86_400_000).toISOString().slice(0,10);
                const nt=now.toISOString().slice(0,10);
                setRange({from:nf,to:nt}); load(nf,nt);
              }} className="px-3 py-1.5 rounded-lg text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors">
                Reset
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex border-t border-white/[0.04]">
            {tabs.map(t => (
              <button key={t.key} onClick={()=>setTab(t.key)}
                className={`px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase relative transition-colors
                  ${tab===t.key ? "text-[#C8A96E]" : "text-zinc-600 hover:text-zinc-400"}`}>
                {t.label}
                {"badge" in t && t.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-red-500 text-white rounded-full font-bold">{t.badge}</span>
                )}
                {tab===t.key && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-px bg-[#C8A96E]"/>}
              </button>
            ))}
          </div>
        </div>

        {/* ── Loading skeleton ───────────────────────────────────────────────── */}
        {loading && (
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-24"/>)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Skeleton className="lg:col-span-2 h-64"/>
              <Skeleton className="h-64"/>
            </div>
          </div>
        )}

        {/* ── Content ───────────────────────────────────────────────────────── */}
        {!loading && data && (
          <div className="max-w-7xl mx-auto px-6 py-6">
            <AnimatePresence mode="wait">

              {/* ════════════════ OVERVIEW ════════════════ */}
              {tab==="overview" && (
                <motion.div key="overview" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                  {/* KPI row 1 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="Total Vehicles"  value={n0(data.totals.totalVehicles)}  sub={`${data.totals.activeVehicles} active · ${data.totals.idleVehicles} idle`} accent="#3E6B8C" icon="🚛" onClick={()=>router.push("/vehicles")}/>
                    <StatCard label="Total Drivers"   value={n0(data.totals.totalDrivers)}   sub="registered" accent="#C8A96E" icon="👤" delay={0.05} onClick={()=>router.push("/drivers")}/>
                    <StatCard label="Total Trips"     value={n0(data.totals.totalTrips)}     sub="in selected range" accent="#5C9669" icon="🗺️" delay={0.1}/>
                    <StatCard label="Total Distance"  value={`${n0(data.totals.totalDistance)} km`} sub="in selected range" accent="#7B4E8C" icon="📍" delay={0.15}/>
                  </div>

                  {/* KPI row 2 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="DIESEL Cost"        value={naira(data.fuel.byType["DIESEL"]?.fuelCost)}       sub={`${n0(data.fuel.totalFuelGiven)} L consumed`} accent="#8C3E3E" icon="⛽" delay={0.2}/>
                    <StatCard label="CNG Cost" value={naira(data.fuel.byType["CNG"]?.fuelCost)} sub="fleet average"            accent="#5C9669" icon="⛽" delay={0.25}/>
                    <StatCard label="Maintenance Cost" value={naira(data.costs.totalMaintenanceCost)} sub="repairs+services+parts+tires" accent="#C8A96E" icon="🔧" delay={0.3}/>
                    {/* <StatCard label="In Repair"        value={data.totals.vehiclesInRepairs}     sub={`${data.totals.openRepairs} open orders`} accent="#8C3E3E" icon="🛠️" delay={0.35} alert={data.totals.vehiclesInRepairs>0} onClick={()=>setTab("compliance")}/> */}
                  </div>

                  {/* Charts row 1 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Panel className="lg:col-span-2">
                      <SectionTitle title="Monthly Trip Volume"/>
                      <div style={{height:240}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data.monthlyTripTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                            <defs>
                              <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%"  stopColor="#C8A96E" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#C8A96E" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                            <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                            <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                            <Tooltip content={<ChartTip/>}/>
                            <Area type="monotone" dataKey="count" name="Trips" stroke="#C8A96E" strokeWidth={2} fill="url(#tg)"/>
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </Panel>
                    <Panel>
                      <SectionTitle title="Loading Plants"/>
                      {data.loadingPlantChart.length ? (
                        <div style={{height:240}}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={data.loadingPlantChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={2}>
                                {data.loadingPlantChart.map((_,i)=><Cell key={i} fill={PAL[i%PAL.length]}/>)}
                              </Pie>
                              <Tooltip contentStyle={{background:"#1C2330",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,fontSize:11}}/>
                              <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{String(v).slice(0,18)}</span>}/>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      ) : <div className="flex items-center justify-center h-40 text-zinc-600 text-sm">No data</div>}
                    </Panel>
                  </div>

                  {/* Charts row 2 — Maintenance trend + Trip status + Cost breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Panel className="lg:col-span-2">
                      <SectionTitle title="Monthly Maintenance Cost" sub="Repairs · Services · Parts"/>
                      <div style={{height:240}}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={data.maintenanceTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                            <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                            <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
                            <Tooltip content={<ChartTip/>}/>
                            <Bar dataKey="repair"  name="Repairs (₦)"  stackId="a" fill="#8C3E3E" radius={[0,0,0,0]}/>
                            <Bar dataKey="service" name="Services (₦)" stackId="a" fill="#3E6B8C"/>
                            <Bar dataKey="parts"   name="Parts (₦)"    stackId="a" fill="#C8A96E" radius={[4,4,0,0]}/>
                            <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{v}</span>}/>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Panel>
                    <div className="space-y-4">
                      <Panel>
                        <SectionTitle title="Trip Status"/>
                        <div className="space-y-2">
                          {data.tripStatusChart.map(s=>(
                            <div key={s.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{background:STATUS_COLORS[s.name]??"#71717a"}}/>
                                <span className="text-xs text-zinc-400">{s.name}</span>
                              </div>
                              <span className="text-xs font-mono text-white">{s.value}</span>
                            </div>
                          ))}
                          {!data.tripStatusChart.length && <p className="text-zinc-600 text-xs">No data</p>}
                        </div>
                      </Panel>
                      <Panel>
                        <SectionTitle title="Cost Breakdown"/>
                        <div className="space-y-2">
                          {[
                            {label:"Repairs",  value:data.costs.totalRepairCost,  color:"#8C3E3E"},
                            {label:"Services", value:data.costs.totalServiceCost, color:"#3E6B8C"},
                            {label:"Parts",    value:data.costs.totalPartsCost,   color:"#C8A96E"},
                            {label:"Tires",    value:data.costs.totalTireCost,    color:"#8C5E3E"},
                          ].map(i=>(
                            <div key={i.label} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{background:i.color}}/>
                                <span className="text-xs text-zinc-400">{i.label}</span>
                              </div>
                              <span className="text-xs font-mono text-white">{naira(i.value)}</span>
                            </div>
                          ))}
                          <div className="border-t border-white/[0.06] pt-2 flex justify-between">
                            <span className="text-[10px] text-zinc-500">Cost / km</span>
                            <span className="text-xs font-mono text-[#C8A96E]">{naira(data.costs.costPerKm)}/km</span>
                          </div>
                        </div>
                      </Panel>
                    </div>
                  </div>

                  {/* Service types + Destinations */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Panel>
                      <SectionTitle title="Service Types (in range)"/>
                      {data.services.length ? (
                        <div style={{height:220}}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={data.services.map(s=>({name:s.serviceType.replace(/_/g," "),value:s.count}))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>
                                {data.services.map((_,i)=><Cell key={i} fill={PAL[i%PAL.length]}/>)}
                              </Pie>
                              <Tooltip contentStyle={{background:"#1C2330",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,fontSize:11}}/>
                              <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{v}</span>}/>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      ) : <div className="flex items-center justify-center h-40 text-zinc-600 text-sm">No services in range</div>}
                    </Panel>
                    <Panel>
                      <SectionTitle title="Top Destinations"/>
                      <div className="space-y-2">
                        {data.destinationChart.slice(0,8).map((d,i)=>(
                          <div key={d.name} className="flex items-center gap-2">
                            <span className="text-[10px] text-zinc-600 font-mono w-4">{i+1}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-zinc-300 truncate">{d.name}</span>
                                <span className="text-xs font-mono text-zinc-500 shrink-0">{d.value}</span>
                              </div>
                              <div className="h-1 rounded-full mt-1 bg-white/[0.04] overflow-hidden">
                                <div className="h-full rounded-full" style={{width:`${(d.value/(data.destinationChart[0]?.value||1))*100}%`,background:PAL[i%PAL.length]}}/>
                              </div>
                            </div>
                          </div>
                        ))}
                        {!data.destinationChart.length && <p className="text-zinc-600 text-xs">No data</p>}
                      </div>
                    </Panel>
                  </div>

                  {/* Tires + CO2 */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Panel className="lg:col-span-2">
                      <SectionTitle title="Tire Activity (in range)"/>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          {label:"Fitted",    value:data.tires.fitted,   color:"#5C9669"},
                          {label:"Replaced",  value:data.tires.replaced, color:"#C8A96E"},
                          {label:"Retreaded", value:data.tires.retreaded, color:"#3E6B8C"},
                          {label:"Scrapped",  value:data.tires.scrapped, color:"#8C3E3E"},
                        ].map(item=>(
                          <div key={item.label} className="bg-[#0D1117] rounded-xl p-4 border border-white/[0.04] text-center">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{item.label}</div>
                            <div className="text-3xl font-bold font-mono" style={{color:item.color}}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </Panel>
                    <Panel>
                      <SectionTitle title="Emissions"/>
                      <div className="flex flex-col items-center justify-center h-full min-h-[120px] gap-2">
                        <div className="text-4xl font-bold font-mono text-emerald-400">{n0(data.fuel.estimatedCO2Kg)}</div>
                        <div className="text-xs text-zinc-500">kg CO₂ estimated</div>
                        <div className="text-[10px] text-zinc-600 text-center">from {n0(data.totals.totalTrips)} trips · {n0(data.fuel.totalFuelGiven)} L fuel</div>
                      </div>
                    </Panel>
                  </div>
                </motion.div>
              )}

              {/* ════════════════ FLEET & DRIVERS ════════════════ */}
              {tab==="fleet" && (
                <motion.div key="fleet" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                  {/* Fleet utilisation */}
                  <Panel>
                    <SectionTitle title="Fleet Utilisation (in range)"/>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        {label:"Total",  value:data.totals.totalVehicles,  color:"#3E6B8C"},
                        {label:"Active", value:data.totals.activeVehicles, color:"#5C9669"},
                        {label:"Idle",   value:data.totals.idleVehicles,   color:"#8C3E3E"},
                      ].map(item=>(
                        <div key={item.label} className="bg-[#0D1117] rounded-xl p-4 border border-white/[0.04] text-center">
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{item.label}</div>
                          <div className="text-3xl font-bold font-mono" style={{color:item.color}}>{item.value}</div>
                          {data.totals.totalVehicles > 0 && (
                            <div className="text-[10px] text-zinc-600 mt-1">{((item.value/data.totals.totalVehicles)*100).toFixed(0)}%</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {data.totals.totalVehicles > 0 && (
                      <div className="h-2 rounded-full bg-[#0D1117] overflow-hidden flex">
                        <div className="h-full transition-all" style={{width:`${(data.totals.activeVehicles/data.totals.totalVehicles)*100}%`,background:"#5C9669"}}/>
                        <div className="h-full transition-all" style={{width:`${(data.totals.idleVehicles/data.totals.totalVehicles)*100}%`,background:"#8C3E3E"}}/>
                      </div>
                    )}
                  </Panel>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Top vehicles */}
                    <Panel>
                      <SectionTitle title="Top 5 Vehicles by Trips"
                        action={<button onClick={()=>router.push("/vehicles")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">All →</button>}/>
                      <div className="space-y-2">
                        {data.topVehicles.map((tv,i)=>(
                          <div key={tv.vehicle?.id??i}
                            onClick={()=>tv.vehicle?.id&&router.push(`/vehicles/${tv.vehicle.id}`)}
                            className="flex items-center gap-3 bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors">
                            <span className="text-[#C8A96E] font-bold font-mono text-sm w-5 shrink-0">#{i+1}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-white">{tv.vehicle?.plateNumber??"—"}</div>
                              <div className="text-[10px] text-zinc-500">{tv.vehicle?.cap_no} · {n0(tv.km)} km</div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold font-mono text-white">{tv.trips}</div>
                              <div className="text-[10px] text-zinc-600">trips</div>
                            </div>
                          </div>
                        ))}
                        {!data.topVehicles.length && <p className="text-center text-zinc-600 text-sm py-4">No data in range</p>}
                      </div>
                    </Panel>

                    {/* Top drivers */}
                    <Panel>
                      <SectionTitle title="Top 5 Drivers by Trips"
                        action={<button onClick={()=>router.push("/drivers")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">All →</button>}/>
                      <div className="space-y-2">
                        {data.topDrivers.map((td,i)=>(
                          <div key={td.driver?.id??i}
                            onClick={()=>td.driver?.id&&router.push(`/drivers/${td.driver.id}`)}
                            className="flex items-center gap-3 bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors">
                            <span className="text-[#C8A96E] font-bold font-mono text-sm w-5 shrink-0">#{i+1}</span>
                            <div className="w-7 h-7 rounded-full bg-center bg-cover border border-white/10 shrink-0"
                              style={{backgroundImage:`url(${td.driver?.profileImage??"/avatar-placeholder.png"})`}}/>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-white truncate">{td.driver?.name??"—"}</div>
                              {td.driver?.phone && <div className="text-[10px] text-zinc-500 font-mono">{td.driver.phone}</div>}
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold font-mono text-white">{td.trips}</div>
                              <div className="text-[10px] text-zinc-600">{n0(td.km)} km</div>
                            </div>
                          </div>
                        ))}
                        {!data.topDrivers.length && <p className="text-center text-zinc-600 text-sm py-4">No data in range</p>}
                      </div>
                    </Panel>
                  </div>

                  {/* Top fuel vehicles */}
                  <Panel>
                    <SectionTitle title="Top 5 Vehicles by Fuel Cost"/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-white/[0.06]">
                          {["Rank","Plate","CAP No","Fuel Qty","Fuel Cost","Trips","km"].map(h=>(
                            <th key={h} className="text-left py-2 pr-5 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          {data.topFuelVehicles.map((v,i)=>{
                            const full = data.topVehicles.find(tv=>tv.vehicle?.id===v.vehicle?.id);
                            return (
                              <tr key={v.vehicle?.id??i}
                                onClick={()=>v.vehicle?.id&&router.push(`/vehicles/${v.vehicle.id}`)}
                                className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors">
                                <td className="py-3 pr-5 font-mono text-[#C8A96E]">#{i+1}</td>
                                <td className="py-3 pr-5 font-mono text-white font-bold">{v.vehicle?.plateNumber??"—"}</td>
                                <td className="py-3 pr-5 text-zinc-400">{v.vehicle?.cap_no??"—"}</td>
                                <td className="py-3 pr-5 font-mono text-zinc-300">{n2(v.qty)} L</td>
                                <td className="py-3 pr-5 font-mono text-[#C8A96E]">{naira(v.cost)}</td>
                                <td className="py-3 pr-5 font-mono text-zinc-400">{full?.trips??"—"}</td>
                                <td className="py-3 pr-5 font-mono text-zinc-400">{full ? n0(full.km) : "—"}</td>
                              </tr>
                            );
                          })}
                          {!data.topFuelVehicles.length && <tr><td colSpan={7} className="py-8 text-center text-zinc-600">No fuel data</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </Panel>

                  {/* Monthly fuel trend */}
                  {/* <Panel>
                    <SectionTitle title="Monthly Fuel Trend"/>
                    <div style={{height:240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.fuelTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                          <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Bar dataKey="cost" name="Cost (₦)" fill="#C8A96E" radius={[4,4,0,0]}/>
                          <Bar dataKey="qty"  name="Qty (L)"  fill="#3E6B8C" radius={[4,4,0,0]}/>
                          <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{v}</span>}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel> */}
                  <Panel>
                    <SectionTitle
                      title="Monthly Fuel Trend by Type"
                      action={
                        <div className="flex items-center gap-1 bg-[#0D1117] border border-white/[0.06] rounded-lg p-0.5">
                          {(["cost", "qty"] as const).map((v) => (
                            <button
                              key={v}
                              onClick={() => setFuelView(v)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                                fuelView === v
                                  ? "bg-[#C8A96E] text-[#0D1117]"
                                  : "text-zinc-500 hover:text-zinc-300"
                              }`}
                            >
                              {v === "cost" ? "Cost (₦)" : "Volume (L)"}
                            </button>
                          ))}
                        </div>
                      }
                    />
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data.fuelTrend}
                          margin={{ top: 4, right: 8, bottom: 4, left: 0 }}
                          barCategoryGap="25%"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                          <XAxis
                            dataKey="month"
                            tick={{ fill: "#71717a", fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            tick={{ fill: "#71717a", fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) =>
                              fuelView === "cost"
                                ? v >= 1_000_000 ? `₦${(v / 1_000_000).toFixed(1)}M`
                                : v >= 1000     ? `₦${(v / 1000).toFixed(0)}k`
                                : `₦${v}`
                                : v >= 1000 ? `${(v / 1000).toFixed(0)}kL` : `${v}L`
                            }
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (!active || !payload?.length) return null;
                              const total = payload.reduce((s, p) => s + (Number(p.value) || 0), 0);
                              return (
                                <div className="bg-[#1C2330] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl min-w-[140px]">
                                  <div className="text-zinc-400 mb-2 font-mono font-bold">{label}</div>
                                  {payload.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
                                      <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-sm" style={{ background: p.fill as string }} />
                                        <span style={{ color: p.fill as string }} className="font-mono">
                                          {String(p.name).replace(/_cost|_qty/, "")}
                                        </span>
                                      </div>
                                      <span className="font-mono text-white">
                                        {fuelView === "cost"
                                          ? `₦${Number(p.value).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`
                                          : `${Number(p.value).toLocaleString("en-NG", { maximumFractionDigits: 1 })} L`}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="border-t border-white/[0.06] mt-1.5 pt-1.5 flex justify-between">
                                    <span className="text-zinc-500">Total</span>
                                    <span className="font-mono text-[#C8A96E] font-bold">
                                      {fuelView === "cost"
                                        ? `₦${total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`
                                        : `${total.toLocaleString("en-NG", { maximumFractionDigits: 1 })} L`}
                                    </span>
                                  </div>
                                </div>
                              );
                            }}
                          />
                          {/* Render one stacked Bar per fuel type, switching dataKey by view */}
                          {data.fuelTypes.map((type, i) => (
                            <Bar
                              key={type}
                              dataKey={`${type}_${fuelView}`}
                              name={type}
                              stackId="fuel"
                              fill={fuelColor(type, i)}
                              radius={i === data.fuelTypes.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                            />
                          ))}
                          <Legend
                            iconSize={8}
                            iconType="square"
                            formatter={(v) => (
                              <span style={{ color: "#71717a", fontSize: 10 }}>
                                {String(v).replace(/_cost|_qty/, "")}
                              </span>
                            )}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>
                </motion.div>
              )}

              {/* ════════════════ COSTS & FUEL ════════════════ */}
              {tab==="finance" && (
                <motion.div key="finance" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="Fuel Cost"     value={naira(data.fuel.totalFuelCost)}       sub={`${n0(data.fuel.totalFuelGiven)} L`}    accent="#8C3E3E" icon="⛽"/>
                    <StatCard label="Parts Cost"    value={naira(data.costs.totalPartsCost)}     accent="#C8A96E" icon="🔩" delay={0.05}/>
                    <StatCard label="Repairs Cost"  value={naira(data.costs.totalRepairCost)}    accent="#8C5E3E" icon="🔧" delay={0.1}/>
                    <StatCard label="Services Cost" value={naira(data.costs.totalServiceCost)}   accent="#3E6B8C" icon="⚙️" delay={0.15}/>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <StatCard label="Tires Cost"        value={naira(data.costs.totalTireCost)}         accent="#8C5E3E"  icon="⭕" delay={0.2}/>
                    <StatCard label="Total Maintenance" value={naira(data.costs.totalMaintenanceCost)}  sub="maint only" accent="#7B4E8C"  icon="🛠️" delay={0.25}/>
                    <StatCard label="Cost per km"       value={`${naira(data.costs.costPerKm)}/km`}     sub="fuel+maint" accent="#C8A96E"  icon="📊" delay={0.3}/>
                  </div>

                  {/* Warranty alerts */}
                  {(data.warranty.expired > 0 || data.warranty.expiring > 0) && (
                    <Panel>
                      <SectionTitle title="Parts Warranty Alerts"
                        action={<button onClick={()=>router.push("/maintenance/parts")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">View Parts →</button>}/>
                      <div className="flex flex-wrap gap-4">
                        {data.warranty.expired > 0 && (
                          <div className="flex items-center gap-2 bg-red-900/20 border border-red-800/40 rounded-lg px-4 py-3">
                            <span className="text-red-400 text-lg">❌</span>
                            <div>
                              <div className="text-xl font-bold text-white font-mono">{data.warranty.expired}</div>
                              <div className="text-[10px] text-zinc-500">Warranties Expired</div>
                            </div>
                          </div>
                        )}
                        {data.warranty.expiring > 0 && (
                          <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-800/40 rounded-lg px-4 py-3">
                            <span className="text-amber-400 text-lg">⚠️</span>
                            <div>
                              <div className="text-xl font-bold text-white font-mono">{data.warranty.expiring}</div>
                              <div className="text-[10px] text-zinc-500">Expiring in 30 Days</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Panel>
                  )}

                  {/* Fuel breakdown table */}
                  <Panel>
                    <SectionTitle title="Fuel Breakdown by Type"/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-white/[0.06]">
                          {["Fuel Type","Qty (L)","Cost","% Volume","% Cost"].map(h=>(
                            <th key={h} className="text-left py-2 pr-6 text-zinc-500 font-bold uppercase tracking-wider">{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          {Object.entries(data.fuel.byType).map(([type,v],i)=>(
                            <tr key={type} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                              <td className="py-3 pr-6">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full" style={{background:PAL[i%PAL.length]}}/>
                                  <span className="text-white font-medium">{type}</span>
                                </div>
                              </td>
                              <td className="py-3 pr-6 font-mono text-zinc-300">{n2(v.qtyGiven)}</td>
                              <td className="py-3 pr-6 font-mono text-[#C8A96E]">{naira(v.fuelCost)}</td>
                              <td className="py-3 pr-6 font-mono text-zinc-400">{data.fuel.totalFuelGiven>0 ? `${((v.qtyGiven/data.fuel.totalFuelGiven)*100).toFixed(1)}%` : "—"}</td>
                              <td className="py-3 pr-6 font-mono text-zinc-400">{data.fuel.totalFuelCost>0 ? `${((v.fuelCost/data.fuel.totalFuelCost)*100).toFixed(1)}%` : "—"}</td>
                            </tr>
                          ))}
                          {Object.keys(data.fuel.byType).length === 0 && (
                            <tr><td colSpan={5} className="py-8 text-center text-zinc-600">No fuel data in range</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>

                  {/* Stacked maintenance chart */}
                  <Panel>
                    <SectionTitle title="Monthly Maintenance Cost Breakdown"/>
                    <div style={{height:260}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.maintenanceTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                          <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{v}</span>}/>
                          <Bar dataKey="repair"  name="Repairs (₦)"  stackId="a" fill="#8C3E3E"/>
                          <Bar dataKey="service" name="Services (₦)" stackId="a" fill="#3E6B8C"/>
                          <Bar dataKey="parts"   name="Parts (₦)"    stackId="a" fill="#C8A96E" radius={[4,4,0,0]}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  {/* Emissions */}
                  <Panel>
                    <SectionTitle title="Fleet Efficiency & Emissions"/>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        {label:"Fleet Fuel Efficiency", value:`${n2(data.fuel.fleetFuelEfficiency)} km/L`, color:"#5C9669"},
                        {label:"Est. CO₂ Emissions",    value:`${n0(data.fuel.estimatedCO2Kg)} kg`,      color:"#7B4E8C"},
                        {label:"Total Fuel Consumed",   value:`${n0(data.fuel.totalFuelGiven)} L`,        color:"#3E6B8C"},
                      ].map(item=>(
                        <div key={item.label} className="bg-[#0D1117] rounded-xl p-4 border border-white/[0.04]">
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{item.label}</div>
                          <div className="text-xl font-bold font-mono" style={{color:item.color}}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </motion.div>
              )}

              {/* ════════════════ COMPLIANCE ════════════════ */}
              {tab==="compliance" && (
                <motion.div key="compliance" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard label="Expired Licenses"   value={data.license.expired.length}       sub="must not operate"      accent="#8C3E3E" icon="❌" alert={data.license.expired.length>0}/>
                    <StatCard label="Expiring Soon"      value={data.license.aboutToExpire.length} sub="within 30 days"        accent="#C8A96E" icon="⚠️" delay={0.05} alert={data.license.aboutToExpire.length>0}/>
                    <StatCard label="Vehicles in Repair" value={data.totals.vehiclesInRepairs}     sub="open / in progress"    accent="#8C3E3E" icon="🔧" delay={0.1} alert={data.totals.vehiclesInRepairs>0}/>
                    <StatCard label="Critical Repairs"   value={data.totals.criticalRepairs}       sub="off-road risk"         accent="#8C3E3E" icon="🚨" delay={0.15} alert={data.totals.criticalRepairs>0}/>
                  </div>

                  {/* Vehicles due service */}
                  {data.vehiclesDueService.length > 0 && (
                    <Panel>
                      <SectionTitle title={`Vehicles Due for Service · ${data.vehiclesDueService.length}`}
                        action={<button onClick={()=>router.push("/maintenance/services")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">All Services →</button>}/>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead><tr className="border-b border-white/[0.06]">
                            {["Vehicle","CAP No","Due Date","Days Left","Current Odo","Next Service km"].map(h=>(
                              <th key={h} className="text-left py-2 pr-5 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr></thead>
                          <tbody>
                            {data.vehiclesDueService.map(v=>{
                              const overdue = (v.daysUntilDue ?? 1) < 0;
                              const urgent  = !overdue && (v.daysUntilDue ?? 999) <= 7;
                              return (
                                <tr key={v.id} onClick={()=>router.push(`/vehicles/${v.id}`)}
                                  className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors">
                                  <td className="py-3 pr-5 font-mono font-bold text-white">{v.plateNumber}</td>
                                  <td className="py-3 pr-5 text-zinc-400">{v.cap_no}</td>
                                  <td className="py-3 pr-5 whitespace-nowrap text-zinc-400">{fmtDate(v.nextServiceDate)}</td>
                                  <td className="py-3 pr-5">
                                    {v.daysUntilDue != null ? (
                                      <span className={`font-mono font-bold ${overdue?"text-red-400":urgent?"text-amber-400":"text-emerald-400"}`}>
                                        {overdue ? `${Math.abs(v.daysUntilDue)}d overdue` : `${v.daysUntilDue}d`}
                                      </span>
                                    ) : "—"}
                                  </td>
                                  <td className="py-3 pr-5 font-mono text-zinc-400">{v.currentOdo!=null ? `${n0(v.currentOdo)} km` : "—"}</td>
                                  <td className="py-3 pr-5 font-mono text-zinc-400">{v.nextServiceKm!=null ? `${n0(v.nextServiceKm)} km` : "—"}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </Panel>
                  )}

                  {/* Open repairs list */}
                  <Panel>
                    <SectionTitle title={`Open & In-Progress Repairs · ${data.openRepairsList.length}`}
                      action={<button onClick={()=>router.push("/maintenance/repairs")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">All Repairs →</button>}/>
                    {!data.openRepairsList.length ? (
                      <div className="flex flex-col items-center justify-center py-8 gap-2 text-zinc-600">
                        <span className="text-2xl">✅</span>
                        <span className="text-sm">No open repairs</span>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead><tr className="border-b border-white/[0.06]">
                            {["Priority","Status","Vehicle","Driver","Fault","Reported",""].map(h=>(
                              <th key={h} className="text-left py-2 pr-4 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap">{h}</th>
                            ))}
                          </tr></thead>
                          <tbody>
                            {data.openRepairsList.map(r=>(
                              <tr key={r.id}
                                className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors
                                  ${r.priority==="CRITICAL"?"bg-red-950/20":""}`}>
                                <td className="py-3 pr-4"><Pill label={r.priority} cls={PRIORITY_PILL[r.priority]??"border-zinc-600/30 text-zinc-400"}/></td>
                                <td className="py-3 pr-4"><Pill label={r.status}   cls={STATUS_PILL[r.status]??"border-zinc-600/30 text-zinc-400"}/></td>
                                <td className="py-3 pr-4">
                                  {r.vehicle ? (
                                    <button onClick={()=>router.push(`/vehicles/${r.vehicle!.id}`)} className="font-mono text-white hover:text-[#C8A96E] transition-colors">
                                      {r.vehicle.plateNumber}
                                    </button>
                                  ) : "—"}
                                  {r.vehicle?.cap_no && <div className="text-[10px] text-zinc-600">{r.vehicle.cap_no}</div>}
                                </td>
                                <td className="py-3 pr-4 whitespace-nowrap">
                                  {r.driver ? (
                                    <button onClick={()=>router.push(`/drivers/${r.driver!.id}`)} className="text-[#C8A96E] hover:underline transition-colors">
                                      {r.driver.name}
                                    </button>
                                  ) : <span className="text-zinc-600">—</span>}
                                </td>
                                <td className="py-3 pr-4 max-w-[200px]">
                                  <div className="text-zinc-200 truncate" title={r.faultDesc}>{r.faultDesc}</div>
                                </td>
                                <td className="py-3 pr-4 whitespace-nowrap text-zinc-500">{fmtDate(r.reportedDate)}</td>
                                <td className="py-3 pr-4">
                                  <button onClick={()=>router.push(`/maintenance/repairs/${r.id}/edit`)}
                                    className="px-2 py-1 rounded text-[10px] border border-white/[0.08] text-zinc-500 hover:text-white hover:border-white/20 transition-all">
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Panel>

                  {/* Repair priority breakdown */}
                  {data.repairPriorityBreakdown.length > 0 && (
                    <Panel>
                      <SectionTitle title="Open Repair Priority Breakdown"/>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["CRITICAL","HIGH","MEDIUM","LOW"].map(p=>{
                          const entry = data.repairPriorityBreakdown.find(r=>r.priority===p);
                          return (
                            <div key={p} className={`bg-[#0D1117] rounded-xl p-4 border border-white/[0.04] text-center ${p==="CRITICAL"&&(entry?.count??0)>0?"border-red-700/30":""}`}>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{p}</div>
                              <div className="text-3xl font-bold font-mono" style={{color:PRIORITY_COLORS[p]}}>{entry?.count??0}</div>
                            </div>
                          );
                        })}
                      </div>
                    </Panel>
                  )}

                  {/* License compliance */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Panel>
                      <SectionTitle title={`Expired Licenses · ${data.license.expired.length}`}
                        action={data.license.expired.length>0&&<span className="text-[10px] px-2 py-0.5 bg-red-900/40 text-red-400 border border-red-700/40 rounded uppercase tracking-wider">Action Required</span>}/>
                      {!data.license.expired.length
                        ? <div className="flex flex-col items-center justify-center py-6 gap-2 text-zinc-600"><span className="text-2xl">✅</span><span>No expired licenses</span></div>
                        : <div className="space-y-2">{data.license.expired.map(d=>(
                          <div key={d.id} onClick={()=>router.push(`/drivers/${d.id}`)}
                            className="flex items-center justify-between bg-red-900/10 border border-red-800/30 rounded-lg p-3 cursor-pointer hover:bg-red-900/20 transition-colors">
                            <div>
                              <div className="text-sm font-medium text-white">{d.name}</div>
                              {d.phone && <div className="text-[10px] text-zinc-500 font-mono">{d.phone}</div>}
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono text-red-400">{fmtDate(d.licenseExp)}</div>
                              <div className="text-[10px] text-red-600">Expired</div>
                            </div>
                          </div>
                        ))}</div>}
                    </Panel>

                    <Panel>
                      <SectionTitle title={`Expiring Soon · ${data.license.aboutToExpire.length}`}
                        action={data.license.aboutToExpire.length>0&&<span className="text-[10px] px-2 py-0.5 bg-amber-900/40 text-amber-400 border border-amber-700/40 rounded uppercase tracking-wider">Renew Soon</span>}/>
                      {!data.license.aboutToExpire.length
                        ? <div className="flex flex-col items-center justify-center py-6 gap-2 text-zinc-600"><span className="text-2xl">✅</span><span>No licenses expiring soon</span></div>
                        : <div className="space-y-2">{data.license.aboutToExpire.map(d=>(
                          <div key={d.id} onClick={()=>router.push(`/drivers/${d.id}`)}
                            className="flex items-center justify-between bg-amber-900/10 border border-amber-800/30 rounded-lg p-3 cursor-pointer hover:bg-amber-900/20 transition-colors">
                            <div>
                              <div className="text-sm font-medium text-white">{d.name}</div>
                              {d.phone && <div className="text-[10px] text-zinc-500 font-mono">{d.phone}</div>}
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-mono text-amber-400">{fmtDate(d.licenseExp)}</div>
                              {d.daysLeft != null && <div className="text-[10px] text-amber-600">{d.daysLeft}d left</div>}
                            </div>
                          </div>
                        ))}</div>}
                    </Panel>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
