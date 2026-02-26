// src/components/admin/ConfirmButton.tsx
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ConfirmButton({ onConfirm, label = "Delete", confirmText = "Are you sure?" }: { onConfirm: ()=>Promise<void>, label?: string, confirmText?: string }) {
  async function handle() {
    const ok = confirm(confirmText);
    if (!ok) return;
    try {
      await onConfirm();
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Action failed");
    }
  }

  return <Button variant="destructive" onClick={handle}>{label}</Button>;
}
