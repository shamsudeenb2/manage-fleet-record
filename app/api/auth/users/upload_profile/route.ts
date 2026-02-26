import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ ok: false, message: "No file provided" }, { status: 400 });
    }

    // Read file as ArrayBuffer then Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure uploads dir exists (public/uploads)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize/unique filename
    const originalName = (file as any).name ?? `upload-${Date.now()}.bin`;
    const safeName = `${Date.now()}-${originalName.replace(/\s+/g, "-")}`;
    const filepath = path.join(uploadsDir, safeName);

    await fs.writeFile(filepath, buffer, { mode: 0o644 });

    // Publicly accessible path (since file is in public/)
    const publicUrl = `/uploads/${safeName}`;

    return NextResponse.json({ ok: true, url: publicUrl }, { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
