// src/app/admin/parts/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardLayout from "@/components/layout/Dashboard";
import { useParams, useRouter } from "next/navigation";
import DateField from "@/components/utils/DateComponent";

const PartSchema = z.object({
  name: z.string().min(1),
  serialNumber: z.string().min(1),
  description: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  unitCost: z.number().optional(),
  supplier: z.string().optional(),
  vehicleId:z.string().optional(),
  dateReplaced:z.iso.datetime("Use the calendar to pick a date"),
});

type PartForm = z.infer<typeof PartSchema>;
type Vehicle = {
    cap_no: string,
    plateNumber:string
    driver:{
        name:string
    }
}

export default function PartsPage() {
  const { id } = useParams() as { id: string };
  const [parts, setParts] = useState<any[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle>();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const { register, handleSubmit,watch,setValue, reset, formState: { errors } } = useForm<PartForm>({
    resolver: zodResolver(PartSchema),
    defaultValues: { name: "", serialNumber: "", description: "", brand: "",model:"", unitCost: 0, supplier: "" },
  });


    async function fetchVehicle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/vehicles/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed");
      setVehicle(json.vehicle ?? json.items ?? json);
      
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Failed to load parts");
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/maintenance/parts/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Failed");
      
      setParts(json?.items ?? json?.part ?? json);
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Failed to load parts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load();fetchVehicle(); }, []);

  async function onCreate(data: PartForm) {
    setCreating(true);
    try {
      const payload: any = { ...data };
      payload.vehicleId = id;
      const res = await fetch("/api/maintenance/parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Create failed");
      toast.success("Part added");
      reset();
      load();
    } catch (err:any) {
      console.error(err);
      toast.error(err?.message || "Failed to create part");
    } finally { setCreating(false); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete part?")) return;
    const res = await fetch(`/api/maintenance/parts/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = await res.json().catch(()=>({}));
      toast.error(j?.message || "Delete failed");
      return;
    }
    toast.success("Deleted");
    load();
  }

  return (
    <>
    <DashboardLayout>
      <Toaster />
      <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100">
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Card className="p-4 mb-4">
            <h2 className="text-lg font-semibold">Replace Parts for Truck {vehicle?.plateNumber}</h2>
            <h2 className="text-sm font-semibold mb-3">Driver: {vehicle?.driver?.name ?? "No Driver"}</h2>
            <form onSubmit={handleSubmit(onCreate)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <Label>Part Name</Label>
               <select {...register("name")} className="w-full border p-2 rounded">
                  <option value="Tire">Tire</option>
                  <option value="Fuel Pump">Fuel Pump</option>
                  <option value="Battery">Battery</option>
                  <option value="Injector">Injector</option>
                  <option value="Key Starter">Key Starter</option>
                </select>
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}   
                </div>
                <div>
                <Label>Brand</Label>
                <Input  {...register("brand")} />
                {errors.brand && <p className="text-sm text-red-600">{errors.brand.message}</p>}
              </div>
                <div>
                <Label>Model</Label>
                <Input {...register("model")} />
                {errors.model && <p className="text-sm text-red-600">{errors.model.message}</p>}
              </div>
              <div>
                <Label>Serial Number</Label>
                <Input {...register("serialNumber")} />
                {errors.serialNumber && <p className="text-sm text-red-600">{errors.serialNumber.message}</p>}
              </div>

              
              <div>
                <Label>Unit Price</Label>
                <Input type="number" step="0.01" {...register("unitCost", { valueAsNumber: true })} />
              </div>
              <div>
                <Label>Supplier</Label>
                <Input {...register("supplier")} />
              </div>
              <div>
                <DateField
                label="Replaced Date"
                value={watch(`dateReplaced` as const)}
                onSelectISO={(iso) => setValue(`dateReplaced`as const, iso, { shouldValidate: true })}
                />                
                </div>
              <div >
                <Label>Description</Label>
                <Input {...register("description")} />
              </div>
              </div>
              <div className="flex gap-2 mt-5">
                <Button type="submit" disabled={creating}>{creating ? "Adding..." : "Add Part"}</Button>
                <Button type="button" variant="secondary" onClick={() => reset()}>Reset</Button>
              </div>
            </form>
          </Card>

          <Card className="p-4">
            <table className="w-full">
              <thead>
                <tr className=" text-left bg-gray-100">
                  <th className="p-2">Part Name</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Model</th>
                  <th className="p-2">Serial Number</th>
                  <th className="p-2">Unit Price</th>
                  <th className="p-2">Supplier</th>
                  <th className="p-2">Replace Date</th>
                </tr>
              </thead>
              <tbody>
                {parts?.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p?.brand}</td>
                    <td className="p-2">{p?.model}</td>
                    <td className="p-2">{p?.serialNumber}</td>
                    <td className="p-2">{p.unitCost ?? "-"}</td>
                    <td className="p-2">{p.supplier ?? "-"}</td>
                    <td className="p-2">{p.DateTime ?? "-"}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </motion.div>
      </main>
      </DashboardLayout>
    </>
  );
}
