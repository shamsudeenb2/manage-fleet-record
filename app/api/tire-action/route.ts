import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from 'zod';

// app/api/tire-actions/route.ts
import { TireActionSchema } from '@/components/validators/tireSchema';
//import { TireActionType } from '@prisma/client'; // Use Prisma's generated type for the enum
import { getTotalDistance } from '@/app/lib/analytics'; // Your previously created helper

/**
 * Finds the action date of the latest Installed and latest Removed action for a specific tire.
 *
 * @param {string} tireId - The ID of the tire to check.
 * @returns {Promise<{lastInstalledDate: Date | null, lastRemovedDate: Date | null}>}
 */
export async function getLastTireActionDates(tireId: string) {
  console.log("tireId covered", tireId)

  const [lastInstalled, lastRemoved] = await prisma.$transaction([
    // Query 1: Find the latest 'Installed' action    
    prisma.tireAction.findFirst({
      where: {
        tireId: tireId,
        tireActionType: "Installed",
      },
      orderBy: { actionDate: 'desc' },
      select: { actionDate: true },
    }),

    // Query 2: Find the latest 'Removed' action
    prisma.tireAction.findFirst({
      where: {
        tireId: tireId,
        tireActionType: "Removed",
      },
      orderBy: { actionDate: 'desc' },
      select: { actionDate: true },
    }),
  ]);

  console.log("list of date", lastInstalled, lastRemoved)
  return {
    startDate: lastInstalled?.actionDate,
    endDate: lastRemoved?.actionDate 
  };
}

// --- PUT: Create or Update a TireAction ---
// We use PUT for idempotence since this route ensures the tire history is updated to a certain state.
export async function PUT(req: Request) {
  try {
    const body: unknown = await req.json();

    // 1. Validation
    const validation = TireActionSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = validation.data;
    const { tireId, tireActionType, odometerReadingKm, ...actionRest } = data;

    // Standardize dates to UTC midnight
    // const processedActionDate = new Date(actionDate);
    // processedActionDate.setUTCHours(0, 0, 0, 0);

    // 2. Fetch Last Action and Tire State (Transaction ensures consistency)
    const [lastAction, currentTire] = await prisma.$transaction([
      // Get the last action performed on this specific tire
      prisma.tireAction.findFirst({
        where: { tireId: tireId },
        orderBy: { actionDate: 'desc' },
      }),
      // Get the current state of the tire (needed for vehicleId and initialKm)
      prisma.tire.findUnique({
        where: { id: tireId },
        select: { id: true, vehicleId: true, initialKm: true },
      })
    ]);

    if (!currentTire) {
      return NextResponse.json({ message: `Tire with ID ${tireId} not found.` }, { status: 404 });
    }

    // 3. Sequential Action Constraint & Business Logic Checks
    
    // Prevent same action performed immediately (e.g., Rotated -> Rotated)
    if (lastAction && lastAction.tireActionType === tireActionType) {
        return NextResponse.json(
            { message: `Cannot perform ${tireActionType} sequentially. Last action was also ${lastAction.tireActionType}.` }, 
            { status: 403 }
        );
    }

    // Installed Logic: Tire must NOT already be mounted on a truck (vehicleId must be null)
    if (tireActionType === 'Installed' && currentTire.vehicleId) {
        return NextResponse.json(
            { message: `Tire is already installed on truck ID ${currentTire.vehicleId}. Must be 'Removed' first.` }, 
            { status: 403 }
        );
    }

    // Rotated/Removed Logic: Tire must BE mounted on a truck (vehicleId must NOT be null)
    if ((tireActionType === 'Rotated' || tireActionType === 'Removed') && !currentTire.vehicleId) {
        return NextResponse.json(
            { message: `Tire must be installed on a truck to be ${tireActionType.toLowerCase()}.` }, 
            { status: 403 }
        );
    }

    const{startDate, endDate } = await getLastTireActionDates(data.tireId)
    console.log("distances covered date ",startDate, endDate)
    let distance
    const distanceCovered = await getTotalDistance({
    vehicleId: data.vehicleId,
    startDate: startDate,
    endDate: endDate,
  });
     console.log("distances covered",distanceCovered)
    // Odometer Constraint: New action must have an odometer reading greater than the tire's installation KM
    if (odometerReadingKm < currentTire?.initialKm) {
         return NextResponse.json(
            { message: `Odometer reading (${odometerReadingKm} km) must be greater than the tire's installation KM (${currentTire.initialKm} km).` }, 
            { status: 403 }
        );
    }


    // 4. State Update Logic (Perform nested update within a transaction)
    let updatedTireAction;

    await prisma.$transaction(async (tx) => {
        
        // --- A. Create the new TireAction ---
        updatedTireAction = await tx.tireAction.create({
            data: {
                tireId: tireId,
                tireActionType: tireActionType,
                actionDate: data.actionDate,
                odometerReadingKm: odometerReadingKm,  //create helper function to calculate the total km covered by the tire
                positionInstalled: data.positionInstalled ?? null,
                notes: data.notes ?? null,
            }
        });

        // --- B. Update the TIRE and TRUCK models based on the action ---
        
        if (tireActionType === 'Removed') {
            // If the tire is removed, set vehicleId on the Tire model to NULL
            await tx.tire.update({
                where: { id: tireId },
                data: {
                    vehicleId: null, // Essential: Tire is now unmounted
                }
            });
            // Optional: Update the Truck's odometer reading (if this action represents the most recent reading)
        } 
        
        if (tireActionType === 'Installed' && data.vehicleId) {
             // If installed, set the vehicleId on the Tire model
             await tx.tire.update({
                where: { id: tireId },
                data: {
                    vehicleId: data.vehicleId, // Set the new vehicleId
                }
            });
        }
    });

    // 5. Success Response
    return NextResponse.json(updatedTireAction, { status: 201 });

  } catch (error) {
    console.error('TireAction update failed:', error);
    
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: 'Validation Error', errors: error.flatten() }, { status: 400 });
    }
    
    return NextResponse.json({ message: 'Internal Server Error during transaction' }, { status: 500 });
  }
}