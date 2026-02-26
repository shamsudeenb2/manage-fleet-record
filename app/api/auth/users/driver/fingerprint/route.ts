// import { NextResponse } from "next/server";
// import { z } from "zod";
// import  prisma  from "@/components/lib/db";
// import { getServerSession } from "next-auth";
// import  {getSession}  from "@/app/config/auth";

// export async function POST(req: Request) {
//   try {

//         const session = await getSession();
//         if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
//         return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//         }

//     const { driverId, fingerprint } = await req.json().catch(() => ({}));;

//     // Store the binary data or serialized template
//     const savedDriver = await prisma.driver.update({
//       where: { id:driverId },
//       data: {
//         fingerPrint: fingerprint, // Store as a String or Bytes/Blob
//       },
//     });

//     return NextResponse.json({ success: true, id: savedDriver.id });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to store biometric data' }, { status: 500 });
//   }
// }


// src/app/api/auth/users/driver/fingerprint/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { getSession } from "@/app/config/auth";

const FingerprintSchema = z.object({
  driverId:    z.string().uuid("Invalid driver ID"),
  fingerprint: z.string().min(1, "Fingerprint data is required"),
});

// ── POST: Save fingerprint for a driver ────────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = FingerprintSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const { driverId, fingerprint } = parsed.data;

    // Verify driver exists and is not deleted
    const driver = await prisma.driver.findUnique({
      where: { id: driverId, deletedAt: null },
      select: { id: true, name: true },
    });

    if (!driver) {
      return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
    }

    const updated = await prisma.driver.update({
      where: { id: driverId },
      data: { fingerPrint: fingerprint },
      select: { id: true, name: true },
    });

    return NextResponse.json(
      { ok: true, success: true, id: updated.id, name: updated.name },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[fingerprint POST]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to store biometric data", message: err?.message },
      { status: 500 }
    );
  }
}

// ── DELETE: Clear fingerprint for a driver ─────────────────────────────
export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session || (session as any)?.user?.role !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const driverId = url.searchParams.get("driverId");

    if (!driverId) {
      return NextResponse.json({ ok: false, message: "driverId query param is required" }, { status: 400 });
    }

    const driver = await prisma.driver.findUnique({
      where: { id: driverId, deletedAt: null },
      select: { id: true },
    });

    if (!driver) {
      return NextResponse.json({ ok: false, message: "Driver not found" }, { status: 404 });
    }

    await prisma.driver.update({
      where: { id: driverId },
      data: { fingerPrint: "" },
    });

    return NextResponse.json({ ok: true, message: "Fingerprint cleared" }, { status: 200 });
  } catch (err: any) {
    console.error("[fingerprint DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
