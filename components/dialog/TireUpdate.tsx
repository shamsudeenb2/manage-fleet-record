import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TiresPage() {
    return(
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
                <form onSubmit={handleAddAction} className="space-y-3 mt-3">
                  <div>
                    <Label>Action Type</Label>
                    <select
                      className="w-full border rounded p-2"
                      value={ActionForm.actionType}
                      onChange={e => setActionForm({ ...ActionForm, actionType: e.target.value })}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Installed">Installed</option>
                      <option value="Rotated">Rotated</option>
                      <option value="Removed">Removed</option>
                    </select>
                  </div>
                   <div>
                    <Label>Position</Label>
                    <select
                      className="w-full border rounded p-2"
                      value={ActionForm.positionInstalled}
                      onChange={e => setActionForm({ ...ActionForm, positionInstalled: e.target.value })}
                      required
                    >
                      <option value="">Select</option>
                        <option value="Front-Left"> Front-Left</option>
                        <option value="Front-Right"> Front-Right</option>
                        <option value="Middle-Left">Middle-Left </option>
                        <option value="Middle-Right">Front-Right</option>
                        <option value="Back-Left">Back-Left </option>
                        <option value="Back-Right">Back-Right</option>
                     </select>
                  </div>
                  <div>
                    <Label>Action Date</Label>
                    <Input
                      type="date"
                      value={ActionForm.actionDate}
                      onChange={e => setActionForm({ ...ActionForm, actionDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Odometer Reading (km)</Label>
                    <Input
                      type="number"
                      value={ActionForm.odometerReadingKm}
                      onChange={e => setActionForm({ ...ActionForm, odometerReadingKm: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <textarea
                      className="w-full border rounded p-2"
                      value={ActionForm.notes}
                      onChange={e => setActionForm({ ...ActionForm, notes: e.target.value })}
                      placeholder="Optional notes"
                    />
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
    )
}