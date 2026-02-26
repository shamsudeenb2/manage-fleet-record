// "use client";

// import { useEffect, useState } from "react";
// import { useParams,useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { Truck } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import DashboardLayout from "@/components/layout/Dashboard";

// const VehicleSchema = z.object({
// //   vin: z.string().optional().nullable(),
// //   plateNumber: z.string().min(2, "Plate no required"),
// //   cap_no: z.string().min(1, "Capacity number required"),
// //   make: z.string().optional().nullable(),
// //   model: z.string().optional().nullable(),
// //   year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
//   assignDriverId: z.string().uuid().optional().nullable(),
// //   fuelType: z.string().optional().nullable(),
// });

// type FormValues = z.infer<typeof VehicleSchema>;

// export default function UpdateVehiclePage() {
//         const { id } = useParams() as { id: string };
//       const router = useRouter();
  
//   const [loading, setLoading] = useState(false);
//   const [drivers, setDrivers] = useState<{ id: string; name: string }[]>([]);
//   const [currentdrivers, setCurrentDrivers] = useState("");

//   const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(VehicleSchema)
//   });



//   //get a vehicle
//       async function load() {
//         setLoading(true);
//         try {
//           const res = await fetch(`/api/vehicles/${id}`);
//           const json = await res.json();
//           if (!res.ok) throw new Error(json?.message || "Failed");
  
//           setCurrentDrivers(json?.vehicle?.driver?.name?? "")
//         } catch (err:any) {
//           console.error(err);
//           toast.error(err?.message || "Failed to load users");
//         } finally { setLoading(false); }
//       }
    
//       useEffect(()=>{ load() }, [id]);

//   //get drivers
//   useEffect(() => {
//     async function loadDrivers() {
//       try {
//         const res = await fetch("/api/auth/users/driver/list-no-vehicles?available=true");
//         const json = await res.json();
//         if (res.ok && json?.drivers) setDrivers(json.drivers);
//       } catch (err) {
//         console.error("Failed to load drivers", err);
//       }
//     }
//     loadDrivers();
//   }, []);

//   async function onSubmit(data: FormValues) {
//     setLoading(true);
//     try {
//       // ensure year is number or undefined
//       const payload: any = { ...data };

//       const res = await fetch(`/api/vehicles/${id}`, { method: "PATCH" ,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         toast.success("Vehicle created");
//         router.push(`/vehicles/${id}`);
//         return;
//       }

//       const json = await res.json().catch(() => ({}));
//       toast.error(json?.message || "Failed to create vehicle");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   }


//   return (
//     <>
//       <Toaster />
//       <DashboardLayout>
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-2xl">
//           <Card className="p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <Truck className="text-blue-600" />
//               <h2 className="text-xl font-semibold">{currentdrivers===""?("Assign Vehicle To Driver"):("Re-assign Vehicle to new Driver")} </h2>
//             </div>
//             <div className="flex items-center gap-3 mb-4">
//               <Truck className="text-blue-400" />
//               <h2 className="text-sm font-semibold">Current Driver : {currentdrivers}</h2>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* <div>
//                 <Label>Plate Number</Label>
//                 <Input {...register("plateNumber")} placeholder="Plate number" />
//                 {errors.plateNumber && <p className="text-sm text-red-600 mt-1">{errors.plateNumber.message}</p>}
//               </div>

//               <div>
//                 <Label>Cap Number</Label>
//                 <Input {...register("cap_no")} placeholder="Capacity number" />
//                 {errors.cap_no && <p className="text-sm text-red-600 mt-1">{errors.cap_no.message}</p>}
//               </div>

//               <div>
//                 <Label>VIN (optional)</Label>
//                 <Input {...register("vin")} placeholder="VIN" />
//               </div>

//               <div>
//                 <Label>Year (optional)</Label>
//                 <Input type="number" {...register("year", { valueAsNumber: true })} placeholder="e.g. 2020" />
//                 {errors.year && <p className="text-sm text-red-600 mt-1">{errors.year.message}</p>}
//               </div>

//               <div>
//                 <Label>Make</Label>
//                 <Input {...register("make")} placeholder="Manufacturer" />
//               </div>

//               <div>
//                 <Label>Model</Label>
//                 <Input {...register("model")} placeholder="Model" />
//               </div> */}

//                {/* <div >
//                 <Label>Fuel Type</Label>
//                 <select {...register("fuelType")} className="w-full border p-2 rounded">
//                   <option value="DIESEL"> Diesel</option>
//                   <option value="PETROL"> Petrol</option>
//                   <option value="CNG">CNG </option>
//                   <option value="OTHER">Others</option>
//                 </select>
//               </div> */}

//               <div >
//                 <Label>{currentdrivers===""?("Assign Vehicle To Driver"):("Re-assign Vehicle to new Driver")}</Label>
//                 <select {...register("assignDriverId")} className="w-full border p-2 rounded">
//                   <option value="">-- Select driver (optional) --</option>
//                   {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//                 </select>
//               </div>

//               <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>{loading ? "Updating..." : "Update vehicle"}</Button>
//                 <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
//               </div>
//             </form>
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }

// src/app/admin/vehicles/update/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const AssignSchema = z.object({
  assignDriverId: z.string().uuid("Invalid driver ID").optional().nullable(),
});

type FormValues = z.infer<typeof AssignSchema>;

type Driver = { id: string; name: string; phone?: string; licenseNo?: string; profileImage?: string };

type VehicleDetail = {
  id: string;
  plateNumber: string;
  cap_no: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  fuelType: string;
  vehicleImg?: string | null;
  currentOdo?: number | null;
  driverId?: string | null;
  driver?: { id: string; name: string; phone?: string; profileImage?: string } | null;
};

const FUEL_ICONS: Record<string, string> = {
  DIESEL: "⛽", PETROL: "🔴", CNG: "💨", ELECTRIC: "⚡", OTHER: "🔧",
};

function SelectInput({
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 focus:outline-none transition-colors appearance-none ${
        error
          ? "border-red-700/60 focus:border-red-500"
          : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    >
      {children}
    </select>
  );
}

export default function UpdateVehiclePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driversLoading, setDriversLoading] = useState(true);
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [removing, setRemoving] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(AssignSchema),
    defaultValues: { assignDriverId: null },
  });

  const selectedDriverId = watch("assignDriverId");
  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  // ── Load vehicle ─────────────────────────────────────────────────────────
  const loadVehicle = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/vehicles/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed to load vehicle");
      setVehicle(json.vehicle);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load vehicle");
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  // ── Load available drivers ────────────────────────────────────────────────
  const loadDrivers = useCallback(async () => {
    setDriversLoading(true);
    try {
      const res = await fetch("/api/auth/users/driver/list-no-vehicles?available=true");
      const json = await res.json();
      if (res.ok && json?.drivers) setDrivers(json.drivers);
    } catch {
      // non-critical
    } finally {
      setDriversLoading(false);
    }
  }, []);

  useEffect(() => { loadVehicle(); loadDrivers(); }, [loadVehicle, loadDrivers]);

  // ── Assign / Reassign driver ──────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    if (!data.assignDriverId) {
      toast.error("Please select a driver to assign");
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignDriverId: data.assignDriverId }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success(vehicle?.driverId ? "Driver reassigned successfully" : "Driver assigned successfully");
        router.push(`/vehicles/${id}`);
        return;
      }
      toast.error(json?.message ?? "Assignment failed");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setSubmitLoading(false);
    }
  }

  // ── Remove driver ─────────────────────────────────────────────────────────
  async function handleRemoveDriver() {
    setRemoving(true);
    try {
      const res = await fetch(`/api/vehicles/remove/${id}`, { method: "PATCH" });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("Driver removed successfully");
        router.push(`/vehicles/${id}`);
        return;
      }
      toast.error(json?.message ?? "Remove failed");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setRemoving(false);
      setConfirmRemove(false);
    }
  }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (fetchLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="w-10 h-10 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-zinc-500 text-sm tracking-wider">LOADING VEHICLE</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const hasDriver = !!vehicle?.driverId;
  const pageTitle = hasDriver ? "Reassign Driver" : "Assign Driver";

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div
        className="min-h-screen bg-[#0D1117] text-white"
        style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-zinc-500 hover:text-white transition-colors text-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-base font-bold tracking-wider">{pageTitle}</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {vehicle?.plateNumber} · {vehicle?.cap_no}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(`/vehicles/${id}`)}
              className="px-3 py-1.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              View Details →
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8 space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* ── Vehicle summary card ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Vehicle</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl border border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{
                    backgroundImage: vehicle?.vehicleImg ? `url(${vehicle.vehicleImg})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!vehicle?.vehicleImg && <span className="text-3xl">🚛</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[#C8A96E] font-bold text-sm">{vehicle?.plateNumber}</span>
                    <span className="text-zinc-600 text-xs">{vehicle?.cap_no}</span>
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {[vehicle?.make, vehicle?.model, vehicle?.year].filter(Boolean).join(" · ")}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-zinc-500">
                      {FUEL_ICONS[vehicle?.fuelType ?? "OTHER"]} {vehicle?.fuelType}
                    </span>
                    {vehicle?.currentOdo != null && (
                      <span className="text-[10px] text-zinc-500 font-mono">
                        📍 {Number(vehicle.currentOdo).toLocaleString("en-NG")} km
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Current driver card ── */}
            <div className={`rounded-xl p-5 border ${
              hasDriver
                ? "bg-[#161B22] border-white/[0.06]"
                : "bg-[#0D1117] border-dashed border-white/10"
            }`}>
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Current Driver
              </h2>

              {hasDriver && vehicle?.driver ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full border border-white/10 bg-[#0D1117] flex-shrink-0 bg-center bg-cover"
                      style={{ backgroundImage: vehicle.driver.profileImage ? `url(${vehicle.driver.profileImage})` : undefined }}
                    >
                      {!vehicle.driver.profileImage && (
                        <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold rounded-full">
                          {vehicle.driver.name[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{vehicle.driver.name}</div>
                      {vehicle.driver.phone && (
                        <div className="text-xs text-zinc-500 font-mono">{vehicle.driver.phone}</div>
                      )}
                    </div>
                  </div>

                  {/* Remove driver */}
                  <div className="flex-shrink-0">
                    {!confirmRemove ? (
                      <button
                        type="button"
                        onClick={() => setConfirmRemove(true)}
                        className="px-3 py-1.5 rounded-lg text-xs border border-red-800/40 text-red-400 hover:bg-red-900/20 transition-colors"
                      >
                        Remove Driver
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500">Are you sure?</span>
                        <button
                          type="button"
                          onClick={handleRemoveDriver}
                          disabled={removing}
                          className="px-2.5 py-1 rounded text-xs bg-red-900/40 text-red-400 border border-red-700/40 hover:bg-red-900/60 transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          {removing && <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />}
                          Yes, Remove
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmRemove(false)}
                          className="px-2.5 py-1 rounded text-xs border border-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-zinc-600">
                  <span className="text-2xl">○</span>
                  <div>
                    <p className="text-sm text-zinc-500">No driver assigned</p>
                    <p className="text-[10px] text-zinc-700">This vehicle is currently unassigned</p>
                  </div>
                </div>
              )}
            </div>

            {/* ── Assign form ── */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-5 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {hasDriver ? "Select New Driver" : "Select Driver to Assign"}
                </h2>

                {hasDriver && (
                  <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-900/10 border border-amber-700/30 rounded-lg px-3 py-2">
                    <span>⚠</span>
                    <span>
                      Selecting a new driver will automatically unassign{" "}
                      <strong>{vehicle?.driver?.name}</strong> from this vehicle.
                    </span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    Available Drivers
                  </label>
                  <SelectInput
                    {...register("assignDriverId")}
                    disabled={driversLoading}
                    error={!!errors.assignDriverId}
                  >
                    <option value="">
                      {driversLoading ? "Loading drivers…" : "— Select a driver —"}
                    </option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                        {d.phone ? ` · ${d.phone}` : ""}
                        {d.licenseNo ? ` · ${d.licenseNo}` : ""}
                      </option>
                    ))}
                  </SelectInput>
                  {errors.assignDriverId && (
                    <p className="text-[10px] text-red-400">{errors.assignDriverId.message}</p>
                  )}
                  <p className="text-[10px] text-zinc-600">
                    {driversLoading
                      ? "Loading…"
                      : `${drivers.length} unassigned driver(s) available`}
                  </p>
                </div>

                {/* Selected driver preview */}
                <AnimatePresence>
                  {selectedDriver && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-3 bg-[#0D1117] rounded-lg px-3 py-2.5 border border-[#5C9669]/30"
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-white/10 bg-[#161B22] flex-shrink-0 bg-center bg-cover"
                        style={{ backgroundImage: selectedDriver.profileImage ? `url(${selectedDriver.profileImage})` : undefined }}
                      >
                        {!selectedDriver.profileImage && (
                          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs rounded-full">
                            {selectedDriver.name[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-emerald-400">{selectedDriver.name}</div>
                        <div className="text-[10px] text-zinc-500">
                          {hasDriver ? "Will replace current driver" : "Will be assigned to this vehicle"}
                          {selectedDriver.phone && ` · ${selectedDriver.phone}`}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {drivers.length === 0 && !driversLoading && (
                  <div className="flex items-center gap-2 text-[10px] text-zinc-600 bg-[#0D1117] rounded-lg px-3 py-2.5 border border-white/[0.04]">
                    <span>ℹ️</span>
                    All drivers are currently assigned to vehicles. Unassign a driver first.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-5">
                <button
                  type="submit"
                  disabled={submitLoading || !selectedDriverId}
                  className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitLoading && (
                    <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                  )}
                  {submitLoading
                    ? hasDriver ? "Reassigning…" : "Assigning…"
                    : hasDriver ? "Reassign Driver" : "Assign Driver"}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
