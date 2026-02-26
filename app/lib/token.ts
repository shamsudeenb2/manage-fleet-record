// src/lib/token.ts
import { randomBytes, createHash } from "crypto";

/**
 * Generate a secure random token (plain) to send to user.
 */
export function generateTokenHex(bytes = 32) {
  return randomBytes(bytes).toString("hex"); // 64 hex chars with bytes=32
}

/**
 * Hash token with sha256 for safe storage.
 */
export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}
