// "use client";

// import { useEffect, useState } from "react";
// import { useRouter,useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, User, Lock, Image as ImageIcon } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import DashboardLayout from "@/components/layout/Dashboard";


// const PasswordSchema = z
//   .object({
//     email: z.string().email("Enter a valid email"),
//     name: z.string().min(1, "Enter name"),
//     password: z
//       .string()
//       .min(8, "At least 8 characters")
//       .regex(/[A-Z]/, "At least one uppercase letter")
//       .regex(/[a-z]/, "At least one lowercase letter")
//       .regex(/[0-9]/, "At least one number")
//       .regex(/[^A-Za-z0-9]/, "At least one special character"),
//     confirmPassword: z.string(),
//     role: z.enum(["ADMIN", "DATA_ENTRY", "DRIVER"]).optional(),
//     profileImageFile: z.any().optional(), // used client-side only
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type FormValues = z.infer<typeof PasswordSchema>;

// export default function RegisterPage() {
//   const { data: session } = useSession();
//   const params = useParams() as { id: string };
//   const id = params.id;
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [fileToUpload, setFileToUpload] = useState<File | null>(null);


//   const isAdmin = (session as any)?.user?.role === "ADMIN";
// //   console.log("session data", isAdmin, session)
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: zodResolver(PasswordSchema),
//     defaultValues: { email: "", name: "", password: "", confirmPassword: "", role: "DATA_ENTRY" },
//   });

//    async function load() {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/auth/users/register/${id}`);
//         const json = await res.json();
//         if (!res.ok) throw new Error(json?.message || "Failed");
//         reset(json.user);
//       } catch (err:any) {
//         console.error(err);
//         toast.error(err?.message || "Failed to load");
//       } finally { setLoading(false); }
//     }
  
//     useEffect(()=>{ load() }, [id]);
//   useEffect(() => {
//     // create preview when file selected
//     if (!fileToUpload) {
//       setPreview(null);
//       return;
//     }
//     const url = URL.createObjectURL(fileToUpload);
//     setPreview(url);
//     return () => URL.revokeObjectURL(url);
//   }, [fileToUpload]);



//   async function handleUpload(file: File) {
//     const fd = new FormData();
//     fd.append("file", file);
//     const res = await fetch(`/api/auth/users/register/${id}`, {
//       method: "PATCH",
//       body: fd,
//     });
//     if (!res.ok) throw new Error("Upload failed");
//     const json = await res.json();
//     return json.url as string;
//   }

//   async function onSubmit(data: FormValues) {
//     setLoading(true);
//     console.log("name it here")
//     try {
//       let profileImageUrl: string | undefined = undefined;
//       if (fileToUpload) {
//         const url = await handleUpload(fileToUpload);
//         profileImageUrl = url;
//       }

//       // Prepare payload
//       const payload = {
//         email: data.email,
//         name: data.name,
//         password: data.password,
//         role: isAdmin ? data.role : undefined, // only allow client to set role if admin
//         profileImage: profileImageUrl,
//       };

//       const res = await fetch(`/api/auth/users/register/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.status === 201) {
//         toast.success("User Updated successfully");
//         // Redirect to users list or login
//         router.push("/users"); // change to your users list route
//         return;
//       }

//       if (res.status === 409) {
//         toast.error("Email already in use");
//         setLoading(false);
//         return;
//       }

//       const json = await res.json().catch(() => ({}));
//       toast.error(json?.message || "Failed to create user");
//     } catch (err: any) {
//       console.error(err);
//       toast.error(err?.message || "Server error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//     <DashboardLayout>
//       <Toaster />
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="w-full max-w-lg"
//         >
//           <Card className="p-6">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <User className="text-blue-600" />
//               <h2 className="text-xl font-semibold">Create user</h2>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <Label>Email</Label>
//                 <Input {...register("email")} placeholder="you@domain.com" />
//                 {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <Label>Name</Label>
//                 <Input {...register("name")} placeholder="Full name" />
//                 {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
//               </div>

//               <div>
//                 <Label>Profile image</Label>
//                 <div className="flex items-center gap-3">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0] ?? null;
//                       setFileToUpload(file);
//                     }}
//                   />
//                   {preview ? (
//                     <img src={preview} alt="preview" className="w-16 h-16 object-cover rounded" />
//                   ) : (
//                     <div className="w-16 h-16 flex items-center justify-center rounded bg-gray-100 text-gray-500">
//                       <ImageIcon size={18} />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {isAdmin && (
//                 <div>
//                   <Label>Role</Label>
//                   <select {...register("role")} className="w-full border p-2 rounded">
//                     <option value="DATA_ENTRY">Data entry</option>
//                     <option value="ADMIN">Admin</option>
//                     <option value="DRIVER">Driver</option>
//                     <option value="MANAGER">Manager</option>
//                   </select>
//                 </div>
//               )}

//               <div className="flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>
//                   {loading ? "Updating..." : "Update user"}
//                 </Button>
//                 {/* <Button type="button" variant="secondary" onClick={() => router.back()}>
//                   Cancel
//                 </Button> */}
//               </div>
//             </form>
//           </Card>
//         </motion.div>
//       </main>
//       </DashboardLayout>
//     </>
//   );
// }

// src/app/admin/users/update/[id]/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/Dashboard";

// ── Schema ── password is optional on edit
const EditUserSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    name: z.string().min(1, "Name is required"),
    password: z
      .string()
      .optional()
      .refine(
        (v) =>
          !v ||
          (v.length >= 8 &&
            /[A-Z]/.test(v) &&
            /[a-z]/.test(v) &&
            /[0-9]/.test(v) &&
            /[^A-Za-z0-9]/.test(v)),
        {
          message:
            "Password must be 8+ chars with uppercase, lowercase, number and special character",
        }
      ),
    confirmPassword: z.string().optional(),
    role: z.enum(["ADMIN", "DATA_ENTRY", "DRIVER"]).optional(),
  })
  .refine((d) => !d.password || d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof EditUserSchema>;

// ── Inline field + input helpers (same as create page) ─────────────────────
function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {label}
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

// ── Password strength meter ─────────────────────────────────────────────────
function PasswordStrength({ password }: { password?: string }) {
  if (!password) return null;
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Lowercase", ok: /[a-z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
    { label: "Special", ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const color = score <= 1 ? "#8C3E3E" : score <= 3 ? "#C8A96E" : "#5C9669";
  const label = score <= 1 ? "Weak" : score <= 3 ? "Moderate" : score === 4 ? "Strong" : "Very Strong";

  return (
    <div className="space-y-2 mt-1">
      <div className="flex gap-1">
        {checks.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? color : "#1C2330" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          {checks.map((c) => (
            <span
              key={c.label}
              className={`text-[10px] flex items-center gap-1 ${
                c.ok ? "text-emerald-400" : "text-zinc-600"
              }`}
            >
              <span>{c.ok ? "✓" : "○"}</span>
              {c.label}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-semibold" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ── Role cards (same as create page) ───────────────────────────────────────
const ROLES = [
  {
    value: "DATA_ENTRY",
    label: "Data Entry",
    desc: "Can add trips, fuel, and basic records",
    color: "#3E6B8C",
    icon: "📋",
  },
  {
    value: "ADMIN",
    label: "Admin",
    desc: "Full access to all fleet data and settings",
    color: "#C8A96E",
    icon: "🔐",
  },
  {
    value: "MANAGER",
    label: "Manager",
    desc: "Limited access to driver-facing features",
    color: "#5C9669",
    icon: "🚛",
  },
];

const ROLE_STYLES: Record<string, string> = {
  ADMIN: "bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/30",
  DATA_ENTRY: "bg-[#3E6B8C]/20 text-sky-400 border border-[#3E6B8C]/30",
  DRIVER: "bg-[#5C9669]/20 text-emerald-400 border border-[#5C9669]/30",
};

export default function EditUserPage() {
  const { data: session } = useSession();
  const params = useParams() as { id: string };
  const id = params.id;
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [userMeta, setUserMeta] = useState<{ createdAt?: string; updatedAt?: string } | null>(null);

  const isAdmin = (session as any)?.user?.role === "ADMIN";
  const isSelf = (session as any)?.user?.id === id;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: { email: "", name: "", password: "", confirmPassword: "", role: "DATA_ENTRY" },
  });

  const passwordValue = watch("password") ?? "";
  const selectedRole = watch("role") ?? "DATA_ENTRY";
  const nameValue = watch("name") ?? "";

  // ── Load existing user ────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setFetchLoading(true);
    try {
      const res = await fetch(`/api/auth/users/register/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? "Failed to load user");
      const u = json.user;
      reset({
        email: u.email ?? "",
        name: u.name ?? "",
        role: u.role ?? "DATA_ENTRY",
        password: "",
        confirmPassword: "",
      });
      setExistingImage(u.profileImage ?? null);
      setUserMeta({ createdAt: u.createdAt, updatedAt: u.updatedAt });
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to load user");
    } finally {
      setFetchLoading(false);
    }
  }, [id, reset]);

  useEffect(() => { load(); }, [load]);

  // ── Image preview ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!fileToUpload) { setPreview(null); return; }
    const url = URL.createObjectURL(fileToUpload);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [fileToUpload]);

  // ── Upload image ──────────────────────────────────────────────────────────
  async function handleUpload(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/auth/users/upload_profile", {
      method: "POST",
      body: fd,
    });
    if (!res.ok) throw new Error("Image upload failed");
    const json = await res.json();
    return json.url as string;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function onSubmit(data: FormValues) {
    setSubmitLoading(true);
    try {
      let profileImageUrl: string | undefined;
      if (fileToUpload) {
        profileImageUrl = await handleUpload(fileToUpload);
      }

      const payload: Record<string, any> = {
        name: data.name,
        ...(isAdmin ? { role: data.role } : {}),
        ...(profileImageUrl ? { profileImage: profileImageUrl } : {}),
      };

      // Only include password if user chose to change it
      if (changePassword && data.password) {
        payload.password = data.password;
      }

      const res = await fetch(`/api/auth/users/register/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("User updated successfully");
        router.push("/users");
        return;
      }
      if (res.status === 409) {
        toast.error("Email already in use");
        return;
      }
      toast.error(json?.message ?? "Update failed");
    } catch (err: any) {
      toast.error(err?.message ?? "Server error");
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
            <p className="text-zinc-500 text-sm tracking-wider">LOADING USER</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const displayImage = preview ?? existingImage;

  return (
    <DashboardLayout>
      <Toaster theme="dark" position="top-right" />
      <div
        className="min-h-screen bg-[#0D1117] text-white"
        style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        {/* ── HEADER ── */}
        <div className="border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-zinc-500 hover:text-white transition-colors text-lg"
              >
                ←
              </button>
              <div>
                <h1 className="text-base font-bold tracking-wider">Edit User</h1>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {isSelf ? "Editing your own account" : `Updating user account`}
                  {userMeta?.updatedAt && (
                    <span>
                      {" "}· Last updated{" "}
                      {new Date(userMeta.updatedAt).toLocaleDateString("en-NG", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Current role badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                ROLE_STYLES[selectedRole] ?? "bg-zinc-700/30 text-zinc-400 border border-zinc-600/30"
              }`}
            >
              {selectedRole.replace("_", " ")}
            </span>
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
            {/* Profile image + basic info */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Basic Information
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-5">
                <div className="relative group flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full border-2 border-white/10 bg-[#0D1117] flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundImage: displayImage ? `url(${displayImage})` : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!displayImage && (
                      <span className="text-zinc-600 text-2xl">
                        {nameValue?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>
                  <label className="absolute inset-0 rounded-full cursor-pointer flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-white font-semibold">CHANGE</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFileToUpload(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-zinc-300 font-medium">Profile photo</p>
                  <p className="text-[11px] text-zinc-600">
                    Hover over the avatar to upload a new photo. PNG, JPG accepted.
                  </p>
                  <div className="flex gap-3">
                    {preview && (
                      <button
                        type="button"
                        onClick={() => { setPreview(null); setFileToUpload(null); }}
                        className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                      >
                        Discard new photo
                      </button>
                    )}
                    {existingImage && !preview && (
                      <button
                        type="button"
                        onClick={() => setExistingImage(null)}
                        className="text-[10px] text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                  {userMeta?.createdAt && (
                    <p className="text-[10px] text-zinc-600 pt-1">
                      Account created{" "}
                      {new Date(userMeta.createdAt).toLocaleDateString("en-NG", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Name */}
              <Field label="Full Name" error={errors.name?.message}>
                <TextInput
                  {...register("name")}
                  placeholder="e.g. John Adeyemi"
                  error={!!errors.name}
                />
              </Field>

              {/* Email — read-only on edit (changing email can break auth) */}
              <Field
                label="Email Address"
                hint="Email cannot be changed after account creation. Contact an admin if this needs updating."
              >
                <TextInput
                  {...register("email")}
                  type="email"
                  readOnly
                  className="opacity-50 cursor-not-allowed"
                  error={false}
                />
              </Field>
            </div>

            {/* Password section */}
            <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Password
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setChangePassword((v) => !v);
                    if (changePassword) {
                      setValue("password", "");
                      setValue("confirmPassword", "");
                    }
                  }}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                    changePassword
                      ? "border-[#C8A96E]/40 text-[#C8A96E] bg-[#C8A96E]/10"
                      : "border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {changePassword ? "✓ Changing password" : "Change password"}
                </button>
              </div>

              {!changePassword ? (
                <div className="flex items-center gap-3 py-3 px-4 bg-[#0D1117] rounded-lg border border-white/[0.04]">
                  <span className="text-lg">🔒</span>
                  <div>
                    <p className="text-xs text-zinc-400">Password is set</p>
                    <p className="text-[10px] text-zinc-600">
                      Click "Change password" above to update it
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <Field label="New Password" error={errors.password?.message}>
                    <div className="relative">
                      <TextInput
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="Choose a strong password"
                        error={!!errors.password}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    <PasswordStrength password={passwordValue} />
                  </Field>

                  <Field label="Confirm Password" error={errors.confirmPassword?.message}>
                    <div className="relative">
                      <TextInput
                        {...register("confirmPassword")}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your new password"
                        error={!!errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </Field>
                </>
              )}
            </div>

            {/* Role (admin only, cannot demote yourself) */}
            {isAdmin && (
              <div className="bg-[#161B22] border border-white/[0.06] rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Role & Permissions
                  </h2>
                  {isSelf && (
                    <span className="text-[10px] text-amber-400 border border-amber-700/40 bg-amber-900/20 px-2 py-0.5 rounded">
                      ⚠ You are editing your own role
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ROLES.map((r) => {
                    const isSelected = selectedRole === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setValue("role", r.value as any, { shouldDirty: true })}
                        className={`relative text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "border-[#C8A96E]/50 bg-[#C8A96E]/5"
                            : "border-white/[0.06] hover:border-white/10 bg-[#0D1117]"
                        }`}
                      >
                        {isSelected && (
                          <div
                            className="absolute top-2 right-2 w-2 h-2 rounded-full"
                            style={{ background: r.color }}
                          />
                        )}
                        <div className="text-xl mb-2">{r.icon}</div>
                        <div
                          className="text-xs font-bold uppercase tracking-wider mb-1"
                          style={{ color: isSelected ? r.color : "#71717a" }}
                        >
                          {r.label}
                        </div>
                        <div className="text-[10px] text-zinc-600 leading-relaxed">{r.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {/* Hidden select to register with react-hook-form */}
                <select {...register("role")} className="hidden">
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

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

            {/* Actions */}
            <div className="flex items-center gap-3 pb-8">
              <button
                type="submit"
                disabled={submitLoading}
                className="px-6 py-2.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitLoading && (
                  <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent rounded-full animate-spin" />
                )}
                {submitLoading ? "Saving…" : "Save Changes"}
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
