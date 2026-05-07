import prisma from "@/lib/prisma";
import {
  sendBookingConfirmation,
  sendNewBookingNotification,
} from "@/lib/email";
import { NextResponse } from "next/server";

// Parse dynamic slot ID format: serviceId_YYYY-MM-DD_HH:MM
function parseDynamicSlotId(slotId) {
  const parts = slotId.split("_");
  if (parts.length >= 3) {
    // Handle format: serviceId_YYYY-MM-DD_HH:MM
    const serviceId = parts[0];
    const dateStr = parts[1];
    const time = parts[2];

    // Validate date format
    const dateMatch = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
    const timeMatch = time.match(/^\d{2}:\d{2}$/);

    if (dateMatch && timeMatch) {
      return { serviceId, date: dateStr, time };
    }
  }
  return null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      timeSlotId,
      serviceId,
      language,
    } = body;

    // Validate required fields (email is optional)
    if (!customerName || !customerPhone || !timeSlotId || !serviceId) {
      return NextResponse.json(
        { error: "Name, phone, time slot, and service are required" },
        { status: 400 },
      );
    }

    // Parse the virtual slot ID (format: serviceId_YYYY-MM-DD_HH:MM)
    const dynamicSlot = parseDynamicSlotId(timeSlotId);

    if (!dynamicSlot) {
      return NextResponse.json(
        { error: "Invalid time slot ID format" },
        { status: 400 },
      );
    }

    // Parse the date and time - use UTC midnight for consistent date comparison
    const [year, month, day] = dynamicSlot.date.split("-").map(Number);
    const slotDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const slotTime = dynamicSlot.time;

    // Get the service to check duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Helper function to convert time string to minutes
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Check for overlapping bookings
    const existingBookings = await prisma.booking.findMany({
      where: {
        status: { not: "deleted" },
        date: slotDate,
      },
      include: {
        service: true,
      },
    });

    // Check if the requested slot overlaps with any existing booking
    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + service.duration;

    for (const booking of existingBookings) {
      const bookingStart = timeToMinutes(booking.time);
      const bookingEnd = bookingStart + booking.service.duration;

      // Check for overlap
      if (slotStart < bookingEnd && slotEnd > bookingStart) {
        return NextResponse.json(
          { error: "This time slot is no longer available" },
          { status: 409 },
        );
      }
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail: customerEmail || "",
        customerPhone,
        customerAddress: customerAddress || "",
        date: slotDate,
        time: slotTime,
        serviceId,
      },
      include: {
        service: true,
      },
    });

    const bookingResponse = {
      id: booking.id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      service: booking.service.name,
      date: booking.date,
      time: booking.time,
      price: booking.service.price,
      duration: booking.service.duration,
    };

    // Send confirmation email if email was provided
    if (customerEmail) {
      try {
        await sendBookingConfirmation(bookingResponse, language || "de");
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the booking if email fails
      }
    }

    // Always send notification to business owner (pranaway7@gmail.com)
    try {
      await sendNewBookingNotification(
        { ...bookingResponse, customerPhone },
        language || "de",
      );
    } catch (emailError) {
      console.error(
        "Failed to send booking notification to owner:",
        emailError,
      );
      // Don't fail the booking if notification email fails
    }

    return NextResponse.json({
      success: true,
      booking: bookingResponse,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: { not: "deleted" },
      },
      include: {
        service: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
