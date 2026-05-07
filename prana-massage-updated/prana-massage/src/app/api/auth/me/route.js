import { getAuthAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const admin = await getAuthAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
