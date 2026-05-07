import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function GET(request) {
  // Optional: protect with a secret token
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token !== (process.env.CRON_SECRET || "keep-alive-secret")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Insert a random string
    const randomValue = crypto.randomBytes(16).toString("hex");

    await prisma.keepAlive.create({
      data: { value: randomValue },
    });

    // Clean up old entries (keep only last 30)
    const entries = await prisma.keepAlive.findMany({
      orderBy: { createdAt: "desc" },
      skip: 30,
      select: { id: true },
    });

    if (entries.length > 0) {
      await prisma.keepAlive.deleteMany({
        where: { id: { in: entries.map((e) => e.id) } },
      });
    }

    return Response.json({
      success: true,
      message: `Inserted keep-alive value: ${randomValue}`,
      cleaned: entries.length,
    });
  } catch (error) {
    console.error("Keep-alive cron error:", error);
    return Response.json(
      { error: "Failed to keep alive", details: error.message },
      { status: 500 },
    );
  }
}
