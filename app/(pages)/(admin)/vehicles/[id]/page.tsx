// // // src/app/admin/vehicles/[id]/page.tsx
// // "use client";

// // src/app/admin/vehicles/[id]/page.tsx
// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { toast, Toaster } from "sonner";
// import { saveAs } from "file-saver";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   CartesianGrid,
//   Legend,
//   AreaChart,
//   Area,
// } from "recharts";
// import { motion, AnimatePresence } from "framer-motion";
// import DashboardLayout from "@/components/layout/Dashboard";

// // ─── Types ─────────────────────────────────────────────────────────────────
// interface VehicleData {
//   vehicle: {
//     id: string;
//     plateNumber: string;
//     cap_no: string;
//     make?: string;
//     model?: string;
//     year?: number;
//     fuelType: string;
//     fuelEfficiencyKmPerUnit?: number;
//     vehicleImg?: string;
//     currentOdo?: number;
//     driverId?: string;
//     driver?: { name: string; phone?: string; profileImage?: string };
//   };
//   totals: {
//     totalTrips: number;
//     totalDistanceAllTime: number;
//     totalDistanceInRange: number;
//     totalFuelConsume: number;
//     totalFuelCost: number;
//     fuelEfficiency: number;
//     estimatedCO2Kg: number;
//   };
//   fuelByType: Record<string, { qtyConsume: number; cost: number }>;
//   tripTrend: { month: string; count: number }[];
//   fuelTrend: { month: string; cost: number; qty: number }[];
//   loadingPlantChart: { name: string; value: number }[];
//   destinationChart: { name: string; value: number }[];
//   tripStatusChart: { name: string; value: number }[];
//   topDrivers: { driver: { name: string }; trips: number }[];
//   driverHistory: {
//     id: string;
//     driverName: string;
//     driverPhone?: string;
//     driverId: string;
//     from: string;
//     to: string;
//     daysAssigned: number;
//   }[];
//   recentTrips: {
//     id: string;
//     waybill_no: string;
//     atcNo: string;
//     destination: string;
//     loadingPlant: string;
//     distanceKm?: number;
//     despatchDate: string;
//     status: string;
//     driver: { name?: string };
//     fuelCost: number;
//   }[];
//   parts: {
//     items: {
//       id: string;
//       name: string;
//       brand: string;
//       model: string;
//       serialNumber: string;
//       supplier?: string;
//       unitCost: number;
//       quantity?: number;
//       installDate: string;
//       installOdo?: number;
//       kmOnVehicle?: number;
//       daysOnVehicle: number;
//       description?: string;
//     }[];
//     totalPartsCost: number;
//   };
//   repairs: { items: any[]; totalCost: number };
//   services: { items: any[]; totalCost: number };
//   tireActions: any[];
// }

// // ─── Constants ─────────────────────────────────────────────────────────────
// const PALETTE = ["#B8860B", "#3E6B8C", "#5C9669", "#8C5E3E", "#7B4E8C", "#8C3E3E", "#3E7B8C", "#6E8C3E"];

// const STATUS_COLORS: Record<string, string> = {
//   COMPLETED: "#5C9669",
//   IN_PROGRESS: "#B8860B",
//   PLANNED: "#3E6B8C",
//   CANCELLED: "#8C3E3E",
// };

// const fmt = (n?: number, dec = 2) =>
//   n != null ? Number(n).toLocaleString("en-NG", { maximumFractionDigits: dec }) : "—";

// const naira = (n?: number) =>
//   n != null ? `₦${Number(n).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : "—";

// function pill(status: string) {
//   const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide";
//   const c: Record<string, string> = {
//     COMPLETED: "bg-emerald-900/30 text-emerald-400 border border-emerald-700/40",
//     IN_PROGRESS: "bg-amber-900/30 text-amber-400 border border-amber-700/40",
//     PLANNED: "bg-sky-50 text-sky-400 border border-sky-700/40",
//     CANCELLED: "bg-red-900/30 text-red-400 border border-red-700/40",
//   };
//   return <span className={`${base} ${c[status] ?? "bg-zinc-700 text-[#2C2825]"}`}>{status}</span>;
// }

// // ─── Sub-components ─────────────────────────────────────────────────────────
// function StatCard({
//   label,
//   value,
//   sub,
//   accent,
//   icon,
//   delay = 0,
// }: {
//   label: string;
//   value: string | number;
//   sub?: string;
//   accent?: string;
//   icon?: React.ReactNode;
//   delay?: number;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay }}
//       className="relative bg-white border border-[#E8E2D9] rounded-xl p-5 overflow-hidden"
//     >
//       <div
//         className="absolute inset-0 opacity-10 pointer-events-none"
//         style={{ background: `radial-gradient(circle at 80% 20%, ${accent ?? "#B8860B"} 0%, transparent 70%)` }}
//       />
//       <div className="relative">
//         <div className="flex items-center justify-between mb-3">
//           <span className="text-xs font-semibold tracking-widest uppercase text-[#9C9590]">{label}</span>
//           <span className="text-[#9C9590] text-lg">{icon}</span>
//         </div>
//         <div className="text-2xl font-bold text-[#1C1917] font-mono">{value}</div>
//         {sub && <div className="text-xs text-[#9C9590] mt-1">{sub}</div>}
//       </div>
//     </motion.div>
//   );
// }

// function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
//   return (
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-sm font-bold tracking-widest uppercase text-[#6B6560]">{title}</h2>
//       {action}
//     </div>
//   );
// }

// function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`bg-white border border-[#E8E2D9] rounded-xl p-5 ${className}`}>
//       {children}
//     </div>
//   );
// }

// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (!active || !payload?.length) return null;
//   return (
//     <div className="bg-[#1C2330] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
//       <div className="text-[#6B6560] mb-1">{label}</div>
//       {payload.map((p: any, i: number) => (
//         <div key={i} style={{ color: p.color }} className="font-mono">
//           {p.name}: {typeof p.value === "number" ? fmt(p.value) : p.value}
//         </div>
//       ))}
//     </div>
//   );
// };

// // ─── Main Page ──────────────────────────────────────────────────────────────
// export default function VehicleDetailPage() {
//   const { id } = useParams() as { id: string };
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<VehicleData | null>(null);
//   const [activeTab, setActiveTab] = useState<"overview" | "parts" | "drivers" | "trips">("overview");
//   const [range, setRange] = useState(() => {
//     const now = new Date();
//     const end = now.toISOString().slice(0, 10);
//     const start = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10);
//     return { start, end };
//   });

//   const fetchData = useCallback(
//     async (start?: string, end?: string) => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const qs = new URLSearchParams();
//         if (start) qs.set("startDate", new Date(start).toISOString());
//         if (end) qs.set("endDate", new Date(end).toISOString());
//         const res = await fetch(`/api/vehicles/details/${id}?${qs}`);
//         const json = await res.json();
//         if (!res.ok) throw new Error(json?.message ?? "Failed");
//         setData(json.data);
//       } catch (err: any) {
//         toast.error(err?.message ?? "Failed to load vehicle");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [id]
//   );

//   useEffect(() => {
//     fetchData(range.start, range.end);
//   }, [id]);

//   async function removeDriver() {
//     try {
//       const res = await fetch(`/api/vehicles/remove/${id}`, { method: "PATCH" });
//       if (!res.ok) throw new Error((await res.json())?.message ?? "Failed");
//       toast.success("Driver removed");
//       fetchData(range.start, range.end);
//     } catch (err: any) {
//       toast.error(err.message);
//     }
//   }

//   function exportCSV() {
//     if (!data) return toast.error("No data to export");
//     const v = data.vehicle;
//     const rows: string[][] = [
//       ["Vehicle Report"],
//       ["Plate", v.plateNumber],
//       ["Make/Model", `${v.make ?? ""} ${v.model ?? ""}`],
//       ["CAP No", v.cap_no],
//       ["Year", String(v.year ?? "")],
//       ["Fuel Type", v.fuelType],
//       ["Odometer", String(v.currentOdo ?? 0)],
//       [],
//       ["Totals"],
//       ["Total Trips", String(data.totals.totalTrips)],
//       ["Total Distance (all time) km", String(data.totals.totalDistanceAllTime)],
//       ["Distance in range km", String(data.totals.totalDistanceInRange)],
//       ["Fuel Consumed (range) L", String(data.totals.totalFuelConsume)],
//       ["Fuel Cost (range) ₦", String(data.totals.totalFuelCost)],
//       ["Fuel Efficiency km/L", String(data.totals.fuelEfficiency)],
//       ["Est. CO₂ kg", String(data.totals.estimatedCO2Kg)],
//       [],
//       ["Parts"],
//       ["Name", "Brand", "Model", "Serial", "Unit Cost", "Qty", "Install Date", "km on Vehicle", "Days on Vehicle"],
//       ...(data.parts.items.map((p) => [
//         p.name,
//         p.brand,
//         p.model,
//         p.serialNumber,
//         String(p.unitCost),
//         String(p.quantity ?? 1),
//         new Date(p.installDate).toLocaleDateString(),
//         String(p.kmOnVehicle ?? ""),
//         String(p.daysOnVehicle),
//       ])),
//     ];
//     const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
//     saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `vehicle_${v.plateNumber}_report.csv`);
//   }

//   if (loading)
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
//           <div className="space-y-3 text-center">
//             <div className="w-10 h-10 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin mx-auto" />
//             <p className="text-[#9C9590] text-sm tracking-wider">LOADING VEHICLE DATA</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );

//   if (!data)
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center text-[#9C9590]">
//           No vehicle found.
//         </div>
//       </DashboardLayout>
//     );

//   const v = data.vehicle;
//   const t = data.totals;
//   const totalMaintCost = (data.parts.totalPartsCost ?? 0) + (data.repairs.totalCost ?? 0) + (data.services.totalCost ?? 0);
//   const costPerKm = t.totalDistanceInRange > 0 ? t.totalFuelCost / t.totalDistanceInRange : 0;

//   const tabs = [
//     { key: "overview", label: "Overview" },
//     { key: "parts", label: "Parts & Maintenance" },
//     { key: "drivers", label: "Driver History" },
//     { key: "trips", label: "Recent Trips" },
//   ] as const;

//   return (
//     <DashboardLayout>
//       <Toaster theme="dark" position="top-right" />
//       <div className="min-h-screen bg-[#F8F6F1] text-[#1C1917]" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>
//         {/* ── HEADER ── */}
//         <div className="border-b border-[#E8E2D9] bg-[#F8F6F1]/80 backdrop-blur sticky top-0 z-30">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => router.back()}
//                 className="text-[#9C9590] hover:text-[#1C1917] transition-colors text-lg"
//               >
//                 ←
//               </button>
//               <div
//                 className="w-10 h-10 rounded-lg bg-center bg-cover border border-white/10 flex-shrink-0"
//                 style={{ backgroundImage: `url(${v.vehicleImg || "/vehicle-placeholder.png"})` }}
//               />
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-base font-bold tracking-wider">{v.plateNumber}</h1>
//                   <span className="text-xs text-[#9C9590] font-mono border border-white/10 px-2 py-0.5 rounded">
//                     {v.cap_no}
//                   </span>
//                 </div>
//                 <p className="text-xs text-[#9C9590]">
//                   {[v.make, v.model, v.year].filter(Boolean).join(" • ")} · {v.fuelType}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {v.driverId ? (
//                 <button
//                   onClick={removeDriver}
//                   className="px-3 py-1.5 rounded-lg text-xs border border-red-800/50 text-red-400 hover:bg-red-50 transition-colors"
//                 >
//                   Remove Driver
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => router.push(`/vehicles/update/${id}`)}
//                   className="px-3 py-1.5 rounded-lg text-xs border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 transition-colors"
//                 >
//                   Assign Driver
//                 </button>
//               )}
//               <button
//                 onClick={() => router.push(`/maintenance/parts/${id}`)}
//                 className="px-3 py-1.5 rounded-lg text-xs bg-[#B8860B] text-[#1C1917] font-bold hover:bg-[#C9960D] transition-colors"
//               >
//                 + Parts
//               </button>
//               <button
//                 onClick={exportCSV}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-[#6B6560] hover:text-[#1C1917] hover:border-[#B8860B]/30 transition-colors"
//               >
//                 Export CSV
//               </button>
//             </div>
//           </div>

//           {/* Date Filter */}
//           <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3">
//             <span className="text-xs text-[#9C9590] uppercase tracking-wider">Range</span>
//             <input
//               type="date"
//               value={range.start}
//               onChange={(e) => setRange((r) => ({ ...r, start: e.target.value }))}
//               className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"
//             />
//             <span className="text-[#9C9590]">→</span>
//             <input
//               type="date"
//               value={range.end}
//               onChange={(e) => setRange((r) => ({ ...r, end: e.target.value }))}
//               className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"
//             />
//             <button
//               onClick={() => fetchData(range.start, range.end)}
//               className="px-3 py-1 rounded-lg text-xs bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/30 hover:bg-[#B8860B]/20 transition-colors"
//             >
//               Apply
//             </button>
//             <button
//               onClick={() => {
//                 const now = new Date();
//                 const newEnd = now.toISOString().slice(0, 10);
//                 const newStart = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 180).toISOString().slice(0, 10);
//                 setRange({ start: newStart, end: newEnd });
//                 fetchData(newStart, newEnd);
//               }}
//               className="px-3 py-1 rounded-lg text-xs border border-[#E8E2D9] text-[#9C9590] hover:text-[#2C2825] transition-colors"
//             >
//               Reset
//             </button>

//             {/* Current driver badge */}
//             {v.driver && (
//               <div className="ml-auto flex items-center gap-2 bg-white border border-[#E8E2D9] rounded-lg px-3 py-1.5">
//                 <div className="w-5 h-5 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/40 overflow-hidden">
//                   <img src={v.driver.profileImage ?? "/avatar-placeholder.png"} alt="" className="w-full h-full object-cover" />
//                 </div>
//                 <span className="text-xs text-[#2C2825]">{v.driver.name}</span>
//                 <span className="text-xs text-[#9C9590]">· Current Driver</span>
//               </div>
//             )}
//           </div>

//           {/* Tabs */}
//           <div className="max-w-7xl mx-auto px-6 flex gap-0 border-t border-[#EDE8E0]">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all relative ${
//                   activeTab === tab.key ? "text-[#B8860B]" : "text-[#9C9590] hover:text-[#6B6560]"
//                 }`}
//               >
//                 {tab.label}
//                 {activeTab === tab.key && (
//                   <motion.div
//                     layoutId="tab-indicator"
//                     className="absolute bottom-0 left-0 right-0 h-px bg-[#B8860B]"
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── CONTENT ── */}
//         <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
//           <AnimatePresence mode="wait">
//             {activeTab === "overview" && (
//               <motion.div
//                 key="overview"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 {/* KPI Row 1 */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   <StatCard
//                     label="Total Trips"
//                     value={fmt(t.totalTrips, 0)}
//                     sub="all time"
//                     accent="#3E6B8C"
//                     icon="🚛"
//                     delay={0}
//                   />
//                   <StatCard
//                     label="Distance (range)"
//                     value={`${fmt(t.totalDistanceInRange, 0)} km`}
//                     sub={`${fmt(t.totalDistanceAllTime, 0)} km all time`}
//                     accent="#B8860B"
//                     icon="📍"
//                     delay={0.05}
//                   />
//                   <StatCard
//                     label="Fuel Consumed"
//                     value={`${fmt(t.totalFuelConsume, 0)} L`}
//                     sub="in selected range"
//                     accent="#5C9669"
//                     icon="⛽"
//                     delay={0.1}
//                   />
//                   <StatCard
//                     label="Fuel Cost"
//                     value={naira(t.totalFuelCost)}
//                     sub="in selected range"
//                     accent="#8C3E3E"
//                     icon="💰"
//                     delay={0.15}
//                   />
//                 </div>

//                 {/* KPI Row 2 */}
//                 {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   <StatCard
//                     label="Fuel Efficiency"
//                     value={`${fmt(t.fuelEfficiency)} km/L`}
//                     sub={`Target: ${v.fuelEfficiencyKmPerUnit ?? "—"} km/L`}
//                     accent={
//                       t.fuelEfficiency >= (v.fuelEfficiencyKmPerUnit ?? t.fuelEfficiency)
//                         ? "#5C9669"
//                         : "#8C3E3E"
//                     }
//                     icon="⚡"
//                     delay={0.2}
//                   />
//                   <StatCard
//                     label="Cost per km"
//                     value={naira(costPerKm)}
//                     sub="fuel cost / distance"
//                     accent="#7B4E8C"
//                     icon="📊"
//                     delay={0.25}
//                   />
//                   <StatCard
//                     label="Maintenance Cost"
//                     value={naira(totalMaintCost)}
//                     sub="parts + repairs + services"
//                     accent="#B8860B"
//                     icon="🔧"
//                     delay={0.3}
//                   />
//                   <StatCard
//                     label="Est. CO₂"
//                     value={`${fmt(t.estimatedCO2Kg, 0)} kg`}
//                     sub="estimated emissions"
//                     accent="#5C9669"
//                     icon="🌿"
//                     delay={0.35}
//                   />
//                 </div> */}

//                 {/* Charts Row 1 */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                   {/* Trip trend */}
//                   <Panel className="lg:col-span-2">
//                     <SectionHeader title="Monthly Trip Volume" />
//                     <div style={{ height: 240 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart data={data.tripTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                           <defs>
//                             <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="5%" stopColor="#B8860B" stopOpacity={0.3} />
//                               <stop offset="95%" stopColor="#B8860B" stopOpacity={0} />
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                           <XAxis
//                             dataKey="month"
//                             tick={{ fill: "#71717a", fontSize: 10 }}
//                             tickLine={false}
//                             axisLine={false}
//                           />
//                           <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <Tooltip content={<CustomTooltip />} />
//                           <Area
//                             type="monotone"
//                             dataKey="count"
//                             stroke="#B8860B"
//                             strokeWidth={2}
//                             fill="url(#tripGrad)"
//                             name="Trips"
//                           />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>

//                   {/* Loading plant pie */}
//                   <Panel>
//                     <SectionHeader title="Loading Plants" />
//                     <div style={{ height: 240 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                           <Pie
//                             data={data.loadingPlantChart}
//                             dataKey="value"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={80}
//                             innerRadius={45}
//                             paddingAngle={2}
//                           >
//                             {data.loadingPlantChart.map((_, i) => (
//                               <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
//                             ))}
//                           </Pie>
//                           <Tooltip
//                             contentStyle={{
//                               background: "#1C2330",
//                               border: "1px solid rgba(255,255,255,0.08)",
//                               borderRadius: 8,
//                               fontSize: 11,
//                             }}
//                           />
//                           <Legend
//                             iconSize={8}
//                             formatter={(v) => (
//                               <span style={{ color: "#71717a", fontSize: 10 }}>
//                                 {String(v).length > 16 ? String(v).slice(0, 16) + "…" : v}
//                               </span>
//                             )}
//                           />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>
//                 </div>

//                 {/* Charts Row 2 */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                   {/* Fuel cost trend */}
//                   <Panel className="lg:col-span-2">
//                     <SectionHeader title="Monthly Fuel Cost" />
//                     <div style={{ height: 220 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data.fuelTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                           <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <Tooltip content={<CustomTooltip />} />
//                           <Bar dataKey="cost" name="Cost (₦)" fill="#B8860B" radius={[4, 4, 0, 0]} />
//                           <Bar dataKey="qty" name="Qty (L)" fill="#3E6B8C" radius={[4, 4, 0, 0]} />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>

//                   {/* Trip status + top destinations */}
//                   <div className="space-y-4">
//                     <Panel>
//                       <SectionHeader title="Trip Status" />
//                       <div className="space-y-2">
//                         {data.tripStatusChart.map((s) => (
//                           <div key={s.name} className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <div
//                                 className="w-2 h-2 rounded-full"
//                                 style={{ background: STATUS_COLORS[s.name] ?? "#71717a" }}
//                               />
//                               <span className="text-xs text-[#6B6560]">{s.name}</span>
//                             </div>
//                             <span className="text-xs font-mono text-[#1C1917]">{s.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </Panel>

//                     <Panel>
//                       <SectionHeader title="Top Destinations" />
//                       <div className="space-y-1.5">
//                         {data.destinationChart.slice(0, 5).map((d, i) => (
//                           <div key={d.name} className="flex items-center gap-2">
//                             <span className="text-[10px] text-[#9C9590] w-3">{i + 1}</span>
//                             <div className="flex-1 min-w-0">
//                               <div className="text-xs text-[#2C2825] truncate">{d.name}</div>
//                               <div
//                                 className="h-1 rounded-full mt-0.5 bg-[#B8860B]/30"
//                                 style={{
//                                   width: `${(d.value / (data.destinationChart[0]?.value || 1)) * 100}%`,
//                                   background: PALETTE[i % PALETTE.length],
//                                 }}
//                               />
//                             </div>
//                             <span className="text-xs font-mono text-[#6B6560]">{d.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </Panel>
//                   </div>
//                 </div>

//                 {/* Top Drivers */}
//                 <Panel>
//                   <SectionHeader
//                     title="Top Drivers (by trips on this vehicle)"
//                     action={
//                       <button
//                         onClick={() => setActiveTab("drivers")}
//                         className="text-xs text-[#9C9590] hover:text-[#B8860B] transition-colors"
//                       >
//                         Full History →
//                       </button>
//                     }
//                   />
//                   <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//                     {data.topDrivers.map((td, i) => (
//                       <div key={i} className="bg-[#F8F6F1] rounded-lg p-3 text-center border border-[#EDE8E0]">
//                         <div className="text-lg font-bold text-[#B8860B]">#{i + 1}</div>
//                         <div className="text-sm font-medium text-[#1C1917] truncate mt-1">{td.driver?.name ?? "Unknown"}</div>
//                         <div className="text-xs text-[#9C9590]">{td.trips} trips</div>
//                       </div>
//                     ))}
//                     {data.topDrivers.length === 0 && (
//                       <div className="col-span-5 text-center text-[#9C9590] text-sm py-4">No driver data</div>
//                     )}
//                   </div>
//                 </Panel>
//               </motion.div>
//             )}

//             {/* ── PARTS & MAINTENANCE TAB ── */}
//             {activeTab === "parts" && (
//               <motion.div
//                 key="parts"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 {/* Summary cards */}
//                 <div className="grid grid-cols-3 gap-3">
//                   <StatCard label="Parts Cost" value={naira(data.parts.totalPartsCost)} accent="#B8860B" icon="🔩" />
//                   <StatCard label="Repairs Cost" value={naira(data.repairs.totalCost)} accent="#8C3E3E" icon="🔧" />
//                   <StatCard label="Services Cost" value={naira(data.services.totalCost)} accent="#3E6B8C" icon="⚙️" />
//                 </div>

//                 {/* Parts table */}
//                 <Panel>
//                   <SectionHeader title={`Parts Installed (${data.parts.items.length})`} />
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-xs">
//                       <thead>
//                         <tr className="border-b border-[#E8E2D9]">
//                           {["Part", "Brand / Model", "Serial", "Unit Cost", "Qty", "Install Date", "Install ODO", "km on Vehicle", "Days on Vehicle"].map((h) => (
//                             <th key={h} className="text-left py-2 pr-4 text-[#9C9590] font-semibold uppercase tracking-wider whitespace-nowrap">
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.parts.items.map((p, i) => (
//                           <tr
//                             key={p.id}
//                             className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
//                           >
//                             <td className="py-3 pr-4">
//                               <div className="font-medium text-[#1C1917]">{p.name}</div>
//                               {p.supplier && <div className="text-[#9C9590]">{p.supplier}</div>}
//                             </td>
//                             <td className="py-3 pr-4 text-[#6B6560]">{p.brand} {p.model}</td>
//                             <td className="py-3 pr-4 font-mono text-[#9C9590]">{p.serialNumber}</td>
//                             <td className="py-3 pr-4 font-mono text-[#B8860B]">{naira(p.unitCost)}</td>
//                             <td className="py-3 pr-4 text-[#6B6560]">{p.quantity ?? 1}</td>
//                             <td className="py-3 pr-4 text-[#6B6560] whitespace-nowrap">
//                               {new Date(p.installDate).toLocaleDateString("en-NG")}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-[#6B6560]">
//                               {p.installOdo != null ? `${fmt(p.installOdo, 0)} km` : "—"}
//                             </td>
//                             <td className="py-3 pr-4">
//                               <span
//                                 className={`font-mono ${
//                                   (p.kmOnVehicle ?? 0) > 50000
//                                     ? "text-red-400"
//                                     : (p.kmOnVehicle ?? 0) > 25000
//                                     ? "text-amber-400"
//                                     : "text-emerald-400"
//                                 }`}
//                               >
//                                 {p.kmOnVehicle != null ? `${fmt(p.kmOnVehicle, 0)} km` : "—"}
//                               </span>
//                             </td>
//                             <td className="py-3 pr-4">
//                               <span
//                                 className={`font-mono ${
//                                   p.daysOnVehicle > 365
//                                     ? "text-red-400"
//                                     : p.daysOnVehicle > 180
//                                     ? "text-amber-400"
//                                     : "text-[#2C2825]"
//                                 }`}
//                               >
//                                 {p.daysOnVehicle}d
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                         {data.parts.items.length === 0 && (
//                           <tr>
//                             <td colSpan={9} className="py-8 text-center text-[#9C9590]">
//                               No parts recorded for this vehicle
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Panel>

//                 {/* Repairs & Services split */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   <Panel>
//                     <SectionHeader title={`Repairs (${data.repairs.items.length})`} />
//                     <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
//                       {data.repairs.items.map((r: any) => (
//                         <div key={r.id} className="bg-[#F8F6F1] rounded-lg p-3 border border-[#EDE8E0]">
//                           <div className="flex justify-between items-start">
//                             <div className="text-sm font-medium text-[#1C1917]">{r.repairDescription}</div>
//                             <span className="text-xs font-mono text-[#B8860B] ml-2">{naira(r.totalCost)}</span>
//                           </div>
//                           <div className="text-xs text-[#9C9590] mt-1">
//                             {new Date(r.repairDate).toLocaleDateString()} · {fmt(r.odometerReadingKm, 0)} km
//                             {r.mechanic && ` · ${r.mechanic}`}
//                           </div>
//                           {r.notes && <div className="text-xs text-[#9C9590] mt-1 italic">{r.notes}</div>}
//                         </div>
//                       ))}
//                       {data.repairs.items.length === 0 && (
//                         <div className="text-center text-[#9C9590] text-sm py-4">No repairs recorded</div>
//                       )}
//                     </div>
//                   </Panel>

//                   <Panel>
//                     <SectionHeader title={`Services (${data.services.items.length})`} />
//                     <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
//                       {data.services.items.map((s: any) => (
//                         <div key={s.id} className="bg-[#F8F6F1] rounded-lg p-3 border border-[#EDE8E0]">
//                           <div className="flex justify-between items-start">
//                             <div className="text-sm font-medium text-[#1C1917]">{s.serviceType}</div>
//                             <span className="text-xs font-mono text-[#B8860B] ml-2">{naira(s.cost)}</span>
//                           </div>
//                           <div className="text-xs text-[#9C9590] mt-1">
//                             {new Date(s.serviceDate).toLocaleDateString()} · {fmt(s.odometerReadingKm, 0)} km
//                             {s.provider && ` · ${s.provider}`}
//                           </div>
//                           {s.notes && <div className="text-xs text-[#9C9590] mt-1 italic">{s.notes}</div>}
//                         </div>
//                       ))}
//                       {data.services.items.length === 0 && (
//                         <div className="text-center text-[#9C9590] text-sm py-4">No services recorded</div>
//                       )}
//                     </div>
//                   </Panel>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── DRIVER HISTORY TAB ── */}
//             {activeTab === "drivers" && (
//               <motion.div
//                 key="drivers"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 <Panel>
//                   <SectionHeader title={`Driver History (${data.driverHistory.length} assignments)`} />
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-xs">
//                       <thead>
//                         <tr className="border-b border-[#E8E2D9]">
//                           {["Driver", "Phone", "Start Date", "End Date", "Days Assigned", "Status"].map((h) => (
//                             <th key={h} className="text-left py-2 pr-6 text-[#9C9590] font-semibold uppercase tracking-wider whitespace-nowrap">
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.driverHistory.map((dh) => {
//                           const isActive = v.driverId === dh?.driverId;
//                           return (
//                             <tr
//                               key={dh.id}
//                               className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
//                             >
//                               <td className="py-3 pr-6">
//                                 <div className="flex items-center gap-2">
//                                   {isActive && (
//                                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
//                                   )}
//                                   <span className="font-medium text-[#1C1917]">{dh.driverName}</span>
//                                 </div>
//                               </td>
//                               <td className="py-3 pr-6 text-[#6B6560] font-mono">{dh.driverPhone ?? "—"}</td>
//                               <td className="py-3 pr-6 text-[#6B6560] whitespace-nowrap">
//                                 {new Date(dh.from).toLocaleDateString("en-NG")}
//                               </td>
//                               <td className="py-3 pr-6 text-[#6B6560] whitespace-nowrap">
//                                 {isActive ? (
//                                   <span className="text-emerald-400">Present</span>
//                                 ) : (
//                                   new Date(dh.to).toLocaleDateString("en-NG")
//                                 )}
//                               </td>
//                               <td className="py-3 pr-6 font-mono">
//                                 <span
//                                   className={
//                                     dh.daysAssigned > 180
//                                       ? "text-[#B8860B]"
//                                       : dh.daysAssigned > 60
//                                       ? "text-[#2C2825]"
//                                       : "text-[#9C9590]"
//                                   }
//                                 >
//                                   {dh.daysAssigned}d
//                                 </span>
//                               </td>
//                               <td className="py-3 pr-6">
//                                 {isActive ? (
//                                   <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
//                                     <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
//                                     Active
//                                   </span>
//                                 ) : (
//                                   <span className="text-[#9C9590] text-xs">Completed</span>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                         {data.driverHistory.length === 0 && (
//                           <tr>
//                             <td colSpan={6} className="py-8 text-center text-[#9C9590]">
//                               No driver history found
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Panel>

//                 {/* Visual timeline */}
//                 {data.driverHistory.length > 0 && (
//                   <Panel>
//                     <SectionHeader title="Assignment Timeline" />
//                     <div className="relative pl-6 space-y-4">
//                       <div className="absolute left-2 top-0 bottom-0 w-px bg-white/[0.06]" />
//                       {data.driverHistory.map((dh, i) => {
//                         const isActive = v.driverId === dh.driverId;
//                         return (
//                           <motion.div
//                             key={dh.id}
//                             initial={{ opacity: 0, x: -8 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.04 }}
//                             className="relative"
//                           >
//                             <div
//                               className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
//                                 isActive
//                                   ? "border-emerald-400 bg-emerald-400/20"
//                                   : "border-zinc-600 bg-[#F8F6F1]"
//                               }`}
//                             />
//                             <div className="bg-[#F8F6F1] rounded-lg p-3 border border-[#EDE8E0]">
//                               <div className="flex items-center justify-between">
//                                 <div className="font-medium text-sm text-[#1C1917]">{dh.driverName}</div>
//                                 <div className="text-xs font-mono text-[#9C9590]">{dh.daysAssigned} days</div>
//                               </div>
//                               <div className="text-xs text-[#9C9590] mt-0.5">
//                                 {new Date(dh.from).toLocaleDateString("en-NG")} →{" "}
//                                 {isActive ? "Present" : new Date(dh.to).toLocaleDateString("en-NG")}
//                               </div>
//                             </div>
//                           </motion.div>
//                         );
//                       })}
//                     </div>
//                   </Panel>
//                 )}
//               </motion.div>
//             )}

//             {/* ── TRIPS TAB ── */}
//             {activeTab === "trips" && (
//               <motion.div
//                 key="trips"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-4"
//               >
//                 <Panel>
//                   <SectionHeader title={`Recent Trips (${data.recentTrips.length} shown)`} />
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-xs">
//                       <thead>
//                         <tr className="border-b border-[#E8E2D9]">
//                           {["Waybill", "ATC No", "Loading Plant", "Destination", "Distance", "Driver", "Date", "Fuel Cost", "Status"].map(
//                             (h) => (
//                               <th
//                                 key={h}
//                                 className="text-left py-2 pr-4 text-[#9C9590] font-semibold uppercase tracking-wider whitespace-nowrap"
//                               >
//                                 {h}
//                               </th>
//                             )
//                           )}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.recentTrips.map((t) => (
//                           <tr
//                             key={t.id}
//                             className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
//                             onClick={() => router.push(`/trips/${t.id}`)}
//                           >
//                             <td className="py-3 pr-4 font-mono text-[#B8860B] group-hover:text-[#1C1917] transition-colors">
//                               {t.waybill_no}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-[#9C9590]">{t.atcNo}</td>
//                             <td className="py-3 pr-4 text-[#6B6560]">{t.loadingPlant}</td>
//                             <td className="py-3 pr-4 text-[#2C2825]">{t.destination}</td>
//                             <td className="py-3 pr-4 font-mono text-[#6B6560]">
//                               {t.distanceKm != null ? `${fmt(t.distanceKm, 0)} km` : "—"}
//                             </td>
//                             <td className="py-3 pr-4 text-[#6B6560]">{t.driver?.name ?? "—"}</td>
//                             <td className="py-3 pr-4 text-[#9C9590] whitespace-nowrap">
//                               {new Date(t.despatchDate).toLocaleDateString("en-NG")}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-[#6B6560]">{naira(t.fuelCost)}</td>
//                             <td className="py-3 pr-4">{pill(t.status)}</td>
//                           </tr>
//                         ))}
//                         {data.recentTrips.length === 0 && (
//                           <tr>
//                             <td colSpan={9} className="py-8 text-center text-[#9C9590]">
//                               No trips in this date range
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Panel>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
// src/app/admin/vehicles/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Types ────────────────────────────────────────────────────────────────────
interface VehicleData {
  vehicle: {
    id: string; plateNumber: string; cap_no: string;
    make?: string; model?: string; year?: number;
    fuelType: string; fuelEfficiencyKmPerUnit?: number | null;
    vehicleImg?: string; currentOdo?: number | null;
    nextServiceDate?: string | null; nextServiceKm?: number | null;
    driver?: { id: string; name: string; phone?: string; profileImage?: string } | null;
  };
  totals: {
    totalTrips: number; totalDistanceAllTime: number; totalDistanceInRange: number;
    totalFuelQty: number; totalFuelCost: number; fuelEfficiency: number;
    estimatedCO2Kg: number; costPerKm: number;
  };
  fuelByType: Record<string,{ qtyConsume:number; cost:number }>;
  tripTrend:        { month:string; count:number }[];
  fuelTrend:        { month:string; cost:number; qty:number }[];
  loadingPlantChart:{ name:string; value:number }[];
  destinationChart: { name:string; value:number }[];
  tripStatusChart:  { name:string; value:number }[];
  topDrivers:       { driver:any; trips:number; km:number }[];
  recentTrips: {
    id:string; waybill_no:string; atcNo:string; destination:string; loadingPlant:string;
    distanceKm?:number|null; despatchDate:string; status:string;
    driver:{ id?:string; name?:string|null }; fuelCost:number;
  }[];
  driverHistory: {
    id:string; driverId:string; driverName:string; driverPhone?:string|null;
    from:string; to?:string|null; daysAssigned:number;
  }[];
  maintenance: {
    repairs:  RepairRow[];   repairCostTotal:  number;
    services: ServiceRow[];  serviceCostTotal: number;
    parts:    PartRow[];     partsCostTotal:   number;
    tires:    TireRow[];     tireCostTotal:    number;
    totalMaintenanceCost: number;
    mFrom?:string|null; mTo?:string|null;
  };
}

interface RepairRow {
  id:string; faultDesc:string; repairDesc?:string|null;
  priority:string; status:string;
  odometerKm?:number|null; laborCost?:number|null; partsCost?:number|null; totalCost?:number|null;
  garage?:string|null; garagePhone?:string|null;
  reportedDate:string; startedDate?:string|null; completedDate?:string|null;
  driverId?:string|null; driverName?:string|null; kmDrivenNearEvent?:number|null;tripsDrivenFromEvent:number|null
  notes?:string|null;
}
interface ServiceRow {
  id:string; serviceType:string; status:string; description?:string|null;
  odometerKm?:number|null; nextServiceKm?:number|null; nextServiceDate?:string|null;
  laborCost?:number|null; partsCost?:number|null; totalCost?:number|null;
  garage?:string|null; garagePhone?:string|null;
  scheduledDate?:string|null; completedDate?:string|null;
  driverId?:string|null; driverName?:string|null; kmDrivenNearEvent?:number|null;tripsDrivenFromEvent:number|null
  notes?:string|null;
}
interface PartRow {
  id:string; name:string; partNumber?:string|null; category?:string|null;
  quantity:number; unitCost:number; totalCost?:number|null;
  supplier?:string|null; supplierPhone?:string|null;
  purchaseDate?:string|null; fittedDate?:string|null; warrantyExpiry?:string|null;
  repairId?:string|null; driverId?:string|null; driverName?:string|null;
  kmDrivenNearEvent?:number|null; notes?:string|null;tripsDrivenFromEvent:number|null
}
interface TireRow {
  id:string; brand?:string|null; size?:string|null; serialNumber?:string|null;
  position:string; status:string;
  fittedOdometerKm?:number|null; removedOdometerKm?:number|null;
  kmCovered?:number|null; expectedLifeKm?:number|null;
  treadDepthMm?:number|null; treadDepthAtRemoval?:number|null;
  unitCost?:number|null; fittedDate?:string|null; removedDate?:string|null;
  driverId?:string|null; driverName?:string|null; kmDrivenNearEvent?:number|null;tripsDrivenFromEvent:number|null
  notes?:string|null;
}

// ─── Constants & helpers ──────────────────────────────────────────────────────
const PAL = ["#B8860B","#3E6B8C","#5C9669","#8C5E3E","#7B4E8C","#8C3E3E","#3E7B8C","#6E8C3E"];

const REPAIR_PRIORITY_STYLES: Record<string,string> = {
  LOW:      "bg-zinc-700/30 text-[#6B6560] border-zinc-600/30",
  MEDIUM:   "bg-[#3E6B8C]/20 text-sky-400 border-[#3E6B8C]/30",
  HIGH:     "bg-amber-50 text-amber-400 border-amber-700/30",
  CRITICAL: "bg-red-900/30 text-red-300 border-red-700/40",
};
const REPAIR_STATUS_STYLES: Record<string,string> = {
  OPEN:        "bg-red-50 text-red-400 border-red-800/30",
  IN_PROGRESS: "bg-sky-900/20 text-sky-400 border-sky-800/30",
  COMPLETED:   "bg-emerald-50 text-emerald-400 border-emerald-800/30",
  CANCELLED:   "bg-zinc-700/30 text-[#6B6560] border-zinc-600/30",
};
const SERVICE_STATUS_STYLES: Record<string,string> = {
  SCHEDULED:   "bg-amber-50 text-amber-400 border-amber-700/30",
  IN_PROGRESS: "bg-sky-900/20 text-sky-400 border-sky-800/30",
  COMPLETED:   "bg-emerald-50 text-emerald-400 border-emerald-800/30",
  CANCELLED:   "bg-zinc-700/30 text-[#6B6560] border-zinc-600/30",
};
const TIRE_STATUS_STYLES: Record<string,string> = {
  FITTED:    "bg-emerald-50 text-emerald-400 border-emerald-800/30",
  REPLACED:  "bg-sky-900/20 text-sky-400 border-sky-800/30",
  RETREADED: "bg-amber-50 text-amber-400 border-amber-700/30",
  SCRAPPED:  "bg-red-50 text-red-400 border-red-800/30",
};
const STATUS_COLORS: Record<string,string> = {
  COMPLETED:"#5C9669", IN_PROGRESS:"#B8860B", PLANNED:"#3E6B8C", CANCELLED:"#8C3E3E", OPEN:"#8C5E3E",
};

const n0 = (v?:number|null) => v!=null ? Number(v).toLocaleString("en-NG",{maximumFractionDigits:0}) : "—";
const n2 = (v?:number|null) => v!=null ? Number(v).toLocaleString("en-NG",{maximumFractionDigits:2}) : "—";
const naira  = (v?:number|null) => v!=null ? `₦${Number(v).toLocaleString("en-NG",{minimumFractionDigits:0,maximumFractionDigits:0})}` : "—";
const fmtDate = (s?:string|Date|null) => s ? new Date(s as any).toLocaleDateString("en-NG",{day:"2-digit",month:"short",year:"numeric"}) : "—";

// ─── Shared primitives ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent="#B8860B", icon, delay=0 }: {
  label:string; value:string|number; sub?:string; accent?:string; icon?:string; delay?:number;
}) {
  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay}}
      className="relative bg-white border border-[#E8E2D9] rounded-xl p-5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{background:`radial-gradient(circle at 85% 15%,${accent},transparent 70%)`}}/>
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#9C9590]">{label}</span>
          <span className="text-[#9C9590] text-lg leading-none">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-[#1C1917] font-mono">{value}</div>
        {sub && <div className="text-[10px] text-[#9C9590] mt-1">{sub}</div>}
      </div>
    </motion.div>
  );
}

function Panel({ children, className="" }: { children:React.ReactNode; className?:string }) {
  return <div className={`bg-white border border-[#E8E2D9] rounded-xl p-5 ${className}`}>{children}</div>;
}
function SectionTitle({ title, sub, action }: { title:string; sub?:string; action?:React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-[10px] font-bold tracking-widest uppercase text-[#9C9590]">{title}</h2>
        {sub && <p className="text-[10px] text-[#B0AAA4] mt-0.5">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1C2330] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <div className="text-[#6B6560] mb-1.5 font-mono">{label}</div>
      {payload.map((p:any,i:number)=>(
        <div key={i} style={{color:p.color}} className="font-mono">{p.name}: {n2(p.value)}</div>
      ))}
    </div>
  );
};
function Pill({ label, cls }: { label:string; cls:string }) {
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${cls}`}>{label.replace(/_/g," ")}</span>;
}
function DriverLink({ driverId, driverName, router }: { driverId?:string|null; driverName?:string|null; router:any }) {
  if (!driverName) return <span className="text-[#9C9590]">—</span>;
  if (driverId) {
    return (
      <button onClick={e=>{e.stopPropagation();router.push(`/drivers/${driverId}`)}}
        className="text-[#B8860B] hover:underline hover:text-[#C9960D] transition-colors text-left whitespace-nowrap">
        {driverName}
      </button>
    );
  }
  return <span className="text-[#6B6560]">{driverName}</span>;
}
function KmBadge({ km }: { km?:number|null }) {
  if (km == null) return <span className="text-[#9C9590]">—</span>;
  return (
    <span className={`font-mono text-xs font-bold
      ${km > 5000 ? "text-red-400" : km > 2000 ? "text-amber-400" : "text-[#2C2825]"}`}>
      {n0(km)} km
    </span>
  );
}
function Skeleton({ className="" }: { className?:string }) {
  return <div className={`bg-[#EBEBEB] animate-pulse rounded-xl ${className}`}/>;
}

// ─── Maintenance date filter bar ──────────────────────────────────────────────
function MaintFilter({
  mRange, setMRange, onApply, onClear, loading,
}: {
  mRange:{from:string;to:string};
  setMRange:(r:{from:string;to:string})=>void;
  onApply:()=>void; onClear:()=>void;
  loading:boolean;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap p-3 bg-[#F8F6F1]/60 border border-[#EDE8E0] rounded-xl mb-4">
      <span className="text-[10px] text-[#9C9590] uppercase tracking-widest font-bold">Filter Range</span>
      <input type="date" value={mRange.from}
        onChange={e=>setMRange({...mRange,from:e.target.value})}
        className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"/>
      <span className="text-[#9C9590] text-xs">→</span>
      <input type="date" value={mRange.to}
        onChange={e=>setMRange({...mRange,to:e.target.value})}
        className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"/>
      <button onClick={onApply} disabled={loading}
        className="px-3 py-1.5 rounded-lg text-xs bg-[#B8860B] text-[#1C1917] font-bold hover:bg-[#C9960D] transition-colors disabled:opacity-50">
        {loading ? "…" : "Apply"}
      </button>
      <button onClick={onClear}
        className="px-3 py-1.5 rounded-lg text-xs border border-[#E8E2D9] text-[#9C9590] hover:text-[#2C2825] transition-colors">
        Clear
      </button>
      {(mRange.from || mRange.to) && (
        <span className="text-[10px] text-[#B8860B]/60 ml-1">filtered</span>
      )}
      <span className="text-[10px] text-[#B0AAA4] ml-auto hidden sm:inline">
        Driver km = total km driven on this vehicle ±30 days around event
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function VehicleDashboard() {
  const { id }    = useParams() as { id: string };
  const router    = useRouter();
  const [loading,  setLoading]  = useState(true);
  const [mLoading, setMLoading] = useState(false);
  const [data, setData]         = useState<VehicleData | null>(null);
  const [tab, setTab]           = useState<"overview"|"maintenance"|"drivers"|"trips">("overview");
  const [mTab, setMTab]         = useState<"repairs"|"services"|"parts"|"tires">("repairs");

  const [range, setRange] = useState(() => {
    const now = new Date();
    return {
      from: new Date(now.getTime()-180*86_400_000).toISOString().slice(0,10),
      to:   now.toISOString().slice(0,10),
    };
  });
  const [mRange, setMRange] = useState({ from: "", to: "" });

  const buildUrl = useCallback((fr:string,to:string,mFr:string,mTo:string) => {
    const p = new URLSearchParams({ from:fr, to });
    if (mFr) p.set("mFrom", mFr);
    if (mTo) p.set("mTo",   mTo);
    return `/api/vehicles/details/${id}?${p}`;
  }, [id]);

  const load = useCallback(async (fr:string,to:string,mFr:string,mTo:string,maintOnly=false) => {
    if (maintOnly) setMLoading(true); else setLoading(true);
    try {
      const res  = await fetch(buildUrl(fr,to,mFr,mTo));
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setData(json.data);
    } catch (e:any) { toast.error(e.message ?? "Failed to load vehicle"); }
    finally { setLoading(false); setMLoading(false); }
  }, [buildUrl]);

  useEffect(() => { load(range.from, range.to, "", ""); }, [id]);

  async function removeDriver() {
    try {
      const res = await fetch(`/api/vehicles/remove/${id}`, { method:"PATCH" });
      if (!res.ok) throw new Error((await res.json())?.message ?? "Failed");
      toast.success("Driver removed"); load(range.from,range.to,mRange.from,mRange.to);
    } catch (e:any) { toast.error(e.message); }
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8F6F1]" style={{fontFamily:"'DM Mono','Fira Mono',monospace"}}>
        <div className="border-b border-[#E8E2D9] px-6 py-4 max-w-7xl mx-auto space-y-2">
          <Skeleton className="h-5 w-48"/>
          <Skeleton className="h-4 w-64"/>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({length:8}).map((_,i)=><Skeleton key={i} className="h-24"/>)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Skeleton className="lg:col-span-2 h-64"/>
            <Skeleton className="h-64"/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );

  if (!data) return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center" style={{fontFamily:"'DM Mono','Fira Mono',monospace"}}>
        <div className="text-center space-y-3">
          <p className="text-4xl">🚛</p>
          <p className="text-[#2C2825] text-sm font-bold">Vehicle not found</p>
          <button onClick={()=>router.push("/vehicles")} className="mt-2 px-4 py-2 rounded-lg bg-[#B8860B] text-[#1C1917] text-xs font-bold">
            Back to Vehicles
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  const v = data.vehicle;
  const t = data.totals;
  const m = data.maintenance;
  const totalMaintCost = m.totalMaintenanceCost;

  const tabs = [
    { key:"overview",    label:"Overview" },
    { key:"maintenance", label:"Maintenance", badge: m.repairs.filter(r=>["OPEN","IN_PROGRESS"].includes(r.status)).length },
    { key:"drivers",     label:"Drivers" },
    { key:"trips",       label:"Trips" },
  ] as const;

  const maintTabs = [
    { key:"repairs",  label:"Repairs",  count:m.repairs.length,  cost:m.repairCostTotal  },
    { key:"services", label:"Services", count:m.services.length, cost:m.serviceCostTotal },
    { key:"parts",    label:"Parts",    count:m.parts.length,    cost:m.partsCostTotal   },
    { key:"tires",    label:"Tires",    count:m.tires.length,    cost:m.tireCostTotal    },
  ] as const;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right"/>
      <div className="min-h-screen bg-[#F8F6F1] text-[#1C1917]" style={{fontFamily:"'DM Mono','Fira Mono',monospace"}}>

        {/* ── Sticky header ─────────────────────────────────────────────────── */}
        <div className="border-b border-[#E8E2D9] bg-[#F8F6F1]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-start gap-4">
            <button onClick={()=>router.back()} className="text-[#9C9590] hover:text-[#1C1917] transition-colors text-lg mt-0.5">←</button>

            {/* Vehicle image */}
            {v.vehicleImg && (
              <div className="w-10 h-10 rounded-lg bg-center bg-cover border border-white/[0.08] shrink-0"
                style={{backgroundImage:`url(${v.vehicleImg})`}}/>
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold tracking-wider font-mono">{v.plateNumber}</h1>
              <p className="text-[10px] text-[#9C9590] mt-0.5">
                {v.cap_no} · {v.make??""} {v.model??""} {v.year?`(${v.year})`:""} · {v.fuelType}
                {v.currentOdo != null && ` · ODO: ${n0(v.currentOdo)} km`}
              </p>
            </div>

            {/* Trip date range */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-[#9C9590] hidden sm:inline uppercase tracking-wider">Trip Range</span>
              <input type="date" value={range.from} onChange={e=>setRange(r=>({...r,from:e.target.value}))}
                className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"/>
              <span className="text-[#9C9590] text-xs">→</span>
              <input type="date" value={range.to} onChange={e=>setRange(r=>({...r,to:e.target.value}))}
                className="bg-white border border-[#E8E2D9] rounded-lg px-2 py-1 text-xs text-[#2C2825] focus:outline-none focus:border-[#B8860B]/40"/>
              <button onClick={()=>load(range.from,range.to,mRange.from,mRange.to)}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/30 hover:bg-[#B8860B]/20 transition-colors font-bold">
                Apply
              </button>
            </div>

            {/* Current driver badge */}
            {v.driver && (
              <div className="hidden md:flex items-center gap-2 bg-white border border-[#E8E2D9] rounded-lg px-3 py-1.5 shrink-0">
                <div className="w-5 h-5 rounded-full bg-center bg-cover border border-[#B8860B]/40"
                  style={{backgroundImage:`url(${v.driver.profileImage??"/avatar-placeholder.png"})`}}/>
                <div>
                  <button onClick={()=>router.push(`/drivers/${v.driver!.id}`)} className="text-xs text-[#B8860B] hover:underline font-bold">{v.driver.name}</button>
                  <div className="text-[9px] text-[#9C9590]">Current Driver</div>
                </div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="max-w-7xl mx-auto px-6 flex justify-between border-t border-[#EDE8E0]">
            <div>
              {tabs.map(tb=>(
              <button key={tb.key} onClick={()=>setTab(tb.key)}
                className={`px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase relative transition-colors
                  ${tab===tb.key ? "text-[#B8860B]" : "text-[#9C9590] hover:text-[#6B6560]"}`}>
                {tb.label}
                {"badge" in tb && (tb.badge??0) > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-red-500 text-[#1C1917] rounded-full font-bold">{tb.badge}</span>
                )}
                {tab===tb.key && <motion.div layoutId="vtab-line" className="absolute bottom-0 left-0 right-0 h-px bg-[#B8860B]"/>}
              </button>
            ))}
            </div>
            <div>
              <button onClick={() => router.push(`/vehicles/edit/${id}`)} 
                className="px-2 py-1 mt-1 rounded text-xs border border-[#E8E2D9] text-[#6B6560] hover:text-[#1C1917] hover:border-[#B8860B]/30 transition-colors whitespace-nowrap" >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <AnimatePresence mode="wait">

            {/* ════════════════ OVERVIEW ════════════════ */}
            {tab==="overview" && (
              <motion.div key="overview" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                {/* Service due alert */}
                {v.nextServiceDate && new Date(v.nextServiceDate) <= new Date(Date.now()+30*86_400_000) && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}}
                    className={`flex items-center gap-2 text-xs py-2.5 px-4 rounded-xl border font-bold
                      ${new Date(v.nextServiceDate) < new Date()
                        ? "bg-red-950/40 border-red-700/40 text-red-300"
                        : "bg-amber-950/40 border-amber-700/40 text-amber-300"}`}>
                    {new Date(v.nextServiceDate) < new Date() ? "🚨 Service overdue" : "⚠ Service due soon"}
                    · {fmtDate(v.nextServiceDate)}
                    {v.nextServiceKm && ` · Next at ${n0(v.nextServiceKm)} km`}
                    <button onClick={()=>router.push(`/maintenance/services/create?vehicleId=${id}`)}
                      className="ml-auto underline hover:text-[#1C1917]">Schedule →</button>
                  </motion.div>
                )}

                {/* KPI row 1 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Total Trips"      value={n0(t.totalTrips)}          sub="all time"       accent="#3E6B8C" icon="🚛"/>
                  <StatCard label="Distance (range)" value={`${n0(t.totalDistanceInRange)} km`} sub={`${n0(t.totalDistanceAllTime)} km all time`} accent="#B8860B" icon="📍" delay={0.05}/>
                  <StatCard label="Fuel Consumed"    value={`${n0(t.totalFuelQty)} L`} sub="in range"       accent="#5C9669" icon="⛽" delay={0.1}/>
                  <StatCard label="Fuel Cost"        value={naira(t.totalFuelCost)}        sub="in range"       accent="#8C3E3E" icon="💰" delay={0.15}/>
                </div>

                {/* KPI row 2 */}
                {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Fuel Efficiency"  value={`${n2(t.fuelEfficiency)} km/L`}  sub={`Target: ${v.fuelEfficiencyKmPerUnit??"-"} km/L`}
                    accent={t.fuelEfficiency>=(v.fuelEfficiencyKmPerUnit??t.fuelEfficiency)?"#5C9669":"#8C3E3E"} icon="⚡" delay={0.2}/>
                  <StatCard label="Cost / km"        value={`${naira(t.costPerKm)}/km`}          sub="fuel / distance"         accent="#7B4E8C" icon="📊" delay={0.25}/>
                  <StatCard label="Maintenance Cost" value={naira(totalMaintCost)}                sub="repairs+services+parts+tires" accent="#B8860B" icon="🔧" delay={0.3} />
                  <StatCard label="Est. CO₂"         value={`${n0(t.estimatedCO2Kg)} kg`}    sub="from all trips"          accent="#5C9669" icon="🌿" delay={0.35}/>
                </div> */}

                {/* Monthly trip + Loading plant */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Panel className="lg:col-span-2">
                    <SectionTitle title="Monthly Trip Volume (all time)"/>
                    <div style={{height:240}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.tripTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                          <defs><linearGradient id="tg2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#B8860B" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#B8860B" stopOpacity={0}/>
                          </linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                          <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Area type="monotone" dataKey="count" name="Trips" stroke="#B8860B" strokeWidth={2} fill="url(#tg2)"/>
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
                            <Legend iconSize={8} formatter={v=><span style={{color:"#71717a",fontSize:10}}>{String(v).slice(0,16)}</span>}/>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : <div className="flex items-center justify-center h-40 text-[#9C9590] text-sm">No data</div>}
                  </Panel>
                </div>

                {/* Monthly fuel + Status + Destinations */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Panel className="lg:col-span-2">
                    <SectionTitle title="Monthly Fuel Cost"/>
                    <div style={{height:220}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.fuelTrend} margin={{top:4,right:8,bottom:4,left:0}}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false}/>
                          <YAxis tick={{fill:"#71717a",fontSize:10}} tickLine={false} axisLine={false} tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Bar dataKey="cost" name="Cost (₦)" fill="#B8860B" radius={[4,4,0,0]}/>
                          <Bar dataKey="qty"  name="Qty (L)"  fill="#3E6B8C" radius={[4,4,0,0]}/>
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
                              <span className="text-xs text-[#6B6560]">{s.name}</span>
                            </div>
                            <span className="text-xs font-mono text-[#1C1917]">{s.value}</span>
                          </div>
                        ))}
                        {!data.tripStatusChart.length && <p className="text-[#9C9590] text-xs">No trips</p>}
                      </div>
                    </Panel>
                    <Panel>
                      <SectionTitle title="Top Destinations"/>
                      <div className="space-y-1.5">
                        {data.destinationChart.slice(0,5).map((d,i)=>(
                          <div key={d.name} className="flex items-center gap-2">
                            <span className="text-[10px] text-[#9C9590] w-3">{i+1}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-[#2C2825] truncate">{d.name}</div>
                              <div className="h-1 rounded-full mt-0.5 bg-[#EBEBEB] overflow-hidden">
                                <div className="h-full" style={{width:`${(d.value/(data.destinationChart[0]?.value||1))*100}%`,background:PAL[i%PAL.length]}}/>
                              </div>
                            </div>
                            <span className="text-xs font-mono text-[#6B6560]">{d.value}</span>
                          </div>
                        ))}
                        {!data.destinationChart.length && <p className="text-[#9C9590] text-xs">No data</p>}
                      </div>
                    </Panel>
                  </div>
                </div>

                {/* Maintenance cost summary */}
                <Panel>
                  <SectionTitle title="Maintenance Cost Summary"
                    action={<button onClick={()=>setTab("maintenance")} className="text-[10px] text-[#9C9590] hover:text-[#B8860B]">Details →</button>}/>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      {label:"Repairs",  value:m.repairCostTotal,  count:m.repairs.length,  color:"#8C3E3E"},
                      {label:"Services", value:m.serviceCostTotal, count:m.services.length, color:"#3E6B8C"},
                      {label:"Parts",    value:m.partsCostTotal,   count:m.parts.length,    color:"#B8860B"},
                      {label:"Tires",    value:m.tireCostTotal,    count:m.tires.length,    color:"#8C5E3E"},
                    ].map(item=>(
                      <div key={item.label} onClick={()=>{setTab("maintenance");setMTab(item.label.toLowerCase() as any)}}
                        className="bg-[#F8F6F1] rounded-xl p-4 border border-[#EDE8E0] cursor-pointer hover:border-white/10 transition-colors">
                        <div className="text-[10px] text-[#9C9590] uppercase tracking-wider mb-1">{item.label}</div>
                        <div className="text-xl font-bold font-mono" style={{color:item.color}}>{naira(item.value)}</div>
                        <div className="text-[10px] text-[#9C9590] mt-0.5">{item.count} records</div>
                      </div>
                    ))}
                  </div>
                </Panel>

                {/* Top drivers */}
                <Panel>
                  <SectionTitle title="Top Drivers (all time, this vehicle)"
                    action={<button onClick={()=>setTab("drivers")} className="text-[10px] text-[#9C9590] hover:text-[#B8860B]">Full History →</button>}/>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {data.topDrivers.map((td,i)=>(
                      <div key={i} onClick={()=>td.driver?.id&&router.push(`/drivers/${td.driver.id}`)}
                        className="bg-[#F8F6F1] rounded-lg p-3 text-center border border-[#EDE8E0] cursor-pointer hover:border-white/10 transition-colors">
                        <div className="text-lg font-bold text-[#B8860B]">#{i+1}</div>
                        <div className="text-xs font-medium text-[#1C1917] truncate mt-1">{td.driver?.name??"—"}</div>
                        <div className="text-[10px] text-[#9C9590]">{td.trips} trips</div>
                        <div className="text-[10px] text-[#9C9590]">{n0(td.km)} km</div>
                      </div>
                    ))}
                    {!data.topDrivers.length && (
                      <div className="col-span-5 text-center text-[#9C9590] text-sm py-4">No driver trip data</div>
                    )}
                  </div>
                </Panel>
              </motion.div>
            )}

            {/* ════════════════ MAINTENANCE ════════════════ */}
            {tab==="maintenance" && (
              <motion.div key="maintenance" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                {/* Cost summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Repairs Cost"  value={naira(m.repairCostTotal)}  accent="#8C3E3E" icon="🔧"/>
                  <StatCard label="Services Cost" value={naira(m.serviceCostTotal)} accent="#3E6B8C" icon="⚙️" delay={0.05}/>
                  <StatCard label="Parts Cost"    value={naira(m.partsCostTotal)}   accent="#B8860B" icon="🔩" delay={0.1}/>
                  <StatCard label="Tires Cost"    value={naira(m.tireCostTotal)}    accent="#8C5E3E" icon="⭕" delay={0.15}/>
                </div>

                {/* Maintenance date filter */}
                <MaintFilter
                  mRange={mRange} setMRange={setMRange}
                  onApply={()=>load(range.from,range.to,mRange.from,mRange.to,true)}
                  onClear={()=>{ setMRange({from:"",to:""}); load(range.from,range.to,"","",true); }}
                  loading={mLoading}
                />

                {/* Sub-tab pills */}
                <div className="flex gap-2 flex-wrap">
                  {maintTabs.map(mt=>(
                    <button key={mt.key} onClick={()=>setMTab(mt.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all
                        ${mTab===mt.key ? "border-[#B8860B] bg-[#B8860B]/10 text-[#B8860B]" : "border-[#E8E2D9] text-[#9C9590] hover:text-[#2C2825] hover:border-[#B8860B]/30"}`}>
                      {mt.label}
                      <span className={`text-[10px] font-mono ${mTab===mt.key ? "text-[#B8860B]/70" : "text-[#9C9590]"}`}>
                        {mt.count} · {naira(mt.cost)}
                      </span>
                    </button>
                  ))}
                </div>

                {mLoading && (
                  <div className="flex items-center gap-2 text-xs text-[#9C9590] py-4">
                    <div className="w-4 h-4 border-2 border-[#B8860B] border-t-transparent rounded-full animate-spin"/>
                    Filtering maintenance records…
                  </div>
                )}

                {/* ── REPAIRS TABLE ─────────────────────────────────── */}
                {mTab==="repairs" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Repairs · ${m.repairs.length} records`}
                      action={
                        <button onClick={()=>router.push(`/maintenance/repairs/create?vehicleId=${id}`)}
                          className="text-[10px] text-[#B8860B] hover:underline">+ Log Repair</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E2D9]">
                            {["Date","Fault","Priority","Status","ODO (km)","Garage","Driver (linked)","No. Trips","Driver km ±30d","Cost",""].map(h=>(
                              <th key={h} className="text-left py-2 pr-3 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.repairs.map(r=>(
                            <tr key={r.id}
                              className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group
                                ${r.priority==="CRITICAL"&&["OPEN","IN_PROGRESS"].includes(r.status)?"bg-red-950/10":""}`}>
                              <td className="py-3 pr-3 whitespace-nowrap text-[#6B6560]">{fmtDate(r.reportedDate)}</td>
                              <td className="py-3 pr-3 max-w-[180px]">
                                <div className="text-[#1C1917] truncate font-medium" title={r.faultDesc}>{r.faultDesc}</div>
                                {r.repairDesc && <div className="text-[#9C9590] truncate text-[10px]" title={r.repairDesc}>{r.repairDesc}</div>}
                              </td>
                              <td className="py-3 pr-3"><Pill label={r.priority} cls={REPAIR_PRIORITY_STYLES[r.priority]??"border-zinc-600/30 text-[#6B6560]"}/></td>
                              <td className="py-3 pr-3"><Pill label={r.status}   cls={REPAIR_STATUS_STYLES[r.status]??"border-zinc-600/30 text-[#6B6560]"}/></td>
                              <td className="py-3 pr-3 font-mono text-[#6B6560]">{r.odometerKm!=null ? n0(r.odometerKm) : "—"}</td>
                              <td className="py-3 pr-3 text-[#6B6560] whitespace-nowrap">{r.garage??"—"}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={r.driverId} driverName={r.driverName} router={router}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{r.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3">
                                <KmBadge km={r.kmDrivenNearEvent}/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-[#B8860B] whitespace-nowrap">{naira(r.totalCost)}</td>
                              <td className="py-3 pr-3">
                                <button onClick={()=>router.push(`/maintenance/repairs/${r.id}/edit`)}
                                  className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded text-[10px] border border-white/10 text-[#6B6560] hover:text-[#1C1917] hover:border-[#B8860B]/30 transition-all whitespace-nowrap">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!m.repairs.length && (
                            <tr><td colSpan={10} className="py-8 text-center text-[#9C9590]">
                              No repairs recorded{(mRange.from||mRange.to) && " in this date range"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── SERVICES TABLE ────────────────────────────────── */}
                {mTab==="services" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Services · ${m.services.length} records`}
                      action={
                        <button onClick={()=>router.push(`/maintenance/services/create?vehicleId=${id}`)}
                          className="text-[10px] text-[#B8860B] hover:underline">+ Log Service</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E2D9]">
                            {["Scheduled","Type","Status","ODO (km)","Next Service km","Garage","Driver (linked)","No. of Trips","Driver km ±30d","Cost",""].map(h=>(
                              <th key={h} className="text-left py-2 pr-3 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.services.map(s=>(
                            <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                              <td className="py-3 pr-3 whitespace-nowrap text-[#6B6560]">{fmtDate(s.scheduledDate)}</td>
                              <td className="py-3 pr-3">
                                <div className="text-[#1C1917] font-medium whitespace-nowrap">{s.serviceType.replace(/_/g," ")}</div>
                                {s.description && <div className="text-[#9C9590] truncate text-[10px] max-w-[120px]">{s.description}</div>}
                              </td>
                              <td className="py-3 pr-3"><Pill label={s.status} cls={SERVICE_STATUS_STYLES[s.status]??"border-zinc-600/30 text-[#6B6560]"}/></td>
                              <td className="py-3 pr-3 font-mono text-[#6B6560]">{s.odometerKm!=null ? n0(s.odometerKm) : "—"}</td>
                              <td className="py-3 pr-3 font-mono text-[#6B6560]">{s.nextServiceKm!=null ? n0(s.nextServiceKm) : "—"}</td>
                              <td className="py-3 pr-3 text-[#6B6560] whitespace-nowrap">{s.garage??"—"}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={s.driverId} driverName={s.driverName} router={router}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{s.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3"><KmBadge km={s.kmDrivenNearEvent}/></td>
                              <td className="py-3 pr-3 font-mono text-[#B8860B] whitespace-nowrap">{naira(s.totalCost)}</td>
                              <td className="py-3 pr-3">
                                <button onClick={()=>router.push(`/maintenance/services/${s.id}/edit`)}
                                  className="opacity-0 group-hover:opacity-100 px-2 py-1 rounded text-[10px] border border-white/10 text-[#6B6560] hover:text-[#1C1917] hover:border-[#B8860B]/30 transition-all">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!m.services.length && (
                            <tr><td colSpan={10} className="py-8 text-center text-[#9C9590]">
                              No services recorded{(mRange.from||mRange.to) && " in this date range"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── PARTS TABLE ───────────────────────────────────── */}
                {mTab==="parts" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Parts · ${m.parts.length} records`}
                      action={
                        <button onClick={()=>router.push(`/maintenance/parts/create?vehicleId=${id}`)}
                          className="text-[10px] text-[#B8860B] hover:underline">+ Log Part</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E2D9]">
                            {["Part Name","Category","Qty","Supplier","Purchased","Fitted","Warranty","Driver (via repair)","No. of Trips","Driver km ±30d","Total Cost"].map(h=>(
                              <th key={h} className="text-left py-2 pr-3 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.parts.map(p=>{
                            const warrantyExpired = p.warrantyExpiry && new Date(p.warrantyExpiry) < new Date();
                            return (
                              <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 pr-3">
                                  <div className="text-[#1C1917] font-medium">{p.name}</div>
                                  {p.partNumber && <div className="text-[#9C9590] text-[10px] font-mono">#{p.partNumber}</div>}
                                </td>
                                <td className="py-3 pr-3 text-[#6B6560] whitespace-nowrap">{p.category??"—"}</td>
                                <td className="py-3 pr-3 font-mono text-[#2C2825]">{p.quantity}</td>
                                <td className="py-3 pr-3 text-[#6B6560] whitespace-nowrap">
                                  <div>{p.supplier??"—"}</div>
                                  {p.supplierPhone && <div className="text-[10px] text-[#9C9590] font-mono">{p.supplierPhone}</div>}
                                </td>
                                <td className="py-3 pr-3 whitespace-nowrap text-[#6B6560]">{fmtDate(p.purchaseDate)}</td>
                                <td className="py-3 pr-3 whitespace-nowrap text-[#6B6560]">{fmtDate(p.fittedDate)}</td>
                                <td className="py-3 pr-3 whitespace-nowrap">
                                  {p.warrantyExpiry ? (
                                    <span className={`text-xs font-mono ${warrantyExpired ? "text-red-400" : "text-emerald-400"}`}>
                                      {fmtDate(p.warrantyExpiry)}{warrantyExpired ? " ❌" : " ✓"}
                                    </span>
                                  ) : <span className="text-[#9C9590]">—</span>}
                                </td>
                                <td className="py-3 pr-3 whitespace-nowrap">
                                  <DriverLink driverId={p.driverId} driverName={p.driverName} router={router}/>
                                  {p.repairId && <div className="text-[10px] text-[#9C9590]">via repair</div>}
                                </td>
                                <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{p.tripsDrivenFromEvent}</span>
                              </td>
                                <td className="py-3 pr-3"><KmBadge km={p.kmDrivenNearEvent}/></td>
                                <td className="py-3 pr-3 font-mono text-[#B8860B] whitespace-nowrap">{naira(p.totalCost)}</td>
                              </tr>
                            );
                          })}
                          {!m.parts.length && (
                            <tr><td colSpan={10} className="py-8 text-center text-[#9C9590]">
                              No parts logged{(mRange.from||mRange.to) && " in this date range"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── TIRES TABLE ───────────────────────────────────── */}
                {mTab==="tires" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Tires · ${m.tires.length} records`}
                      action={
                        <button onClick={()=>router.push(`/maintenance/tires/create?vehicleId=${id}`)}
                          className="text-[10px] text-[#B8860B] hover:underline">+ Log Tire</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#E8E2D9]">
                            {["Brand / Size","Position","Status","Fitted ODO","Removed ODO","km Covered","Life Used","Fitted","Driver (nearest trip)","No. of Trips","Driver km ±30d","Cost"].map(h=>(
                              <th key={h} className="text-left py-2 pr-3 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.tires.map(tire=>{
                            const lifePct = tire.expectedLifeKm && tire.kmCovered
                              ? Math.min(100, Math.round((tire.kmCovered / tire.expectedLifeKm)*100)) : null;
                            return (
                              <tr key={tire.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 pr-3">
                                  <div className="text-[#1C1917] font-medium">{tire.brand??"—"}</div>
                                  {tire.size && <div className="text-[#9C9590] text-[10px] font-mono">{tire.size}</div>}
                                  {tire.serialNumber && <div className="text-[#9C9590] text-[10px] font-mono">#{tire.serialNumber}</div>}
                                </td>
                                <td className="py-3 pr-3 text-[#6B6560] whitespace-nowrap">{tire.position.replace(/_/g," ")}</td>
                                <td className="py-3 pr-3"><Pill label={tire.status} cls={TIRE_STATUS_STYLES[tire.status]??"border-zinc-600/30 text-[#6B6560]"}/></td>
                                <td className="py-3 pr-3 font-mono text-[#6B6560]">{tire.fittedOdometerKm!=null ? n0(tire.fittedOdometerKm) : "—"}</td>
                                <td className="py-3 pr-3 font-mono text-[#6B6560]">{tire.removedOdometerKm!=null ? n0(tire.removedOdometerKm) : "—"}</td>
                                <td className="py-3 pr-3 font-mono text-[#2C2825]">{tire.kmCovered!=null ? `${n0(tire.kmCovered)} km` : "—"}</td>
                                <td className="py-3 pr-3">
                                  {lifePct!=null ? (
                                    <div className="min-w-[60px]">
                                      <div className="flex items-center justify-between mb-1">
                                        <span className={`text-[10px] font-bold font-mono ${lifePct>=90?"text-red-400":lifePct>=70?"text-amber-400":"text-emerald-400"}`}>{lifePct}%</span>
                                      </div>
                                      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                        <div className="h-full rounded-full" style={{
                                          width:`${lifePct}%`,
                                          background:lifePct>=90?"#ef4444":lifePct>=70?"#f59e0b":"#5C9669",
                                        }}/>
                                      </div>
                                    </div>
                                  ) : <span className="text-[#9C9590]">—</span>}
                                </td>
                                <td className="py-3 pr-3 whitespace-nowrap text-[#6B6560]">{fmtDate(tire.fittedDate)}</td>
                                <td className="py-3 pr-3 whitespace-nowrap">
                                  <DriverLink driverId={tire.driverId} driverName={tire.driverName} router={router}/>
                                  <div className="text-[10px] text-[#B0AAA4]">nearest trip</div>
                                </td>
                                <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{tire.tripsDrivenFromEvent}</span>
                              </td>
                                <td className="py-3 pr-3"><KmBadge km={tire.kmDrivenNearEvent}/></td>
                                <td className="py-3 pr-3 font-mono text-[#B8860B] whitespace-nowrap">{naira(tire.unitCost)}</td>
                              </tr>
                            );
                          })}
                          {!m.tires.length && (
                            <tr><td colSpan={11} className="py-8 text-center text-[#9C9590]">
                              No tires logged{(mRange.from||mRange.to) && " in this date range"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}
              </motion.div>
            )}

            {/* ════════════════ DRIVERS ════════════════ */}
            {tab==="drivers" && (
              <motion.div key="drivers" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-5">

                {/* Current driver card */}
                {v.driver && (
                  <Panel>
                    <SectionTitle title="Currently Assigned Driver"/>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-center bg-cover border border-[#B8860B]/30"
                        style={{backgroundImage:`url(${v.driver.profileImage??"/avatar-placeholder.png"})`}}/>
                      <div className="flex-1 min-w-0">
                        <button onClick={()=>router.push(`/drivers/${v.driver!.id}`)}
                          className="text-base font-bold text-[#B8860B] hover:underline">{v.driver.name}</button>
                        {v.driver.phone && <p className="text-xs text-[#9C9590] font-mono mt-0.5">{v.driver.phone}</p>}
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>Active
                        </span>
                      </div>
                      <button onClick={removeDriver}
                        className="px-3 py-1.5 rounded-lg text-[10px] border border-red-700/40 text-red-400 hover:bg-red-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </Panel>
                )}

                {/* Driver history table */}
                <Panel>
                  <SectionTitle title={`Driver Assignment History · ${data.driverHistory.length} records`}/>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-[#E8E2D9]">
                        {["Driver","Phone","From","To","Days","Status"].map(h=>(
                          <th key={h} className="text-left py-2 pr-6 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {data.driverHistory.map(dh=>{
                          const isCurrent = v.driver?.id === dh.driverId;
                          return (
                            <tr key={dh.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 pr-6">
                                <div className="flex items-center gap-2">
                                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"/>}
                                  <button onClick={()=>router.push(`/drivers/${dh.driverId}`)}
                                    className="font-medium text-[#1C1917] hover:text-[#B8860B] transition-colors">{dh.driverName}</button>
                                </div>
                              </td>
                              <td className="py-3 pr-6 text-[#6B6560] font-mono">{dh.driverPhone??"—"}</td>
                              <td className="py-3 pr-6 text-[#6B6560] whitespace-nowrap">{fmtDate(dh.from)}</td>
                              <td className="py-3 pr-6 whitespace-nowrap">
                                {isCurrent
                                  ? <span className="text-emerald-400">Present</span>
                                  : <span className="text-[#6B6560]">{fmtDate(dh.to)}</span>}
                              </td>
                              <td className="py-3 pr-5 font-mono text-[#2C2825]">
                                {isCurrent ? (
                                  <span className="text-emerald-400 font-bold">-</span>
                                ) :  (
                                     <span className={dh.daysAssigned>180 ? "text-[#B8860B]" : "text-[#2C2825]"}>
                                      {dh.daysAssigned}d
                                     </span>
                                    )}
                                {/* {vh.daysAssigned}d */}
                                </td>
                              {/* <td className="py-3 pr-6 font-mono">
                                <span className={dh.daysAssigned>180 ? "text-[#B8860B]" : "text-[#2C2825]"}>{dh.daysAssigned}d</span>
                              </td> */}
                              <td className="py-3 pr-6">
                                {isCurrent
                                  ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">Active</span>
                                  : <span className="text-[#9C9590] text-[10px]">Completed</span>}
                              </td>
                            </tr>
                          );
                        })}
                        {!data.driverHistory.length && (
                          <tr><td colSpan={6} className="py-8 text-center text-[#9C9590]">No driver history</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                {/* Assignment timeline */}
                {data.driverHistory.length > 0 && (
                  <Panel>
                    <SectionTitle title="Assignment Timeline"/>
                    <div className="relative pl-6 space-y-4">
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-white/[0.06]"/>
                      {data.driverHistory.map((dh,i)=>{
                        const isCurrent = v.driver?.id === dh.driverId;
                        return (
                          <motion.div key={dh.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.04}} className="relative">
                            <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2
                              ${isCurrent ? "border-emerald-400 bg-emerald-400/20" : "border-zinc-600 bg-[#F8F6F1]"}`}/>
                            <div className="bg-[#F8F6F1] rounded-lg p-3 border border-[#EDE8E0]">
                              <div className="flex items-center justify-between">
                                <button onClick={()=>router.push(`/drivers/${dh.driverId}`)}
                                  className="font-medium text-sm text-[#1C1917] hover:text-[#B8860B] transition-colors">{dh.driverName}</button>
                                  
                                {isCurrent ? (
                                  <span className="text-emerald-400 font-bold">-</span>
                                ) :  (
                                     <span className={dh.daysAssigned>180 ? "text-[10px] font-mono" : "text-[10px] font-mono text-[#9C9590]"}>
                                      {dh.daysAssigned}d
                                     </span>
                                    )}
                                {/* {vh.daysAssigned}d */}
                                
                                {/* <span className="text-[10px] font-mono text-[#9C9590]">{dh.daysAssigned} days</span> */}
                              </div>
                              <div className="text-[10px] text-[#9C9590] mt-0.5">
                                {fmtDate(dh.from)} → {isCurrent ? "Present" : fmtDate(dh.to)}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Panel>
                )}

                {/* Top drivers by trips */}
                {data.topDrivers.length > 0 && (
                  <Panel>
                    <SectionTitle title="Drivers by Trip Volume (all trips on this vehicle)"/>
                    <div className="space-y-2">
                      {data.topDrivers.map((td,i)=>(
                        <div key={i}
                          onClick={()=>td.driver?.id&&router.push(`/drivers/${td.driver.id}`)}
                          className="flex items-center gap-3 bg-[#F8F6F1] rounded-lg p-3 border border-[#EDE8E0] cursor-pointer hover:border-white/10 transition-colors">
                          <span className="text-[#B8860B] font-bold font-mono text-sm w-6 shrink-0">#{i+1}</span>
                          <div className="w-7 h-7 rounded-full bg-center bg-cover border border-white/10 shrink-0"
                            style={{backgroundImage:`url(${td.driver?.profileImage??"/avatar-placeholder.png"})`}}/>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-[#1C1917]">{td.driver?.name??"—"}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold font-mono text-[#1C1917]">{td.trips} trips</div>
                            <div className="text-[10px] text-[#9C9590]">{n0(td.km)} km</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                )}
              </motion.div>
            )}

            {/* ════════════════ TRIPS ════════════════ */}
            {tab==="trips" && (
              <motion.div key="trips" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}} className="space-y-4">
                <Panel>
                  <SectionTitle title={`Recent Trips · ${data.recentTrips.length} shown (in range)`}/>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead><tr className="border-b border-[#E8E2D9]">
                        {["Waybill","ATC","Plant","Destination","Distance","Driver","Date","Fuel Cost","Status"].map(h=>(
                          <th key={h} className="text-left py-2 pr-4 text-[#9C9590] font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {data.recentTrips.map(trip=>(
                          <tr key={trip.id}
                            onClick={()=>router.push(`/trips/${trip.id}`)}
                            className="border-b border-white/[0.03] hover:bg-white/[0.02] cursor-pointer transition-colors group">
                            <td className="py-3 pr-4 font-mono text-[#B8860B] group-hover:text-[#1C1917] transition-colors">{trip.waybill_no}</td>
                            <td className="py-3 pr-4 font-mono text-[#9C9590]">{trip.atcNo}</td>
                            <td className="py-3 pr-4 text-[#6B6560]">{trip.loadingPlant}</td>
                            <td className="py-3 pr-4 text-[#2C2825]">{trip.destination}</td>
                            <td className="py-3 pr-4 font-mono text-[#6B6560]">{trip.distanceKm!=null ? `${n0(trip.distanceKm)} km` : "—"}</td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              {trip.driver?.id
                                ? <button onClick={e=>{e.stopPropagation();router.push(`/drivers/${trip.driver.id}`)}}
                                    className="text-[#B8860B] hover:underline">{trip.driver.name??"—"}</button>
                                : <span className="text-[#9C9590]">{trip.driver?.name??"—"}</span>}
                            </td>
                            <td className="py-3 pr-4 text-[#9C9590] whitespace-nowrap">{fmtDate(trip.despatchDate)}</td>
                            <td className="py-3 pr-4 font-mono text-[#6B6560]">{naira(trip.fuelCost)}</td>
                            <td className="py-3 pr-4"><Pill label={trip.status} cls={REPAIR_STATUS_STYLES[trip.status]??"border-zinc-600/30 text-[#6B6560]"}/></td>
                          </tr>
                        ))}
                        {!data.recentTrips.length && (
                          <tr><td colSpan={9} className="py-8 text-center text-[#9C9590]">No trips in this date range</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Panel>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
