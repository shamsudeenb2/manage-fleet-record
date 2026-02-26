// src/app/api/auth/users/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/components/lib/db";
import { hashPassword } from "@/app/lib/auth";
import { getSession } from "@/app/config/auth";

const RegisterSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special char"),
  role: z.enum(["ADMIN", "MANAGER", "DATA_ENTRY"]).optional(),
  profileImage: z.string().optional(),
});

// ── POST: Create a new user ───────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    // Auth check — only ADMIN or DATA_ENTRY can create users
    const session = await getSession();
    const sessionRole = (session as any)?.user?.role;
    if (!session || !["ADMIN", "MANAGER"].includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const { email, name, password, role, profileImage } = parsed.data;

    // Check for duplicate email
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, message: "Email already in use" }, { status: 409 });
    }

    // Role assignment: only ADMIN can set roles other than DATA_ENTRY
    const finalRole: "ADMIN" | "MANAGER" | "DATA_ENTRY"  =
      sessionRole === "ADMIN" ? (role ?? "MANAGER") : "MANAGER";

    const hashed = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashed,
        role: finalRole,
        profileImage: profileImage ?? "",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, user: newUser }, { status: 201 });
  } catch (err: any) {
    console.error("[register] error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── GET: List users with pagination + search ─────────────────────────────
export async function GET(req: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.min(Math.max(1, Number(url.searchParams.get("limit") ?? 10)), 100);
    const search = url.searchParams.get("search") ?? "";
    const role = url.searchParams.get("role"); // optional role filter

    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role && role !== "ALL") {
      where.role = role;
    }

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          profileImage: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json(
      { ok: true, items, total, page, limit, pages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[users GET] error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── DELETE: Soft-delete a user ─────────────────────────────────────────────
// Note: this is here as a convenience; you may keep it in /api/admin/users/[id]/route.ts
// src/app/api/admin/users/[id]/route.ts
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   const session = await getSession();
//   if ((session as any)?.user?.role !== "ADMIN")
//     return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//   await prisma.user.update({ where: { id: params.id }, data: { deletedAt: new Date() } });
//   return NextResponse.json({ ok: true });
// }
