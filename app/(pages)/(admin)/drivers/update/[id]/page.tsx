// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { User, Image as ImageIcon, FileText } from "lucide-react";
// import { Label } from "@/components/ui/label";
// import DashboardLayout from "@/components/layout/Dashboard";
// import  DateField  from "@/components/DateInpute";

// const formSchema = z.object({
//   name: z.string().min(2),
//   phone: z.string().min(10),
//   address: z.string().optional(),
//   profileImage: z.string().optional(),
//   licenseNo: z.string().optional().nullable(),
//   licenseImage: z.string().optional().nullable(),
//   licenseExp: z.iso.datetime("Use the calendar to pick a date"),
//   accountName: z.string().optional().nullable(),
//   accountNumber: z.string().optional().nullable(),
//   bank: z.string().optional().nullable(),
//   guarantorForm: z.string().optional().nullable(),
// });
// type FormValues = z.infer<typeof formSchema>;

// export default function EditDriverPage() {
//     const { id } = useParams() as { id: string };
//   const router = useRouter();
//       // track local files for preview + eventual upload
//       const [profileFile, setProfileFile] = useState<File | null>(null);
//       const [licenseFile, setLicenseFile] = useState<File | null>(null);
//       const [guarantorFile, setGuarantorFile] = useState<File | null>(null);
//       const [fingerprintFile, setFingerprintFile] = useState<File | null>(null);
//        const [loading, setLoading] = useState(false);
    
//       const [profilePreview, setProfilePreview] = useState<string | null>(null);
//       const [licensePreview, setLicensePreview] = useState<string | null>(null);
//   const { register, handleSubmit,setValue, reset, watch, formState: { errors } } = useForm({
//     resolver: zodResolver(formSchema),
//   });

//   const watched = watch();

//     async function load() {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/auth/users/driver/${id}`);
//         const json = await res.json();
//         console.log("drivers",json)
//         if (!res.ok) throw new Error(json?.message || "Failed");

//         reset(json?.data?.driver)
//       } catch (err:any) {
//         console.error(err);
//         toast.error(err?.message || "Failed to load users");
//       } finally { setLoading(false); }
//     }
  
//     useEffect(()=>{ load() }, [id]);
  
//     useEffect(() => {
//       if (profileFile) {
//         const url = URL.createObjectURL(profileFile);
//         setProfilePreview(url);
//         return () => URL.revokeObjectURL(url);
//       } else setProfilePreview(null);
//     }, [profileFile]);
  
//     useEffect(() => {
//       if (licenseFile) {
//         const url = URL.createObjectURL(licenseFile);
//         setLicensePreview(url);
//         return () => URL.revokeObjectURL(url);
//       } else setLicensePreview(null);
//     }, [licenseFile]);
  
//     async function uploadFile(file: File) {
//       const fd = new FormData();
//       fd.append("file", file);
//       const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
//       if (!res.ok) throw new Error("Upload failed");
//       const json = await res.json();
//       if (!json?.ok || !json?.url) throw new Error("Upload returned no url");
//       return json.url as string;
//     }

//   async function onSubmit(values:FormValues) {
//     console.log("name it updating")
//     try{
//       // upload files sequentially (can be parallelized)
//       if (profileFile) {
//         const url = await uploadFile(profileFile);
//         values.profileImage = url;
//       }
//       if (licenseFile) {
//         const url = await uploadFile(licenseFile);
//         values.licenseImage = url;
//       }
//       if (guarantorFile) {
//         const url = await uploadFile(guarantorFile);
//         values.guarantorForm = url;
//       }
//     }catch (err: any) {
//       console.error(err);
//       toast.error(err?.message || "Upload or server error");
//     } finally {
//       setLoading(false);
//     }
//     await fetch(`/api/auth/users/driver/${id}`, {
//       method: "PATCH",
//       body: JSON.stringify(values),
//     });

//     alert("Driver updated successfully!");
//     window.location.href = `/drivers/`;
//   }

//   console.log("name it updating", errors)
//   return (
//     <>
//     <DashboardLayout>
//       <Toaster />
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-3xl">
//           <Card className="p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <User className="text-blue-600" />
//               <h2 className="text-xl font-semibold">Update Driver Detail</h2>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="col-span-1 md:col-span-2">
//                 <Label>Name</Label>
//                 <Input {...register("name")} placeholder="Full name" />
//                 {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
//               </div>

//               <div>
//                 <Label>Phone</Label>
//                 <Input {...register("phone")} placeholder="+234..." />
//                 {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
//               </div>

//               <div>
//                 <Label>Address</Label>
//                 <Input {...register("address")} placeholder="Home address" />
//                 {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>}
//               </div>

//               <div>
//                 <Label>Account name</Label>
//                 <Input {...register("accountName")} placeholder="Account name" />
//               </div>

//               <div>
//                 <Label>Account number</Label>
//                 <Input {...register("accountNumber")} placeholder="0123456789" />
//               </div>

//               <div>
//                 <Label>Bank</Label>
//                 <Input {...register("bank")} placeholder="Bank name" />
//               </div>

//                 {/* <div>
//                 <Label>License expire Date</Label>
//                 <Input {...register("licenseExp")} placeholder="License no (optional)" />
//                 </div> */}



//               {/* License */}
//               <div>
//                 <Label>License number</Label>
//                 <Input {...register("licenseNo")} placeholder="License no (optional)" />
//               </div>
//               <div>
//                 <Label className="mt-2">License image</Label>
//                 <div className="flex items-center gap-3">
//                   <input accept="image/*,application/pdf" type="file" onChange={(e) => setLicenseFile(e.target.files?.[0] ?? null)} />
//                   {licensePreview ? <img src={licensePreview} className="w-16 h-16 object-cover rounded" alt="license" /> : <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center"><FileText /></div>}
//                 </div>
//               </div>

//                     <div>
//                     <DateField
//                     label="Licesnse Expiring Date"
//                     value={watched.licenseExp}
//                     onSelectISO={(iso) => setValue(`licenseExp` as const, iso, { shouldValidate: true })}
//                     />
//                     {errors.licenseExp && (
//                     <p className="text-sm text-red-600 mt-1">
//                     {errors.licenseExp.message}
//                     </p>
//                   )}
//               </div>

//               {/* Profile image */}
//               <div>
//                 <Label>Profile image</Label>
//                 <div className="flex items-center gap-3">
//                   <input accept="image/*" type="file" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} />
//                   {profilePreview ? <img src={profilePreview} className="w-16 h-16 object-cover rounded" alt="preview" /> : <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center"><ImageIcon /></div>}
//                 </div>
//               </div>

//               {/* Guarantor form */}
//               <div >
//                 <Label>Guarantor form (image/pdf)</Label>
//                 <input accept="image/*,application/pdf" type="file" onChange={(e) => setGuarantorFile(e.target.files?.[0] ?? null)} />
//               </div>

//               <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>{loading ? "updating..." : "Update driver"}</Button>
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

// src/app/admin/drivers/update/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";
import DateField from "@/components/DateInpute";

const EditDriverSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional().nullable(),
  address: z.string().min(5, "Address is required"),
  profileImage: z.string().optional().nullable(),
  licenseNo: z.string().optional().nullable(),
  licenseImage: z.string().optional().nullable(),
  licenseExp: z.string().min(1, "License expiry date is required"),
  accountName: z.string().optional().nullable(),
  accountNumber: z.string().optional().nullable(),
  bank: z.string().optional().nullable(),
  guarantorForm: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof EditDriverSchema>;

// ─── Reusable helpers (same pattern as create page) ──────────────────────────
function Field({
  label, error, children, hint, required,
}: {
  label: string; error?: string; children: React.ReactNode; hint?: string; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {error && <p className="text-[10px] text-red-400">{error}</p>}
    </div>
  );
}

function TextInput({
  error, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
        error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    />
  );
}

function TextArea({
  error, ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      {...props}
      rows={3}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
        error ? "border-red-700/60 focus:border-red-500" : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    />
  );
}

function FileTile({
  label, icon, preview, accept, onFile, onRemove, hint,
}: {
  label: string; icon: string; preview?: string | null; accept: string;
  onFile: (f: File) => void; onRemove: () => void; hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</label>
      <div className="relative group">
        <div
          className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden transition-colors group-hover:border-[#C8A96E]/40"
          style={preview ? {
            backgroundImage: `url(${preview})`,
            backgroundSize: "cover", backgroundPosition: "center",
            borderStyle: "solid", borderColor: "rgba(200,169,110,0.3)",
          } : undefined}
        >
          {!preview && (
            <div className="text-center pointer-events-none">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-[10px] text-zinc-600">Click to upload new file</p>
            </div>
          )}
        </div>
        <label className="absolute inset-0 cursor-pointer rounded-xl">
          <input type="file" accept={accept} className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
          />
        </label>
      </div>
      {hint && <p className="text-[10px] text-zinc-600">{hint}</p>}
      {preview && (
        <button type="button" onClick={onRemove} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
          Remove
        </button>
      )}
    </div>
  );
}

// License status helper
function licensePill(exp?: string | null) {
  if (!exp) return null;
  const daysLeft = Math.ceil((new Date(exp).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-900/30 text-red-400 border border-red-700/40">✕ Expired {Math.abs(daysLeft)}d ago</span>;
  if (daysLeft <= 30)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/30 text-amber-400 border border-amber-700/40 animate-pulse">⚠ Expires in {daysLeft}d</span>;
  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30">✓ Valid</span>;
}

export default function EditDriverPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [guarantorFile, setGuarantorFile] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [existingProfile, setExistingProfile] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [guarantorPreview, setGuarantorPreview] = useState<string | null>(null);

  const [driverMeta, setDriverMeta] = useState<{ createdAt?: string; updatedAt?: string } | null>(null);

  const {
    register, handleSubmit, setValue, reset, watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ resolver: zodResolver(EditDriverSchema) });

  const watched = watch();

  // ── Load driver ───────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/auth/users/driver/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed to load driver");

      const d = json?.data?.driver ?? json?.driver ?? json;
      reset({
        name:          d.name         ?? "",
        phone:         d.phone        ?? "",
        address:       d.address      ?? "",
        licenseNo:     d.licenseNo    ?? "",
        licenseExp:    d.licenseExp   ? new Date(d.licenseExp).toISOString() : "",
        accountName:   d.accountName  ?? "",
        accountNumber: d.accountNumber ?? "",
        bank:          d.bank         ?? "",
        notes:         d.notes        ?? "",
      });
      setExistingProfile(d.profileImage ?? null);
      setDriverMeta({ createdAt: d.createdAt, updatedAt: d.updatedAt });
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load driver");
    } finally {
      setFetchLoading(false);
    }
  }, [id, reset]);

  useEffect(() => { load(); }, [load]);

  // ── Previews ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!profileFile) { setProfilePreview(null); return; }
    const url = URL.createObjectURL(profileFile);
    setProfilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [profileFile]);

  useEffect(() => {
    if (!licenseFile) { setLicensePreview(null); return; }
    const url = URL.createObjectURL(licenseFile);
    setLicensePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [licenseFile]);

  useEffect(() => {
    if (!guarantorFile) { setGuarantorPreview(null); return; }
    const url = URL.createObjectURL(guarantorFile);
    setGuarantorPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [guarantorFile]);

  // ── Upload helper ─────────────────────────────────────────────────────────
  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    if (!json?.ok || !json?.url) throw new Error("Upload returned no URL");
    return json.url as string;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function onSubmit(values: FormValues) {
    setSubmitLoading(true);
    try {
      // Upload files in parallel
      const [profileUrl, licenseUrl, guarantorUrl] = await Promise.all([
        profileFile   ? uploadFile(profileFile)   : Promise.resolve(null),
        licenseFile   ? uploadFile(licenseFile)   : Promise.resolve(null),
        guarantorFile ? uploadFile(guarantorFile) : Promise.resolve(null),
      ]);

      if (profileUrl)   values.profileImage  = profileUrl;
      if (licenseUrl)   values.licenseImage  = licenseUrl;
      if (guarantorUrl) values.guarantorForm = guarantorUrl;

      const res = await fetch(`/api/auth/users/driver/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Driver updated successfully");
        router.push(`/drivers/${id}`);
        return;
      }
      toast.error(json?.message ?? "Update failed");
    } catch (err: any) {
      toast.error(err?.message ?? "Upload or server error");
    } finally {
      setSubmitLoading(false);
    }
  }

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (fetchLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
          <div className="space-y-3 text-center">
            <div className="w-10 h-10 border-2 border-[#C8A96E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-zinc-500 text-sm tracking-wider">LOADING DRIVER</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const displayImage = profilePreview ?? existingProfile;
  const licenseExpValue = watched.licenseExp;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
              <div>
                <h1 className="text-base font-bold tracking-wider">Edit Driver</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {watched.name || "Driver"}
                  {driverMeta?.updatedAt && (
                    <span> · Last updated {new Date(driverMeta.updatedAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Live license status badge */}
              {licenseExpValue && licensePill(licenseExpValue)}
              <button
                onClick={() => router.push(`/drivers/${id}`)}
                className="px-3 py-1.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              >
                View Profile →
              </button>
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
            {/* ── Section 1: Photo + personal info ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Personal Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative group flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full border-2 border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden"
                    style={displayImage ? { backgroundImage: `url(${displayImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                  >
                    {!displayImage && (
                      <span className="text-zinc-600 text-3xl font-bold">
                        {watched.name?.[0]?.toUpperCase() ?? "👤"}
                      </span>
                    )}
                  </div>
                  <label className="absolute inset-0 rounded-full cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-semibold">CHANGE</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-zinc-300 font-medium">Profile photo</p>
                  <p className="text-[11px] text-zinc-600">Hover to upload a new photo. PNG or JPG recommended.</p>
                  <div className="flex gap-3">
                    {profilePreview && (
                      <button type="button" onClick={() => { setProfilePreview(null); setProfileFile(null); }} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                        Discard new photo
                      </button>
                    )}
                    {existingProfile && !profilePreview && (
                      <button type="button" onClick={() => setExistingProfile(null)} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                        Remove photo
                      </button>
                    )}
                  </div>
                  {driverMeta?.createdAt && (
                    <p className="text-[10px] text-zinc-600">
                      Registered {new Date(driverMeta.createdAt).toLocaleDateString("en-NG", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </div>

              <Field label="Full Name" error={errors.name?.message} required>
                <TextInput {...register("name")} placeholder="e.g. Ahmed Musa" error={!!errors.name} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Phone Number" error={errors.phone?.message}>
                  <TextInput {...register("phone")} placeholder="+234 800 000 0000" error={!!errors.phone} />
                </Field>
                <Field label="Address" error={errors.address?.message} required>
                  <TextInput {...register("address")} placeholder="Home address" error={!!errors.address} />
                </Field>
              </div>

              <Field label="Notes" hint="Optional — additional notes about this driver">
                <TextArea {...register("notes")} placeholder="Any relevant notes…" />
              </Field>
            </div>

            {/* ── Section 2: License ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Driver's License</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="License Number">
                  <TextInput {...register("licenseNo")} placeholder="e.g. LN-00123456" />
                </Field>

                <div>
                  <DateField
                    label="License Expiry Date"
                    value={watched.licenseExp}
                    onSelectISO={(iso) => setValue("licenseExp", iso, { shouldValidate: true })}
                  />
                  {errors.licenseExp && (
                    <p className="text-[10px] text-red-400 mt-1">{errors.licenseExp.message}</p>
                  )}
                  {/* Live expiry status */}
                  {licenseExpValue && (
                    <div className="mt-1.5">{licensePill(licenseExpValue)}</div>
                  )}
                </div>
              </div>

              <FileTile
                label="License Image"
                icon="🪪"
                preview={licensePreview}
                accept="image/*,application/pdf"
                onFile={setLicenseFile}
                onRemove={() => { setLicensePreview(null); setLicenseFile(null); }}
                hint="Upload a new photo or scan of the driver's license (replaces existing)"
              />
            </div>

            {/* ── Section 3: Bank details ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Bank Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Bank Name">
                  <TextInput {...register("bank")} placeholder="e.g. GTBank" />
                </Field>
                <Field label="Account Name">
                  <TextInput {...register("accountName")} placeholder="Account name" />
                </Field>
                <Field label="Account Number" hint="10-digit NUBAN">
                  <TextInput {...register("accountNumber")} placeholder="0123456789" maxLength={10} />
                </Field>
              </div>
            </div>

            {/* ── Section 4: Documents ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Supporting Documents</h2>
              <FileTile
                label="Guarantor Form"
                icon="📄"
                preview={guarantorPreview}
                accept="image/*,application/pdf"
                onFile={setGuarantorFile}
                onRemove={() => { setGuarantorPreview(null); setGuarantorFile(null); }}
                hint="Upload a new guarantor form (replaces existing)"
              />
            </div>

            {/* Unsaved changes indicator */}
            {isDirty && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-900/10 border border-amber-700/30 rounded-lg px-3 py-2"
              >
                <span>●</span> You have unsaved changes
              </motion.div>
            )}

            {/* ── Actions ── */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={submitLoading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitLoading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {submitLoading ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg text-xs border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push(`/drivers/capture-fingerprint/${id}`)}
                className="ml-auto px-4 py-2.5 rounded-lg text-xs border border-[#C8A96E]/30 text-[#C8A96E] hover:bg-[#C8A96E]/10 transition-colors"
              >
                🖐 Re-enroll Fingerprint
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
