// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <Sidebar />
//       <Navbar />
//       <main className="pt-16 lg:ml-64 p-6 bg-gray-50 min-h-screen">
//         {children}
//       </main>
//     </div>
//   );
// }

// src/components/layout/Dashboard.tsx
"use client";

import React from "react";
import Sidebar from "./Sidebar";
import Navbar  from "./Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen bg-[#0D1117] overflow-hidden"
      style={{ fontFamily: "'DM Mono', 'Fira Mono', monospace" }}
    >
      {/* ── Sidebar (fixed width on desktop) ── */}
      <Sidebar />

      {/* ── Main area ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden lg:ml-0">
        {/* Navbar is fixed — offset by sidebar width on lg+ via its own CSS */}
        <Navbar />

        {/* Page content scrollable area */}
        <main className="flex-1 overflow-y-auto pt-14">
          {children}
        </main>
      </div>
    </div>
  );
}
