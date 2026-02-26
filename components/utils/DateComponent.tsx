import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

const isValidISODate = (value?: string) => {
  if (!value || typeof value !== "string") return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
};

const displayDate = (iso?: string) => (isValidISODate(iso) ? format(new Date(iso as string), "yyyy-MM-dd") : "");
/* ------------------------- Reusable Date Field (ISO) ---------------------- */
type DateFieldProps = {
  label: string;
  value?: string; // ISO string or ""
  onSelectISO: (iso: string) => void;
  minYear?: number;
  maxYear?: number;
  placeholder?: string;
};
export default function DateField({
  label,
  value,
  onSelectISO,
  minYear = 1960,
  maxYear = new Date().getFullYear() + 5,
  placeholder = "Select date",
}: DateFieldProps) {
  const selected = isValidISODate(value) ? new Date(value as string) : undefined;
  console.log("date and time",value)
  return (
    <div>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Input value={displayDate(value)} placeholder={placeholder} readOnly />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(d: Date | undefined) => {
              if (!d) return;
              onSelectISO(d.toISOString()); // store full ISO for server/prisma
            }}
            captionLayout="dropdown"
            startMonth={new Date(minYear, 0)}
            endMonth={new Date(maxYear, 11)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}