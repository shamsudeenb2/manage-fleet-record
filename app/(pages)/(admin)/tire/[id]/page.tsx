"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Card } from "@/components/ui/card";
import DateField from "@/components/utils/DateComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm,useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/layout/Dashboard";
import { TireActionSchema } from '@/components/validators/tireSchema';

interface Tire {
  id: string;
  brand: string;
  model: string;
  serialNumber: string;
  position: string;
  tireActions:[{tireActionType:string, positionInstalled:string}],
  vehicle: { plateNumber: string };
  initialKm: number;
  purchaseDate: string;
}

interface TireAction {
  id: string;
  tireActionType: string;
  positionInstalled: string,
  actionDate: string;
  odometerReadingKm: number;
  notes?: string;
}
interface Truck {
  id: string;
  plateNumber: string;
  model: string;
  make: string;
  createdAt: string;

}
type FormValues = z.infer<typeof TireActionSchema>;
export default function TireDetailsPage() {
  const { id }= useParams();
  const [tire, setTire] = useState<Tire | null>(null);
  const [actions, setActions] = useState<TireAction[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [truck, setTrucks] = useState<Truck[]>([]);


      const { register,control, handleSubmit, watch, setValue,reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(TireActionSchema),
        defaultValues: {
          tireId:"",
          tireActionType: "Installed", 
          positionInstalled: "", 
          actionDate: "",
          odometerReadingKm: 0,
          notes: "",
          vehicleId:""
        },
      });
  
      const watched = watch();


  const [form, setForm] = useState({
    tireActionType: "",
    positionInstalled:"",
    actionDate: "",
    odometerReadingKm : "",
    notes: "",
  });

  async function fetchTire() {
    const res = await fetch(`/api/tires/${id}`);
    const data = await res.json();
    console.log("action type", data)
    setTire(data);
    setActions(data.tireActions)
  }

    async function fetchTruck() {
    const res = await fetch("/api/vehicles");
    const data = await res.json();
    console.log("name of them", data.items)
    setTrucks(data.items);
  }

  useEffect(() => {
    fetchTire();
    fetchTruck();
    setValue("tireId", id as string)
  }, [id]);

  async function onSubmit(data: FormValues) {
    try {
    setLoading(true);
    const payload: any = { ...data };
    console.log("submiting foem",payload)
    const res = await fetch(`/api/tire-action`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });


    if (res.ok) {
      toast.success("Action logged");
      setForm({ tireActionType: "",positionInstalled:"", actionDate: "", odometerReadingKm: "", notes: "" });
      setOpen(false);
      fetchTire()
      // fetchTire();
    } else  toast.error("Failed to add tire");
      const json = await res.json().catch(() => ({}));
      toast.error(json?.message);
    setLoading(false);
        } catch (err: any) {
      console.error(err);
      toast.error(err?.message)
    } finally {
      setLoading(false);
    }
  }

  if (!tire) return <p className="text-center mt-10">Loading tire details...</p>;
  const index:number = tire?.tireActions.length-1

  return (
    <>
    <DashboardLayout>
      <Toaster />
      <main className="min-h-screen bg-gray-50 p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Tire Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Brand : </strong> {tire.brand}</p>
              <p><strong>Model : </strong> {tire.model}</p>
              <p><strong>Serial Number : </strong> {tire.serialNumber}</p>
              <p><strong>Tire Position : </strong> {tire.position}</p>
              <p><strong>Installed Position : </strong>{tire?.tireActions[index]?.positionInstalled ?? "-"}</p>
              <p><strong>Status : </strong>{tire?.tireActions[index]?.tireActionType ?? "-"}</p>
              <p><strong>Truck Plate : </strong> {tire.vehicle?.plateNumber ?? "-"}</p>
              <p><strong>Initial KM : </strong> {tire.initialKm}</p>
              <p><strong>Purchase Date : </strong> {tire.purchaseDate ? new Date(tire.purchaseDate).toLocaleDateString() : "N/A"}</p>
            </div>
          </Card>

          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Lifecycle Actions</h3>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button><Plus size={16} className="mr-2" /> Add Action</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Tire Action</DialogTitle>
                </DialogHeader>
               <form onSubmit={handleSubmit(onSubmit)}className="space-y-3 mt-3">
                     <div>
                            <label className="block text-sm">Tire Action</label>
                            <select {...register(`tireActionType` as const)} className="w-full border p-2 rounded">
                              <option value="">Select tire position</option>
                              <option value="Installed">Installed</option>
                              <option value="Removed">Removed</option>
                              <option value="Rotated">Rotated</option>
                              <option value="Others">Others</option>
                            </select>
                        </div>

                          <div>
                            <label className="block text-sm">Position Installed</label>
                            <select {...register(`positionInstalled` as const)} className="w-full border p-2 rounded">
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
                              value={watch(`actionDate` as const)}
                              onSelectISO={(iso) => setValue(`actionDate`as const, iso, { shouldValidate: true })}
                            />                
                          </div>
                          <div>
                            <Label>Truck </Label>
                            <select {...register("vehicleId")} className="w-full border p-2 rounded">
                            <option value="">-- Select Truck</option>
                            {truck.map((d) => <option key={d.id} value={d.id}>{d.plateNumber}</option>)}
                          </select>
                          </div>
                          <div>
                            <label className="block text-sm">Note</label>
                            <input {...register(`notes` as const,)} className="w-full border p-2 rounded" placeholder=" note"/>
                          </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="p-4">
            {actions.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">No actions recorded yet.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">Status</th>
                     <th className="p-2">Position</th>
                    <th>Date</th>
                    <th>Odometer</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map(a => (
                    <tr key={a.id} className="border-b">
                      <td className="p-2">{a.tireActionType}</td>
                      <td className="p-2">{a.positionInstalled}</td>
                      <td>{new Date(a.actionDate).toLocaleDateString()}</td>
                      <td>{a.odometerReadingKm} km</td>
                      <td>{a.notes ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </motion.div>
      </main>
      </DashboardLayout>
    </>
  );
}
