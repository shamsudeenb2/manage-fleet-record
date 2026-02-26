// "use client";

// import { Home, UserPlus, Fingerprint, Menu, Users, UserIcon, Truck, Cog, LogOut, User2, LucideBriefcaseConveyorBelt,LifeBuoy } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { signOut, useSession } from "next-auth/react";

// type Role = "ADMIN" | "DATA_ENTRY" | "MANAGER" ;

// // Example: Replace with user role from auth context or API


// const menuByRole: Record<Role, { name: string; href: string; icon: any }[]> = {
//   ADMIN: [
//     { name: "Dashboard", href: "/dashboard", icon: Home },
//     { name: "Users", href: "/users", icon: UserPlus },
//     { name: "Trucks", href: "/vehicles", icon: Truck },
//     { name: "Drivers", href: "/drivers", icon: UserIcon },
//     { name: "Trips", href: "/trips", icon: LucideBriefcaseConveyorBelt },
//     // { name: "Tires", href: "/tire", icon: LifeBuoy },
//     { name: "Services", href: "/maintenance/services", icon: Cog },
//     { name: "Repair", href: "/maintenance/repairs", icon: Cog},
//   ],
//   DATA_ENTRY: [
//     { name: "Trips", href: "/trips", icon: LucideBriefcaseConveyorBelt },
//     { name: "part", href: "/maitenance/part", icon: Fingerprint },
//     { name: "service", href: "//maitenance/service", icon: Users },
//     { name: "repair", href: "//maitenance/repair", icon: Users },
//   ],
//   MANAGER: [
//     { name: "Trips", href: "/trips", icon: LucideBriefcaseConveyorBelt },
//     { name: "part", href: "/maitenance/part", icon: Fingerprint },
//     { name: "service", href: "//maitenance/service", icon: Users },
//     { name: "repair", href: "//maitenance/repair", icon: Users },
//   ],
// };

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);
//   const {data: session} = useSession()
//   const roles: Role[] = ["ADMIN", "DATA_ENTRY", "MANAGER"]
//   const rawRole = session?.user?.role
// //  const currentUserRole: Role = session?.user?.role ?? "staff"
//  const currentUserRole: Role = roles.includes(rawRole as Role)
//   ? (rawRole as Role)
//   : "MANAGER"
//   console.log("current user role",currentUserRole)
//   const isActive = (href: string) => pathname === href;
//   const menu = menuByRole[currentUserRole];
//   return (
//     <>
//       {/* Mobile menu button */}
//       <button
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white-900 text-white rounded-md"
//         onClick={() => setOpen(!open)}
//       >
//         <Menu className="w-6 h-6" />
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed top-0 left-0 h-full w-64 bg-blue-800 text-white flex flex-col transform transition-transform duration-300 z-40",
//           open ? "translate-x-0" : "-translate-x-full",
//           "lg:translate-x-0"
//         )}
//       >
//         {/* Logo */}
//         <div className="p-6 border-b border-blue-700">
//           <div className="text-2xl font-bold">OGBE </div>
//           <p className="text-sm text-blue-200">TRADING VENTURE</p>
//         </div>

//         {/* Animated menu */}
//         <nav className="flex-1 p-4 space-y-2">
//           {menu.map((item, index) => {
//             const active = isActive(item.href);

//             return (
//               <motion.div
//                 key={item.name}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Link
//                   href={item.href}
//                   onClick={() => setOpen(false)}
//                   className={cn(
//                     "flex items-center gap-3 p-3 rounded-lg transition-colors",
//                     active
//                       ? "bg-blue-700 font-semibold"
//                       : "hover:bg-blue-700 hover:font-medium"
//                   )}
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.2, rotate: 10 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <item.icon className="w-5 h-5" />
//                   </motion.div>
//                   {item.name}
//                 </Link>
//               </motion.div>
//             );
//           })}
//         <button onClick={()=>signOut({callbackUrl: '/'})} 
//           className={cn("flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-blue-700 hover:font-medium")}>
//          <motion.div
//            whileHover={{ scale: 1.2, rotate: 10 }}
//            whileTap={{ scale: 0.95 }}>
//             <LogOut className="w-5 h-5" />
//          </motion.div>
//         <span className="hidden lg:block">Logout</span>
//         </button>
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-blue-700 text-sm text-blue-200">
//           © {new Date().getFullYear()} MyCompany
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}
//     </>
//   );
// }


// src/components/layout/Sidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Truck,
  UserCircle,
  Map,
  Wrench,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Cog,
  LifeBuoy,
} from "lucide-react";

type Role = "ADMIN" | "DATA_ENTRY" | "MANAGER";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  prefix: string; // used for active detection
  badge?: number;
  children?: { name: string; href: string; prefix: string }[];
};

const menuByRole: Record<Role, MenuItem[]> = {
  ADMIN: [
    { name: "Dashboard",  href: "/dashboard",              icon: LayoutDashboard, prefix: "/dashboard" },
    { name: "Users",      href: "/users",                  icon: Users,           prefix: "/users" },
    { name: "Trucks",     href: "/vehicles",               icon: Truck,           prefix: "/vehicles" },
    { name: "Drivers",    href: "/drivers",                icon: UserCircle,      prefix: "/drivers" },
    { name: "Trips",      href: "/trips",                  icon: Map,             prefix: "/trips" },
    {
      name: "Maintenance",
      href: "/maintenance",
      icon: Wrench,
      prefix: "/maintenance",
      children: [
        { name: "Services", href: "/maintenance/services", prefix: "/maintenance/services" },
        { name: "Repairs",  href: "/maintenance/repairs",  prefix: "/maintenance/repairs"  },
        { name: "Parts",    href: "/maintenance/parts",    prefix: "/maintenance/parts"    },
        { name: "Tires",    href: "/maintenance/tires",    prefix: "/maintenance/tires"    },
      ],
    },
  ],
  DATA_ENTRY: [
    { name: "Trips",    href: "/trips",                  icon: Map,    prefix: "/trips"    },
    {
      name: "Maintenance",
      href: "/maintenance",
      icon: Wrench,
      prefix: "/maintenance",
      children: [
        { name: "Parts",    href: "/maintenance/parts",    prefix: "/maintenance/parts"    },
        { name: "Services", href: "/maintenance/services", prefix: "/maintenance/services" },
        { name: "Repairs",  href: "/maintenance/repairs",  prefix: "/maintenance/repairs"  },
      ],
    },
  ],
  MANAGER: [
    { name: "Dashboard", href: "/dashboard",              icon: LayoutDashboard, prefix: "/dashboard" },
    { name: "Trips",     href: "/trips",                  icon: Map,             prefix: "/trips"    },
    {
      name: "Maintenance",
      href: "/maintenance",
      icon: Wrench,
      prefix: "/maintenance",
      children: [
        { name: "Parts",    href: "/maintenance/parts",    prefix: "/maintenance/parts"    },
        { name: "Services", href: "/maintenance/services", prefix: "/maintenance/services" },
        { name: "Repairs",  href: "/maintenance/repairs",  prefix: "/maintenance/repairs"  },
      ],
    },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  ADMIN:      "Administrator",
  DATA_ENTRY: "Data Entry",
  MANAGER:    "Manager",
};

export default function Sidebar() {
  const pathname  = usePathname();
  const { data: session } = useSession();
  const [open, setOpen]   = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("/maintenance");

  const roles: Role[]         = ["ADMIN", "DATA_ENTRY", "MANAGER"];
  const rawRole               = (session as any)?.user?.role;
  const currentRole: Role     = roles.includes(rawRole as Role) ? (rawRole as Role) : "MANAGER";
  const menu                  = menuByRole[currentRole];

  const userName   = (session as any)?.user?.name   ?? "User";
  const userImage  = (session as any)?.user?.image  ?? null;

  // Prefix-based active detection — matches /vehicles, /vehicles/123, /vehicles/update/123
  const isActive      = (prefix: string) => pathname.startsWith(prefix);
  const isGroupActive = (item: MenuItem)  =>
    item.children?.some((c) => isActive(c.prefix)) || isActive(item.prefix);

  function toggleGroup(prefix: string) {
    setExpandedGroup((prev) => (prev === prefix ? null : prefix));
  }

  const sidebarContent = (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
    >
      {/* ── Logo ── */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C8A96E] flex items-center justify-center flex-shrink-0">
            <Truck className="w-4 h-4 text-[#0D1117]" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-white">OGBE</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Trading Venture</div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {menu.map((item, i) => {
          const active      = isGroupActive(item);
          const hasChildren = !!item.children?.length;
          const isExpanded  = expandedGroup === item.prefix || isGroupActive(item);

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              {hasChildren ? (
                // ── Group with children ──────────────────────────────────
                <div>
                  <button
                    onClick={() => toggleGroup(item.prefix)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                      active
                        ? "bg-[#C8A96E]/10 text-[#C8A96E]"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider flex-1">{item.name}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-7 mt-0.5 space-y-0.5 border-l border-white/[0.06] pl-3"
                      >
                        {item.children!.map((child) => {
                          const childActive = isActive(child.prefix);
                          return (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all text-xs ${
                                childActive
                                  ? "text-[#C8A96E] bg-[#C8A96E]/10 font-semibold"
                                  : "text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.04]"
                              }`}
                            >
                              {childActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] flex-shrink-0" />
                              )}
                              {!childActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 flex-shrink-0" />
                              )}
                              {child.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // ── Leaf item ─────────────────────────────────────────────
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    active
                      ? "bg-[#C8A96E]/10 text-[#C8A96E] font-semibold"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Active indicator bar */}
                  <div className={`w-0.5 h-4 rounded-full flex-shrink-0 transition-all ${active ? "bg-[#C8A96E]" : "bg-transparent"}`} />
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider">{item.name}</span>
                </Link>
              )}
            </motion.div>
          );
        })}
      </nav>

      {/* ── User card + Logout ── */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-4 space-y-1">
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.04] mb-2">
          <div
            className="w-8 h-8 rounded-full bg-[#C8A96E]/20 border border-[#C8A96E]/30 flex-shrink-0 flex items-center justify-center bg-center bg-cover"
            style={userImage ? { backgroundImage: `url(${userImage})` } : undefined}
          >
            {!userImage && (
              <span className="text-[#C8A96E] text-xs font-bold">{userName[0]?.toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-300 truncate">{userName}</p>
            <p className="text-[10px] text-zinc-600">{ROLE_LABELS[currentRole]}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-900/10 transition-all"
        >
          <div className="w-0.5 h-4 rounded-full flex-shrink-0 bg-transparent" />
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">Logout</span>
        </button>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 py-3 border-t border-white/[0.06]">
        <p className="text-[10px] text-zinc-700">© {new Date().getFullYear()} Ogbe Trading</p>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile toggle button ── */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#161B22] border border-white/[0.06] text-white rounded-lg shadow"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ── */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : undefined }}
        className={`
          fixed top-0 left-0 h-full w-60 z-40
          bg-[#0D1117] border-r border-white/[0.06]
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:block
        `}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}
