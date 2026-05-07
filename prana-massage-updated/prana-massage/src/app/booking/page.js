"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

const STEPS = ["booking.step1", "booking.step2", "booking.step3"];

export default function BookingPage() {
  const { t, lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [availability, setAvailability] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate dates for the horizontal strip (next 7 business days)
  const generateStripDates = () => {
    const dates = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start from tomorrow

    let count = 0;
    while (dates.length < 7) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + count);
      dates.push(date);
      count++;
    }
    return dates;
  };

  const stripDates = generateStripDates();

  // Generate calendar days for the popover
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays =
    lang === "de"
      ? ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
      : ["S", "M", "T", "W", "T", "F", "S"];

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Fetch services on mount and set default date
  useEffect(() => {
    const fetchServices = async () => {
      setServicesLoading(true);
      try {
        const response = await fetch(`/api/services?lang=${lang}`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();

    // Set default selected date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    setSelectedDate(tomorrow);
  }, [lang]);

  const getDateKey = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch availability when service changes
  useEffect(() => {
    if (selectedService) {
      const fetchAvailability = async () => {
        setLoading(true);
        try {
          // Fetch 3 months of availability
          const startDate = new Date();
          const endDate = new Date();
          endDate.setMonth(endDate.getMonth() + 3);

          const response = await fetch(
            `/api/availability?serviceId=${selectedService.id}&startDate=${
              startDate.toISOString().split("T")[0]
            }&endDate=${endDate.toISOString().split("T")[0]}`
          );
          const data = await response.json();
          setAvailability(data.slots || {});
        } catch (error) {
          console.error("Error fetching availability:", error);
        }
        setLoading(false);
      };
      fetchAvailability();
    }
  }, [selectedService]);

  // Re-fetch availability for selected date to ensure freshness
  useEffect(() => {
    if (selectedService && selectedDate && currentStep === 1) {
      const refreshDateAvailability = async () => {
        try {
          const dateKey = getDateKey(selectedDate);
          const response = await fetch(
            `/api/availability?serviceId=${selectedService.id}&startDate=${dateKey}&endDate=${dateKey}`
          );
          const data = await response.json();
          // Merge the fresh availability data for this date
          setAvailability((prev) => ({
            ...prev,
            ...(data.slots || {}),
          }));
          // If the currently selected slot is no longer available, deselect it
          if (selectedSlot) {
            const freshSlots = data.slots?.[dateKey] || [];
            const isStillAvailable = freshSlots.some(
              (slot) => slot.time === selectedSlot.time
            );
            if (!isStillAvailable) {
              setSelectedSlot(null);
            }
          }
        } catch (error) {
          console.error("Error refreshing date availability:", error);
        }
      };
      refreshDateAvailability();
    }
  }, [selectedDate, selectedService, currentStep, selectedSlot]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedSlot(null);
    setCurrentStep(1);
  };

  const handleDateSelect = (date) => {
    if (date && date >= today) {
      setSelectedDate(date);
      setSelectedSlot(null);
      setShowCalendar(false);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Validate that the selected slot is still available
  const validateSlotAvailability = async () => {
    if (!selectedSlot || !selectedDate || !selectedService) return false;

    try {
      const dateKey = getDateKey(selectedDate);
      const response = await fetch(
        `/api/availability?serviceId=${selectedService.id}&startDate=${dateKey}&endDate=${dateKey}`
      );
      const data = await response.json();
      const slotsForDate = data.slots?.[dateKey] || [];

      // Check if the selected slot is still in the available slots
      const isStillAvailable = slotsForDate.some(
        (slot) => slot.time === selectedSlot.time
      );

      if (!isStillAvailable) {
        // Update availability data and reset slot selection
        setAvailability((prev) => ({ ...prev, ...data.slots }));
        setSelectedSlot(null);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating slot availability:", error);
      return false;
    }
  };

  // Handle proceeding to step 3 with validation
  const handleProceedToBookingDetails = async () => {
    setLoading(true);
    const isAvailable = await validateSlotAvailability();
    setLoading(false);

    if (isAvailable) {
      setCurrentStep(2);
    } else {
      alert(t("booking.slotNoLongerAvailable"));
    }
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    if (prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const maxMonth = new Date(today);
    maxMonth.setMonth(maxMonth.getMonth() + 3);
    if (nextMonth <= maxMonth) {
      setCurrentMonth(nextMonth);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerEmail: customerInfo.email || null,
          customerPhone: customerInfo.phone,
          customerAddress: customerInfo.address || null,
          timeSlotId: selectedSlot.id,
          serviceId: selectedService.id,
          language: lang,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingDetails(data.booking);
        setBookingComplete(true);
      } else {
        alert(data.error || t("booking.errorBooking"));
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(t("booking.errorGeneral"));
    }

    setLoading(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      lang === "de" ? "de-DE" : "en-US",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
    );
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const dateKey = getDateKey(date);
    return availability[dateKey]?.length > 0;
  };

  const isDateSelectable = (date) => {
    if (!date) return false;
    return date >= today;
  };

  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return getDateKey(date) === getDateKey(selectedDate);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-[#F4E1D2] pt-24 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-bold text-[#4B2E1A] mb-4">
              {t("booking.confirmed")}
            </h1>
            <p className="text-gray-600 mb-8">
              {t("booking.thankYou")}, {bookingDetails?.customerName}!{" "}
              {t("booking.scheduled")}
            </p>

            <div className="bg-[#A8D5BA] rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#4B2E1A] mb-4">
                {t("booking.details")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("booking.service")}:</span>
                  <span className="font-medium">{bookingDetails?.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("booking.date")}:</span>
                  <span className="font-medium">
                    {formatDate(bookingDetails?.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("booking.time")}:</span>
                  <span className="font-medium">{bookingDetails?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t("booking.duration")}:
                  </span>
                  <span className="font-medium">
                    {bookingDetails?.duration} {t("booking.min")}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between">
                  <span className="font-semibold">{t("booking.total")}:</span>
                  <span className="font-bold text-[#2F4F4F]">
                    €{bookingDetails?.price}
                  </span>
                </div>
              </div>
            </div>

            {bookingDetails?.customerEmail && (
              <p className="text-sm text-gray-500 mb-6">
                {t("booking.confirmationSent")} {bookingDetails?.customerEmail}
              </p>
            )}

            <Link href="/" className="btn-primary inline-block">
              {t("booking.backHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4E1D2] pt-24 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            {t("booking.title")}{" "}
            <span className="text-[#2F4F4F]">
              {t("booking.titleHighlight")}
            </span>
          </h1>
          <p className="text-gray-600">{t("booking.subtitle")}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-xl mx-auto">
            {STEPS.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index <= currentStep
                        ? "bg-[#2F4F4F] text-white"
                        : "bg-[#A8D5BA] text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      index <= currentStep ? "text-[#2F4F4F]" : "text-gray-400"
                    }`}
                  >
                    {t(step)}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 sm:mx-4 transition-colors ${
                      index < currentStep ? "bg-[#2F4F4F]" : "bg-[#A8D5BA]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Select Service */}
            {currentStep === 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#4B2E1A] mb-6">
                  {t("booking.chooseService")}
                </h2>
                {servicesLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-[#2F4F4F] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500">
                      {t("booking.loadingServices")}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all hover:border-[#2F4F4F] ${
                          selectedService?.id === service.id
                            ? "border-[#2F4F4F] bg-[#2F4F4F]/5"
                            : "border-[#A8D5BA]"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-[#4B2E1A]">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" aria-hidden="true" />
                                {service.duration} min
                              </span>
                            </div>
                          </div>
                          <span className="text-xl font-bold text-[#2F4F4F]">
                            €{service.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#4B2E1A]">
                    {t("booking.selectDateTime")}
                  </h2>
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="text-[#2F4F4F] hover:underline text-sm"
                  >
                    {t("booking.changeService")}
                  </button>
                </div>

                {/* Date Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-[#4B2E1A]">
                      {t("booking.chooseDate")}
                    </h3>
                    {/* Calendar Popover Button */}
                    <div className="relative" ref={calendarRef}>
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-[#A8D5BA] rounded-lg hover:bg-[#A8D5BA] transition-colors"
                      >
                        <Calendar
                          className="w-5 h-5 text-[#2F4F4F]"
                          aria-hidden="true"
                        />
                        <span>{t("booking.moreDates")}</span>
                      </button>

                      {/* Calendar Popover */}
                      {showCalendar && (
                        <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-2xl border p-4 w-72">
                          {/* Month Navigation */}
                          <div className="flex items-center justify-between mb-3">
                            <button
                              onClick={handlePrevMonth}
                              className="p-1 rounded hover:bg-[#A8D5BA] transition-colors"
                              aria-label="Previous month"
                            >
                              <ChevronLeft
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                            <span className="font-medium text-sm">
                              {currentMonth.toLocaleDateString(
                                lang === "de" ? "de-DE" : "en-US",
                                {
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <button
                              onClick={handleNextMonth}
                              className="p-1 rounded hover:bg-[#A8D5BA] transition-colors"
                              aria-label="Next month"
                            >
                              <ChevronRight
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          {/* Week Headers */}
                          <div className="grid grid-cols-7 mb-1">
                            {weekDays.map((day, i) => (
                              <div
                                key={i}
                                className="text-center text-xs font-medium text-gray-400 py-1"
                              >
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Days */}
                          <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((date, index) => {
                              const isSelectable = isDateSelectable(date);
                              const hasAvailability = isDateAvailable(date);
                              const isSelected = isSelectedDate(date);

                              return (
                                <button
                                  key={index}
                                  onClick={() =>
                                    date &&
                                    isSelectable &&
                                    handleDateSelect(date)
                                  }
                                  disabled={!date || !isSelectable}
                                  className={`
                                    w-8 h-8 text-sm rounded-full flex items-center justify-center transition-all relative
                                    ${!date ? "invisible" : ""}
                                    ${
                                      isSelected
                                        ? "bg-[#2F4F4F] text-white"
                                        : ""
                                    }
                                    ${
                                      !isSelected && isSelectable
                                        ? "hover:bg-[#A8D5BA]"
                                        : ""
                                    }
                                    ${
                                      !isSelectable && date
                                        ? "text-gray-300 cursor-not-allowed"
                                        : ""
                                    }
                                    ${
                                      isSelectable && !isSelected
                                        ? "text-[#4B2E1A]"
                                        : ""
                                    }
                                  `}
                                >
                                  {date?.getDate()}
                                  {hasAvailability && !isSelected && (
                                    <span className="absolute bottom-0.5 w-1 h-1 bg-[#2F4F4F] rounded-full"></span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Date Strip */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {stripDates.map((date) => {
                      const isSelected = isSelectedDate(date);
                      const hasAvailability = isDateAvailable(date);

                      return (
                        <button
                          key={getDateKey(date)}
                          onClick={() => handleDateSelect(date)}
                          className={`
                            flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all
                            ${
                              isSelected
                                ? "bg-[#2F4F4F] text-white"
                                : "bg-[#A8D5BA] hover:bg-[#e8d5c4]"
                            }
                          `}
                        >
                          <div className="text-xs font-medium uppercase">
                            {date.toLocaleDateString(
                              lang === "de" ? "de-DE" : "en-US",
                              {
                                weekday: "short",
                              }
                            )}
                          </div>
                          <div className="text-xl font-bold">
                            {date.getDate()}
                          </div>
                          <div className="text-xs">
                            {date.toLocaleDateString(
                              lang === "de" ? "de-DE" : "en-US",
                              {
                                month: "short",
                              }
                            )}
                          </div>
                          {hasAvailability && !isSelected && (
                            <div className="w-1.5 h-1.5 bg-[#2F4F4F] rounded-full mx-auto mt-1"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="font-medium text-[#4B2E1A] mb-4">
                    {t("booking.availableTimes")}{" "}
                    {selectedDate && formatDate(selectedDate)}
                  </h3>

                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-[#2F4F4F] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : selectedDate &&
                    availability[getDateKey(selectedDate)]?.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {availability[getDateKey(selectedDate)].map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-3 px-4 rounded-xl text-center transition-all ${
                            selectedSlot?.id === slot.id
                              ? "bg-[#2F4F4F] text-white"
                              : "bg-[#A8D5BA] hover:bg-[#e8d5c4]"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      {t("booking.noTimes")}
                    </p>
                  )}
                </div>

                {/* Continue Button */}
                {selectedSlot && (
                  <div className="mt-8">
                    <button
                      onClick={handleProceedToBookingDetails}
                      disabled={loading}
                      className="w-full btn-primary py-4 disabled:opacity-50"
                    >
                      {loading
                        ? t("booking.checkingAvailability")
                        : t("booking.continue")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Complete Booking */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#4B2E1A]">
                    {t("booking.completeBooking")}
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[#2F4F4F] hover:underline text-sm"
                  >
                    {t("booking.changeTime")}
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#4B2E1A] mb-2"
                    >
                      {t("booking.fullName")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                      placeholder={t("booking.placeholder.name")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[#4B2E1A] mb-2"
                    >
                      {t("booking.phone")} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                      placeholder={t("booking.placeholder.phone")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#4B2E1A] mb-2"
                    >
                      {t("booking.email")}{" "}
                      <span className="text-gray-400">
                        {t("booking.emailOptional")}
                      </span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                      placeholder={t("booking.placeholder.email")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-[#4B2E1A] mb-2"
                    >
                      {t("booking.address")}{" "}
                      <span className="text-gray-400">
                        {t("booking.optional")}
                      </span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                      placeholder={t("booking.placeholder.address")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={
                      loading || !customerInfo.name || !customerInfo.phone
                    }
                    className="w-full btn-primary py-4 disabled:opacity-50"
                  >
                    {loading
                      ? t("booking.processing")
                      : t("booking.confirmBooking")}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-[#4B2E1A] mb-4">
                {t("booking.yourBooking")}
              </h3>

              {selectedService ? (
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <p className="font-medium text-[#4B2E1A]">
                      {selectedService.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedService.duration} {t("booking.minutes")}
                    </p>
                  </div>

                  {selectedDate && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-gray-500">
                        {t("booking.date")}
                      </p>
                      <p className="font-medium text-[#4B2E1A]">
                        {formatDate(selectedDate)}
                      </p>
                    </div>
                  )}

                  {selectedSlot && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-gray-500">
                        {t("booking.time")}
                      </p>
                      <p className="font-medium text-[#4B2E1A]">
                        {selectedSlot.time}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">{t("booking.total")}</span>
                    <span className="text-2xl font-bold text-[#2F4F4F]">
                      €{selectedService.price}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  {t("booking.selectService")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
