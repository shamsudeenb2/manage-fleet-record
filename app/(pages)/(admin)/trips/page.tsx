// // src/app/admin/trips/create/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm, useFieldArray } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { Truck, User, MapPin, Hash } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import DashboardLayout from "@/components/layout/Dashboard";
// import { getEstimatedFuelConsumption } from '@/components/utils/fuelCalculations';
// import { calculateFinalFuelLeft } from '@/components/utils/calculateFuelLeft';

// const FuelRowSchema = z.object({
//   type: z.enum(["DIESEL","PETROL","CNG","ELECTRIC","OTHER"]),
//   qtyGiven: z.number().nonnegative(),
//   unitPrice: z.number().nonnegative(),
//   fuelCost: z.number().nonnegative(),
//   unit: z.string().min(1),
//   // qtyLeft: z.number(),
//   distanceKm: z.number().positive().optional(),
// });
// const CustomerSchema = z.object({
//   customerName: z.string().min(1),
//   company: z.string().min(1),
//   noOfBags: z.number(),
// });

// const TripSchema = z.object({
//   vehicleId: z.string().uuid(),
//   driverId: z.string().uuid(),
//   loadingPlant: z.string().min(1),
//   waybill_no: z.string().min(1),
//   atcNo: z.string().min(1),
 
//   destination: z.string().min(1),
  
//   despatchDate: z.string(),
//   uploadDate: z.string().optional(),
//   totaldistanceKm: z.number().positive().optional(),
//   odoStart: z.number().int().nonnegative().optional(),
//   odoEnd: z.number().int().nonnegative().optional(),
//   fuels: z.array(FuelRowSchema).min(1),
//   customer: z.array(CustomerSchema).min(1),
//   notes: z.string().optional(),
// });

// type TripForm = z.infer<typeof TripSchema>;

// interface VehicleState {
//   id: string;
//   plateNumber: string;
//   cap_no: string;
//   fuelType: string;
// }


// export default function CreateTripPage() {
//   const router = useRouter();
//   const [vehicles, setVehicles] = useState<VehicleState>({id:"",plateNumber:"",cap_no:"",fuelType:""});
//   const [drivers, setDrivers] = useState<any[]>([]);
//   const [qtyLeft, setQtyLeft] = useState(0);
  
//   const [loading, setLoading] = useState(false);
//   const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);

//   const { register, control, handleSubmit, watch,reset, setValue, formState: { errors } } = useForm<TripForm>({
//     resolver: zodResolver(TripSchema),
//     defaultValues: {
//       vehicleId: vehicles.id,
//       driverId: "",
//       loadingPlant: "",
//       waybill_no: "",
//       atcNo: "",
//       destination: "",
//       despatchDate: new Date().toISOString().slice(0,16),
//       fuels: [{ type: "DIESEL", qtyGiven: 0, unit: "L",unitPrice:0,fuelCost:0, distanceKm:0 }],
//       customer: [{ customerName: "", company: "", noOfBags: 0}],
//     },
//   });

//   const fuelFA = useFieldArray({ control, name: "fuels" });
//   const customerFA = useFieldArray({ control, name: "customer" });
  

//   useEffect(() => {
//     async function load() {
//       try {
//         const vres = await fetch("/api/auth/users/driver/list-with-vehicle");
//         const vjson = await vres.json();
//         // const djson = await dres.json();
//         // if (vres.ok) setVehicles(vjson.items ?? vjson.vehicles ?? []);
//         console.log("lets here them",vjson.drivers)
//         if (vres.ok) setDrivers( vjson.drivers ?? []);
//       } catch (err) {
//         console.error("load lists", err);
//       }
//     }
//     load();
//   }, []);



//   // when vehicle changes, set selectedVehicle for preview/efficiency
//   // useEffect(() => { //get the distance here
//   //   const vid = watch("vehicleId");
//   //   if (!vid) { setSelectedVehicle(null); return; }
//   //   const v = vehicles.find((x:any)=>x.id === vid);
//   //   setSelectedVehicle(v ?? null);
//   // }, [watch("vehicleId"), vehicles]);

//     // when driver changes, set vehicle
//     const driverId = watch("driverId")
//   useEffect(() => {
    
//     if (!driverId) { setSelectedVehicle(null); return; }
//     const v = drivers.find((x:any)=>x.id === driverId);
//     setVehicles(v.vehicle);
//     setValue('vehicleId',v.vehicle.id?? 0);

//   }, [driverId, drivers]);

//   // compute preview fuel consumption using distanceKm or odo values
//   // const watchDistance = watch("distanceKm");
//   const watchPlant = watch("loadingPlant");
//   const watchDest = watch("destination");
//   const fuels = watch('fuels');

//   //get distance from privous computed distance and qtyLeft
//   //   useEffect(() => {
//   //   async function load() {
//   //     try {
//   //       const vres = await fetch(`/api/trips/distance?loadingPlant=${watchPlant}&destination=${watchDest}&driverId=${driverId}`);
//   //       const vjson = await vres.json();
//   //       // const djson = await dres.json();
//   //       // if (vres.ok) setVehicles(vjson.items ?? vjson.vehicles ?? []);
//   //       if (vres.ok) {
//   //         console.log("distance",vjson)
//   //         setValue('distanceKm',vjson.distance?.distanceKm?? 0);
//   //         setQtyLeft(vjson.qtyLeft??0)
          
//   //       }
//   //     } catch (err) {
//   //       console.error("load lists", err);
//   //     }
//   //   }
//   //   load();
//   // }, [watchPlant,watchDest]);

//   let totalDistance=0
//   const setFuelConsumption = (index:number, qtyGiven:number,unitPrice:number) => {
//   // 1. Get the current fuel object data from the form using 'watch'
//   const currentFuel = watch(`fuels.${index}`);
  
//   // Ensure the fuel object exists before proceeding
//   if (!currentFuel) {
//     console.error(`Fuel entry at index ${index} not found.`);
//     return;
//   }

//   const { type: fuelType, unit: fuelUnit, } = currentFuel;

//   if (vehicles.fuelType==="DIESEL"){
//     setValue(`fuels.${index}.unit`, "L", { shouldDirty: true });
//     setValue(`fuels.${index}.type`,vehicles.fuelType, { shouldDirty: true });
//   }else if(vehicles.fuelType==="CNG"){
//     setValue(`fuels.${index}.unit`, "KG", { shouldDirty: true });
//     setValue(`fuels.${index}.type`,vehicles.fuelType, { shouldDirty: true });
//   }

//   const cost = unitPrice * qtyGiven
//   console.log(`Fuel entry at index ${index} unit price, cost, and qqtgiven.`,unitPrice,cost,qtyGiven);
//   // 2. Calculate the estimated consumption using your helper function
//   const estimatedDistance = getEstimatedFuelConsumption(
//     fuelType, 
//     fuelUnit, 
//     qtyGiven
//   );

 
  
//   // 3. Set the calculated value to the specific field path
//   if (estimatedDistance !== null) {
//      setValue(`fuels.${index}.distanceKm`, estimatedDistance, {
//       shouldValidate: true, // Optionally run validation
//       shouldDirty: true     // Mark the field as dirty
//     });

//      setValue(`fuels.${index}.fuelCost`, cost , {
//       shouldValidate: true,
//       shouldDirty: true     
//     });
//     totalDistance = estimatedDistance + totalDistance
//     // 2. Calculate the remaining quantity
//     // Ensure qtyGiven is a number before subtraction
//     // const givenValue = qtyGiven || 0; 
//     // const remaining = givenValue - consumeValue;
//     // const leftValue = calculateFinalFuelLeft(givenValue,consumeValue,qtyLeft)
//     // // The path is 'fuels.[index].qtyConsume'
//     // setValue(`fuels.${index}.qtyConsume`, consumeValue, {
//     //   shouldValidate: true, // Optionally run validation
//     //   shouldDirty: true     // Mark the field as dirty
//     // });
    
//       setValue(`totaldistanceKm`, totalDistance, {
//       shouldValidate: true, // Optionally run validation
//       shouldDirty: true     // Mark the field as dirty
//     });
    


    
//   } else {
//     console.error('Fuel consumption calculation failed.');
//   }
// };


//   //get the total fuel consume
//   useEffect(() => {
//     if (fuels ) {
//     fuels.forEach((fuelEntry, index) => {
//       // For each entry in the array, recalculate and set the value
//       setFuelConsumption(index, 
//         fuelEntry.qtyGiven, fuelEntry.unitPrice);
//     });
//    }
//   }, [fuels[0].qtyGiven,fuels[1]?.unitPrice,
//      fuels[1]?.qtyGiven,fuels[2]?.unitPrice,
//      fuels[2]?.qtyGiven,fuels[3]?.unitPrice,
//      fuels[3]?.qtyGiven,fuels[4]?.unitPrice
// ]);

//   // const computedDistance = (() => { //or we get the distance covered here
//   //   if (typeof watchDistance === "number" && !Number.isNaN(watchDistance)) return watchDistance;
//   //   if (typeof watchOdoStart === "number" && typeof watchOdoEnd === "number") {
//   //     return Math.max(0, watchOdoEnd - watchOdoStart);
//   //   }
//   //   return undefined;
//   // })();

//   // const estimatedConsumption = (() => {
//   //   if (!computedDistance || !selectedVehicle) return null;
//   //   const kmPerUnit = selectedVehicle.fuelEfficiencyKmPerUnit ?? 2.0;
//   //   const est = +(computedDistance / kmPerUnit);
//   //   return est;
//   // })();

//   async function onSubmit(data: TripForm) {
//     setLoading(true);
//     try {
//        console.log("lets have them", data)// convert despatchDate to ISO (if input type local)
      
//       if (!data.uploadDate) data.uploadDate = new Date().toISOString();
//       const res = await fetch("/api/trips", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const json = await res.json();
//       if (!res.ok) throw new Error(json?.message || "Failed to create trip");
//       reset();
//       toast.success("Trip created");
      
//     } catch (err:any) {
//       console.error(err);
//       toast.error(err?.message || "Create trip failed");
//     } finally {
//       setLoading(false);
//     }
//   }
 
  
//   return (
//     <>
//       <Toaster />
//       <DashboardLayout>
//       <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
//         <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-4xl mx-auto">
//           <Card className="p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <Truck className="text-blue-600" />
//               <h2 className="text-xl font-semibold">Create Trip</h2>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label>Driver</Label>
//                 <select {...register("driverId")} className="w-full border p-2 rounded">
//                   <option value="">Select driver</option>
//                   {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
//                 </select>
//                 {errors.driverId && <p className="text-sm text-red-600 mt-1">{(errors.driverId as any).message}</p>}
//               </div>
              
//               <div>
//                 <Label>Cap Number</Label>
//                 <select {...register("vehicleId")} className="w-full border p-2 rounded" defaultValue={vehicles.id}>
//                   <option value={vehicles.id}> {vehicles.cap_no} </option>
//                 </select>
//                 {errors.vehicleId && <p className="text-sm text-red-600 mt-1">{(errors.vehicleId as any).message}</p>}
//                 {/* {selectedVehicle && <p className="text-sm text-gray-600 mt-1">Fuel type: {selectedVehicle.fuelType} • Efficiency: {selectedVehicle.fuelEfficiencyKmPerUnit ?? 2} km/unit</p>} */}
//               </div>

//               <div>
//                 <Label>Loading Plant</Label>
//                 <Input {...register("loadingPlant")} placeholder="Loading plant" />
//                 {errors.loadingPlant && <p className="text-sm text-red-600 mt-1">{(errors.loadingPlant as any).message}</p>}
//               </div>

//               <div>
//                 <Label>Destination</Label>
//                 <Input {...register("destination")} placeholder="Destination" />
//                 {errors.destination && <p className="text-sm text-red-600 mt-1">{(errors.destination as any).message}</p>}
//               </div>

//               <div>
//                 <Label>Waybill No</Label>
//                 <Input {...register("waybill_no")} placeholder="Waybill number" />
//                 {errors.waybill_no && <p className="text-sm text-red-600 mt-1">{(errors.waybill_no as any).message}</p>}
//               </div>

//               <div>
//                 <Label>ATC No</Label>
//                 <Input {...register("atcNo")} placeholder="ATC number" />
//                 {errors.atcNo && <p className="text-sm text-red-600 mt-1">{(errors.atcNo as any).message}</p>}
//               </div>

//               <div>
//                 <Label>Dispatch date</Label>
//                 <Input {...register("despatchDate")} type="datetime-local" />
//                 {errors.despatchDate && <p className="text-sm text-red-600 mt-1">{(errors.despatchDate as any).message}</p>}
//               </div>
//                <div>
//                   <Label>Distance (km)</Label>
//                   <Input {...register(`totaldistanceKm` as const, { valueAsNumber: true })} type="number"  placeholder="Distance in km" />
//                   </div>
//               {/* <div>
//                 <Label>Odometer Start (km)</Label>
//                 <Input {...register("odoStart", { valueAsNumber: true })} type="number" placeholder="Start ODO" />
//               </div>

//               <div>
//                 <Label>Odometer End (km)</Label>
//                 <Input {...register("odoEnd", { valueAsNumber: true })} type="number" placeholder="End ODO" />
//               </div> */}
//                 <div className="md:col-span-2 mt-5">
//                 <Label>Customer Information</Label>
//                 <div className="space-y-2">
//                   {customerFA.fields.map((field, idx) => (
//                     <div key={field.id} className="grid grid-cols-4 gap-2 items-end">
//                       <div>
//                         <label className="block text-sm pb-2">Company</label>
//                         <Input {...register(`customer.${idx}.company` as const)} className="w-full border p-2 rounded"/>
//                       </div>

//                       <div>
//                         <label className="block text-sm pb-2">Customer Name</label>
//                         <input {...register(`customer.${idx}.customerName` as const)}  className="w-full border p-2 rounded" />
//                       </div>

//                       <div>
//                         <label className="block text-sm">Number of Bags </label>
//                         <input {...register(`customer.${idx}.noOfBags` as const,{ valueAsNumber: true })} type="number" className="w-full border p-2 rounded" />
//                       </div>
  

//                       <div className="col-span-4 flex gap-2">
//                         {idx > 0?(<Button type="button" variant="ghost" onClick={() => customerFA.remove(idx)}>Remove fuel</Button>):(<></>)}
                       
//                       </div>
//                     </div>
//                   ))}

//                   <div>
//                     <Button type="button" onClick={() => customerFA.append({ company: "", customerName: "", noOfBags: 0})}>Add Customer</Button>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-2 mt-5">
//                 <Label>Fuels</Label>
//                 <div className="space-y-2">
//                   {fuelFA.fields.map((field, idx) => (
                    
//                     <div key={field.id} className="grid grid-cols-4 gap-2 items-end">
//                       <div>
//                         <label className="block text-sm">Type</label>
//                         <Input {...register(`fuels.${idx}.type` as const)} value={vehicles.fuelType} className="w-full border p-2 rounded" disabled/>
//                         {/* <select {...register(`fuels.${idx}.type` as const)} className="w-full border p-2 rounded">
//                           <option value={vehicles.fuelType??""}>{vehicles.fuelType}</option>
//                         </select> */}
//                       </div>

//                       <div>
//                         <label className="block text-sm">Qty Given</label>
//                         <input {...register(`fuels.${idx}.qtyGiven` as const, { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded" />
//                       </div>

//                       {/* <div>
//                         <label className="block text-sm">Qty Consumed </label>
//                         <input {...register(`fuels.${idx}.qtyConsume` as const, { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded" disabled/>
//                       </div> */}

//                       {/* <div>
//                         <label className="block text-sm">Fuel Left</label>
//                         <input {...register(`fuels.${idx}.qtyLeft` as const, { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded" placeholder="litre / cubic" disabled/>
//                       </div> */}
//                       <div>
//                         <label className="block text-sm">Unit</label>
//                         <input {...register(`fuels.${idx}.unit` as const)}  className="w-full border p-2 rounded"  disabled/>
//                         {/* <select {...register(`fuels.${idx}.unit` as const)} className="w-full border p-2 rounded">
//                           <option value="L">Liters</option>
//                           <option value="KG">KG</option>
//                           <option value="SCM">SCM</option>
//                         </select> */}
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm">Price per {watch(`fuels.${idx}.unit`)}</label>
//                         <input {...register(`fuels.${idx}.unitPrice` as const, { valueAsNumber: true })} type="number" step="0.01" className="w-full border p-2 rounded" placeholder="Price per litre or cubic" />
//                       </div>
//                       <div>
//                         <Label>Distance (km)</Label>
//                         <Input {...register(`fuels.${idx}.distanceKm` as const, { valueAsNumber: true })} type="number" step="0.1" placeholder="Distance in km" />
//                       </div>

//                       <div className="col-span-4 flex gap-2">
//                         {idx > 0?(<Button type="button" variant="ghost" onClick={() =>{ fuelFA.remove(idx)
                          
//                         }
//                       }>Remove fuel</Button>):(<></>)}
//                       </div>
//                     </div>
//                   ))}

//                   <div>
//                     <Button type="button" onClick={() => { 
                     
//                       fuelFA.append({ type: "DIESEL", qtyGiven: 0, unit: "L",distanceKm:0, unitPrice:0, fuelCost:0});
//                     }}>Add fuel</Button>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-2">
//                 <Label>Notes</Label>
//                 <textarea {...register("notes")} className="w-full border p-2 rounded" />
//               </div>

//               <div className="md:col-span-2 mt-4">
//                 {/* {computedDistance != null && selectedVehicle && (
//                   <div className="p-3 bg-gray-50 border rounded mb-2">
//                     <p className="text-sm text-gray-700">Computed distance: <strong>{computedDistance} km</strong></p>
//                     <p className="text-sm text-gray-700">Estimated consumption (vehicle efficiency {selectedVehicle.fuelEfficiencyKmPerUnit ?? 2} km/unit): <strong>{estimatedConsumption?.toFixed(2)} units</strong></p>
//                   </div>
//                 )} */}
//                 <div className="flex gap-3">
//                   <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create trip"}</Button>
//                   <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
//                 </div>
//                 {errors.fuels && <p className="text-sm text-red-600 mt-2">Provide at least one fuel entry.</p>}
//               </div>
//             </form>
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }
// src/app/admin/trips/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

type FuelRow = { id: string; type: string; qtyGiven: number; fuelCost: number; unit: string };
type TripRow = {
  id: string;
  waybill_no: string;
  atcNo: string;
  loadingPlant: string;
  destination: string;
  despatchDate: string;
  totaldistanceKm?: number | null;
  status: string;
  notes?: string | null;
  vehicle?: { id: string; plateNumber: string; fuelType: string } | null;
  driver?: { id: string; name: string; phone?: string } | null;
  fuels: FuelRow[];
  createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  COMPLETED:   "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
  IN_PROGRESS: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  PLANNED:     "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  CANCELLED:   "bg-red-900/20 text-red-400 border border-red-800/30",
};
const STATUS_ICONS: Record<string, string> = {
  COMPLETED: "✓", IN_PROGRESS: "↻", PLANNED: "◷", CANCELLED: "✕",
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" });

const fmtCurrency = (n: number) =>
  `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

export default function TripsListPage() {
  const router = useRouter();
  const [items, setItems] = useState<TripRow[]>([]);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedQ(q); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: debouncedQ,
        ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/trips?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed");
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedQ, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Summary stats from current page
  const totalFuelCost = items.reduce((s:number, t) => s + t.fuels.reduce((a:number, f) => a + (f.fuelCost ?? 0), 0), 0);
  const totalDistance = items.reduce((s:number, t) => s + (t.totaldistanceKm ?? 0), 0);
  const completedCount = items.filter((t) => t.status === "COMPLETED").length;
  const inProgressCount = items.filter((t) => t.status === "IN_PROGRESS").length;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-base font-bold tracking-wider">Trips</h1>
              <p className="text-xs text-zinc-500 mt-0.5">{total} total trip records</p>
            </div>
            <button
              onClick={() => router.push("/trips/create")}
              className="px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
            >
              + Log Trip
            </button>
          </div>

          {/* Filter bar */}
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">🔍</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search waybill, ATC or destination…"
                className="w-full bg-[#161B22] border border-white/[0.06] rounded-lg pl-7 pr-7 py-1.5 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#C8A96E]/40"
              />
              {q && <button onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">✕</button>}
            </div>
            {["ALL", "PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                  statusFilter === s
                    ? "bg-[#C8A96E] text-[#0D1117]"
                    : "border border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {s === "ALL" ? "All" : `${STATUS_ICONS[s]} ${s.replace("_", " ")}`}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Trips",    value: total,                              icon: "🗺️", accent: "#3E6B8C" },
              { label: "Completed",      value: completedCount,                     icon: "✅", accent: "#5C9669" },
              { label: "In Progress",    value: inProgressCount,                    icon: "↻",  accent: "#C8A96E", alert: inProgressCount > 0 },
              { label: "Distance (km)",  value: Math.round(totalDistance).toLocaleString("en-NG"), icon: "📍", accent: "#7B4E8C" },
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

          {/* Fuel cost summary banner */}
          {totalFuelCost > 0 && (
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl px-5 py-3 flex items-center justify-between">
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Fuel Cost (this page)</span>
              <span className="font-mono text-[#C8A96E] font-bold text-sm">{fmtCurrency(totalFuelCost)}</span>
            </div>
          )}

          {/* ── TABLE ── */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                {items.length} trip{items.length !== 1 ? "s" : ""}
                {statusFilter !== "ALL" ? ` · ${statusFilter.replace("_", " ")}` : ""}
              </span>
              {loading && <div className="w-4 h-4 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin" />}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Waybill / ATC", "Route", "Driver & Truck", "Distance", "Fuel Cost", "Date", "Status", ""].map((h) => (
                      <th key={h} className="text-left py-3 px-5 text-zinc-500 font-semibold uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {items.map((trip, i) => (
                      <React.Fragment key={trip.id}>
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.015 }}
                          className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                          onClick={() => setExpandedId(expandedId === trip.id ? null : trip.id)}
                        >
                          {/* Waybill / ATC */}
                          <td className="py-3.5 px-5">
                            <div className="font-mono text-[#C8A96E] font-semibold">{trip.waybill_no}</div>
                            <div className="text-zinc-600 text-[10px] mt-0.5">{trip.atcNo}</div>
                          </td>

                          {/* Route */}
                          <td className="py-3.5 px-5">
                            <div className="text-zinc-300">{trip.loadingPlant}</div>
                            <div className="flex items-center gap-1 text-zinc-600 text-[10px] mt-0.5">
                              <span>→</span>
                              <span>{trip.destination}</span>
                            </div>
                          </td>

                          {/* Driver & Truck */}
                          <td className="py-3.5 px-5">
                            <div
                              className="text-zinc-300 hover:text-[#C8A96E] transition-colors cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); if (trip.driver) router.push(`/drivers/${trip.driver.id}`); }}
                            >
                              {trip.driver?.name ?? "—"}
                            </div>
                            <div
                              className="font-mono text-zinc-600 text-[10px] mt-0.5 hover:text-[#C8A96E] transition-colors cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); if (trip.vehicle) router.push(`/vehicles/${trip.vehicle.id}`); }}
                            >
                              {trip.vehicle?.plateNumber ?? "—"}
                            </div>
                          </td>

                          {/* Distance */}
                          <td className="py-3.5 px-5 font-mono text-zinc-400">
                            {trip.totaldistanceKm != null ? `${Number(trip.totaldistanceKm).toLocaleString("en-NG")} km` : "—"}
                          </td>

                          {/* Fuel cost */}
                          <td className="py-3.5 px-5 font-mono text-zinc-300">
                            {trip.fuels.length > 0
                              ? fmtCurrency(trip.fuels.reduce((s:number, f) => s + (f.fuelCost ?? 0), 0))
                              : "—"}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-5 text-zinc-500 whitespace-nowrap">{fmt(trip.despatchDate)}</td>

                          {/* Status */}
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[trip.status] ?? "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30"}`}>
                              {STATUS_ICONS[trip.status]} {trip.status.replace("_", " ")}
                            </span>
                          </td>

                          {/* Expand toggle */}
                          <td className="py-3.5 px-5">
                            <button
                              onClick={(e) => { e.stopPropagation(); setExpandedId(expandedId === trip.id ? null : trip.id); }}
                              className="text-zinc-600 hover:text-zinc-300 transition-colors"
                            >
                              {expandedId === trip.id ? "▲" : "▼"}
                            </button>
                          </td>
                        </motion.tr>

                        {/* Expanded row */}
                        <AnimatePresence>
                          {expandedId === trip.id && (
                            <motion.tr
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <td colSpan={8} className="px-5 pb-5 bg-[#0D1117]">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                  {/* Fuel breakdown */}
                                  <div className="bg-[#161B22] rounded-xl p-4 border border-white/[0.04]">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Fuel</p>
                                    {trip.fuels.map((f) => (
                                      <div key={f.id} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                                        <div>
                                          <span className="text-[10px] text-zinc-400">{f.type}</span>
                                          <span className="text-[10px] text-zinc-600 ml-1.5">{f.qtyGiven} {f.unit}</span>
                                        </div>
                                        <span className="font-mono text-[10px] text-[#C8A96E]">{fmtCurrency(f.fuelCost)}</span>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Trip details */}
                                  <div className="bg-[#161B22] rounded-xl p-4 border border-white/[0.04]">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Details</p>
                                    {[
                                      { label: "Waybill", value: trip.waybill_no },
                                      { label: "ATC No", value: trip.atcNo },
                                      { label: "Distance", value: trip.totaldistanceKm ? `${trip.totaldistanceKm} km` : "—" },
                                    ].map((row) => (
                                      <div key={row.label} className="flex justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                                        <span className="text-[10px] text-zinc-600">{row.label}</span>
                                        <span className="text-[10px] text-zinc-300 font-mono">{row.value}</span>
                                      </div>
                                    ))}
                                    {trip.notes && <p className="text-[10px] text-zinc-600 mt-2 italic">"{trip.notes}"</p>}
                                  </div>

                                  {/* Actions */}
                                  <div className="bg-[#161B22] rounded-xl p-4 border border-white/[0.04] flex flex-col gap-2">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Actions</p>
                                    <button
                                      onClick={() => router.push(`/trips/${trip.id}`)}
                                      className="w-full px-3 py-2 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors text-left"
                                    >
                                      View Full Trip →
                                    </button>
                                    <button
                                      onClick={() => router.push(`/trips/update/${trip.id}`)}
                                      className="w-full px-3 py-2 rounded-lg text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors text-left"
                                    >
                                      Edit Trip →
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </AnimatePresence>

                  {!loading && items.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-zinc-600">
                        {q ? `No trips matching "${q}"` : "No trips logged yet"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">Page {page} of {totalPages} · {total} trips</span>
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
