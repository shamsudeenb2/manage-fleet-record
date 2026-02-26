

// // src/app/admin/drivers/[id]/page.tsx
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
// interface DriverData {
//   driver: {
//     id: string;
//     name: string;
//     phone?: string;
//     address: string;
//     profileImage: string;
//     licenseNo?: string;
//     licenseExp?: string;
//     licenseStatus: "valid" | "expiring_soon" | "expired" | "unknown";
//     daysUntilLicenseExpiry?: number | null;
//     accountName: string;
//     accountNumber: string;
//     bank: string;
//     notes?: string;
//     vehicle?: {
//       id: string;
//       plateNumber: string;
//       cap_no: string;
//       make?: string;
//       model?: string;
//     } | null;
//   };
//   totals: {
//     totalTrips: number;
//     totalDistanceAllTime: number;
//     totalDistanceInRange: number;
//     totalFuelConsume: number;
//     totalFuelCost: number;
//     fuelEfficiency: number;
//     estimatedCO2Kg: number;
//     uniqueVehiclesCount: number;
//   };
//   fuelByType: Record<string, { qtyConsume: number; cost: number }>;
//   tripTrend: { month: string; count: number }[];
//   fuelTrend: { month: string; cost: number; qty: number }[];
//   loadingPlantChart: { name: string; value: number }[];
//   destinationChart: { name: string; value: number }[];
//   tripStatusChart: { name: string; value: number }[];
//   vehicleDistribution: { name: string; value: number }[];
//   vehicleHistory: {
//     id: string;
//     vehicleId: string;
//     plateNumber: string;
//     cap_no: string;
//     make?: string;
//     model?: string;
//     year?: number;
//     fuelType?: string;
//     vehicleImg?: string;
//     from: string;
//     to: string;
//     daysAssigned: number;
//     tripsOnVehicle: number;
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
//     vehicle: { plateNumber?: string; cap_no?: string };
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
//       vehiclePlate: string;
//       vehicleCapNo: string;
//     }[];
//     totalPartsCost: number;
//   };
//   repairs: { items: any[]; totalCost: number };
//   services: { items: any[]; totalCost: number };
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

// function pill(status: string) {
//   const base = "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide";
//   const c: Record<string, string> = {
//     COMPLETED: "bg-emerald-900/30 text-emerald-400 border border-emerald-700/40",
//     IN_PROGRESS: "bg-amber-900/30 text-amber-400 border border-amber-700/40",
//     PLANNED: "bg-sky-900/30 text-sky-400 border border-sky-700/40",
//     CANCELLED: "bg-red-900/30 text-red-400 border border-red-700/40",
//   };
//   return <span className={`${base} ${c[status] ?? "bg-zinc-700 text-zinc-300"}`}>{status}</span>;
// }

// function licensePill(status: string, days?: number | null) {
//   if (status === "valid")
//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
//         <span className="w-1 h-1 rounded-full bg-emerald-400" /> Valid · {days}d left
//       </span>
//     );
//   if (status === "expiring_soon")
//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-900/30 text-amber-400 border border-amber-700/40 animate-pulse">
//         ⚠ Expiring in {days}d
//       </span>
//     );
//   if (status === "expired")
//     return (
//       <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-700/40">
//         ✕ Expired
//       </span>
//     );
//   return <span className="text-xs text-zinc-600">No license data</span>;
// }

// // ─── Sub-components ─────────────────────────────────────────────────────────
// function StatCard({
//   label,
//   value,
//   sub,
//   accent,
//   icon,
//   delay = 0,
//   alert,
// }: {
//   label: string;
//   value: string | number;
//   sub?: string;
//   accent?: string;
//   icon?: React.ReactNode;
//   delay?: number;
//   alert?: boolean;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, delay }}
//       className={`relative bg-[#161B22] border rounded-xl p-5 overflow-hidden ${
//         alert ? "border-red-700/50" : "border-white/[0.06]"
//       }`}
//     >
//       {alert && (
//         <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
//       )}
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
// export default function DriverDetailPage() {
//   const { id } = useParams() as { id: string };
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<DriverData | null>(null);
//   const [activeTab, setActiveTab] = useState<"overview" | "parts" | "vehicles" | "trips">("overview");
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
//         const res = await fetch(`/api/auth/users/driver/${id}?${qs}`);
//         const json = await res.json();
//         if (!res.ok) throw new Error(json?.message ?? "Failed");
//         setData(json.data);
//       } catch (err: any) {
//         toast.error(err?.message ?? "Failed to load driver");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [id]
//   );

//   useEffect(() => {
//     fetchData(range.start, range.end);
//   }, [id]);

//   function exportCSV() {
//     if (!data) return toast.error("No data to export");
//     const d = data.driver;
//     const rows: string[][] = [
//       ["Driver Report"],
//       ["Name", d.name],
//       ["Phone", d.phone ?? ""],
//       ["License No", d.licenseNo ?? ""],
//       ["License Expiry", d.licenseExp ? new Date(d.licenseExp).toLocaleDateString() : ""],
//       ["License Status", d.licenseStatus],
//       ["Bank", d.bank],
//       ["Account Name", d.accountName],
//       [],
//       ["Totals"],
//       ["Total Trips", String(data.totals.totalTrips)],
//       ["Total Distance (all time) km", String(data.totals.totalDistanceAllTime)],
//       ["Distance in range km", String(data.totals.totalDistanceInRange)],
//       ["Fuel Consumed (range) L", String(data.totals.totalFuelConsume)],
//       ["Fuel Cost (range) ₦", String(data.totals.totalFuelCost)],
//       ["Fuel Efficiency km/L", String(data.totals.fuelEfficiency)],
//       ["Unique Vehicles Driven", String(data.totals.uniqueVehiclesCount)],
//       ["Est. CO₂ kg", String(data.totals.estimatedCO2Kg)],
//       [],
//       ["Vehicle History"],
//       ["Plate", "CAP No", "Make/Model", "From", "To", "Days", "Trips"],
//       ...data.vehicleHistory.map((v) => [
//         v.plateNumber,
//         v.cap_no,
//         `${v.make ?? ""} ${v.model ?? ""}`.trim(),
//         new Date(v.from).toLocaleDateString(),
//         new Date(v.to).toLocaleDateString(),
//         String(v.daysAssigned),
//         String(v.tripsOnVehicle),
//       ]),
//       [],
//       ["Parts"],
//       ["Part", "Brand", "Model", "Serial", "Vehicle", "Unit Cost", "Qty", "Install Date", "km on Vehicle", "Days on Vehicle"],
//       ...data.parts.items.map((p) => [
//         p.name,
//         p.brand,
//         p.model,
//         p.serialNumber,
//         p.vehiclePlate,
//         String(p.unitCost),
//         String(p.quantity ?? 1),
//         new Date(p.installDate).toLocaleDateString(),
//         String(p.kmOnVehicle ?? ""),
//         String(p.daysOnVehicle),
//       ]),
//     ];
//     const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
//     saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `driver_${d.name.replace(/\s+/g, "_")}_report.csv`);
//   }

//   if (loading)
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
//           <div className="space-y-3 text-center">
//             <div className="w-10 h-10 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto" />
//             <p className="text-zinc-500 text-sm tracking-wider">LOADING DRIVER DATA</p>
//           </div>
//         </div>
//       </DashboardLayout>
//     );

//   if (!data)
//     return (
//       <DashboardLayout>
//         <div className="min-h-screen bg-[#0D1117] flex items-center justify-center text-zinc-500">
//           No driver found.
//         </div>
//       </DashboardLayout>
//     );

//   const dr = data.driver;
//   const t = data.totals;
//   const totalMaintCost = (data.parts.totalPartsCost ?? 0) + (data.repairs.totalCost ?? 0) + (data.services.totalCost ?? 0);
//   const costPerKm = t.totalDistanceInRange > 0 ? t.totalFuelCost / t.totalDistanceInRange : 0;
//   const isLicenseAlert = dr.licenseStatus === "expired" || dr.licenseStatus === "expiring_soon";

//   const tabs = [
//     { key: "overview", label: "Overview" },
//     { key: "parts", label: "Parts & Maintenance" },
//     { key: "vehicles", label: "Vehicle History" },
//     { key: "trips", label: "Recent Trips" },
//   ] as const;

//   return (
//     <DashboardLayout>
//       <Toaster theme="dark" position="top-right" />
//       <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

//         {/* ── LICENSE ALERT BANNER ── */}
//         {isLicenseAlert && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`flex items-center justify-center gap-2 text-xs py-2 font-semibold tracking-widest uppercase ${
//               dr.licenseStatus === "expired"
//                 ? "bg-red-900/80 text-red-300 border-b border-red-700"
//                 : "bg-amber-900/60 text-amber-300 border-b border-amber-700"
//             }`}
//           >
//             <span>⚠</span>
//             <span>
//               {dr.licenseStatus === "expired"
//                 ? `Driver license EXPIRED — This driver should not be operating vehicles`
//                 : `Driver license expiring in ${dr.daysUntilLicenseExpiry} days — Renewal required`}
//             </span>
//           </motion.div>
//         )}

//         {/* ── HEADER ── */}
//         <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => router.back()}
//                 className="text-zinc-500 hover:text-white transition-colors text-lg"
//               >
//                 ←
//               </button>
//               <div
//                 className="w-10 h-10 rounded-full bg-center bg-cover border-2 border-white/10 flex-shrink-0"
//                 style={{ backgroundImage: `url(${dr.profileImage || "/avatar-placeholder.png"})` }}
//               />
//               <div>
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <h1 className="text-base font-bold tracking-wider">{dr.name}</h1>
//                   {licensePill(dr.licenseStatus, dr.daysUntilLicenseExpiry)}
//                 </div>
//                 <p className="text-xs text-zinc-500">
//                   {dr.phone && <span>{dr.phone} · </span>}
//                   {dr.licenseNo && <span>License: {dr.licenseNo}</span>}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               {dr.vehicle && (
//                 <button
//                   onClick={() => router.push(`/vehicles/${dr.vehicle!.id}`)}
//                   className="px-3 py-1.5 rounded-lg text-xs border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors"
//                 >
//                   View Current Vehicle →
//                 </button>
//               )}
//               <button
//                 onClick={() => router.push(`/drivers/update/${id}`)}
//                 className="px-3 py-1.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
//               >
//                 Edit Driver
//               </button>
//               <button
//                 onClick={exportCSV}
//                 className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
//               >
//                 Export CSV
//               </button>
//             </div>
//           </div>

//           {/* Date Filter */}
//           <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
//             <span className="text-xs text-zinc-600 uppercase tracking-wider">Range</span>
//             <input
//               type="date"
//               value={range.start}
//               onChange={(e) => setRange((r) => ({ ...r, start: e.target.value }))}
//               className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"
//             />
//             <span className="text-zinc-600">→</span>
//             <input
//               type="date"
//               value={range.end}
//               onChange={(e) => setRange((r) => ({ ...r, end: e.target.value }))}
//               className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"
//             />
//             <button
//               onClick={() => fetchData(range.start, range.end)}
//               className="px-3 py-1 rounded-lg text-xs bg-[#C8A96E]/10 text-[#C8A96E] border border-[#C8A96E]/30 hover:bg-[#C8A96E]/20 transition-colors"
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
//               className="px-3 py-1 rounded-lg text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
//             >
//               Reset
//             </button>

//             {/* Current vehicle badge */}
//             {dr.vehicle && (
//               <div className="ml-auto flex items-center gap-2 bg-[#161B22] border border-white/[0.06] rounded-lg px-3 py-1.5">
//                 <span className="text-xs text-zinc-500">Current Vehicle:</span>
//                 <span className="text-xs font-mono text-[#C8A96E]">{dr.vehicle.plateNumber}</span>
//                 <span className="text-xs text-zinc-600">{dr.vehicle.cap_no}</span>
//               </div>
//             )}
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

//         {/* ── CONTENT ── */}
//         <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
//           <AnimatePresence mode="wait">

//             {/* ── OVERVIEW TAB ── */}
//             {activeTab === "overview" && (
//               <motion.div
//                 key="overview"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 {/* Driver Info Card */}
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
//                   <Panel className="lg:col-span-1">
//                     <SectionHeader title="Driver Profile" />
//                     <div className="flex flex-col items-center text-center gap-3">
//                       <div
//                         className="w-20 h-20 rounded-full bg-center bg-cover border-2 border-[#C8A96E]/30"
//                         style={{ backgroundImage: `url(${dr.profileImage || "/avatar-placeholder.png"})` }}
//                       />
//                       <div>
//                         <div className="font-bold text-white">{dr.name}</div>
//                         {dr.phone && <div className="text-xs text-zinc-500 mt-0.5">{dr.phone}</div>}
//                       </div>
//                       <div className="w-full space-y-2 text-xs">
//                         <div className="flex justify-between border-t border-white/[0.06] pt-2">
//                           <span className="text-zinc-500">Bank</span>
//                           <span className="text-zinc-300">{dr.bank}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-zinc-500">Account</span>
//                           <span className="text-zinc-300 font-mono">{dr.accountNumber}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-zinc-500">License</span>
//                           <span className="font-mono text-zinc-300">{dr.licenseNo ?? "—"}</span>
//                         </div>
//                         {dr.licenseExp && (
//                           <div className="flex justify-between">
//                             <span className="text-zinc-500">Exp.</span>
//                             <span className={`font-mono ${isLicenseAlert ? "text-red-400" : "text-zinc-300"}`}>
//                               {new Date(dr.licenseExp).toLocaleDateString("en-NG")}
//                             </span>
//                           </div>
//                         )}
//                         {dr.notes && (
//                           <div className="border-t border-white/[0.06] pt-2 text-left text-zinc-500 italic">
//                             {dr.notes}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </Panel>

//                   {/* KPI Row */}
//                   <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
//                     <StatCard label="Total Trips" value={fmt(t.totalTrips, 0)} sub="all time" accent="#3E6B8C" icon="🚛" delay={0} />
//                     <StatCard label="Distance (range)" value={`${fmt(t.totalDistanceInRange, 0)} km`} sub={`${fmt(t.totalDistanceAllTime, 0)} km all time`} accent="#C8A96E" icon="📍" delay={0.05} />
//                     <StatCard label="Fuel Consumed" value={`${fmt(t.totalFuelConsume, 0)} L`} sub="in selected range" accent="#5C9669" icon="⛽" delay={0.1} />
//                     <StatCard label="Fuel Cost" value={naira(t.totalFuelCost)} sub="in selected range" accent="#8C3E3E" icon="💰" delay={0.15} />
//                     <StatCard label="Vehicles Driven" value={fmt(t.uniqueVehiclesCount, 0)} sub="all time" accent="#7B4E8C" icon="🚗" delay={0.2} />
//                     <StatCard
//                       label="License Status"
//                       value={dr.licenseStatus === "valid" ? "VALID" : dr.licenseStatus === "expiring_soon" ? `${dr.daysUntilLicenseExpiry}d LEFT` : dr.licenseStatus === "expired" ? "EXPIRED" : "UNKNOWN"}
//                       sub={dr.licenseExp ? new Date(dr.licenseExp).toLocaleDateString("en-NG") : "No record"}
//                       accent={dr.licenseStatus === "valid" ? "#5C9669" : "#8C3E3E"}
//                       icon="📋"
//                       delay={0.25}
//                       alert={isLicenseAlert}
//                     />
//                   </div>
//                 </div>

//                 {/* KPI Row 2 */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                   <StatCard label="Fuel Efficiency" value={`${fmt(t.fuelEfficiency)} km/L`} sub="avg across all vehicles" accent="#5C9669" icon="⚡" delay={0.3} />
//                   <StatCard label="Cost per km" value={naira(costPerKm)} sub="fuel cost / distance" accent="#7B4E8C" icon="📊" delay={0.35} />
//                   <StatCard label="Maintenance Cost" value={naira(totalMaintCost)} sub="parts + repairs + services" accent="#C8A96E" icon="🔧" delay={0.4} />
//                   <StatCard label="Est. CO₂" value={`${fmt(t.estimatedCO2Kg, 0)} kg`} sub="estimated emissions" accent="#5C9669" icon="🌿" delay={0.45} />
//                 </div>

//                 {/* Charts Row 1 */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//                   <Panel className="lg:col-span-2">
//                     <SectionHeader title="Monthly Trip Volume" />
//                     <div style={{ height: 240 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart data={data.tripTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                           <defs>
//                             <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="5%" stopColor="#C8A96E" stopOpacity={0.3} />
//                               <stop offset="95%" stopColor="#C8A96E" stopOpacity={0} />
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                           <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <Tooltip content={<CustomTooltip />} />
//                           <Area type="monotone" dataKey="count" stroke="#C8A96E" strokeWidth={2} fill="url(#tripGrad)" name="Trips" />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>

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
//                   <Panel className="lg:col-span-2">
//                     <SectionHeader title="Monthly Fuel Cost & Quantity" />
//                     <div style={{ height: 220 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data.fuelTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
//                           <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false} />
//                           <Tooltip content={<CustomTooltip />} />
//                           <Bar dataKey="cost" name="Cost (₦)" fill="#C8A96E" radius={[4, 4, 0, 0]} />
//                           <Bar dataKey="qty" name="Qty (L)" fill="#3E6B8C" radius={[4, 4, 0, 0]} />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </Panel>

//                   <div className="space-y-4">
//                     <Panel>
//                       <SectionHeader title="Trip Status" />
//                       <div className="space-y-2">
//                         {data.tripStatusChart.map((s) => (
//                           <div key={s.name} className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <div className="w-2 h-2 rounded-full" style={{ background: STATUS_COLORS[s.name] ?? "#71717a" }} />
//                               <span className="text-xs text-zinc-400">{s.name}</span>
//                             </div>
//                             <span className="text-xs font-mono text-white">{s.value}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </Panel>

//                     <Panel>
//                       <SectionHeader title="Vehicles by Trips" />
//                       <div style={{ height: 130 }}>
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie data={data.vehicleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} innerRadius={28} paddingAngle={2}>
//                               {data.vehicleDistribution.map((_, i) => (
//                                 <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
//                               ))}
//                             </Pie>
//                             <Tooltip contentStyle={{ background: "#1C2330", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }} />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </Panel>
//                   </div>
//                 </div>

//                 {/* Top Destinations */}
//                 <Panel>
//                   <SectionHeader title="Top Destinations" />
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     {data.destinationChart.slice(0, 8).map((d, i) => (
//                       <div key={d.name} className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04]">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="text-[10px] text-zinc-600">#{i + 1}</span>
//                           <div className="flex-1 h-px" style={{ background: PALETTE[i % PALETTE.length], opacity: 0.5 }} />
//                         </div>
//                         <div className="text-xs font-medium text-white truncate">{d.name}</div>
//                         <div className="text-lg font-bold font-mono mt-1" style={{ color: PALETTE[i % PALETTE.length] }}>
//                           {d.value}
//                         </div>
//                         <div className="text-[10px] text-zinc-600">trips</div>
//                       </div>
//                     ))}
//                     {data.destinationChart.length === 0 && (
//                       <div className="col-span-4 text-center text-zinc-600 text-sm py-4">No destination data</div>
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
//                 <div className="grid grid-cols-3 gap-3">
//                   <StatCard label="Parts Cost" value={naira(data.parts.totalPartsCost)} sub="across all vehicles" accent="#C8A96E" icon="🔩" />
//                   <StatCard label="Repairs Cost" value={naira(data.repairs.totalCost)} sub="across all vehicles" accent="#8C3E3E" icon="🔧" />
//                   <StatCard label="Services Cost" value={naira(data.services.totalCost)} sub="across all vehicles" accent="#3E6B8C" icon="⚙️" />
//                 </div>

//                 <Panel>
//                   <SectionHeader title={`Parts Installed on Driver's Vehicles (${data.parts.items.length})`} />
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-xs">
//                       <thead>
//                         <tr className="border-b border-white/[0.06]">
//                           {["Part", "Brand / Model", "Serial", "Vehicle", "Unit Cost", "Qty", "Install Date", "Install ODO", "km on Vehicle", "Days on Vehicle"].map((h) => (
//                             <th key={h} className="text-left py-2 pr-4 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.parts.items.map((p) => (
//                           <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
//                             <td className="py-3 pr-4">
//                               <div className="font-medium text-white">{p.name}</div>
//                               {p.supplier && <div className="text-zinc-600">{p.supplier}</div>}
//                             </td>
//                             <td className="py-3 pr-4 text-zinc-400">{p.brand} {p.model}</td>
//                             <td className="py-3 pr-4 font-mono text-zinc-500">{p.serialNumber}</td>
//                             <td className="py-3 pr-4">
//                               <span className="font-mono text-[#C8A96E] text-xs">{p.vehiclePlate}</span>
//                               <div className="text-zinc-600 text-[10px]">{p.vehicleCapNo}</div>
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-[#C8A96E]">{naira(p.unitCost)}</td>
//                             <td className="py-3 pr-4 text-zinc-400">{p.quantity ?? 1}</td>
//                             <td className="py-3 pr-4 text-zinc-400 whitespace-nowrap">
//                               {new Date(p.installDate).toLocaleDateString("en-NG")}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-zinc-400">
//                               {p.installOdo != null ? `${fmt(p.installOdo, 0)} km` : "—"}
//                             </td>
//                             <td className="py-3 pr-4">
//                               <span className={`font-mono ${(p.kmOnVehicle ?? 0) > 50000 ? "text-red-400" : (p.kmOnVehicle ?? 0) > 25000 ? "text-amber-400" : "text-emerald-400"}`}>
//                                 {p.kmOnVehicle != null ? `${fmt(p.kmOnVehicle, 0)} km` : "—"}
//                               </span>
//                             </td>
//                             <td className="py-3 pr-4">
//                               <span className={`font-mono ${p.daysOnVehicle > 365 ? "text-red-400" : p.daysOnVehicle > 180 ? "text-amber-400" : "text-zinc-300"}`}>
//                                 {p.daysOnVehicle}d
//                               </span>
//                             </td>
//                           </tr>
//                         ))}
//                         {data.parts.items.length === 0 && (
//                           <tr>
//                             <td colSpan={10} className="py-8 text-center text-zinc-600">No parts recorded for this driver's vehicles</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Panel>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                   <Panel>
//                     <SectionHeader title={`Repairs (${data.repairs.items.length})`} />
//                     <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
//                       {data.repairs.items.map((r: any) => (
//                         <div key={r.id} className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04]">
//                           <div className="flex justify-between items-start">
//                             <div className="text-sm font-medium text-white">{r.repairDescription}</div>
//                             <span className="text-xs font-mono text-[#C8A96E] ml-2">{naira(r.totalCost)}</span>
//                           </div>
//                           <div className="text-xs text-zinc-500 mt-1">
//                             {new Date(r.repairDate).toLocaleDateString()} · {fmt(r.odometerReadingKm, 0)} km
//                             {r.vehicle?.plateNumber && ` · ${r.vehicle.plateNumber}`}
//                             {r.mechanic && ` · ${r.mechanic}`}
//                           </div>
//                           {r.notes && <div className="text-xs text-zinc-600 mt-1 italic">{r.notes}</div>}
//                         </div>
//                       ))}
//                       {data.repairs.items.length === 0 && <div className="text-center text-zinc-600 text-sm py-4">No repairs recorded</div>}
//                     </div>
//                   </Panel>

//                   <Panel>
//                     <SectionHeader title={`Services (${data.services.items.length})`} />
//                     <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
//                       {data.services.items.map((s: any) => (
//                         <div key={s.id} className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04]">
//                           <div className="flex justify-between items-start">
//                             <div className="text-sm font-medium text-white">{s.serviceType}</div>
//                             <span className="text-xs font-mono text-[#C8A96E] ml-2">{naira(s.cost)}</span>
//                           </div>
//                           <div className="text-xs text-zinc-500 mt-1">
//                             {new Date(s.serviceDate).toLocaleDateString()} · {fmt(s.odometerReadingKm, 0)} km
//                             {s.vehicle?.plateNumber && ` · ${s.vehicle.plateNumber}`}
//                             {s.provider && ` · ${s.provider}`}
//                           </div>
//                           {s.notes && <div className="text-xs text-zinc-600 mt-1 italic">{s.notes}</div>}
//                         </div>
//                       ))}
//                       {data.services.items.length === 0 && <div className="text-center text-zinc-600 text-sm py-4">No services recorded</div>}
//                     </div>
//                   </Panel>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── VEHICLE HISTORY TAB ── */}
//             {activeTab === "vehicles" && (
//               <motion.div
//                 key="vehicles"
//                 initial={{ opacity: 0, y: 8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="space-y-6"
//               >
//                 <Panel>
//                   <SectionHeader title={`Vehicles Driven (${data.vehicleHistory.length} assignments)`} />
//                   <div className="overflow-x-auto">
//                     <table className="w-full text-xs">
//                       <thead>
//                         <tr className="border-b border-white/[0.06]">
//                           {["Vehicle", "CAP No", "Make / Model", "Fuel Type", "Start Date", "End Date", "Days Assigned", "Trips on Vehicle", "Status"].map((h) => (
//                             <th key={h} className="text-left py-2 pr-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.vehicleHistory.map((vh, i) => {
//                           const isCurrent = dr.vehicle?.id === vh.vehicleId;
//                           return (
//                             <tr
//                               key={vh.id}
//                               className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
//                               onClick={() => router.push(`/vehicles/${vh.vehicleId}`)}
//                             >
//                               <td className="py-3 pr-5">
//                                 <div className="flex items-center gap-2">
//                                   {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
//                                   <span className="font-mono text-[#C8A96E] group-hover:text-white transition-colors">
//                                     {vh.plateNumber}
//                                   </span>
//                                 </div>
//                               </td>
//                               <td className="py-3 pr-5 font-mono text-zinc-500">{vh.cap_no}</td>
//                               <td className="py-3 pr-5 text-zinc-300">
//                                 {[vh.make, vh.model, vh.year].filter(Boolean).join(" ") || "—"}
//                               </td>
//                               <td className="py-3 pr-5 text-zinc-400">{vh.fuelType ?? "—"}</td>
//                               <td className="py-3 pr-5 text-zinc-400 whitespace-nowrap">
//                                 {new Date(vh.from).toLocaleDateString("en-NG")}
//                               </td>
//                               <td className="py-3 pr-5 whitespace-nowrap">
//                                 {isCurrent ? (
//                                   <span className="text-emerald-400">Present</span>
//                                 ) : (
//                                   <span className="text-zinc-400">{new Date(vh.to).toLocaleDateString("en-NG")}</span>
//                                 )}
//                               </td>
//                               <td className="py-3 pr-5 font-mono">
//                                 <span className={vh.daysAssigned > 180 ? "text-[#C8A96E]" : vh.daysAssigned > 60 ? "text-zinc-300" : "text-zinc-500"}>
//                                   {vh.daysAssigned}d
//                                 </span>
//                               </td>
//                               <td className="py-3 pr-5 font-mono text-zinc-400">{vh.tripsOnVehicle}</td>
//                               <td className="py-3 pr-5">
//                                 {isCurrent ? (
//                                   <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
//                                     <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Active
//                                   </span>
//                                 ) : (
//                                   <span className="text-zinc-600 text-xs">Completed</span>
//                                 )}
//                               </td>
//                             </tr>
//                           );
//                         })}
//                         {data.vehicleHistory.length === 0 && (
//                           <tr>
//                             <td colSpan={9} className="py-8 text-center text-zinc-600">No vehicle history found</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </Panel>

//                 {/* Visual timeline */}
//                 {data.vehicleHistory.length > 0 && (
//                   <Panel>
//                     <SectionHeader title="Vehicle Assignment Timeline" />
//                     <div className="relative pl-6 space-y-4">
//                       <div className="absolute left-2 top-0 bottom-0 w-px bg-white/[0.06]" />
//                       {data.vehicleHistory.map((vh, i) => {
//                         const isCurrent = dr.vehicle?.id === vh.vehicleId;
//                         return (
//                           <motion.div
//                             key={vh.id}
//                             initial={{ opacity: 0, x: -8 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.04 }}
//                             className="relative cursor-pointer"
//                             onClick={() => router.push(`/vehicles/${vh.vehicleId}`)}
//                           >
//                             <div
//                               className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 ${
//                                 isCurrent ? "border-emerald-400 bg-emerald-400/20" : "border-zinc-600 bg-[#0D1117]"
//                               }`}
//                             />
//                             <div className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] hover:border-white/10 transition-colors">
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-3">
//                                   <span className="font-mono text-[#C8A96E] text-sm">{vh.plateNumber}</span>
//                                   <span className="text-zinc-500 text-xs">{[vh.make, vh.model].filter(Boolean).join(" ") || vh.cap_no}</span>
//                                 </div>
//                                 <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
//                                   <span>{vh.daysAssigned}d</span>
//                                   <span>·</span>
//                                   <span>{vh.tripsOnVehicle} trips</span>
//                                 </div>
//                               </div>
//                               <div className="text-xs text-zinc-500 mt-0.5">
//                                 {new Date(vh.from).toLocaleDateString("en-NG")} → {isCurrent ? "Present" : new Date(vh.to).toLocaleDateString("en-NG")}
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
//                         <tr className="border-b border-white/[0.06]">
//                           {["Waybill", "ATC No", "Vehicle", "Loading Plant", "Destination", "Distance", "Date", "Fuel Cost", "Status"].map((h) => (
//                             <th key={h} className="text-left py-2 pr-4 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">
//                               {h}
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data.recentTrips.map((trip) => (
//                           <tr
//                             key={trip.id}
//                             className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group cursor-pointer"
//                             onClick={() => router.push(`/trips/${trip.id}`)}
//                           >
//                             <td className="py-3 pr-4 font-mono text-[#C8A96E] group-hover:text-white transition-colors">
//                               {trip.waybill_no}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-zinc-500">{trip.atcNo}</td>
//                             <td className="py-3 pr-4">
//                               <span className="font-mono text-zinc-300">{trip.vehicle?.plateNumber ?? "—"}</span>
//                               {trip.vehicle?.cap_no && <div className="text-zinc-600 text-[10px]">{trip.vehicle.cap_no}</div>}
//                             </td>
//                             <td className="py-3 pr-4 text-zinc-400">{trip.loadingPlant}</td>
//                             <td className="py-3 pr-4 text-zinc-300">{trip.destination}</td>
//                             <td className="py-3 pr-4 font-mono text-zinc-400">
//                               {trip.distanceKm != null ? `${fmt(trip.distanceKm, 0)} km` : "—"}
//                             </td>
//                             <td className="py-3 pr-4 text-zinc-500 whitespace-nowrap">
//                               {new Date(trip.despatchDate).toLocaleDateString("en-NG")}
//                             </td>
//                             <td className="py-3 pr-4 font-mono text-zinc-400">{naira(trip.fuelCost)}</td>
//                             <td className="py-3 pr-4">{pill(trip.status)}</td>
//                           </tr>
//                         ))}
//                         {data.recentTrips.length === 0 && (
//                           <tr>
//                             <td colSpan={9} className="py-8 text-center text-zinc-600">No trips in this date range</td>
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

// src/app/admin/drivers/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { saveAs } from "file-saver";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface DriverData {
  driver: {
    id: string; name: string; phone?: string; address: string;
    profileImage?: string; licenseNo?: string; licenseExp?: string;
    licenseStatus: "valid" | "expiring_soon" | "expired" | "unknown";
    daysUntilLicenseExpiry?: number | null;
    accountName?: string; accountNumber?: string; bank?: string; notes?: string;
    vehicle?: {
      id: string; plateNumber: string; cap_no: string;
      make?: string; model?: string; year?: number;
      fuelType?: string; vehicleImg?: string;
      currentOdo?: number | null;
      nextServiceDate?: string | null; nextServiceKm?: number | null;
    } | null;
  };
  totals: {
    totalTrips: number; totalDistanceAllTime: number; totalDistanceInRange: number;
    totalFuelQty: number; totalFuelCost: number; fuelEfficiency: number;
    estimatedCO2Kg: number; uniqueVehiclesCount: number; costPerKm: number;
  };
  fuelByType: Record<string, { qtyConsume: number; cost: number }>;
  tripTrend:         { month: string; count: number }[];
  fuelTrend:         { month: string; cost: number; qty: number }[];
  loadingPlantChart: { name: string; value: number }[];
  destinationChart:  { name: string; value: number }[];
  tripStatusChart:   { name: string; value: number }[];
  vehicleDistribution: { vehicleId: string; name: string; cap_no: string; value: number; km: number }[];
  recentTrips: {
    id: string; waybill_no: string; atcNo: string;
    destination: string; loadingPlant: string;
    distanceKm?: number | null; despatchDate: string; status: string;
    vehicle: { id?: string | null; plateNumber?: string | null; cap_no?: string | null };
    fuelCost: number;
  }[];
  vehicleHistory: {
    id: string; vehicleId: string; plateNumber: string; cap_no: string;
    make?: string | null; model?: string | null; year?: number | null;
    fuelType?: string | null; vehicleImg?: string | null;
    from: string; to?: string | null;
    daysAssigned: number; tripsOnVehicle: number; kmOnVehicle: number;
  }[];
  maintenance: {
    repairs:  RepairRow[];
    services: ServiceRow[];
    parts:    PartRow[];
    tires:    TireRow[];
    totalRepairCost:  number;
    totalServiceCost: number;
    totalPartsCost:   number;
    totalTireCost:    number;
    totalMaintenanceCost: number;
    mFrom?: string | null;
    mTo?:   string | null;
  };
}

interface RepairRow {
  id: string; faultDesc: string; repairDesc?: string | null;
  priority: string; status: string;
  odometerKm?: number | null; laborCost?: number | null;
  partsCost?: number | null; totalCost?: number | null;
  garage?: string | null; garagePhone?: string | null;
  reportedDate: string; startedDate?: string | null; completedDate?: string | null;
  notes?: string | null;
  vehicleId: string; vehiclePlate: string; vehicleCapNo: string;
  reporterDriverId?: string | null; reporterDriverName?: string | null;
  kmDrivenFromEvent?: number | null;
  tripsDrivenFromEvent?: number | null;
}
interface ServiceRow {
  id: string; serviceType: string; status: string; description?: string | null;
  odometerKm?: number | null; nextServiceKm?: number | null; nextServiceDate?: string | null;
  laborCost?: number | null; partsCost?: number | null; totalCost?: number | null;
  garage?: string | null; garagePhone?: string | null;
  scheduledDate?: string | null; completedDate?: string | null;
  notes?: string | null;
  vehicleId: string; vehiclePlate: string; vehicleCapNo: string;
  reporterDriverId?: string | null; reporterDriverName?: string | null;
  kmDrivenFromEvent?: number | null;
  tripsDrivenFromEvent?: number | null;
}
interface PartRow {
  id: string; name: string; partNumber?: string | null; category?: string | null;
  quantity: number; unitCost: number; totalCost?: number | null;
  supplier?: string | null; supplierPhone?: string | null;
  purchaseDate?: string | null; fittedDate?: string | null;
  warrantyExpiry?: string | null; warrantyExpired?: boolean;
  repairId?: string | null; notes?: string | null;
  vehicleId: string; vehiclePlate: string; vehicleCapNo: string;
  reporterDriverId?: string | null; reporterDriverName?: string | null;
  kmDrivenFromEvent?: number | null;
  tripsDrivenFromEvent?: number | null;
}
interface TireRow {
  id: string; brand?: string | null; size?: string | null; serialNumber?: string | null;
  position: string; status: string;
  fittedOdometerKm?: number | null; removedOdometerKm?: number | null;
  kmCovered?: number | null; expectedLifeKm?: number | null;
  treadDepthMm?: number | null; treadDepthAtRemoval?: number | null;
  unitCost?: number | null; supplier?: string | null;
  fittedDate?: string | null; removedDate?: string | null;
  lifePct?: number | null; notes?: string | null;
  vehicleId: string; vehiclePlate: string; vehicleCapNo: string;
  reporterDriverId?: string | null; reporterDriverName?: string | null;
  kmDrivenFromEvent?: number | null;
  tripsDrivenFromEvent?: number | null;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const PAL = ["#C8A96E","#3E6B8C","#5C9669","#8C5E3E","#7B4E8C","#8C3E3E","#3E7B8C","#6E8C3E"];

const REPAIR_PRIORITY_STYLES: Record<string,string> = {
  LOW:      "bg-zinc-700/30 text-zinc-400 border-zinc-600/30",
  MEDIUM:   "bg-[#3E6B8C]/20 text-sky-400 border-[#3E6B8C]/30",
  HIGH:     "bg-amber-900/20 text-amber-400 border-amber-700/30",
  CRITICAL: "bg-red-900/30 text-red-300 border-red-700/40",
};
const REPAIR_STATUS_STYLES: Record<string,string> = {
  OPEN:        "bg-red-900/20 text-red-400 border-red-800/30",
  IN_PROGRESS: "bg-sky-900/20 text-sky-400 border-sky-800/30",
  COMPLETED:   "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
  CANCELLED:   "bg-zinc-700/30 text-zinc-400 border-zinc-600/30",
};
const SERVICE_STATUS_STYLES: Record<string,string> = {
  SCHEDULED:   "bg-amber-900/20 text-amber-400 border-amber-700/30",
  IN_PROGRESS: "bg-sky-900/20 text-sky-400 border-sky-800/30",
  COMPLETED:   "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
  CANCELLED:   "bg-zinc-700/30 text-zinc-400 border-zinc-600/30",
};
const TIRE_STATUS_STYLES: Record<string,string> = {
  FITTED:    "bg-emerald-900/20 text-emerald-400 border-emerald-800/30",
  REPLACED:  "bg-sky-900/20 text-sky-400 border-sky-800/30",
  RETREADED: "bg-amber-900/20 text-amber-400 border-amber-700/30",
  SCRAPPED:  "bg-red-900/20 text-red-400 border-red-800/30",
};
const TRIP_STATUS_COLORS: Record<string,string> = {
  COMPLETED:"#5C9669", IN_PROGRESS:"#C8A96E", PLANNED:"#3E6B8C", CANCELLED:"#8C3E3E",
};

// ─── Formatters ────────────────────────────────────────────────────────────────
const n0 = (v?: number | null) =>
  v != null ? Number(v).toLocaleString("en-NG", { maximumFractionDigits: 0 }) : "—";
const n2 = (v?: number | null) =>
  v != null ? Number(v).toLocaleString("en-NG", { maximumFractionDigits: 2 }) : "—";
const naira = (v?: number | null) =>
  v != null
    ? `₦${Number(v).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : "—";
const fmtDate = (s?: string | Date | null) =>
  s ? new Date(s as any).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// ─── Shared primitives ─────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, accent = "#C8A96E", icon, delay = 0, alert = false,
}: {
  label: string; value: string | number; sub?: string;
  accent?: string; icon?: string; delay?: number; alert?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative bg-[#161B22] border rounded-xl p-5 overflow-hidden ${alert ? "border-red-700/50" : "border-white/[0.06]"}`}
    >
      {alert && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400 animate-pulse"/>}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ background: `radial-gradient(circle at 85% 15%, ${accent}, transparent 70%)` }}/>
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

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#161B22] border border-white/[0.06] rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
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
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color }} className="font-mono">
          {p.name}: {n2(p.value)}
        </div>
      ))}
    </div>
  );
};

function Pill({ label, cls }: { label: string; cls: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${cls}`}>
      {label.replace(/_/g, " ")}
    </span>
  );
}

function VehicleLink({ vehicleId, vehiclePlate, vehicleCapNo, router }: {
  vehicleId?: string; vehiclePlate: string; vehicleCapNo?: string; router: any;
}) {
  if (!vehicleId || vehiclePlate === "—")
    return <span className="text-zinc-600">—</span>;
  return (
    <button
      onClick={(e) => { e.stopPropagation(); router.push(`/vehicles/${vehicleId}`); }}
      className="text-left group"
    >
      <div className="text-[#C8A96E] hover:underline font-mono text-xs group-hover:text-[#d4b880] transition-colors whitespace-nowrap">
        {vehiclePlate}
      </div>
      {vehicleCapNo && (
        <div className="text-zinc-600 text-[10px]">{vehicleCapNo}</div>
      )}
    </button>
  );
}

function DriverLink({ driverId, driverName, router }: {
  driverId?: string | null; driverName?: string | null; router: any;
}) {
  if (!driverName) return <span className="text-zinc-600">—</span>;
  if (driverId) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); router.push(`/drivers/${driverId}`); }}
        className="text-[#C8A96E] hover:underline hover:text-[#d4b880] transition-colors text-left whitespace-nowrap text-xs"
      >
        {driverName}
      </button>
    );
  }
  return <span className="text-zinc-400 text-xs">{driverName}</span>;
}

function KmBadge({ km, label }: { km?: number | null; label?: string }) {
  if (km == null) return <span className="text-zinc-600">—</span>;
  const color = km > 5000 ? "text-red-400" : km > 2000 ? "text-amber-400" : "text-zinc-300";
  return (
    <div>
      <span className={`font-mono text-xs font-bold ${color}`}>{n0(km)} km</span>
      {label && <div className="text-[10px] text-zinc-600">{label}</div>}
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/[0.04] animate-pulse rounded-xl ${className}`}/>;
}

// ── License pill ──────────────────────────────────────────────────────────────
function LicensePill({ status, days }: { status: string; days?: number | null }) {
  if (status === "valid")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-700/40">
        <span className="w-1 h-1 rounded-full bg-emerald-400"/> Valid · {days}d left
      </span>
    );
  if (status === "expiring_soon")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-amber-900/30 text-amber-400 border border-amber-700/40 animate-pulse">
        ⚠ Expiring in {days}d
      </span>
    );
  if (status === "expired")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-red-900/30 text-red-400 border border-red-700/40">
        ✕ Expired
      </span>
    );
  return <span className="text-[10px] text-zinc-600">No license</span>;
}

// ── Maintenance date filter bar ───────────────────────────────────────────────
function MaintFilter({
  mRange, setMRange, onApply, onClear, loading,
}: {
  mRange: { from: string; to: string };
  setMRange: (r: { from: string; to: string }) => void;
  onApply: () => void;
  onClear: () => void;
  loading: boolean;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap p-3 bg-[#0D1117]/60 border border-white/[0.04] rounded-xl mb-4">
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Maint. Filter</span>
      <input type="date" value={mRange.from}
        onChange={(e) => setMRange({ ...mRange, from: e.target.value })}
        className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
      <span className="text-zinc-600 text-xs">→</span>
      <input type="date" value={mRange.to}
        onChange={(e) => setMRange({ ...mRange, to: e.target.value })}
        className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
      <button onClick={onApply} disabled={loading}
        className="px-3 py-1.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50">
        {loading ? "…" : "Apply"}
      </button>
      <button onClick={onClear}
        className="px-3 py-1.5 rounded-lg text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors">
        Clear
      </button>
      {(mRange.from || mRange.to) && (
        <span className="text-[10px] text-[#C8A96E]/60 ml-1">● filtered</span>
      )}
      <span className="text-[10px] text-zinc-700 ml-auto hidden sm:inline">
        "km driven" = km driver drove that truck from event date → filter end
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DriverDashboard() {
  const { id }    = useParams() as { id: string };
  const router    = useRouter();
  const [loading,  setLoading]  = useState(true);
  const [mLoading, setMLoading] = useState(false);
  const [data, setData]         = useState<DriverData | null>(null);
  const [tab, setTab]           = useState<"overview" | "maintenance" | "vehicles" | "trips">("overview");
  const [mTab, setMTab]         = useState<"repairs" | "services" | "parts" | "tires">("repairs");

  const [range, setRange] = useState(() => {
    const now = new Date();
    return {
      from: new Date(now.getTime() - 180 * 86_400_000).toISOString().slice(0, 10),
      to:   now.toISOString().slice(0, 10),
    };
  });
  const [mRange, setMRange] = useState({ from: "", to: "" });

  const buildUrl = useCallback((fr: string, to: string, mFr: string, mTo: string) => {
    const p = new URLSearchParams({ from: fr, to });
    if (mFr) p.set("mFrom", mFr);
    if (mTo) p.set("mTo", mTo);
    return `/api/auth/users/driver/${id}?${p}`;
  }, [id]);

  const load = useCallback(async (
    fr: string, to: string, mFr: string, mTo: string, maintOnly = false
  ) => {
    if (maintOnly) setMLoading(true);
    else setLoading(true);
    try {
      const res  = await fetch(buildUrl(fr, to, mFr, mTo));
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setData(json.data);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to load driver data");
    } finally {
      setLoading(false);
      setMLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => { load(range.from, range.to, "", ""); }, [id]);

  // ── Export CSV ──────────────────────────────────────────────────────────────
  function exportCSV() {
    if (!data) return toast.error("No data to export");
    const d = data.driver;
    const rows: string[][] = [
      ["Driver Report"],
      ["Name", d.name], ["Phone", d.phone ?? ""],
      ["License No", d.licenseNo ?? ""], ["License Status", d.licenseStatus],
      [],
      ["Totals"],
      ["Total Trips", String(data.totals.totalTrips)],
      ["Total Distance (all time) km", String(data.totals.totalDistanceAllTime)],
      ["Distance in range km", String(data.totals.totalDistanceInRange)],
      ["Fuel Consumed L", String(data.totals.totalFuelQty)],
      ["Fuel Cost ₦", String(data.totals.totalFuelCost)],
      ["Fuel Efficiency km/L", String(data.totals.fuelEfficiency)],
      ["Unique Vehicles", String(data.totals.uniqueVehiclesCount)],
      [],
      ["Vehicle History"],
      ["Plate", "CAP No", "Make/Model", "From", "To", "Days", "Trips", "km"],
      ...data.vehicleHistory.map((v) => [
        v.plateNumber, v.cap_no,
        [v.make, v.model].filter(Boolean).join(" "),
        fmtDate(v.from), fmtDate(v.to ?? null),
        String(v.daysAssigned), String(v.tripsOnVehicle), String(v.kmOnVehicle),
      ]),
      [],
      ["Maintenance Cost Summary"],
      ["Repairs ₦", String(data.maintenance.totalRepairCost)],
      ["Services ₦", String(data.maintenance.totalServiceCost)],
      ["Parts ₦", String(data.maintenance.totalPartsCost)],
      ["Tires ₦", String(data.maintenance.totalTireCost)],
      ["Total ₦", String(data.maintenance.totalMaintenanceCost)],
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    saveAs(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
      `driver_${d.name.replace(/\s+/g, "_")}_report.csv`
    );
  }

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#0D1117]" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="border-b border-white/[0.06] px-6 py-4 max-w-7xl mx-auto space-y-2">
          <Skeleton className="h-5 w-48"/>
          <Skeleton className="h-4 w-64"/>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24"/>)}
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
      <div className="min-h-screen bg-[#0D1117] flex items-center justify-center"
        style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
        <div className="text-center space-y-3">
          <p className="text-4xl">👤</p>
          <p className="text-zinc-300 text-sm font-bold">Driver not found</p>
          <button onClick={() => router.push("/drivers")}
            className="mt-2 px-4 py-2 rounded-lg bg-[#C8A96E] text-[#0D1117] text-xs font-bold">
            Back to Drivers
          </button>
        </div>
      </div>
    </DashboardLayout>
  );

  const dr = data.driver;
  const t  = data.totals;
  const m  = data.maintenance;
  const isLicenseAlert = dr.licenseStatus === "expired" || dr.licenseStatus === "expiring_soon";

  const tabs = [
    { key: "overview",     label: "Overview" },
    { key: "maintenance",  label: "Maintenance",
      badge: m.repairs.filter(r => ["OPEN","IN_PROGRESS"].includes(r.status)).length },
    { key: "vehicles",     label: "Vehicle History" },
    { key: "trips",        label: "Recent Trips" },
  ] as const;

  const maintTabs = [
    { key: "repairs",  label: "Repairs",  count: m.repairs.length,  cost: m.totalRepairCost  },
    { key: "services", label: "Services", count: m.services.length, cost: m.totalServiceCost },
    { key: "parts",    label: "Parts",    count: m.parts.length,    cost: m.totalPartsCost   },
    { key: "tires",    label: "Tires",    count: m.tires.length,    cost: m.totalTireCost    },
  ] as const;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right"/>
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* ── LICENSE ALERT BANNER ──────────────────────────────────────────── */}
        <AnimatePresence>
          {isLicenseAlert && (
            <motion.div
              key="license-banner"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex items-center justify-center gap-2 text-xs py-2 font-bold tracking-widest uppercase ${
                dr.licenseStatus === "expired"
                  ? "bg-red-900/80 text-red-300 border-b border-red-700"
                  : "bg-amber-900/60 text-amber-300 border-b border-amber-700"
              }`}
            >
              ⚠{" "}
              {dr.licenseStatus === "expired"
                ? "Driver license EXPIRED — should not operate vehicles"
                : `Driver license expiring in ${dr.daysUntilLicenseExpiry} days — Renewal required`}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STICKY HEADER ─────────────────────────────────────────────────── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()}
              className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>

            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full bg-center bg-cover border-2 border-white/10 flex-shrink-0"
              style={{ backgroundImage: `url(${dr.profileImage || "/avatar-placeholder.png"})` }}
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-bold tracking-wider truncate">{dr.name}</h1>
                <LicensePill status={dr.licenseStatus} days={dr.daysUntilLicenseExpiry}/>
              </div>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {dr.phone && <span>{dr.phone} · </span>}
                {dr.licenseNo && <span>License: {dr.licenseNo} · </span>}
                <span>{t.uniqueVehiclesCount} vehicles · {t.totalTrips} trips all-time</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {dr.vehicle && (
                <button
                  onClick={() => router.push(`/vehicles/${dr.vehicle!.id}`)}
                  className="px-3 py-1.5 rounded-lg text-[10px] border border-[#C8A96E]/40 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors font-bold whitespace-nowrap">
                  🚛 {dr.vehicle.plateNumber}
                </button>
              )}
              <button onClick={() => router.push(`/drivers/edit/${id}`)}
                className="px-3 py-1.5 rounded-lg text-[10px] bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors">
                Edit
              </button>
              <button onClick={exportCSV}
                className="px-3 py-1.5 rounded-lg text-[10px] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors">
                Export
              </button>
            </div>
          </div>

          {/* Trip date range filter */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <span className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">Trip Range</span>
            <input type="date" value={range.from}
              onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
              className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
            <span className="text-zinc-600 text-xs">→</span>
            <input type="date" value={range.to}
              onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
              className="bg-[#161B22] border border-white/[0.06] rounded-lg px-2 py-1 text-xs text-zinc-300 focus:outline-none focus:border-[#C8A96E]/40"/>
            <button
              onClick={() => load(range.from, range.to, mRange.from, mRange.to)}
              className="px-3 py-1 rounded-lg text-xs bg-[#C8A96E]/10 text-[#C8A96E] border border-[#C8A96E]/30 hover:bg-[#C8A96E]/20 transition-colors font-bold">
              Apply
            </button>
            <button
              onClick={() => {
                const now = new Date();
                const r = {
                  from: new Date(now.getTime() - 180 * 86_400_000).toISOString().slice(0, 10),
                  to:   now.toISOString().slice(0, 10),
                };
                setRange(r);
                load(r.from, r.to, mRange.from, mRange.to);
              }}
              className="px-3 py-1 rounded-lg text-xs border border-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors">
              Reset
            </button>
            {dr.vehicle && (
              <div className="ml-auto flex items-center gap-2 bg-[#161B22] border border-white/[0.06] rounded-lg px-3 py-1.5">
                <span className="text-[10px] text-zinc-500">Current Vehicle:</span>
                <button onClick={() => router.push(`/vehicles/${dr.vehicle!.id}`)}
                  className="text-[10px] font-mono text-[#C8A96E] hover:underline">{dr.vehicle.plateNumber}</button>
                <span className="text-[10px] text-zinc-600">{dr.vehicle.cap_no}</span>
              </div>
            )}
          </div>

          {/* Main tabs */}
          <div className="max-w-7xl mx-auto px-6 flex gap-0 border-t border-white/[0.04]">
            {tabs.map((tb) => (
              <button key={tb.key} onClick={() => setTab(tb.key as any)}
                className={`relative px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  tab === tb.key ? "text-[#C8A96E]" : "text-zinc-600 hover:text-zinc-400"
                }`}>
                {tb.label}
                {"badge" in tb && (tb as any).badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-mono">
                    {(tb as any).badge}
                  </span>
                )}
                {tab === tb.key && (
                  <motion.div layoutId="driver-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[#C8A96E]"/>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ───────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <AnimatePresence mode="wait">

            {/* ════ OVERVIEW TAB ════ */}
            {tab === "overview" && (
              <motion.div key="overview"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="space-y-6">

                {/* KPI cards */} 
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Total Trips (all time)" value={n0(t.totalTrips)} icon="🚛" accent="#C8A96E" delay={0}/>
                  <StatCard label="Distance (range)" value={`${n0(t.totalDistanceInRange)} km`} sub={`${n0(t.totalDistanceAllTime)} km all-time`} icon="📍" accent="#3E6B8C" delay={0.05}/>
                  <StatCard label="Fuel Consumed" value={`${n2(t.totalFuelQty)} L`} sub="in date range" icon="⛽" accent="#5C9669" delay={0.1}/>
                  <StatCard label="Fuel Cost" value={naira(t.totalFuelCost)} sub="in date range" icon="💰" accent="#8C5E3E" delay={0.15}/>
                  {/* <StatCard label="Fuel Efficiency" value={`${n2(t.fuelEfficiency)} km/L`} sub="distance ÷ fuel qty" icon="📊" accent="#7B4E8C" delay={0.2}/>
                  <StatCard label="Cost per km" value={`₦${n2(t.costPerKm)}`} sub="fuel cost ÷ distance" icon="📈" accent="#C8A96E" delay={0.25}/>
                  <StatCard label="Maintenance Cost" value={naira(m.totalMaintenanceCost)} sub="all vehicles, filtered period" icon="🔧" accent="#8C3E3E" delay={0.3}/>
                  <StatCard label="Est. CO₂" value={`${n0(t.estimatedCO2Kg)} kg`} sub="all-time emissions" icon="🌿" accent="#5C9669" delay={0.35}/> */}
                </div>

                {/* Driver profile + vehicle */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <Panel>
                    <SectionTitle title="Driver Profile"/>
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-20 h-20 rounded-full bg-center bg-cover border-2 border-[#C8A96E]/30"
                        style={{ backgroundImage: `url(${dr.profileImage || "/avatar-placeholder.png"})` }}/>
                      <div>
                        <div className="font-bold text-white text-sm">{dr.name}</div>
                        {dr.phone && <div className="text-[10px] text-zinc-500 mt-0.5">{dr.phone}</div>}
                      </div>
                      <div className="w-full space-y-2 text-[10px]">
                        {[
                          ["License", dr.licenseNo ?? "—"],
                          ["Expires",  fmtDate(dr.licenseExp)],
                          ["Bank",    dr.bank ?? "—"],
                          ["Account", dr.accountNumber ?? "—"],
                          ["Address", dr.address ?? "—"],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between border-t border-white/[0.04] pt-2 gap-2">
                            <span className="text-zinc-600 shrink-0">{k}</span>
                            <span className="text-zinc-300 text-right truncate">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Panel>

                  <div className="lg:col-span-3 space-y-4">
                    {/* Current vehicle */}
                    {dr.vehicle && (
                      <Panel>
                        <SectionTitle title="Current Vehicle"
                          action={
                            <button onClick={() => router.push(`/vehicles/${dr.vehicle!.id}`)}
                              className="text-[10px] text-zinc-500 hover:text-[#C8A96E] transition-colors">
                              View Vehicle →
                            </button>
                          }/>
                        <div className="flex items-center gap-4">
                          {dr.vehicle.vehicleImg && (
                            <div className="w-24 h-16 rounded-lg bg-center bg-cover border border-white/[0.06] flex-shrink-0"
                              style={{ backgroundImage: `url(${dr.vehicle.vehicleImg})` }}/>
                          )}
                          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
                            {[
                              ["Plate",    dr.vehicle.plateNumber],
                              ["CAP No",   dr.vehicle.cap_no],
                              ["Make",     [dr.vehicle.make, dr.vehicle.model, dr.vehicle.year].filter(Boolean).join(" ") || "—"],
                              ["Fuel",     dr.vehicle.fuelType ?? "—"],
                              ["ODO",      dr.vehicle.currentOdo != null ? `${n0(dr.vehicle.currentOdo)} km` : "—"],
                              ["Next Svc", fmtDate(dr.vehicle.nextServiceDate)],
                              ["Next Svc km", dr.vehicle.nextServiceKm != null ? `${n0(dr.vehicle.nextServiceKm)} km` : "—"],
                            ].map(([k, v]) => (
                              <div key={k} className="bg-[#0D1117] rounded-lg p-2 border border-white/[0.04]">
                                <div className="text-zinc-600 mb-1">{k}</div>
                                <div className="text-zinc-200 font-mono font-bold text-xs truncate">{v}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Panel>
                    )}

                    {/* Vehicles driven distribution */}
                    <Panel>
                      <SectionTitle title="Vehicles Driven — Trips Distribution"
                        action={
                          <button onClick={() => setTab("vehicles")}
                            className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">
                            Full History →
                          </button>
                        }/>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {data.vehicleDistribution.slice(0, 8).map((v, i) => (
                          <div key={v.vehicleId}
                            onClick={() => router.push(`/vehicles/${v.vehicleId}`)}
                            className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors text-center">
                            <div className="text-[10px] text-zinc-600 mb-1">#{i+1}</div>
                            <div className="font-mono font-bold text-xs" style={{ color: PAL[i % PAL.length] }}>
                              {v.name}
                            </div>
                            <div className="text-[10px] text-zinc-500 mt-0.5">{v.cap_no}</div>
                            <div className="text-[10px] text-zinc-400 mt-1 font-mono">{v.value} trips</div>
                            <div className="text-[10px] text-zinc-600 font-mono">{n0(v.km)} km</div>
                          </div>
                        ))}
                        {data.vehicleDistribution.length === 0 && (
                          <div className="col-span-4 text-center text-zinc-600 py-6 text-sm">No trip data</div>
                        )}
                      </div>
                    </Panel>
                  </div>
                </div>

                {/* Charts row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Panel className="lg:col-span-2">
                    <SectionTitle title="Monthly Trip Volume"/>
                    <div style={{ height: 240 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.tripTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                          <defs>
                            <linearGradient id="tripGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#C8A96E" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#C8A96E" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false}/>
                          <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Area type="monotone" dataKey="count" stroke="#C8A96E" strokeWidth={2} fill="url(#tripGrad)" name="Trips"/>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  <Panel>
                    <SectionTitle title="Loading Plants"/>
                    <div style={{ height: 240 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data.loadingPlantChart} dataKey="value" nameKey="name"
                            cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={2}>
                            {data.loadingPlantChart.map((_, i) => (
                              <Cell key={i} fill={PAL[i % PAL.length]}/>
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ background: "#1C2330", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 10 }}/>
                          <Legend iconSize={8} formatter={(v) => (
                            <span style={{ color: "#71717a", fontSize: 10 }}>
                              {String(v).length > 16 ? String(v).slice(0, 16) + "…" : v}
                            </span>
                          )}/>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>
                </div>

                {/* Charts row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Panel className="lg:col-span-2">
                    <SectionTitle title="Monthly Fuel Cost &amp; Quantity"/>
                    <div style={{ height: 220 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.fuelTrend} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08"/>
                          <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false}/>
                          <YAxis tick={{ fill: "#71717a", fontSize: 10 }} tickLine={false} axisLine={false}/>
                          <Tooltip content={<ChartTip/>}/>
                          <Bar dataKey="cost" name="Cost (₦)" fill="#C8A96E" radius={[4, 4, 0, 0]}/>
                          <Bar dataKey="qty"  name="Qty (L)"  fill="#3E6B8C" radius={[4, 4, 0, 0]}/>
                          <Legend iconSize={8} formatter={(v) => <span style={{ color: "#71717a", fontSize: 10 }}>{v}</span>}/>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Panel>

                  <div className="space-y-4">
                    <Panel>
                      <SectionTitle title="Trip Status"/>
                      <div className="space-y-2">
                        {data.tripStatusChart.map((s) => (
                          <div key={s.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full"
                                style={{ background: TRIP_STATUS_COLORS[s.name] ?? "#71717a" }}/>
                              <span className="text-[10px] text-zinc-400">{s.name}</span>
                            </div>
                            <span className="text-[10px] font-mono text-white">{s.value}</span>
                          </div>
                        ))}
                        {!data.tripStatusChart.length && <p className="text-zinc-600 text-xs text-center py-2">No trips</p>}
                      </div>
                    </Panel>
                    <Panel>
                      <SectionTitle title="Maintenance Summary"
                        action={<button onClick={() => setTab("maintenance")} className="text-[10px] text-zinc-500 hover:text-[#C8A96E]">Details →</button>}/>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Repairs",  value: m.totalRepairCost,  count: m.repairs.length,  color: "#8C3E3E", mKey: "repairs" as const },
                          { label: "Services", value: m.totalServiceCost, count: m.services.length, color: "#3E6B8C", mKey: "services" as const },
                          { label: "Parts",    value: m.totalPartsCost,   count: m.parts.length,    color: "#C8A96E", mKey: "parts" as const },
                          { label: "Tires",    value: m.totalTireCost,    count: m.tires.length,    color: "#8C5E3E", mKey: "tires" as const },
                        ].map((item) => (
                          <div key={item.label}
                            onClick={() => { setTab("maintenance"); setMTab(item.mKey); }}
                            className="bg-[#0D1117] rounded-lg p-2.5 border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors">
                            <div className="text-[9px] text-zinc-600 uppercase tracking-wider">{item.label}</div>
                            <div className="text-sm font-bold font-mono mt-0.5" style={{ color: item.color }}>{naira(item.value)}</div>
                            <div className="text-[9px] text-zinc-700">{item.count} records</div>
                          </div>
                        ))}
                      </div>
                    </Panel>
                  </div>
                </div>

                {/* Top destinations */}
                <Panel>
                  <SectionTitle title="Top Destinations"/>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {data.destinationChart.slice(0, 8).map((d, i) => (
                      <div key={d.name} className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] text-zinc-600">#{i+1}</span>
                          <div className="flex-1 h-px" style={{ background: PAL[i % PAL.length], opacity: 0.5 }}/>
                        </div>
                        <div className="text-[10px] font-medium text-white truncate">{d.name}</div>
                        <div className="text-lg font-bold font-mono mt-1" style={{ color: PAL[i % PAL.length] }}>
                          {d.value}
                        </div>
                        <div className="text-[9px] text-zinc-600">trips</div>
                      </div>
                    ))}
                    {!data.destinationChart.length && (
                      <div className="col-span-4 text-center text-zinc-600 text-sm py-4">No destination data</div>
                    )}
                  </div>
                </Panel>
              </motion.div>
            )}

            {/* ════ MAINTENANCE TAB ════ */}
            {tab === "maintenance" && (
              <motion.div key="maintenance"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="space-y-5">

                {/* Cost KPI cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatCard label="Repairs Cost"  value={naira(m.totalRepairCost)}  accent="#8C3E3E" icon="🔧"/>
                  <StatCard label="Services Cost" value={naira(m.totalServiceCost)} accent="#3E6B8C" icon="⚙️" delay={0.05}/>
                  <StatCard label="Parts Cost"    value={naira(m.totalPartsCost)}   accent="#C8A96E" icon="🔩" delay={0.1}/>
                  <StatCard label="Tires Cost"    value={naira(m.totalTireCost)}    accent="#8C5E3E" icon="⭕" delay={0.15}/>
                </div>

                {/* Maintenance date filter */}
                <MaintFilter
                  mRange={mRange} setMRange={setMRange}
                  onApply={() => load(range.from, range.to, mRange.from, mRange.to, true)}
                  onClear={() => { setMRange({ from: "", to: "" }); load(range.from, range.to, "", "", true); }}
                  loading={mLoading}
                />

                {/* Sub-tab pills */}
                <div className="flex gap-2 flex-wrap">
                  {maintTabs.map((mt) => (
                    <button key={mt.key} onClick={() => setMTab(mt.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold border transition-all ${
                        mTab === mt.key
                          ? "border-[#C8A96E] bg-[#C8A96E]/10 text-[#C8A96E]"
                          : "border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/20"
                      }`}>
                      {mt.label}
                      <span className={`font-mono ${mTab === mt.key ? "text-[#C8A96E]/70" : "text-zinc-600"}`}>
                        {mt.count} · {naira(mt.cost)}
                      </span>
                    </button>
                  ))}
                </div>

                {mLoading && (
                  <div className="flex items-center gap-2 text-xs text-zinc-500 py-4">
                    <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin"/>
                    Filtering maintenance records…
                  </div>
                )}

                {/* ── REPAIRS TABLE ──────────────────────────────────────────── */}
                {mTab === "repairs" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Repairs · ${m.repairs.length} records`}
                      action={
                        <button onClick={() => router.push("/maintenance/repairs/create")}
                          className="text-[10px] text-[#C8A96E] hover:underline">+ Log Repair</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {[
                              "Reported",
                              "Fault",
                              "Priority",
                              "Status",
                              "Truck (link)",
                              "ODO (km)",
                              "Garage",
                              "Supervise by",
                              "No.of trips",
                              "km Driven from Event",
                              "Cost",
                              "",
                            ].map((h) => (
                              <th key={h} className="text-left py-2 pr-3 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.repairs.map((r) => (
                            <tr key={r.id}
                              className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group ${
                                r.priority === "CRITICAL" && ["OPEN","IN_PROGRESS"].includes(r.status)
                                  ? "bg-red-950/10" : ""
                              }`}>
                              <td className="py-3 pr-3 whitespace-nowrap text-zinc-400">{fmtDate(r.reportedDate)}</td>
                              <td className="py-3 pr-3">
                                <div className="text-white font-medium whitespace-nowrap max-w-[160px] truncate">{r.faultDesc}</div>
                                {r.repairDesc && <div className="text-zinc-600 text-[10px] max-w-[160px] truncate">{r.repairDesc}</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <Pill label={r.priority} cls={REPAIR_PRIORITY_STYLES[r.priority] ?? "border-zinc-600/30 text-zinc-400"}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <Pill label={r.status} cls={REPAIR_STATUS_STYLES[r.status] ?? "border-zinc-600/30 text-zinc-400"}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <VehicleLink vehicleId={r.vehicleId} vehiclePlate={r.vehiclePlate} vehicleCapNo={r.vehicleCapNo} router={router}/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-400 whitespace-nowrap">
                                {r.odometerKm != null ? n0(r.odometerKm) : "—"}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <div className="text-zinc-300">{r.garage ?? "—"}</div>
                                {r.garagePhone && <div className="text-[10px] text-zinc-600 font-mono">{r.garagePhone}</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={r.reporterDriverId} driverName={r.reporterDriverName} router={router}/>
                                {r.reporterDriverId && <div className="text-[10px] text-zinc-600">reporter</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{r.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <KmBadge km={r.kmDrivenFromEvent} label="from event → filter end"/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-[#C8A96E] whitespace-nowrap">{naira(r.totalCost)}</td>
                              <td className="py-3 pr-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <button onClick={() => router.push(`/maintenance/repairs/${r.id}/edit`)}
                                  className="text-[10px] text-zinc-500 hover:text-[#C8A96E] border border-white/[0.06] hover:border-[#C8A96E]/30 px-2 py-0.5 rounded transition-all">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!m.repairs.length && (
                            <tr><td colSpan={11} className="py-8 text-center text-zinc-600">
                              No repairs recorded{(mRange.from || mRange.to) ? " in this date range" : " on vehicles driven by this driver"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── SERVICES TABLE ─────────────────────────────────────────── */}
                {mTab === "services" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Services · ${m.services.length} records`}
                      action={
                        <button onClick={() => router.push("/maintenance/services/create")}
                          className="text-[10px] text-[#C8A96E] hover:underline">+ Log Service</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {[
                              "Scheduled",
                              "Type",
                              "Status",
                              "Truck (link)",
                              "ODO (km)",
                              "Next Svc km",
                              "Garage",
                              "Supervise By",
                              "No.of trips",
                              "km Driven from Event",
                              "Cost",
                              "",
                            ].map((h) => (
                              <th key={h} className="text-left py-2 pr-3 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.services.map((s) => (
                            <tr key={s.id}
                              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                              <td className="py-3 pr-3 whitespace-nowrap text-zinc-400">{fmtDate(s.scheduledDate)}</td>
                              <td className="py-3 pr-3">
                                <div className="text-white font-medium whitespace-nowrap">{s.serviceType.replace(/_/g," ")}</div>
                                {s.description && <div className="text-zinc-600 text-[10px] max-w-[160px] truncate">{s.description}</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <Pill label={s.status} cls={SERVICE_STATUS_STYLES[s.status] ?? "border-zinc-600/30 text-zinc-400"}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <VehicleLink vehicleId={s.vehicleId} vehiclePlate={s.vehiclePlate} vehicleCapNo={s.vehicleCapNo} router={router}/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-400 whitespace-nowrap">
                                {s.odometerKm != null ? n0(s.odometerKm) : "—"}
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-400 whitespace-nowrap">
                                {s.nextServiceKm != null ? `${n0(s.nextServiceKm)} km` : "—"}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <div className="text-zinc-300">{s.garage ?? "—"}</div>
                                {s.garagePhone && <div className="text-[10px] text-zinc-600 font-mono">{s.garagePhone}</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={s.reporterDriverId} driverName={s.reporterDriverName} router={router}/>
                                {s.reporterDriverId && <div className="text-[10px] text-zinc-600">supervisor</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{s.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <KmBadge km={s.kmDrivenFromEvent} label="from event → filter end"/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-[#C8A96E] whitespace-nowrap">{naira(s.totalCost)}</td>
                              <td className="py-3 pr-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <button onClick={() => router.push(`/maintenance/services/${s.id}/edit`)}
                                  className="text-[10px] text-zinc-500 hover:text-[#C8A96E] border border-white/[0.06] hover:border-[#C8A96E]/30 px-2 py-0.5 rounded transition-all">
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                          {!m.services.length && (
                            <tr><td colSpan={11} className="py-8 text-center text-zinc-600">
                              No services recorded{(mRange.from || mRange.to) ? " in this date range" : " on vehicles driven by this driver"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── PARTS TABLE ────────────────────────────────────────────── */}
                {mTab === "parts" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Parts · ${m.parts.length} records`}
                      action={
                        <button onClick={() => router.push("/maintenance/parts/create")}
                          className="text-[10px] text-[#C8A96E] hover:underline">+ Log Part</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {[
                              "Part Name",
                              "Category",
                              "Qty",
                              "Truck (link)",
                              "Supplier",
                              "Purchased",
                              "Fitted",
                              "Warranty",
                              "Reporter (via repair)",
                              "No.of trips",
                              "km Driven from Fit",
                              "Total Cost",
                            ].map((h) => (
                              <th key={h} className="text-left py-2 pr-3 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.parts.map((p) => (
                            <tr key={p.id}
                              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 pr-3">
                                <div className="text-white font-medium">{p.name}</div>
                                {p.partNumber && <div className="text-zinc-600 text-[10px] font-mono">#{p.partNumber}</div>}
                              </td>
                              <td className="py-3 pr-3 text-zinc-400 whitespace-nowrap">{p.category ?? "—"}</td>
                              <td className="py-3 pr-3 font-mono text-zinc-300">{p.quantity}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <VehicleLink vehicleId={p.vehicleId} vehiclePlate={p.vehiclePlate} vehicleCapNo={p.vehicleCapNo} router={router}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <div className="text-zinc-300">{p.supplier ?? "—"}</div>
                                {p.supplierPhone && <div className="text-[10px] text-zinc-600 font-mono">{p.supplierPhone}</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap text-zinc-400">{fmtDate(p.purchaseDate)}</td>
                              <td className="py-3 pr-3 whitespace-nowrap text-zinc-400">{fmtDate(p.fittedDate)}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                {p.warrantyExpiry ? (
                                  <span className={`text-xs font-mono ${p.warrantyExpired ? "text-red-400" : "text-emerald-400"}`}>
                                    {fmtDate(p.warrantyExpiry)}{p.warrantyExpired ? " ❌" : " ✓"}
                                  </span>
                                ) : <span className="text-zinc-600">—</span>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={p.reporterDriverId} driverName={p.reporterDriverName} router={router}/>
                                {p.repairId && <div className="text-[10px] text-zinc-600">via repair</div>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{p.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <KmBadge km={p.kmDrivenFromEvent} label="from fitted → filter end"/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-[#C8A96E] whitespace-nowrap">{naira(p.totalCost)}</td>
                            </tr>
                          ))}
                          {!m.parts.length && (
                            <tr><td colSpan={11} className="py-8 text-center text-zinc-600">
                              No parts logged{(mRange.from || mRange.to) ? " in this date range" : " on vehicles driven by this driver"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* ── TIRES TABLE ────────────────────────────────────────────── */}
                {mTab === "tires" && !mLoading && (
                  <Panel>
                    <SectionTitle title={`Tires · ${m.tires.length} records`}
                      action={
                        <button onClick={() => router.push("/maintenance/tires/create")}
                          className="text-[10px] text-[#C8A96E] hover:underline">+ Log Tire</button>
                      }/>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {[
                              "Brand / Size",
                              "Position",
                              "Status",
                              "Truck (link)",
                              "Fitted ODO",
                              "Removed ODO",
                              "km Covered",
                              "Life Used",
                              "Fitted Date",
                              "Reporter (nearest trip)",
                              "No.of trips",
                              "km Driven from Fit",
                              "Cost",
                            ].map((h) => (
                              <th key={h} className="text-left py-2 pr-3 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {m.tires.map((tire) => (
                            <tr key={tire.id}
                              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                              <td className="py-3 pr-3">
                                <div className="text-white font-medium">{tire.brand ?? "—"}</div>
                                {tire.size && <div className="text-zinc-500 text-[10px] font-mono">{tire.size}</div>}
                                {tire.serialNumber && <div className="text-zinc-600 text-[10px] font-mono">#{tire.serialNumber}</div>}
                              </td>
                              <td className="py-3 pr-3 text-zinc-400 whitespace-nowrap">{tire.position.replace(/_/g," ")}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <Pill label={tire.status} cls={TIRE_STATUS_STYLES[tire.status] ?? "border-zinc-600/30 text-zinc-400"}/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <VehicleLink vehicleId={tire.vehicleId} vehiclePlate={tire.vehiclePlate} vehicleCapNo={tire.vehicleCapNo} router={router}/>
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-400 whitespace-nowrap">
                                {tire.fittedOdometerKm != null ? n0(tire.fittedOdometerKm) : "—"}
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-400 whitespace-nowrap">
                                {tire.removedOdometerKm != null ? n0(tire.removedOdometerKm) : "—"}
                              </td>
                              <td className="py-3 pr-3 font-mono text-zinc-300 whitespace-nowrap">
                                {tire.kmCovered != null ? `${n0(tire.kmCovered)} km` : "—"}
                              </td>
                              <td className="py-3 pr-3">
                                {tire.lifePct != null ? (
                                  <div className="min-w-[64px]">
                                    <span className={`text-[10px] font-bold font-mono ${
                                      tire.lifePct >= 90 ? "text-red-400" : tire.lifePct >= 70 ? "text-amber-400" : "text-emerald-400"
                                    }`}>{tire.lifePct}%</span>
                                    <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden mt-0.5">
                                      <div className="h-full rounded-full" style={{
                                        width: `${tire.lifePct}%`,
                                        background: tire.lifePct >= 90 ? "#ef4444" : tire.lifePct >= 70 ? "#f59e0b" : "#5C9669",
                                      }}/>
                                    </div>
                                  </div>
                                ) : <span className="text-zinc-600">—</span>}
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap text-zinc-400">{fmtDate(tire.fittedDate)}</td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <DriverLink driverId={tire.reporterDriverId} driverName={tire.reporterDriverName} router={router}/>
                                <div className="text-[10px] text-zinc-700">nearest trip ±7d</div>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <KmBadge km={tire.tripsDrivenFromEvent} label="from event → filter end"/>
                              </td>
                              <td className="py-3 pr-3 whitespace-nowrap">
                                <span className={`font-mono text-xs font-bold`}>{tire.tripsDrivenFromEvent}</span>
                              </td>
                              <td className="py-3 pr-3 font-mono text-[#C8A96E] whitespace-nowrap">{naira(tire.unitCost)}</td>
                            </tr>
                          ))}
                          {!m.tires.length && (
                            <tr><td colSpan={12} className="py-8 text-center text-zinc-600">
                              No tires logged{(mRange.from || mRange.to) ? " in this date range" : " on vehicles driven by this driver"}
                            </td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}
              </motion.div>
            )}

            {/* ════ VEHICLE HISTORY TAB ════ */}
            {tab === "vehicles" && (
              <motion.div key="vehicles"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="space-y-6">

                <Panel>
                  <SectionTitle title={`Vehicles Driven — ${data.vehicleHistory.length} assignments`}/>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          {["Vehicle","CAP No","Make / Model / Year","Fuel Type","Start Date","End Date","Days","Trips","km Driven","Status"].map((h) => (
                            <th key={h} className="text-left py-2 pr-5 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.vehicleHistory.map((vh, i) => {
                          const isCurrent = dr.vehicle?.id === vh.vehicleId;
                          return (
                            <tr key={vh.id}
                              onClick={() => router.push(`/vehicles/${vh.vehicleId}`)}
                              className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer ${
                                isCurrent ? "bg-emerald-950/10" : ""
                              }`}>
                              <td className="py-3 pr-5">
                                <div className="flex items-center gap-2">
                                  {isCurrent && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"/>
                                  )}
                                  {vh.vehicleImg && (
                                    <div className="w-8 h-6 rounded bg-center bg-cover border border-white/[0.06] shrink-0"
                                      style={{ backgroundImage: `url(${vh.vehicleImg})` }}/>
                                  )}
                                  <span className="font-mono text-[#C8A96E] font-bold">{vh.plateNumber}</span>
                                </div>
                              </td>
                              <td className="py-3 pr-5 font-mono text-zinc-400">{vh.cap_no}</td>
                              <td className="py-3 pr-5 text-zinc-300">
                                {[vh.make, vh.model, vh.year].filter(Boolean).join(" ") || "—"}
                              </td>
                              <td className="py-3 pr-5 text-zinc-400 whitespace-nowrap">{vh.fuelType ?? "—"}</td>
                              <td className="py-3 pr-5 text-zinc-400 whitespace-nowrap">{fmtDate(vh.from)}</td>
                              <td className="py-3 pr-5 text-zinc-400 whitespace-nowrap">
                                {isCurrent ? (
                                  <span className="text-emerald-400 font-bold">Present</span>
                                ) : fmtDate(vh.to ?? null)}
                              </td>
                              <td className="py-3 pr-5 font-mono text-zinc-300">
                                {isCurrent ? (
                                  <span className="text-emerald-400 font-bold">-</span>
                                ) :  (
                                     <span>
                                      {vh.daysAssigned}d
                                     </span>
                                    )}
                                {/* {vh.daysAssigned}d */}
                                </td>
                              <td className="py-3 pr-5 font-mono text-zinc-300">{vh.tripsOnVehicle}</td>
                              <td className="py-3 pr-5 font-mono text-zinc-300">{n0(vh.kmOnVehicle)} km</td>
                              <td className="py-3 pr-5">
                                {isCurrent ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-900/30 text-emerald-400 border border-emerald-700/40 font-bold">
                                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"/> Active
                                  </span>
                                ) : (
                                  <span className="text-zinc-600 text-[10px]">Completed</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        {data.vehicleHistory.length === 0 && (
                          <tr><td colSpan={10} className="py-8 text-center text-zinc-600">No vehicle history found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Panel>

                {/* Assignment timeline */}
                {data.vehicleHistory.length > 0 && (
                  <Panel>
                    <SectionTitle title="Assignment Timeline"/>
                    <div className="relative pl-6 space-y-3">
                      <div className="absolute left-2 top-0 bottom-0 w-px bg-white/[0.06]"/>
                      {data.vehicleHistory.map((vh, i) => {
                        const isCurrent = dr.vehicle?.id === vh.vehicleId;
                        return (
                          <motion.div key={vh.id}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="relative cursor-pointer"
                            onClick={() => router.push(`/vehicles/${vh.vehicleId}`)}>
                            <div className={`absolute -left-[22px] top-2 w-3 h-3 rounded-full border-2 ${
                              isCurrent ? "border-emerald-400 bg-emerald-400/30" : "border-zinc-600 bg-[#0D1117]"
                            }`}/>
                            <div className="bg-[#0D1117] rounded-lg p-3 border border-white/[0.04] hover:border-white/10 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[#C8A96E] text-xs font-bold">{vh.plateNumber}</span>
                                  <span className="text-zinc-500 text-[10px]">
                                    {[vh.make, vh.model].filter(Boolean).join(" ") || vh.cap_no}
                                  </span>
                                  {vh.fuelType && (
                                    <span className="text-[9px] text-zinc-700 border border-zinc-700/30 px-1.5 py-0.5 rounded">
                                      {vh.fuelType}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500">
                                  <span>
                                  {isCurrent ? (
                                   <span className="text-emerald-400 font-bold">-</span>
                                     ) : (
                                     <span>
                                      {vh.daysAssigned}d
                                     </span>
                                    )}
                                    {/* {vh.daysAssigned}d */}
                                    </span>
                                  <span>·</span>
                                  <span>{vh.tripsOnVehicle} trips</span>
                                  <span>·</span>
                                  <span>{n0(vh.kmOnVehicle)} km</span>
                                </div>
                              </div>
                              <div className="text-[10px] text-zinc-600 mt-0.5">
                                {fmtDate(vh.from)} → {isCurrent ? "Present" : fmtDate(vh.to ?? null)}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Panel>
                )}
              </motion.div>
            )}

            {/* ════ TRIPS TAB ════ */}
            {tab === "trips" && (
              <motion.div key="trips"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="space-y-4">

                <Panel>
                  <SectionTitle title={`Recent Trips — ${data.recentTrips.length} shown (in date range)`}/>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06]">
                          {["Waybill","ATC No","Vehicle","Loading Plant","Destination","Distance","Date","Fuel Cost","Status"].map((h) => (
                            <th key={h} className="text-left py-2 pr-4 text-zinc-500 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.recentTrips.map((trip) => (
                          <tr key={trip.id}
                            onClick={() => router.push(`/trips/${trip.id}`)}
                            className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                            <td className="py-3 pr-4 font-mono text-[#C8A96E] group-hover:text-white transition-colors">
                              {trip.waybill_no}
                            </td>
                            <td className="py-3 pr-4 font-mono text-zinc-500">{trip.atcNo}</td>
                            <td className="py-3 pr-4">
                              {trip.vehicle?.id ? (
                                <VehicleLink vehicleId={trip.vehicle.id} vehiclePlate={trip.vehicle.plateNumber ?? "—"} vehicleCapNo={trip.vehicle.cap_no ?? ""} router={router}/>
                              ) : <span className="text-zinc-600">—</span>}
                            </td>
                            <td className="py-3 pr-4 text-zinc-400">{trip.loadingPlant}</td>
                            <td className="py-3 pr-4 text-zinc-300">{trip.destination}</td>
                            <td className="py-3 pr-4 font-mono text-zinc-400">
                              {trip.distanceKm != null ? `${n0(trip.distanceKm)} km` : "—"}
                            </td>
                            <td className="py-3 pr-4 text-zinc-500 whitespace-nowrap">{fmtDate(trip.despatchDate)}</td>
                            <td className="py-3 pr-4 font-mono text-zinc-400">{naira(trip.fuelCost)}</td>
                            <td className="py-3 pr-4">
                              <Pill
                                label={trip.status}
                                cls={
                                  trip.status === "COMPLETED"   ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30" :
                                  trip.status === "IN_PROGRESS" ? "bg-amber-900/20 text-amber-400 border-amber-700/30" :
                                  trip.status === "PLANNED"     ? "bg-sky-900/20 text-sky-400 border-sky-800/30" :
                                  "bg-zinc-700/30 text-zinc-400 border-zinc-600/30"
                                }
                              />
                            </td>
                          </tr>
                        ))}
                        {data.recentTrips.length === 0 && (
                          <tr><td colSpan={9} className="py-8 text-center text-zinc-600">
                            No trips in this date range
                          </td></tr>
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
