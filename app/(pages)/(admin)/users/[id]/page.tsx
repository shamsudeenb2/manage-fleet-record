// src/app/admin/users/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/Dashboard";

const UpdateSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(["ADMIN","DATA_ENTRY","DRIVER"]).optional(),
  profileImage: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof UpdateSchema>;

export default function UserDetailPage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(UpdateSchema) });

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/users/register/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed");
      reset(json.user);
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Failed to load");
    } finally { setLoading(false); }
  }

  useEffect(()=>{ load() }, [id]);

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/users/register/${id}`, { method: "PATCH", headers: { "Content-Type":"application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Update failed");
      toast.success("Updated");
      load();
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Update failed");
    } finally { setLoading(false); }
  }

  return (
    <>
      <Toaster />
      <DashboardLayout>
      <main className="p-6">
        <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}>
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">User details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm">Name</label>
                <input className="w-full border p-2 rounded" {...register("name")} />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm">Role</label>
                <select className="w-full border p-2 rounded" {...register("role")}>
                  <option value="DATA_ENTRY">Data entry</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DRIVER">Driver</option>
                </select>
              </div>

              <div className="flex gap-3">
                <Button type="submit">Save</Button>
                <Button variant="secondary" onClick={()=>window.history.back()}>Back</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </main>
      </DashboardLayout>
    </>
  );
}
