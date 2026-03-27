// src/app/admin/vehicles/edit/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

// ─── Constants ────────────────────────────────────────────────────────────────
const FUEL_TYPES = [
  { value: "DIESEL",   label: "Diesel",   icon: "⛽", color: "#B8860B", desc: "Standard diesel engine" },
  { value: "PETROL",   label: "Petrol",   icon: "🔴", color: "#3E6B8C", desc: "Petrol / gasoline" },
  { value: "CNG",      label: "CNG",      icon: "💨", color: "#5C9669", desc: "Compressed natural gas" },
  { value: "ELECTRIC", label: "Electric", icon: "⚡", color: "#7B4E8C", desc: "Battery electric vehicle" },
  { value: "OTHER",    label: "Other",    icon: "🔧", color: "#8C5E3E", desc: "Hybrid or other fuel" },
] as const;

// ─── Schema ───────────────────────────────────────────────────────────────────
const EditVehicleSchema = z.object({
  vin:                     z.string().min(1).optional().nullable(),
  plateNumber:             z.string().min(2, "Plate number is required"),
  cap_no:                  z.string().min(1, "CAP number is required"),
  make:                    z.string().optional().nullable(),
  model:                   z.string().optional().nullable(),
  year:                    z.number().int().min(1900).max(new Date().getFullYear() + 1).optional().nullable(),
  fuelType:                z.enum(["DIESEL", "PETROL", "CNG", "ELECTRIC", "OTHER"]),
  fuelEfficiencyKmPerUnit: z.number().positive().optional().nullable(),
  vehicleImg:              z.string().optional().nullable(),
});

type FormValues = z.infer<typeof EditVehicleSchema>;

type Vehicle = {
  id: string;
  vin?: string | null;
  plateNumber: string;
  cap_no: string;
  make?: string | null;
  model?: string | null;
  year?: number | null;
  fuelType: string;
  fuelEfficiencyKmPerUnit?: number | null;
  vehicleImg?: string | null;
  currentOdo?: number | null;
  driverId?: string | null;
  driver?: { id: string; name: string; phone?: string | null; profileImage?: string | null } | null;
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────
function Field({ label, error, children, hint, required }: {
  label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9C9590]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint  && !error && <p className="text-[10px] text-[#9C9590]">{hint}</p>}
      {error &&           <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#F8F6F1] border rounded-lg px-3 py-2.5 text-xs text-[#1C1917]
        placeholder-[#B0AAA4] focus:outline-none transition-colors
        ${error
          ? "border-red-700/60 focus:border-red-500"
          : "border-[#E8E2D9] focus:border-[#B8860B]/50"}`}
    />
  );
}

function ReadField({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9C9590]">{label}</p>
      <div className="w-full bg-[#F8F6F1]/60 border border-[#EDE8E0] rounded-lg px-3 py-2.5 text-xs font-mono font-bold text-[#6B6560]">
        {value}
      </div>
      {sub && <p className="text-[10px] text-[#9C9590]">{sub}</p>}
    </div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-white/[0.04] animate-pulse rounded-lg ${className}`} />;
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function EditVehiclePage() {
  const router    = useRouter();
  const params    = useParams<{ id: string }>();
  const vehicleId = params.id;

  const [fetching,       setFetching]       = useState(true);
  const [saving,         setSaving]         = useState(false);
  const [vehicle,        setVehicle]        = useState<Vehicle | null>(null);
  const [notFound,       setNotFound]       = useState(false);
  const [profileFile,    setProfileFile]    = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(EditVehicleSchema) });

  const selectedFuel = watch("fuelType");

  // Image preview
  useEffect(() => {
    if (!profileFile) { setProfilePreview(null); return; }
    const url = URL.createObjectURL(profileFile);
    setProfilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profileFile]);

  // ── Fetch vehicle ────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/vehicles/${vehicleId}`);
        if (res.status === 404) { setNotFound(true); return; }
        const json = await res.json();
        if (!res.ok) { setNotFound(true); return; }

        const v: Vehicle = json.vehicle;
        setVehicle(v);

        reset({
          vin:                     v.vin                     ?? null,
          plateNumber:             v.plateNumber,
          cap_no:                  v.cap_no,
          make:                    v.make                    ?? null,
          model:                   v.model                   ?? null,
          year:                    v.year                    ?? null,
          fuelType:                v.fuelType                as any,
          fuelEfficiencyKmPerUnit: v.fuelEfficiencyKmPerUnit ?? null,
          vehicleImg:              v.vehicleImg              ?? null,
        });
      } catch {
        toast.error("Failed to load vehicle");
      } finally {
        setFetching(false);
      }
    })();
  }, [vehicleId]);

  // ── Upload image helper ──────────────────────────────────────────────────────
  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Image upload failed");
    const json = await res.json();
    if (!json?.ok || !json?.url) throw new Error("Upload returned no URL");
    return json.url as string;
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    setSaving(true);
    try {
      const payload: any = { ...data };

      // Upload new image if one was selected
      if (profileFile) {
        payload.vehicleImg = await uploadFile(profileFile);
      }

      // Clean empty optional fields
      if (!payload.vin?.trim())                 delete payload.vin;
      if (!payload.year)                         delete payload.year;
      if (!payload.fuelEfficiencyKmPerUnit)      delete payload.fuelEfficiencyKmPerUnit;

      const res  = await fetch(`/api/vehicles/${vehicleId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Vehicle updated");
        if (json.vehicle) setVehicle(prev => ({ ...prev!, ...json.vehicle }));
        router.push(`/vehicles/${vehicleId}`);
        return;
      }
      toast.error(json?.message ?? "Failed to update vehicle");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
    } finally {
      setSaving(false);
    }
  }

  // ── Not found ────────────────────────────────────────────────────────────────
  if (notFound) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center"
          style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="text-center space-y-3">
            <p className="text-4xl">🚛</p>
            <p className="text-[#2C2825] text-sm font-bold">Vehicle not found</p>
            <p className="text-[#9C9590] text-xs">It may have been deleted or never existed.</p>
            <button onClick={() => router.push("/vehicles")}
              className="mt-4 px-4 py-2 rounded-lg bg-[#B8860B] text-[#0D1117] text-xs font-bold">
              Back to Vehicles
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ── Loading skeleton ──────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#F8F6F1]" style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>
          <div className="border-b border-[#E8E2D9] px-6 py-4 max-w-3xl mx-auto flex items-center gap-4">
            <Skeleton className="w-6 h-6" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-5">
            {[120, 200, 180, 160, 120].map((h, i) => (
              <Skeleton key={i} className="w-full rounded-xl"  />
              //style={{ height: h } as any}
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const currentImg = profilePreview ?? vehicle?.vehicleImg ?? null;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#F8F6F1] text-[#1C1917]"
        style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}>

        {/* ── Sticky header ─────────────────────────────────────────────────── */}
        <div className="border-b border-[#E8E2D9] bg-[#F8F6F1]/90 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()}
              className="text-[#9C9590] hover:text-[#1C1917] transition-colors text-lg leading-none">←</button>
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold tracking-wider truncate">Edit Vehicle</h1>
              <p className="text-[10px] text-[#9C9590] mt-0.5 truncate">
                {vehicle?.plateNumber} · {vehicle?.cap_no}
                {vehicle?.make && ` · ${[vehicle.make, vehicle.model].filter(Boolean).join(" ")}`}
              </p>
            </div>
            {/* Fuel type badge */}
            {selectedFuel && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFuel}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D9]
                    bg-white text-[10px] font-bold uppercase tracking-wider text-[#6B6560]"
                >
                  {FUEL_TYPES.find(f => f.value === selectedFuel)?.icon ?? "⛽"} {selectedFuel}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* ── Section 1: Vehicle Photo ─────────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560] mb-4">Vehicle Photo</h2>
              <div className="flex items-center gap-5">
                {/* Preview */}
                <label className="relative w-20 h-20 rounded-xl border border-white/[0.08] bg-[#F8F6F1]
                  flex items-center justify-center cursor-pointer overflow-hidden group flex-shrink-0">
                  {currentImg ? (
                    <img src={currentImg} alt="Vehicle" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">🚛</span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                    transition-opacity flex items-center justify-center">
                    <span className="text-[9px] text-[#1C1917] font-bold tracking-widest uppercase">Change</span>
                  </div>
                  <input
                    type="file" accept="image/*" className="hidden"
                    onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-[#2C2825] font-medium">Truck photo</p>
                  <p className="text-[10px] text-[#9C9590]">Click the image to upload a new photo. PNG or JPG recommended.</p>
                  {profilePreview && (
                    <button type="button"
                      onClick={() => { setProfilePreview(null); setProfileFile(null); }}
                      className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                      ✕ Remove new photo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section 2: Vehicle Identity ──────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Vehicle Identity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Plate Number" required error={errors.plateNumber?.message}>
                  <TextInput
                    {...register("plateNumber")}
                    placeholder="e.g. ABC-123-XY"
                    error={!!errors.plateNumber}
                  />
                </Field>
                <Field label="CAP Number" required error={errors.cap_no?.message}>
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

            {/* ── Section 3: Fuel Configuration ───────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Fuel Configuration</h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FUEL_TYPES.map((f) => {
                  const isSelected = selectedFuel === f.value;
                  return (
                    <button
                      key={f.value} type="button"
                      onClick={() => setValue("fuelType", f.value, { shouldDirty: true })}
                      className={`relative text-left p-3 rounded-xl border transition-all
                        ${isSelected
                          ? "border-[#B8860B]/50 bg-[#B8860B]/5"
                          : "border-[#E8E2D9] hover:border-white/10 bg-[#F8F6F1]"}`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="fuel-highlight"
                          className="absolute inset-0 rounded-xl border border-[#B8860B]/30 bg-[#B8860B]/5"
                        />
                      )}
                      <div className="relative">
                        {isSelected && (
                          <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full"
                            style={{ background: f.color }} />
                        )}
                        <div className="text-lg mb-1">{f.icon}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: isSelected ? f.color : "#71717a" }}>
                          {f.label}
                        </div>
                        <div className="text-[9px] text-[#9C9590] mt-0.5 leading-tight">{f.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {/* Hidden select for react-hook-form registration */}
              <select {...register("fuelType")} className="hidden">
                {FUEL_TYPES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>

              <Field
                label="Fuel Efficiency (km/L)"
                error={errors.fuelEfficiencyKmPerUnit?.message}
                hint="Used to estimate fuel consumption per trip"
              >
                <TextInput
                  type="number" step="0.1"
                  {...register("fuelEfficiencyKmPerUnit", { valueAsNumber: true })}
                  placeholder="e.g. 2.5"
                  error={!!errors.fuelEfficiencyKmPerUnit}
                />
              </Field>
            </div>

            {/* ── Section 4: Read-only context ─────────────────────────── */}
            <div className="bg-white border border-[#E8E2D9] rounded-xl p-6 space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#6B6560]">Fleet Context</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ReadField
                  label="Odometer"
                  value={vehicle?.currentOdo != null
                    ? `${Number(vehicle.currentOdo).toLocaleString("en-NG")} km`
                    : "Not recorded"}
                  sub="Updated automatically by trips"
                />
                <ReadField
                  label="Assigned Driver"
                  value={vehicle?.driver?.name ?? "No driver assigned"}
                  sub={vehicle?.driver?.phone ?? "Use Assign page to change driver"}
                />
                <ReadField
                  label="Vehicle ID"
                  value={vehicleId.slice(0, 16) + "…"}
                  sub="Internal database ID"
                />
              </div>
              <div className="flex items-center gap-2 bg-[#F8F6F1]/60 border border-[#EDE8E0] rounded-lg px-4 py-2.5">
                <span className="text-[10px]">ℹ️</span>
                <p className="text-[10px] text-[#9C9590]">
                  To change the driver assignment, use the{" "}
                  <button type="button" onClick={() => router.push(`/vehicles/update/${vehicleId}`)}
                    className="text-[#B8860B] hover:underline">
                    Assign Driver
                  </button>{" "}
                  page. Odometer is updated automatically from trip records.
                </p>
              </div>
            </div>

            {/* ── Actions ──────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-10">
              <button
                type="submit"
                disabled={saving || (!isDirty && !profileFile)}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#B8860B] text-[#0D1117] font-bold
                  hover:bg-[#C9960D] transition-colors disabled:opacity-40 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                )}
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button" onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-[#E8E2D9] text-[#6B6560]
                  hover:text-[#1C1917] transition-colors"
              >
                Cancel
              </button>
              {!isDirty && !profileFile && (
                <span className="text-[10px] text-[#9C9590] ml-1">No changes yet</span>
              )}
            </div>

          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
