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

  const userName = session?.user?.name  ?? "User";
  const userImage = session?.user?.image ?? null;
  const userRole = session?.user?.role  ?? "";

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
        className="fixed top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-6 border-b border-[#E8E2D9] bg-[#F8F6F1]/90 backdrop-blur"
        style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
      >
        <div className="text-sm font-bold tracking-wider text-[#1C1917]">OGBE TRADING VENTURE</div>
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-[#B8860B] text-[#1C1917] font-bold hover:bg-[#C9960D] transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          Sign In
        </button>
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 lg:left-60 h-14 z-20 flex items-center justify-between px-4 lg:px-6 border-b border-[#E8E2D9] bg-[#F8F6F1]/90 backdrop-blur"
      style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
    >
      {/* ── Left: page title ── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden flex-shrink-0" />
        <div className="min-w-0">
          <h1 className="text-sm font-bold tracking-wider text-[#1C1917] truncate">{pageTitle || "OGBE"}</h1>
          {pageTitle && (
            <p className="text-[10px] text-[#9C9590] hidden sm:block">
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[#B8860B] text-[#1C1917] font-bold hover:bg-[#C9960D] transition-colors"
          >
            {quickAction.label}
          </motion.button>
        )}

        {/* ── Notifications ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen((o) => !o); setDropdownOpen(false); }}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[#9C9590] hover:text-[#1C1917] hover:bg-white/[0.05] transition-all"
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
                className="absolute right-0 mt-2 w-72 bg-white border border-[#E8E2D9] rounded-xl shadow-xl overflow-hidden z-50"
                style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
              >
                <div className="px-4 py-3 border-b border-[#E8E2D9] flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6B6560]">Notifications</span>
                  <span className="text-[10px] text-[#B8860B] font-semibold">1 new</span>
                </div>
                {/* Placeholder notification */}
                <div className="px-4 py-3 border-b border-[#EDE8E0] flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#B8860B] mt-1 flex-shrink-0 animate-pulse" />
                  <div>
                    <p className="text-xs text-[#2C2825]">System ready</p>
                    <p className="text-[10px] text-[#9C9590] mt-0.5">Fleet management system is active</p>
                  </div>
                </div>
                <div className="px-4 py-2.5 text-center">
                  <button className="text-[10px] text-[#9C9590] hover:text-[#6B6560] transition-colors">
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
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#EBEBEB] transition-all"
          >
            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/30 flex-shrink-0 flex items-center justify-center bg-center bg-cover"
              style={userImage ? { backgroundImage: `url(${userImage})` } : undefined}
            >
              {!userImage && (
                <span className="text-[#B8860B] text-[10px] font-bold">{userName[0]?.toUpperCase()}</span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-[#2C2825] leading-none">{userName}</p>
              <p className="text-[10px] text-[#9C9590] mt-0.5">{userRole}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-[#9C9590] transition-transform hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-white border border-[#E8E2D9] rounded-xl shadow-xl overflow-hidden z-50"
                style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
              >
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#E8E2D9]">
                  <p className="text-xs font-semibold text-[#1C1917] truncate">{userName}</p>
                  <p className="text-[10px] text-[#9C9590] mt-0.5">{session?.user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#B8860B]/20 text-[#B8860B] font-bold border border-[#B8860B]/30">
                    {userRole}
                  </span>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={() => { router.push(`/users/${session?.user?.id }`); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#6B6560] hover:text-[#1C1917] hover:bg-[#EBEBEB] transition-all text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    My Profile
                  </button>
                  <button
                    onClick={() => { router.push(`/users/update/${session?.user?.id}`); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#6B6560] hover:text-[#1C1917] hover:bg-[#EBEBEB] transition-all text-left"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    Account Settings
                  </button>
                </div>

                <div className="border-t border-[#E8E2D9] py-1">
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
