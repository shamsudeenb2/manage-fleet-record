// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { User, Image as ImageIcon, FileText } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import DashboardLayout from "@/components/layout/Dashboard";
// import  DateField  from "@/components/DateInpute";

// const DriverSchema = z.object({
//      name: z.string().min(2),
//   phone: z.string().optional().nullable(),
//   address: z.string().min(5),
//   profileImage: z.string().optional().nullable(),
//   licenseNo: z.string().optional().nullable(),
//   licenseImage: z.string().optional().nullable(),
//   licenseExp: z.iso.datetime("Use the calendar to pick a date"),
//   accountName: z.string().optional().nullable(),
//   accountNumber: z.string().optional().nullable(),
//   bank: z.string().optional().nullable(),
//   guarantorForm: z.string().optional().nullable(),
//   fingerPrint: z.string().optional().nullable(), // either URL or template string
//   notes: z.string().optional().nullable(),
// //   name: z.string().min(2, "Name required"),
// //   phone: z.string().optional(),
// //   address: z.string().min(5, "Address required"),
// //   accountName: z.string().optional(),
// //   accountNumber: z.string().optional(),
// //   bank: z.string().optional(),
// //   notes: z.string().optional(),
// //   // The client will upload files and pass back URLs
// //   profileImage: z.string().optional().nullable(),
// //   licenseImage: z.string().optional().nullable(),
// //   guarantorForm: z.string().optional().nullable(),
// //   fingerPrint: z.string().optional().nullable(),
// });

// type FormValues = z.infer<typeof DriverSchema>;

// export default function DriverOnboardPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // track local files for preview + eventual upload
//   const [profileFile, setProfileFile] = useState<File | null>(null);
//   const [licenseFile, setLicenseFile] = useState<File | null>(null);
//   const [guarantorFile, setGuarantorFile] = useState<File | null>(null);
//   const [fingerprintFile, setFingerprintFile] = useState<File | null>(null);

//   const [profilePreview, setProfilePreview] = useState<string | null>(null);
//   const [licensePreview, setLicensePreview] = useState<string | null>(null);

//   const { register, handleSubmit, setValue,watch, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(DriverSchema),
//     defaultValues: { name: "", phone: "", address: "" },
//   });

// const watched = watch();

//   useEffect(() => {
//     if (profileFile) {
//       const url = URL.createObjectURL(profileFile);
//       setProfilePreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else setProfilePreview(null);
//   }, [profileFile]);

//   useEffect(() => {
//     if (licenseFile) {
//       const url = URL.createObjectURL(licenseFile);
//       setLicensePreview(url);
//       return () => URL.revokeObjectURL(url);
//     } else setLicensePreview(null);
//   }, [licenseFile]);

//   async function uploadFile(file: File) {
//     const fd = new FormData();
//     fd.append("file", file);
//     const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
//     if (!res.ok) throw new Error("Upload failed");
//     const json = await res.json();
//     if (!json?.ok || !json?.url) throw new Error("Upload returned no url");
//     return json.url as string;
//   }

//   async function onSubmit(payload: FormValues) {
//     setLoading(true);

//     try {
//       // upload files sequentially (can be parallelized)
//       if (profileFile) {
//         const url = await uploadFile(profileFile);
//         payload.profileImage = url;
//       }
//       if (licenseFile) {
//         const url = await uploadFile(licenseFile);
//         payload.licenseImage = url;
//       }
//       if (guarantorFile) {
//         const url = await uploadFile(guarantorFile);
//         payload.guarantorForm = url;
//       }
//       if (fingerprintFile) {
//         const url = await uploadFile(fingerprintFile);
//         payload.fingerPrint = url;
//       }

//       const res = await fetch("/api/auth/users/driver", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.status === 201) {
//         const data = await res.json()
//         toast.success("Driver onboarded");
//         router.push(`/drivers/capture-fingerprint/${data?.driver?.id}`); // your drivers list
//         return;
//       }

//       const json = await res.json().catch(() => ({}));
//       toast.error(json?.message || "Could not create driver");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.message || "Upload or server error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//     <DashboardLayout>
//       <Toaster />
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full max-w-3xl">
//           <Card className="p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <User className="text-blue-600" />
//               <h2 className="text-xl font-semibold">Driver Onboarding</h2>
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

//               <div>
//                 <Label>Notes</Label>
//                 <Input {...register("notes")} placeholder="Optional notes" />
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

//               <div>
//                 <DateField
//                     label="License Expiring Date"
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
//               <div className="md:col-span-2">
//                 <Label>Guarantor form (image/pdf)</Label>
//                 <input accept="image/*,application/pdf" type="file" onChange={(e) => setGuarantorFile(e.target.files?.[0] ?? null)} />
//               </div>

//               {/* Fingerprint */}
//               {/* <div className="md:col-span-2">
//                 <Label>Fingerprint</Label>
//                 <p className="text-sm text-gray-600 mb-2">Upload fingerprint template file or paste template text (if available)</p>
//                 <input type="file" accept=".bin,.dat" onChange={(e) => setFingerprintFile(e.target.files?.[0] ?? null)} />
//                 <div className="mt-2">
//                   <Label>or fingerprint template (base64 / string)</Label>
//                   <textarea rows={3} className="w-full border p-2 rounded" onChange={(e) => setValue("fingerPrint", e.target.value)} />
//                 </div>
//               </div> */}

//               <div className="col-span-1 md:col-span-2 flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create driver"}</Button>
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

// src/app/admin/drivers/create/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";
import DateField from "@/components/DateInpute";

const DriverSchema = z.object({
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
  fingerPrint: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof DriverSchema>;

// ─── Helpers ────────────────────────────────────────────────────────────────
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

function TextArea({
  error,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      {...props}
      rows={3}
      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
        error
          ? "border-red-700/60 focus:border-red-500"
          : "border-white/[0.06] focus:border-[#C8A96E]/50"
      }`}
    />
  );
}

// ─── File upload tile ────────────────────────────────────────────────────────
function FileTile({
  label,
  icon,
  preview,
  accept,
  onFile,
  onRemove,
  hint,
}: {
  label: string;
  icon: string;
  preview?: string | null;
  accept: string;
  onFile: (f: File) => void;
  onRemove: () => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">{label}</label>
      <div className="relative group">
        <div
          className="w-full h-24 rounded-xl border-2 border-dashed border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden transition-colors group-hover:border-[#C8A96E]/40"
          style={
            preview
              ? { backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center", borderStyle: "solid", borderColor: "rgba(200,169,110,0.3)" }
              : undefined
          }
        >
          {!preview && (
            <div className="text-center pointer-events-none">
              <div className="text-2xl mb-1">{icon}</div>
              <p className="text-[10px] text-zinc-600">Click to upload</p>
            </div>
          )}
        </div>
        <label className="absolute inset-0 cursor-pointer rounded-xl">
          <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
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

export default function DriverCreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [guarantorFile, setGuarantorFile] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [guarantorPreview, setGuarantorPreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(DriverSchema),
    defaultValues: { name: "", phone: "", address: "" },
  });

  const watched = watch();

  // Previews
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

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/auth/users/upload_profile", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const json = await res.json();
    if (!json?.ok || !json?.url) throw new Error("Upload returned no URL");
    return json.url as string;
  }

  async function onSubmit(payload: FormValues) {
    setLoading(true);
    try {
      // Upload files in parallel
      const [profileUrl, licenseUrl, guarantorUrl] = await Promise.all([
        profileFile ? uploadFile(profileFile) : Promise.resolve(null),
        licenseFile ? uploadFile(licenseFile) : Promise.resolve(null),
        guarantorFile ? uploadFile(guarantorFile) : Promise.resolve(null),
      ]);

      if (profileUrl) payload.profileImage = profileUrl;
      if (licenseUrl) payload.licenseImage = licenseUrl;
      if (guarantorUrl) payload.guarantorForm = guarantorUrl;

      const res = await fetch("/api/auth/users/driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.status === 201) {
        toast.success("Driver onboarded successfully");
        router.push(`/drivers/capture-fingerprint/${json?.driver?.id}`);
        return;
      }
      if (res.status === 409) {
        toast.error(json?.message ?? "A driver with this license already exists");
        return;
      }
      toast.error(json?.message ?? "Could not create driver");
    } catch (err: any) {
      toast.error(err?.message ?? "Upload or server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div className="min-h-screen bg-[#0D1117] text-white" style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}>

        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <button onClick={() => router.back()} className="text-zinc-500 hover:text-white transition-colors text-lg">←</button>
            <div>
              <h1 className="text-base font-bold tracking-wider">Driver Onboarding</h1>
              <p className="text-xs text-zinc-500 mt-0.5">Register a new driver to the fleet</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* ── Section 1: Profile photo + personal info ── */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Personal Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative group flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full border-2 border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden"
                    style={profilePreview ? { backgroundImage: `url(${profilePreview})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                  >
                    {!profilePreview && (
                      <span className="text-zinc-600 text-3xl">{watched.name?.[0]?.toUpperCase() ?? "👤"}</span>
                    )}
                  </div>
                  <label className="absolute inset-0 rounded-full cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-semibold">CHANGE</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)} />
                  </label>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-zinc-300 font-medium">Profile photo</p>
                  <p className="text-[11px] text-zinc-600">Hover to upload. PNG or JPG recommended.</p>
                  {profilePreview && (
                    <button type="button" onClick={() => { setProfilePreview(null); setProfileFile(null); }} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">
                      Remove photo
                    </button>
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

              <Field label="Notes" hint="Optional — additional information about this driver">
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
                  {errors.licenseExp && <p className="text-[10px] text-red-400 mt-1">{errors.licenseExp.message}</p>}
                </div>
              </div>

              <FileTile
                label="License Image"
                icon="🪪"
                preview={licensePreview}
                accept="image/*,application/pdf"
                onFile={setLicenseFile}
                onRemove={() => { setLicensePreview(null); setLicenseFile(null); }}
                hint="Upload a photo or scan of the driver's license"
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
                hint="Scanned guarantor form — image or PDF"
              />
            </div>

            {/* ── Fingerprint notice ── */}
            <div className="flex items-center gap-3 bg-[#161B22] border border-[#C8A96E]/20 rounded-xl px-5 py-4">
              <span className="text-2xl flex-shrink-0">🖐</span>
              <div>
                <p className="text-xs font-semibold text-[#C8A96E]">Fingerprint Capture</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  After creating the driver, you'll be redirected to the biometric enrollment page to capture the fingerprint.
                </p>
              </div>
            </div>

            {/* ── Actions ── */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />}
                {loading ? "Creating…" : "Create Driver"}
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
