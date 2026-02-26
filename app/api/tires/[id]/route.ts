import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import  {getSession}  from "@/app/config/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const tire = await prisma.tire.findUnique({
    where: { id: params.id },
    include: { vehicle: true, tireActions: true },
  });
  return NextResponse.json(tire);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
  const session = await getSession();
  if (!session || (session as any).user?.role !== "ADMIN") {
        return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
      }
  const data = await req.json();
  const updated = await prisma.tire.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
    } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
      const session = await getSession();
      if (!session || (session as any).user?.role !== "ADMIN") {
        return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
      }
  const id = await params.id;
  await prisma.tire.delete({ where: { id }, });

  return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
