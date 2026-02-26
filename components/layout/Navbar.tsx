// "use client";

// import { Bell, LogIn } from "lucide-react";
// import Image from "next/image";
// import { signIn, useSession } from "next-auth/react";
// import { cn } from "@/lib/utils";

// export default function Navbar() {
//   const {data: session} = useSession()
  
//   return (
//     <header className="fixed top-0 left-0 lg:left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-20">
//       {session?(
//       <>
//       <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-700">
//         OGBE TRADING VENTURE
//       </div>
//       {/* Centered App Name */}
//         <div className="ml-auto flex items-center gap-6">
//         <button className="relative hover:text-blue-700">
//           <Bell className="w-6 h-6 text-gray-600" />
//           <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
//         </button>
        
//         <div className="flex items-center gap-2">
//           {/* <Image
//             src=""
//             alt="User Avatar"
//             width={32}
//             height={32}
//             className="rounded-full"
//           /> */}
//           <span className="font-medium text-gray-700 hidden sm:inline">
//             {session?.user?.name}
//           </span>
//         </div>
//       </div>
//       </>):(<div>
//             <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-xl font-bold text-gray-700">
             
//             </div>
//             <button onClick={()=>signIn('/')}
//              className={cn(" flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-blue-700 hover:font-medium")}>
//              <LogIn className="w-5 h-5" />
//               <p className="hidden sm:inline">signIn</p>
//             </button> 
//           </div>)}
//     </header>
//   );
// }

// src/components/layout/Navbar.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  LogIn,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

const ROUTE_LABELS: Record<string, string> = {
  "/dashboard":           "Dashboard",
  "/users":               "Users",
  "/vehicles":            "Vehicles",
  "/drivers":             "Drivers",
  "/trips":               "Trips",
  "/maintenance":         "Maintenance",
  "/maintenance/services":"Services",
  "/maintenance/repairs": "Repairs",
  "/maintenance/parts":   "Parts",
  "/maintenance/tires":   "Tires",
};

function getPageTitle(pathname: string): string {
  // Find the deepest matching prefix
  const match = Object.keys(ROUTE_LABELS)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return match ? ROUTE_LABELS[match] : "";
}

const ACTION_MAP: Record<string, { label: string; href: string }> = {
  "/vehicles": { label: "+ Upload Truck",  href: "/vehicles/create"  },
  "/drivers":  { label: "+ Add Driver",    href: "/drivers/create"   },
  "/trips":    { label: "+ Log Trip",      href: "/trips/create"     },
  "/users":    { label: "+ Add User",      href: "/users/create"     },
};

function getQuickAction(pathname: string) {
  const match = Object.keys(ACTION_MAP)
    .filter((key) => pathname.startsWith(key))
    .sort((a, b) => b.length - a.length)[0];
  return match ? ACTION_MAP[match] : null;
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname  = usePathname();
  const router    = useRouter();

  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [notifOpen, setNotifOpen]           = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef    = useRef<HTMLDivElement>(null);

  const userName  = (session as any)?.user?.name  ?? "User";
  const userImage = (session as any)?.user?.image ?? null;
  const userRole  = (session as any)?.user?.role  ?? "";

  const pageTitle  = getPageTitle(pathname);
  const quickAction = getQuickAction(pathname);

  // Close dropdowns on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))    setNotifOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  if (!session) {
    return (
      <header
        className="fixed top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-6 border-b border-white/[0.06] bg-[#0D1117]/90 backdrop-blur"
        style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        <div className="text-sm font-bold tracking-wider text-white">OGBE TRADING VENTURE</div>
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          Sign In
        </button>
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 lg:left-60 h-14 z-20 flex items-center justify-between px-4 lg:px-6 border-b border-white/[0.06] bg-[#0D1117]/90 backdrop-blur"
      style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
    >
      {/* ── Left: page title ── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-sm font-bold tracking-wider text-white truncate">{pageTitle || "OGBE"}</h1>
          {pageTitle && (
            <p className="text-[10px] text-zinc-600 hidden sm:block">
              {new Date().toLocaleDateString("en-NG", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </p>
          )}
        </div>
      </div>

      {/* ── Right: quick action + notifications + user ── */}
      <div className="flex items-center gap-2">

        {/* Quick action button — only on relevant pages and not on create/update routes */}
        {quickAction && !pathname.includes("/create") && !pathname.includes("/update") && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => router.push(quickAction.href)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#C8A96E] text-[#0D1117] font-bold hover:bg-[#d4b880] transition-colors"
          >
            {quickAction.label}
          </motion.button>
        )}

        {/* ── Notifications ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen((o) => !o); setDropdownOpen(false); }}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Bell className="w-4 h-4" />
            {/* Red dot */}
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 bg-[#161B22] border border-white/[0.06] rounded-xl shadow-xl overflow-hidden z-50"
                style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
              >
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Notifications</span>
                  <span className="text-[10px] text-[#C8A96E] font-semibold">1 new</span>
                </div>
                {/* Placeholder notification */}
                <div className="px-4 py-3 border-b border-white/[0.04] flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#C8A96E] mt-1 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="text-xs text-zinc-300">System ready</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">Fleet management system is active</p>
                  </div>
                </div>
                <div className="px-4 py-2.5 text-center">
                  <button className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors">
                    Mark all as read
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── User dropdown ── */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => { setDropdownOpen((o) => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all"
          >
            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full bg-[#C8A96E]/20 border border-[#C8A96E]/30 flex-shrink-0 flex items-center justify-center bg-center bg-cover"
              style={userImage ? { backgroundImage: `url(${userImage})` } : undefined}
            >
              {!userImage && (
                <span className="text-[#C8A96E] text-[10px] font-bold">{userName[0]?.toUpperCase()}</span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-zinc-300 leading-none">{userName}</p>
              <p className="text-[10px] text-zinc-600 mt-0.5">{userRole}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-zinc-600 transition-transform hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-[#161B22] border border-white/[0.06] rounded-xl shadow-xl overflow-hidden z-50"
                style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-xs font-semibold text-white truncate">{userName}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{(session as any)?.user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#C8A96E]/20 text-[#C8A96E] font-bold border border-[#C8A96E]/30">
                    {userRole}
                  </span>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={() => { router.push(`/users/${(session as any)?.user?.id}`); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { router.push(`/users/update/${(session as any)?.user?.id}`); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all text-left"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Account Settings
                  </button>
                </div>

                <div className="border-t border-white/[0.06] py-1">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-all text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
