import { NextResponse } from "next/server";
import { z } from "zod";
import  prisma  from "@/components/lib/db";
import { getServerSession } from "next-auth";
import  {getSession}  from "@/app/config/auth";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const available = url.searchParams.get("available");

    //  const where: any = { deletedAt: null };
    const where = available === "true"
      ? { vehicle: null, deletedAt: null } // drivers without assigned vehicle
      : {};

    const drivers = await prisma.driver.findMany({
      where,
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        phone: true,
        vehicle: true,
      },
    });

    return NextResponse.json({ ok: true, drivers }, { status: 200 });
    
  } catch (err) {
    console.error("GET /api/drivers error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

