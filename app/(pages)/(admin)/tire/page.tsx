"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Eye, RefreshCcw } from "lucide-react";
import DashboardLayout from "@/components/layout/Dashboard";
import DateField from "@/components/utils/DateComponent";
import { useForm,useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { TireSchema } from '@/components/validators/tireSchema';


interface TireAction {
  id: string;
  tireActionType: string;
  positionInstalled: string,
  actionDate: string;
  odometerReadingKm: number;
  notes?: string;
}

interface Tire {
  id: string;
  brand: string;
  model: string;
  serialNumber: string;
  position: string;
  vehicle: { plateNumber: string };
  tireActions:[{tireActionType:string, positionInstalled:string}],
  createdAt: string;
}



interface Truck {
  id: string;
  plateNumber: string;
  model: string;
  make: string;
  createdAt: string;

}

const TireActionSchema = z.object({
  tireActionType: z.enum(["Installed","Rotated","Removed","OTHER"]),
  positionInstalled: z.string(),
  actionDate: z.iso.datetime("Use the calendar to pick a date"),
  notes: z.string(),
});
const TireSchema = z.object({
  brand: z.string().min(1, "brand is required"),
  serialNumber: z.string().min(1, "Capacity number required"),
  position: z.string().min(1, "position number required"),
  initialKm: z.number().int().min(0, "initialKm reading must be zero or positive."),
  model: z.string().min(1, "brand is required"),
  vehicleId: z.string().optional(),
  purchaseDate: z.iso.datetime("Use the calendar to pick a date"),
  tireActions: z.array(TireActionSchema),
});

type FormValues = z.infer<typeof TireSchema>;

export default function TiresPage() {
  const [tires, setTires] = useState<Tire[]>([]);
  const [truck, setTrucks] = useState<Truck[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openTireAction, setTireAction] = useState(false)
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [form, setForm] = useState({
    brand: "",
    model: "",
    serialNumber: "",
    position: "",
    truckId: "",
  });
  const [ActionForm, setActionForm] = useState({
    actionType: "",
    positionInstalled:"",
    actionDate: "",
    odometerReadingKm: "",
    notes: "",
  });
const router = useRouter();
    const { register,control, handleSubmit, watch, setValue,reset, formState: { errors } } = useForm<FormValues>({
      resolver: zodResolver(TireSchema),
      defaultValues: { 
        brand: "", 
        serialNumber: "", 
        position: "",  
        model: "",
        initialKm:0,
        vehicleId: undefined,
        purchaseDate:"",
        tireActions:[]
      },
    });

    const watched = watch();

    const { fields, append, remove } = useFieldArray({ control, name: "tireActions" });

  const vehicleId = watch("vehicleId")

  async function fetchTires() {
    const res = await fetch(`/api/tires?page=${page}&limit=${limit}&search=${encodeURIComponent(q)}`);
    const data = await res.json();
    console.log("action type", data.items)
    setTires(data.items);
    setTotal(data.total || 0);
  }

    async function fetchTruck() {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    setTrucks(data.items);
  }

   useEffect(() => {
    fetchTires();
    fetchTruck()
  }, [page, q]);

 useEffect(() => {
    if (!vehicleId) { setTireAction(false);remove(0); return; }
    setTireAction(true)
    append({ tireActionType: "Installed", positionInstalled:"", actionDate:"", notes:"" })
  }, [vehicleId]);

  async function onSubmit( data: FormValues) {
    
    try {
    setLoading(true);
    const payload: any = { ...data };
    const res = await fetch("/api/tires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Tire added successfully");
      
      setShowAdd(false);
      fetchTires();
    } else toast.error("Failed to add tire");
      const json = await res.json().catch(() => ({}));
      toast.error(json?.message || "Failed to create vehicle");
    setLoading(false);
        } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTire(id: string) {
    if (!confirm("Delete this tire?")) return;
    const res= await fetch(`/api/tires/${id}`, { method: "DELETE" });

    if (res.ok) {
    toast.success("Tire deleted");
    fetchTires();
    }
    toast.error("Tire is not deleted");

  }

//  async function handleAddAction(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);

//     const res = await fetch(`/api/tire-action/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         odometerReadingKm: Number(ActionForm.odometerReadingKm),
//       }),
//     });
//         if (res.ok) {
//           toast.success("Action logged");
//           setActionForm({ actionType: "",positionInstalled:"", actionDate: "", odometerReadingKm: "", notes: "" });
//           setOpen(false);
          
//         } else {
//           toast.error("Failed to log action");
//         }
    
//         setLoading(false);
//       }
  console.log("lets see errors",errors)

  return (
    <>
    <DashboardLayout>
      <Toaster />
      <main className="min-h-screen bg-gray-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Tire Management</h1>
            <div className="flex items-center gap-2">
            <input className="border px-2 py-1 rounded" placeholder="Search name or email" value={q} onChange={(e)=>setQ(e.target.value)} />
            <Button onClick={() => setShowAdd(!showAdd)}>
              <Plus className="mr-2" size={16} /> Add Tire
            </Button>
            </div>
          </div>

          {showAdd && (
            <Card className="p-4 mb-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Brand</Label>
                  <Input {...register("brand")} placeholder="Brand" />
                    {errors.brand && <p className="text-sm text-red-600 mt-1">{errors.brand.message}</p>}
                </div>
                <div>
                  <Label>Model</Label>
                  <Input {...register("model")} placeholder="Model" />
                </div>
                <div>
                  <Label>Serial Number</Label>
                  <Input {...register("serialNumber")} placeholder="Serial Number" />
                </div>
                <div>
                  <Label>Position</Label>
                 <select {...register("position")} className="w-full border p-2 rounded">
                    <option value="">-- Select Tire Position</option>
                  <option value="Front-Left"> Front-Left</option>
                  <option value="Front-Right"> Front-Right</option>
                  <option value="Middle-Left">Middle-Left </option>
                  <option value="Middle-Right">Front-Right</option>
                  <option value="Back-Left">Back-Left </option>
                  <option value="Back-Right">Back-Right</option>
                </select>
                </div>
                <div>
                  <Label>Truck </Label>
                   <select {...register("vehicleId")} className="w-full border p-2 rounded">
                  <option value="">-- Select Truck</option>
                  {truck.map((d) => <option key={d.id} value={d.id}>{d.plateNumber}</option>)}
                </select>
                </div>
                 <div>
                  <Label>Maximun KM to Covered</Label>
                  <Input {...register("initialKm", { valueAsNumber: true })} placeholder="Brand" />
                    {errors.initialKm && <p className="text-sm text-red-600 mt-1">{errors.initialKm.message}</p>}
                </div>
                <div>
                  <DateField
                    label="Purchase date"
                    value={watched?.purchaseDate}
                    onSelectISO={(iso) => setValue("purchaseDate", iso, { shouldValidate: true })}
                  />
                    {errors.purchaseDate && <p className="text-sm text-red-600 mt-1">{(errors.purchaseDate as any).message}</p>}
                </div>
                {openTireAction && (
                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      {fields.map((field, idx) => (
                        <div key={field.id} className="grid grid-cols-4 gap-2 items-end">
                          <div>
                            <label className="block text-sm">Tire Action</label>
                            <select {...register(`tireActions.${idx}.tireActionType` as const)} className="w-full border p-2 rounded">
                              <option value="">Select tire position</option>
                              <option value="Installed">Installed</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm">Position Installed</label>
                            <select {...register(`tireActions.${idx}.positionInstalled` as const)} className="w-full border p-2 rounded">
                              <option value=""> -- Select Installed Position</option>
                              <option value="Front-Left">Front-Left</option>
                              <option value="Front-Right">Front-Right</option>
                              <option value="Middle-Left">Middle-Left </option>
                              <option value="Middle-Right">Front-Right</option>
                              <option value="Back-Left">Back-Left </option>
                              <option value="Back-Right">Back-Right</option>
                            </select>
                          </div>

                          <div>
                            <DateField
                              label="Date Installed"
                              value={watch(`tireActions.${idx}.actionDate` as const)}
                              onSelectISO={(iso) => setValue(`tireActions.${idx}.actionDate`as const, iso, { shouldValidate: true })}
                            />                
                          </div>

                          <div>
                            <label className="block text-sm">Note</label>
                            <input {...register(`tireActions.${idx}.notes` as const,)} className="w-full border p-2 rounded" placeholder=" note"/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                )}
                <div className="col-span-2 flex justify-end gap-3 mt-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setShowAdd(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Brand</th>
                  <th>Model</th>
                  <th>Serial</th>
                  <th>Position</th>
                  <th>Installed Position</th>
                  <th>Last Action</th>
                  <th>Truck</th>
                  <th className="p-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tires.map(tire => (
                  <tr key={tire.id} className="border-b">
                    <td className="p-2">{tire.brand}</td>
                    <td>{tire.model}</td>
                    <td>{tire.serialNumber}</td>
                    <td>{tire.position}</td>
                    <td>{tire?.tireActions[tire?.tireActions.length-1]?.positionInstalled ?? "-"}</td>
                    <td>{tire?.tireActions[tire?.tireActions.length-1]?.tireActionType ?? "-"}</td>
                    <td>{tire.vehicle?.plateNumber ?? "-"}</td>
                    <td className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={()=>router.push(`/tire/${tire.id}`)}>
                        <Eye size={16} />
                      </Button>
                      
                       <Button variant="ghost" size="sm" >
                        <RefreshCcw size={16} />
                      </Button>
                      
                      <Button variant="destructive" size="sm" onClick={() => deleteTire(tire.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination page={page} total={total} limit={limit} onPage={(p)=>setPage(p)} />
          </Card>
        </motion.div>
      </main>
      </DashboardLayout>
    </>
  );
}
