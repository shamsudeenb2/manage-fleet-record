// // "use client";

// // import { useForm } from "react-hook-form";
// // import { z } from "zod";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { signIn } from "next-auth/react";
// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // const schema = z.object({
// //   email: z.string().email("Enter a valid email"),
// //   password: z.string().min(6,"Enter your password"),
// // });

// // type LoginFormValues = z.infer<typeof schema>;
// // export default function LoginPage() {
// //   const router = useRouter();
// //   const [error, setError] = useState("");
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors, isSubmitting },
// //   } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

// //   const onSubmit = async (data: z.infer<typeof schema>) => {
// //     const res = await signIn("credentials", {
// //       redirect: false,
// //       email: data.email,
// //       password: data.password,
// //     });

// //     if (res?.error) {
// //       setError("Invalid email or password");
// //     } else {
// //       router.push("/dashboard");
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gray-50">
// //       <form
// //         onSubmit={handleSubmit(onSubmit)}
// //         className="bg-white p-6 rounded-2xl shadow-md w-96"
// //       >
// //         <h1 className="text-2xl font-bold mb-4 text-center">Fleet Manager Login</h1>
        
// //         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

// //         <div className="mb-4">
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             {...register("email")}
// //             className="w-full p-2 border rounded-md"
// //           />
// //           {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
// //         </div>

// //         <div className="mb-4">
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             {...register("password")}
// //             className="w-full p-2 border rounded-md"
// //           />
// //           {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={isSubmitting}
// //           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
// //         >
// //           {isSubmitting ? "Logging in..." : "Login"}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Toaster, toast } from "sonner";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, User, Lock } from "lucide-react";
// import { signIn } from "next-auth/react";
// import Navbar from "@/components/layout/Navbar";
// import {Card} from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";

// /**
//  * Login form schema
//  */
// const LoginSchema = z.object({
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(1, "Enter your password"),
//   remember: z.boolean().optional(),
// });

// type LoginFormValues = z.infer<typeof LoginSchema>;

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<LoginFormValues>({
//     resolver: zodResolver(LoginSchema),
//     defaultValues: { email: "", password: "", remember: false },
//   });

//   // Pre-fill email if user recently used an email (optional)
//   useEffect(() => {
//     try {
//       const savedEmail = typeof window !== "undefined" ? localStorage.getItem("nipost_email") : null;
//       if (savedEmail) setValue("email", savedEmail);
//     } catch {
//       /* ignore */
//     }
//   }, [setValue]);

//   async function onSubmit(data: LoginFormValues) {
//     setLoading(true);
//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//     });

//     if (!res?.ok) {
//       toast.error("Invalid email or password.");
//       setLoading(false);
//         return;
//     }

//       // On success the API sets an HttpOnly cookie (nipost_token).
//       // Save some client-side fallback / preferences:
//       if (data.remember) {
//         try {
//           localStorage.setItem("nipost_email", data.email);
//         } catch {
//           /* ignore */
//         }
//       } else {
//         try {
//           localStorage.removeItem("nipost_email");
//         } catch {}
//       }
//     toast.success("Logged in");
//       // Redirect to dashboard or homepage
//       router.push("/dashboard"); // change if you have a dashboard route
//   }

//   return (
//     <>
//       <Toaster />
//       <Navbar/>
//       <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 8 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="w-full max-w-md"
//         >
//           <Card>
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <User className="text-blue-600" />
//               <h2 className="text-xl font-semibold ">Sign in to your account</h2>
//             </div>
// {/* 
//             <p className="text-sm text-gray-600 mb-4 text-center">
//               Log in using the email you provided.
//             </p> */}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-4">
//               <div>
//                 <Label>Email</Label>
//                 <Input {...register("email")} placeholder="you@domain.com" />
//                 {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <Label>Password</Label>
//                 <div className="relative">
//                   <input
//                     {...register("password")}
//                     type={showPassword ? "text" : "password"}
//                     className="w-full border px-3 py-2 rounded pr-10"
//                     placeholder="Your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((s) => !s)}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-80"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
//               </div>

//               <div className="flex items-center justify-between">
//                 <label className="flex items-center gap-2 text-sm">
//                   <input type="checkbox" {...register("remember")} />
//                   <span>Remember me</span>
//                 </label>

//                 <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
//                   Forgot password?
//                 </a>
//               </div>

//               <div className="flex gap-3 mt-4">
//                 <Button type="submit" disabled={loading}>
//                   {loading ? "Signing in..." : "Sign in"}
//                 </Button>
//                 <Button type="button" variant="secondary" onClick={() => window.location.href = "/"}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </motion.div>
//       </main>
//     </>
//   );
// }


// src/app/(auth)/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

// ─── Schema ───────────────────────────────────────────────────────────────────
const LoginSchema = z.object({
  email:    z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().optional(),
});
type LoginFormValues = z.infer<typeof LoginSchema>;

// ─── Shared UI primitives (matches fleet dashboard design system) ─────────────
function Field({
  label, error, children, required,
}: {
  label: string; error?: string; children: React.ReactNode; required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  // Pre-fill remembered email
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined"
        ? localStorage.getItem("fleet_email")
        : null;
      if (saved) setValue("email", saved);
    } catch { /* ignore */ }
  }, [setValue]);

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect:  false,
        email:     data.email,
        password:  data.password,
      });

      if (!res?.ok) {
        toast.error("Invalid email or password.");
        return;
      }

      // Persist remembered email
      try {
        if (data.remember) {
          localStorage.setItem("fleet_email", data.email);
        } else {
          localStorage.removeItem("fleet_email");
        }
      } catch { /* ignore */ }

      toast.success("Welcome back");
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster theme="dark" position="top-right" />

      <main
        className="min-h-screen bg-[#0D1117] flex items-center justify-center px-4"
        style={{ fontFamily: "'DM Mono','Fira Mono',monospace" }}
      >
        {/* Subtle background grid */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#C8A96E 1px, transparent 1px), linear-gradient(90deg, #C8A96E 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow behind card */}
        <div
          className="pointer-events-none fixed inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="w-[420px] h-[420px] rounded-full opacity-[0.06]"
            style={{
              background:
                "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-sm"
        >
          {/* ── Card ────────────────────────────────────────────────────── */}
          <div className="bg-[#161B22] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">

            {/* Gold top bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A96E] to-transparent" />

            <div className="px-8 pt-8 pb-9">

              {/* ── Logo / Brand ─────────────────────────────────────── */}
              <div className="flex flex-col items-center gap-2 mb-8">
                {/* Fleet icon */}
                <div className="w-11 h-11 rounded-xl bg-[#C8A96E]/10 border border-[#C8A96E]/20
                  flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24" fill="none" className="w-5 h-5"
                    stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 5v3h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A96E]">
                    Fleet Manager
                  </p>
                  <h1 className="text-sm font-bold text-white mt-0.5 tracking-wider">
                    Sign in to your account
                  </h1>
                </div>
              </div>

              {/* ── Form ─────────────────────────────────────────────── */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                {/* Email */}
                <Field label="Email Address" required error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 text-xs text-zinc-200
                      placeholder-zinc-600 focus:outline-none transition-colors
                      ${errors.email
                        ? "border-red-700/60 focus:border-red-500"
                        : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}
                  />
                </Field>

                {/* Password */}
                <Field label="Password" required error={errors.password?.message}>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Your password"
                      className={`w-full bg-[#0D1117] border rounded-lg px-3 py-2.5 pr-10 text-xs text-zinc-200
                        placeholder-zinc-600 focus:outline-none transition-colors
                        ${errors.password
                          ? "border-red-700/60 focus:border-red-500"
                          : "border-white/[0.06] focus:border-[#C8A96E]/50"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600
                        hover:text-zinc-300 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword
                        ? <EyeOff size={14} />
                        : <Eye      size={14} />
                      }
                    </button>
                  </div>
                </Field>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        {...register("remember")}
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 rounded bg-[#0D1117] border border-white/[0.08]
                        peer-checked:bg-[#C8A96E]/20 peer-checked:border-[#C8A96E]/50
                        transition-colors flex items-center justify-center">
                        <svg
                          viewBox="0 0 12 12" fill="none"
                          className="w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity"
                          stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                          <polyline points="1.5,6 4.5,9 10.5,3" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-widest font-bold">
                      Remember me
                    </span>
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-[10px] text-[#C8A96E]/70 hover:text-[#C8A96E] transition-colors
                      uppercase tracking-widest font-bold"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest
                      bg-[#C8A96E] text-[#0D1117] hover:bg-[#d4b880] transition-colors
                      disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <div className="w-3.5 h-3.5 border-2 border-[#0D1117] border-t-transparent
                        rounded-full animate-spin" />
                    )}
                    {loading ? "Signing in…" : "Sign in"}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest
                      border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20
                      transition-colors"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </div>

            {/* ── Footer ───────────────────────────────────────────────── */}
            <div className="border-t border-white/[0.04] px-8 py-3 flex items-center justify-center">
              <p className="text-[9px] text-zinc-700 uppercase tracking-[0.15em] font-bold">
                Fleet Management System · Secure Access
              </p>
            </div>
          </div>

          {/* Version tag below card */}
          <p className="text-center text-[9px] text-zinc-700 mt-4 uppercase tracking-widest font-bold">
            v1.0 · Admin Portal
          </p>
        </motion.div>
      </main>
    </>
  );
}
