// // src/app/api/admin/users/[id]/route.ts
// import { NextResponse } from "next/server";
// import  prisma  from "@/components/lib/db";
// import { z } from "zod";
// import { hashPassword } from "@/app/lib/auth";
// import { getServerSession } from "next-auth";
// import { getSession } from "@/app/config/auth";


// const UpdateUserSchema = z.object({
//   name: z.string().min(1).optional(),
//   role: z.enum(["ADMIN", "DATA_ENTRY", "DRIVER"]).optional(),
//   profileImage: z.string().optional().nullable(),
//   password: z.string().min(8).optional(),
// });

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const {id} = await params;
//     const user = await prisma.user.findUnique({
//       where: { id },
//       select: { id: true, email: true, name: true, role: true, profileImage: true, createdAt: true, updatedAt: true },
//     });
//     if (!user) return NextResponse.json({ ok: false, message: "Not found" }, { status: 404 });
//     return NextResponse.json({ ok: true, user }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function PATCH(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getSession();
//     if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any).user?.role)) {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const {id} = await params;
//     const body = await req.json().catch(() => ({}));
//     const parsed = UpdateUserSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json({ ok: false, errors: parsed.error.format() }, { status: 400 });
//     }

//     const dataToUpdate: any = { ...parsed.data };
//     if (dataToUpdate.password) {
//       dataToUpdate.password = await hashPassword(dataToUpdate.password);
//     }

//     const updated = await prisma.user.update({
//       where: { id },
//       data: dataToUpdate,
//       select: { id: true, email: true, name: true, role: true, profileImage: true, updatedAt: true },
//     });

//     return NextResponse.json({ ok: true, user: updated }, { status: 200 });
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const session = await getSession();
//     if (!session || (session as any).user?.role !== "ADMIN") {
//       return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
//     }

//     const {id} = await params;
//     // soft-delete
//     await prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });

//     return NextResponse.json({ ok: true }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/admin/users/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/components/lib/db";
import { z } from "zod";
import { hashPassword } from "@/app/lib/auth";
import { getSession } from "@/app/config/auth";

const UpdateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  role: z.enum(["ADMIN", "DATA_ENTRY", "MANAGER"]).optional(),
  profileImage: z.string().optional().nullable(),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "At least one uppercase letter")
    .regex(/[a-z]/, "At least one lowercase letter")
    .regex(/[0-9]/, "At least one number")
    .regex(/[^A-Za-z0-9]/, "At least one special character")
    .optional(),
});

// ── GET: Fetch single user ────────────────────────────────────────────────
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || !["ADMIN", "DATA_ENTRY"].includes((session as any)?.user?.role)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        passwordChangedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, user }, { status: 200 });
  } catch (err: any) {
    console.error("[user GET]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── PATCH: Update user ────────────────────────────────────────────────────
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    const sessionRole = (session as any)?.user?.role;
    const sessionUserId = (session as any)?.user?.id;

    if (!session || !["ADMIN", "DATA_ENTRY"].includes(sessionRole)) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Only ADMIN can change another user's role; DATA_ENTRY can only edit their own profile
    if (sessionRole !== "ADMIN" && sessionUserId !== id) {
      return NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = UpdateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.format(), message: "Validation failed" },
        { status: 400 }
      );
    }

    const { name, role, profileImage, password } = parsed.data;

    // Verify user exists and is not deleted
    const existing = await prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: { id: true, role: true },
    });
    if (!existing) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    // Build update payload
    const dataToUpdate: Record<string, any> = {};
    if (name !== undefined) dataToUpdate.name = name;

    // Only ADMIN can change roles
    if (role !== undefined && sessionRole === "ADMIN") {
      dataToUpdate.role = role;
    }

    // Profile image: null means remove, string means update
    if (profileImage !== undefined) {
      dataToUpdate.profileImage = profileImage ?? "";
    }

    // Password update
    if (password) {
      dataToUpdate.password = await hashPassword(password);
      dataToUpdate.passwordChangedAt = new Date();
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ ok: false, message: "No fields to update" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        updatedAt: true,
        passwordChangedAt: true,
      },
    });

    return NextResponse.json({ ok: true, user: updated }, { status: 200 });
  } catch (err: any) {
    console.error("[user PATCH]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}

// ── DELETE: Soft-delete user ──────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    const sessionRole = (session as any)?.user?.role;
    const sessionUserId = (session as any)?.user?.id;

    // Only ADMINs can delete users
    if (!session || sessionRole !== "ADMIN") {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Prevent self-deletion
    if (sessionUserId === id) {
      return NextResponse.json(
        { ok: false, message: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    // Verify the user exists and isn't already deleted
    const existing = await prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true, message: "User deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("[user DELETE]", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
