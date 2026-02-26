import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from "zod";
import { TireActionSchema } from '@/components/validators/tireSchema';

const tireActionSchema = z.object({
  tireActionType: z.string().min(1, "Action type required"),
  positionInstalled: z.string().min(1, "Position type required"),
  actionDate: z.string(),
  odometerReadingKm: z.number().min(0),
  notes: z.string().optional(),
});

export async function GET(
  _: Request,
  { params }: { params: { tireId: string } }
) {
  const tireId = await params.tireId
  const actions = await prisma.tireAction.findMany({
    where: { tireId:tireId },
    orderBy: { actionDate: "desc" },
  });
  return NextResponse.json(actions);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const parsed = TireActionSchema.parse(body);
    const id = await params.id
    const action = await prisma.tireAction.create({
      data: {
        tireId: id,
        tireActionType: parsed.tireActionType,
        positionInstalled: parsed.positionInstalled,
        actionDate: new Date(parsed.actionDate),
        odometerReadingKm: parsed.odometerReadingKm,
        notes: parsed.notes ?? "",
      },
    });

    return NextResponse.json(action);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create tire action" }, { status: 500 });
  }
}
