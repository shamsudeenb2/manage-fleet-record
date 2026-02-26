// src/lib/validation/tire.ts
import { z } from 'zod';

// --- TIRE ACTION SCHEMA ---
export const TireActionSchema = z.object({
  tireId: z.string().min(1, "Tire ID is required."),
  tireActionType: z.enum(["Installed", "Rotated", "Removed", "OTHER"]),
  
  // actionDate must be a string that can be parsed as a date (YYYY-MM-DD format from input type="date")
  actionDate: z.iso.datetime("Use the calendar to pick a date"),
  
  // positionInstalled is required ONLY if the actionType is 'Installed'
  positionInstalled: z.string().min(1, "Position is required"),
  odometerReadingKm: z.number().int().min(0, "Odometer reading must be zero or positive."),
  notes: z.string().optional(),
  vehicleId: z.string().optional(), 
}).superRefine((data, ctx) => {
    if (data.tireActionType === "Installed" && (!data.positionInstalled || data.positionInstalled.length === 0)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Position is required when tire is being installed.",
            path: ['positionInstalled'],
        });
    }
});

// --- TIRE SCHEMA ---
export const TireSchema = z.object({
  brand: z.string().min(1, "brand is required"),
  serialNumber: z.string().min(1, "Serial Number is required."), // Corrected error message
  position: z.string().min(1, "Position is required."), 
  model: z.string().min(1, "Position is required."),
  initialKm: z.number().int().min(0, "initialKm reading must be zero or positive."),
  
  // Use 'truckId' to match the Prisma schema
  vehicleId: z.string().optional(), 
  
  // Purchase Date is typically required for a new tire record
  purchaseDate: z.iso.datetime("Use the calendar to pick a date"),
  
  // tireActions is optional, but often sent for the initial installation action
  tireActions: z.array(TireActionSchema).default([]),
});

export type TireCreateData = z.infer<typeof TireSchema>;
export type EmploymentFormInput = z.input<typeof TireSchema>;
// If you ever need post-parse types elsewhere:
export type EmploymentFormOutput = z.output<typeof TireSchema>;
export type TireActionUpsertData = z.infer<typeof TireActionSchema>;