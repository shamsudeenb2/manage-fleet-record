// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import prisma  from "@/components/lib/db";
import { generateTokenHex, hashToken } from "@/app/lib/token";
import { sendResetPasswordEmail } from "@/app/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = (body?.email ?? "").toString().trim().toLowerCase();

    // Always respond with 200 to avoid revealing whether email exists.
    if (!email) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    // if no user, respond 200 (no leak)
    if (!user) {
      // Consider logging an attempted reset for monitoring
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Rate-limit / flood control: if a token was created very recently, skip creating a new token.
    const MIN_INTERVAL_MS = 60 * 1000 * 2; // 2 minutes
    const recent = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        createdAt: { gte: new Date(Date.now() - MIN_INTERVAL_MS) },
      },
      orderBy: { createdAt: "desc" },
    });
    if (recent) {
      // still respond ok (avoid indicating resend)
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Remove existing tokens for user (single-use)
    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    // create new token
    const plainToken = generateTokenHex(32);
    const hashed = hashToken(plainToken);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.passwordResetToken.create({
      data: {
        hashedToken: hashed,
        userId: user.id,
        expiresAt,
      },
    });

    // send email (do not await too long — but we await to surface errors in dev)
    try {
      await sendResetPasswordEmail(user.email!, plainToken, user.name ?? undefined);
    } catch (err) {
      // If email sending fails, still respond 200 but log in server logs and optionally retry via a queue.
      console.error("Error sending reset password email:", err);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("forgot-password error:", error);
    // Return 200 to avoid revealing anything to attackers; for debugging in dev you may use 500
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}
