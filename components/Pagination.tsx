// src/components/admin/Pagination.tsx
"use client";
import React from "react";

export default function Pagination({ page, total, limit, onPage }: { page: number; total: number; limit: number; onPage: (p:number)=>void }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="flex items-center gap-2 mt-4">
      <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={()=>onPage(page-1)} disabled={page<=1}>Prev</button>
      <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
      <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={()=>onPage(page+1)} disabled={page>=totalPages}>Next</button>
    </div>
  );
}
