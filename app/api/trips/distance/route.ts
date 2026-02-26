import { NextResponse } from "next/server";
import  prisma  from "@/components/lib/db";
import { includes, z } from "zod";
import { getSession } from "next-auth/react";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const loadingPlant = url.searchParams.get("loadingPlant");
    const destination = url.searchParams.get("destination");
    const driverId = url.searchParams.get("driverId");

    
    // const where: any = {};

    let distance

    if (loadingPlant && destination) {
      const capLoading = capitalizeFirstLetter(loadingPlant)
      const capDistination = capitalizeFirstLetter(destination)
      distance= await prisma.trip.findFirst({
        where:{ 
          loadingPlant: capLoading || undefined, 
          destination: capDistination || undefined},
          select:{
            distanceKm:true,
          },
          orderBy: {
            createdAt: 'desc', // Sorts in descending order of creation time
           },
        })
  }

  let item
    if(driverId){
      item= await prisma.trip.findFirst({
        where:{ 
          driverId:driverId || undefined,
         },
          select:{
            fuels:{
              orderBy: {
              createdAt: 'desc', // Order by creation date in descending order
              },
              take: 1,
              select:{
                qtyLeft:true
              }
            }
          },
          orderBy: {
            createdAt: 'desc', // Sorts in descending order of creation time
           },
        })
    }

    console.log("lets see it",distance, item)
  return NextResponse.json({ ok: true, distance, qtyLeft: item?.fuels[0]?.qtyLeft }, { status: 200 });
   

  } catch (err) {
    console.error("GET /api/trips error", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}