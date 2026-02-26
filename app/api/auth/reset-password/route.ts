// src/app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { hashToken } from "@/app/lib/token";
import { hashPassword } from "@/app/lib/auth";

const ResetSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parse = ResetSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json(
        { ok: false, errors: parse.error.format() },
        { status: 400 }
      );
    }
    const { token, password } = parse.data;

    // Hash token exactly as stored
    const hashed = hashToken(token);

    // Find token record
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { hashedToken: hashed },
      include: { user: true },
    });

    if (!tokenRecord) {
      return NextResponse.json({ ok: false, message: "Invalid or expired token." }, { status: 400 });
    }

    if (tokenRecord.expiresAt < new Date()) {
      // expired — delete it
      await prisma.passwordResetToken.deleteMany({ where: { userId: tokenRecord.userId } });
      return NextResponse.json({ ok: false, message: "Invalid or expired token." }, { status: 400 });
    }

    const user = tokenRecord.user;
    if (!user) {
      // remove tokens for safety
      await prisma.passwordResetToken.deleteMany({ where: { hashedToken: hashed } });
      return NextResponse.json({ ok: false, message: "Invalid or expired token." }, { status: 400 });
    }

    // Hash new password and update user
    const newHashedPassword = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: newHashedPassword,
          passwordChangedAt: new Date(),
        },
      }),
      // delete all tokens for this user
      prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
    ]);

    // Optionally: revoke existing sessions (if you have session table or JWTs you can enforce check with passwordChangedAt in callbacks)
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("reset-password error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
