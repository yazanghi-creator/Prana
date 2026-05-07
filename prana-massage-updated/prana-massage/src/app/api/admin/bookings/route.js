import prisma from "@/lib/prisma";
import { sendCancellationEmail } from "@/lib/email";
import { verifyAuth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Verify authentication
    const auth = await verifyAuth();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        status: { not: "deleted" },
      },
      include: {
        service: true,
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Verify authentication
    const auth = await verifyAuth();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Get the booking with all details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        service: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Mark booking as deleted
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "deleted" },
    });

    // Send cancellation email if customer had email
    if (booking.customerEmail) {
      try {
        await sendCancellationEmail({
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          service: booking.service.name,
          date: booking.date,
          time: booking.time,
        });
      } catch (emailError) {
        console.error("Failed to send cancellation email:", emailError);
        // Don't fail the deletion if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
