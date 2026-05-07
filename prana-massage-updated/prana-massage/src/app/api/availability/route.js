import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Business hours configuration per day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
// Times are in minutes from midnight
const BUSINESS_HOURS = {
  0: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Sunday: 08:30 - 23:30
  1: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Monday: 08:30 - 23:30
  2: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Tuesday: 08:30 - 23:30
  3: { start: 8 * 60 + 30, end: 17 * 60 }, // Wednesday: 08:30 - 17:00
  4: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Thursday: 08:30 - 23:30
  5: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Friday: 08:30 - 23:30
  6: { start: 8 * 60 + 30, end: 23 * 60 + 30 }, // Saturday: 08:30 - 23:30
};

// Fixed interval for all slot generation (30 minutes)
const SLOT_INTERVAL = 30;

// Generate time slots at fixed 30-minute intervals, ensuring the service fits within business hours
function generateTimeSlots(serviceDurationMinutes, dayOfWeek) {
  const slots = [];
  const hours = BUSINESS_HOURS[dayOfWeek];
  const startMinutes = hours.start;
  const endMinutes = hours.end;

  // Generate slots at fixed 30-minute intervals
  // Only include slots where the full service duration fits before end of business hours
  for (
    let minutes = startMinutes;
    minutes + serviceDurationMinutes <= endMinutes;
    minutes += SLOT_INTERVAL
  ) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const timeString = `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
    slots.push(timeString);
  }

  return slots;
}

// Generate dates between start and end (up to 3 months max)
function generateDateRange(start, end) {
  const dates = [];
  const currentDate = new Date(start);
  const endDate = new Date(end);

  // Cap at 3 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const actualEnd = endDate > maxDate ? maxDate : endDate;

  while (currentDate <= actualEnd) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get("serviceId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!serviceId) {
      return NextResponse.json(
        { error: "Service ID is required" },
        { status: 400 }
      );
    }

    // Verify the service exists
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Calculate date range - use UTC for consistent date handling
    const now = new Date();
    const today = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      )
    );

    // Parse start/end dates as UTC
    const parseUTCDate = (dateStr) => {
      const [y, m, d] = dateStr.split("-").map(Number);
      return new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
    };

    const start = startDate ? parseUTCDate(startDate) : today;
    const end = endDate
      ? parseUTCDate(endDate)
      : new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000); // Default 3 months

    // Ensure start is not in the past
    const effectiveStart = start < today ? today : start;

    // Generate all dates in the range
    const dates = generateDateRange(effectiveStart, end);

    // Fetch all bookings for ANY service in the date range
    // A therapist can only handle one appointment at a time
    const existingBookings = await prisma.booking.findMany({
      where: {
        status: { not: "deleted" },
        date: {
          gte: effectiveStart,
          lte: end,
        },
      },
      include: {
        service: true, // Include service to get duration
      },
    });

    // Helper function to convert time string to minutes
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Helper function to get date key from a Date object using UTC
    const getUTCDateKey = (date) => {
      return date.toISOString().split("T")[0];
    };

    // Create a map of booked time ranges per date for overlap detection
    // Each entry contains: { startMinutes, endMinutes }
    const bookedRanges = {};
    for (const booking of existingBookings) {
      // Use UTC date key for consistent comparison
      const dateKey = getUTCDateKey(booking.date);
      const startMinutes = timeToMinutes(booking.time);
      const endMinutes = startMinutes + booking.service.duration;

      if (!bookedRanges[dateKey]) {
        bookedRanges[dateKey] = [];
      }
      bookedRanges[dateKey].push({ startMinutes, endMinutes });
    }

    // Function to check if a time slot overlaps with any booked range
    const isSlotOverlapping = (dateKey, slotTime, slotDuration) => {
      const ranges = bookedRanges[dateKey];
      if (!ranges || ranges.length === 0) return false;

      const slotStart = timeToMinutes(slotTime);
      const slotEnd = slotStart + slotDuration;

      for (const range of ranges) {
        // Check if there's any overlap
        // Overlap occurs if: slotStart < range.endMinutes AND slotEnd > range.startMinutes
        if (slotStart < range.endMinutes && slotEnd > range.startMinutes) {
          return true;
        }
      }
      return false;
    };

    // Generate available slots for each date
    const groupedSlots = {};
    let totalSlots = 0;

    for (const date of dates) {
      const dateKey = date.toISOString().split("T")[0];
      const dayOfWeek = date.getUTCDay(); // Use UTC day to match UTC date
      const dateSlots = [];

      // Generate time slots based on service duration and day of week
      const availableTimes = generateTimeSlots(service.duration, dayOfWeek);

      for (const time of availableTimes) {
        // Check if this slot overlaps with any existing booking
        if (!isSlotOverlapping(dateKey, time, service.duration)) {
          // For today, skip times that have already passed
          if (dateKey === today.toISOString().split("T")[0]) {
            const [hours, minutes] = time.split(":").map(Number);
            const slotTime = new Date(date);
            slotTime.setHours(hours, minutes, 0, 0);

            if (slotTime <= new Date()) {
              continue; // Skip past times for today
            }
          }

          dateSlots.push({
            id: `${serviceId}_${dateKey}_${time}`, // Virtual ID for dynamic slots
            time: time,
            isAvailable: true,
          });
          totalSlots++;
        }
      }

      // Only include dates that have at least one available slot
      if (dateSlots.length > 0) {
        groupedSlots[dateKey] = dateSlots;
      }
    }

    return NextResponse.json({
      slots: groupedSlots,
      total: totalSlots,
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
