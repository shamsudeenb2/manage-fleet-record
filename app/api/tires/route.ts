import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { Prisma } from '@/prisma/app/generated/prisma/client';
import { z } from "zod";

// app/api/tires/route.ts
import { TireSchema } from '@/components/validators/tireSchema'; // Your corrected schema


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 10), 100);
    const search = url.searchParams.get("search") ?? "";
  
    let where: any = {};
    if (search) {
      where.OR = [
        { brand: { contains: search, mode: "insensitive" } }, // ADDED mode
        { serialNumber: { contains: search, mode: "insensitive" } }, // ADDED mode
        { model: { contains: search, mode: "insensitive" } } // ADDED mode
       ];
    }

    const [items, total] = await Promise.all([
      prisma.tire.findMany({
         where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { vehicle: true, tireActions: true },
      }),
      prisma.tire.count({ where }),
    ])
   return NextResponse.json({ ok: true, items, total, page, limit }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

const PayloadSchema = z.object({
  data: TireSchema,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("req body", data)
    // const { data } = PayloadSchema.parse(body);

    const processedVehicleId = (data.vehicleId === "" || !data.vehicleId) ? null : data.vehicleId;

    const newTire = await prisma.tire.create({
      data:{
        brand: data.brand, 
        model:data.model, 
        serialNumber:data.serialNumber, 
        position:data.position,
        purchaseDate:data.purchaseDate,
        vehicleId:processedVehicleId ,
        initialKm:data.initialKm,
        tireActions: {
          create: data.tireActions.map((action:any) => {
            return{
              tireActionType: action.tireActionType,
              positionInstalled: action.positionInstalled, 
              actionDate: action.actionDate, 
              notes: action.notes,
            }
          }),
        },
      }
    });

    return NextResponse.json({ok:true, newTire});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create tire" }, { status: 500 });
  }
}
