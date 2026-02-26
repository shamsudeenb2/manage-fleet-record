// src/lib/mailer.ts
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.EMAIL_FROM || `no-reply@${process.env.NEXTAUTH_URL?.replace(/^https?:\/\//, "")}`;

if (!host || !port || !user || !pass) {
  // In production you must set these. For dev you can use Ethereal or Mailtrap.
  console.warn("SMTP config missing. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465, // true for 465
  auth: { user, pass },
});

/**
 * Sends password reset link email.
 * @param to recipient email
 * @param token raw token (not hashed) that will be appended to URL
 * @param name optional user name
 */
export async function sendResetPasswordEmail(to: string, token: string, name?: string) {
  const base = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const resetUrl = `${base.replace(/\/$/, "")}/reset-password?token=${encodeURIComponent(token)}`;

  const subject = "Reset your password";
  const html = `
    <p>Hi ${name ?? ""},</p>
    <p>You recently requested to reset your password. Click the link below to set a new password. This link will expire in 15 minutes.</p>
    <p><a href="${resetUrl}">Reset password</a></p>
    <p>If the link does not open, copy and paste this URL into your browser:</p>
    <p><code>${resetUrl}</code></p>
    <p>If you didn't request this, you can ignore this email.</p>
    <hr/>
    <small>Sent from Fleet Manager</small>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text: `Reset your password: ${resetUrl}`,
  });
}
