// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";

// import { Truck, Image as ImageIcon, FileText } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import DashboardLayout from "@/components/layout/Dashboard";

// const VehicleSchema = z.object({
//   vin: z.string().optional().nullable(),
//   plateNumber: z.string().min(2, "Plate no required"),
//   cap_no: z.string().min(1, "Capacity number required"),
//   make: z.string().optional().nullable(),
//   model: z.string().optional().nullable(),
//   year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
//   assignDriverId: z.uuid().optional().nullable(),
//   fuelType: z.string().optional().nullable(),
//   vehicleImg: z.string().optional().nullable(),
// });

// type FormValues = z.infer<typeof VehicleSchema>;

// export default function CreateVehiclePage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [drivers, setDrivers] = useState<{ id: string; name: string }[]>([]);
//   const [profileFile, setProfileFile] = useState<File | null>(null);
//   const [profilePreview, setProfilePreview] = useState<string | null>(null);

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(VehicleSchema),
//     defaultValues: {assignDriverId: null}
//   });


//     useEffect(() => {
//       if (profileFile) {
//         const url = URL.createObjectURL(profileFile);
//         setProfilePreview(url);
//         return () => URL.revokeObjectURL(url);
//       } else setProfilePreview(null);
//     }, [profileFile]);
  
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

//   // const asssignDrive = watch("assignDriverId")
//   //   useEffect(() => {
//   //     if (asssignDrive !== null && asssignDrive !== "" ) {
//   //       setValue("asssignDate", new Date().toISOString().slice(0, 10))
//   //       console.log("insid if e show", errors, asssignDrive, watch("asssignDate") )
//   //     }else{
//   //       setValue("asssignDate", null)
//   //       console.log("inside else show", errors, asssignDrive, watch("asssignDate") )
//   //     }
//   //   }, [asssignDrive]);
  
//   //   console.log("insid if e show", errors)

//     async function uploadFile(file: File) {
//     const fd = new FormData();
//     fd.append("file", file);
//     const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
//     if (!res.ok) throw new Error("Upload failed");
//     const json = await res.json();
//     if (!json?.ok || !json?.url) throw new Error("Upload returned no url");
//     return json.url as string;
//   }

//   async function onSubmit(data: FormValues) {
//     console.log("error",errors)
//     setLoading(true);
//     try {

//       // ensure year is number or undefined
//       const payload: any = { ...data };
//       if (payload.year === "" || payload.year == null) delete payload.year;

//       if (profileFile) {
//         const url = await uploadFile(profileFile);
//         payload.vehicleImg = url;
//       }

//       const res = await fetch("/api/vehicles", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.status === 201) {
//         toast.success("Vehicle created");
//         router.push("/vehicles");
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
//               <h2 className="text-xl font-semibold">Vehicle Onboarding</h2>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
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
//                 <Label>VIN </Label>
//                 <Input {...register("vin")} placeholder="VIN" />
//               </div>

//               <div>
//                 <Label>Year </Label>
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
//               </div>

//                <div >
//                 <Label>Fuel Type</Label>
//                 <select {...register("fuelType")} className="w-full border p-2 rounded">
//                   <option value="DIESEL"> Diesel</option>
//                   <option value="PETROL"> Petrol</option>
//                   <option value="CNG">CNG </option>
//                   <option value="OTHER">Others</option>
//                 </select>
//               </div>

//               <div >
//                 <Label>Assign to Driver </Label>
//                 <select {...register("assignDriverId")} className="w-full border p-2 rounded">
//                   <option value="">-- Select driver  --</option>
//                   {drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <Label>Profile image</Label>
//                 <div className="flex items-center gap-3">
//                   <input accept="image/*" type="file" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} />
//                   {profilePreview ? <img src={profilePreview} className="w-16 h-16 object-cover rounded" alt="preview" /> : <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center"><ImageIcon /></div>}
//                 </div>
//               </div>

//               <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create vehicle"}</Button>
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


// src/app/admin/vehicles/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// const VehicleSchema = z.object({
//   vin: z.string().optional().nullable(),
//   plateNumber: z.string().min(2, "Plate no required"),
//   cap_no: z.string().min(1, "Capacity number required"),
//   make: z.string().optional().nullable(),
//   model: z.string().optional().nullable(),
//   year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
//   assignDriverId: z.uuid().optional().nullable(),
//   fuelType: z.string().optional().nullable(),
//   vehicleImg: z.string().optional().nullable(),
// });

const VehicleSchema = z.object({
  vin: z.string().min(1).optional().nullable(),
  plateNumber: z.string().min(2, "Plate number is required"),
  cap_no: z.string().min(1, "CAP number is required"),
  make: z.string().optional().nullable(),
  model: z.string().optional().nullable(),
  year: z
    .number()
    .int()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear() + 1, "Year is too far ahead")
    .optional()
    .nullable(),
  fuelType:  z.string().optional().nullable(),//z.enum(["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"]).default("DIESEL"),
  fuelEfficiencyKmPerUnit: z.number().optional().nullable(),
  assignDriverId: z.uuid().optional().nullable(),
  vehicleImg: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof VehicleSchema>;

type Driver = { id: string; name: string; phone?: string; licenseNo?: string };

// ─── Reusable field helpers ──────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
  hint,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
        error
          ? "border-red-700/60 focus:border-red-500"
          : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    />
  );
}

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

// ─── Fuel type cards ─────────────────────────────────────────────────────────
const FUEL_TYPES = [
  { value: "DIESEL",   label: "Diesel",   icon: "⛽", color: "#C8A96E", desc: "Standard diesel engine" },
  { value: "PETROL",   label: "Petrol",   icon: "🔴", color: "#3E6B8C", desc: "Petrol / gasoline" },
  { value: "CNG",      label: "CNG",      icon: "💨", color: "#5C9669", desc: "Compressed natural gas" },
  { value: "ELECTRIC", label: "Electric", icon: "⚡", color: "#7B4E8C", desc: "Battery electric vehicle" },
  { value: "OTHER",    label: "Other",    icon: "🔧", color: "#8C5E3E", desc: "Hybrid or other fuel" },
];

export default function CreateVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driversLoading, setDriversLoading] = useState(true);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(VehicleSchema),
    defaultValues: {
      assignDriverId: null,
      fuelEfficiencyKmPerUnit:null
    },
  });

  const selectedFuel = watch("fuelType") ?? "DIESEL";
  const selectedDriverId = watch("assignDriverId");

  // Image preview
  useEffect(() => {
    if (!profileFile) { setProfilePreview(null); return; }
    const url = URL.createObjectURL(profileFile);
    setProfilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profileFile]);

  // Load unassigned drivers
  useEffect(() => {
    async function loadDrivers() {
      setDriversLoading(true);
      try {
        const res = await fetch("/api/auth/users/driver/list-no-vehicles?available=true");
        const json = await res.json();
        if (res.ok && json?.drivers) setDrivers(json.drivers);
      } catch {
        // non-critical: form still works without drivers
      } finally {
        setDriversLoading(false);
      }
    }
    loadDrivers();
  }, []);

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Image upload failed");
    const json = await res.json();
    if (!json?.ok || !json?.url) throw new Error("Upload returned no URL");
    return json.url as string;
  }

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const payload: any = { ...data };

      // Clean up empty optional fields
      if (!payload.year) delete payload.year;
      if (!payload.vin || payload.vin.trim() === "") delete payload.vin;
      if (!payload.assignDriverId) delete payload.assignDriverId;
      if (!payload.fuelEfficiencyKmPerUnit) delete payload.fuelEfficiencyKmPerUnit;

      // Upload image if selected
      if (profileFile) {
        payload.vehicleImg = await uploadFile(profileFile);
      }

      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.status === 201) {
        toast.success("Vehicle created successfully");
        router.push("/vehicles");
        return;
      }
      if (res.status === 409) {
        toast.error(json?.message ?? "A vehicle with those details already exists");
        return;
      }
      toast.error(json?.message ?? "Failed to create vehicle");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setLoading(false);
    }
  }

  const selectedDriver = drivers.find((d) => d.id === selectedDriverId);

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div
        className="min-h-screen bg-[#0D1117] text-white"
        style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-zinc-500 hover:text-white transition-colors text-lg"
            >
              ←
            </button>
            <div>
              <h1 className="text-base font-bold tracking-wider">Vehicle Onboarding</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Add a new truck to the fleet</p>
            </div>
          </div>
        </div>

        {/* ── FORM ── */}
        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* ── Section 1: Vehicle Image ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vehicle Photo</h2>
              <div className="flex items-center gap-5">
                <div className="relative group flex-shrink-0">
                  <div
                    className="w-24 h-24 rounded-xl border-2 border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundImage: profilePreview ? `url(${profilePreview})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!profilePreview && <span className="text-4xl">🚛</span>}
                  </div>
                  <label className="absolute inset-0 rounded-xl cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-semibold">UPLOAD</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-zinc-300 font-medium">Truck photo</p>
                  <p className="text-[11px] text-zinc-600">
                    Hover over the image to upload. PNG or JPG recommended.
                  </p>
                  {profilePreview && (
                    <button
                      type="button"
                      onClick={() => { setProfilePreview(null); setProfileFile(null); }}
                      className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section 2: Identity ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Vehicle Identity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Plate Number" error={errors.plateNumber?.message} required>
                  <TextInput
                    {...register("plateNumber")}
                    placeholder="e.g. ABC-123-XY"
                    error={!!errors.plateNumber}
                  />
                </Field>

                <Field label="CAP Number" error={errors.cap_no?.message} required>
                  <TextInput
                    {...register("cap_no")}
                    placeholder="e.g. OG/001"
                    error={!!errors.cap_no}
                  />
                </Field>

                <Field label="VIN" hint="Optional — Vehicle Identification Number">
                  <TextInput
                    {...register("vin")}
                    placeholder="17-character VIN"
                    maxLength={17}
                  />
                </Field>

                <Field label="Year" error={errors.year?.message}>
                  <TextInput
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    placeholder={`e.g. ${new Date().getFullYear()}`}
                    min={1900}
                    max={new Date().getFullYear() + 1}
                    error={!!errors.year}
                  />
                </Field>

                <Field label="Make" hint="Manufacturer name">
                  <TextInput {...register("make")} placeholder="e.g. MAN, DAF, Volvo" />
                </Field>

                <Field label="Model">
                  <TextInput {...register("model")} placeholder="e.g. TGS 33.480" />
                </Field>
              </div>
            </div>

            {/* ── Section 3: Fuel Type ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Fuel Configuration</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FUEL_TYPES.map((f) => {
                  const isSelected = selectedFuel === f.value;
                  return (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setValue("fuelType", f.value as any)}
                      className={`relative text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "border-[#C8A96E]/50 bg-[#C8A96E]/5"
                          : "border-white/[0.06] hover:border-white/10 bg-[#0D1117]"
                      }`}
                    >
                      {isSelected && (
                        <div
                          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                          style={{ background: f.color }}
                        />
                      )}
                      <div className="text-lg mb-1">{f.icon}</div>
                      <div
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: isSelected ? f.color : "#71717a" }}
                      >
                        {f.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              {/* Hidden select for react-hook-form */}
              <select {...register("fuelType")} className="hidden">
                {FUEL_TYPES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>

              <Field
                label="Fuel Efficiency (km/L)"
                error={errors.fuelEfficiencyKmPerUnit?.message}
                hint="Optional — used to estimate fuel consumption per trip"
              >
                <TextInput
                  type="number"
                  step="0.1"
                  {...register("fuelEfficiencyKmPerUnit", { valueAsNumber: true })}
                  placeholder="e.g. 2.5"
                  error={!!errors.fuelEfficiencyKmPerUnit}
                />
              </Field>
            </div>

            {/* ── Section 4: Driver Assignment ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Driver Assignment</h2>
                <span className="text-[10px] text-zinc-600">Optional — can be assigned later</span>
              </div>

              <Field
                label="Assign to Driver"
                hint={driversLoading ? "Loading available drivers…" : `${drivers.length} unassigned driver(s) available`}
              >
                <SelectInput
                  {...register("assignDriverId")}
                  disabled={driversLoading}
                >
                  <option value="">— No driver assigned yet —</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}{d.phone ? ` · ${d.phone}` : ""}{d.licenseNo ? ` · ${d.licenseNo}` : ""}
                    </option>
                  ))}
                </SelectInput>
              </Field>

              {/* Selected driver preview */}
              {selectedDriver && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-[#0D1117] rounded-lg px-3 py-2.5 border border-[#5C9669]/30"
                >
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-xs font-medium text-emerald-400">{selectedDriver.name}</div>
                    <div className="text-[10px] text-zinc-500">
                      Will be assigned when vehicle is created
                      {selectedDriver.phone && ` · ${selectedDriver.phone}`}
                    </div>
                  </div>
                </motion.div>
              )}

              {drivers.length === 0 && !driversLoading && (
                <div className="flex items-center gap-2 text-[10px] text-zinc-600 bg-[#0D1117] rounded-lg px-3 py-2.5 border border-white/[0.04]">
                  <span>ℹ️</span> No unassigned drivers available. You can assign a driver later from the vehicle detail page.
                </div>
              )}
            </div>

            {/* ── Actions ── */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? "Creating…" : "Create Vehicle"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
