import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get language from query params
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "de";

    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });

    // Map services to return the correct language
    const localizedServices = services.map((service) => ({
      id: service.id,
      name: lang === "de" ? service.nameDe || service.name : service.name,
      description:
        lang === "de"
          ? service.descriptionDe || service.description
          : service.description,
      duration: service.duration,
      price: service.price,
    }));

    return NextResponse.json(localizedServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
