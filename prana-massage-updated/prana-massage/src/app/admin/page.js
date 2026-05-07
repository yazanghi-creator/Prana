"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, AuthProvider } from "@/context/AuthContext";
import {
  AlertTriangle,
  Lock,
  Loader2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Confirmation Modal Component
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <AlertTriangle
                className="w-6 h-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-gray-600 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Keep Appointment
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Cancelling...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Login Form Component
function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4E1D2] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2F4F4F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#2F4F4F]" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold text-[#4B2E1A]">Admin Access</h1>
            <p className="text-gray-500 mt-2">
              Sign in to manage your appointments
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-[#2F4F4F] hover:underline text-sm">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/bookings");
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const openCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeCancelModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    setDeleteLoading(true);

    try {
      const response = await fetch(
        `/api/admin/bookings?id=${selectedBooking.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setBookings(bookings.filter((b) => b.id !== selectedBooking.id));
        closeCancelModal();
      } else {
        alert(data.error || "Failed to cancel booking");
      }
    } catch (err) {
      alert("Failed to cancel booking. Please try again.");
    }

    setDeleteLoading(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDateKey = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const isUpcoming = (dateStr) => {
    const appointmentDate = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointmentDate >= today;
  };

  // Group bookings by date
  const groupedBookings = bookings.reduce((acc, booking) => {
    const dateKey = getDateKey(booking.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(booking);
    return acc;
  }, {});

  // Sort dates and sort bookings within each date by time
  const sortedDates = Object.keys(groupedBookings).sort();
  sortedDates.forEach((date) => {
    groupedBookings[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4E1D2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2F4F4F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4E1D2] py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={showModal}
          onClose={closeCancelModal}
          onConfirm={handleDeleteBooking}
          title="Cancel Appointment"
          message={
            selectedBooking
              ? `Are you sure you want to cancel the appointment for ${
                  selectedBooking.customerName
                } on ${formatDate(selectedBooking.date)} at ${
                  selectedBooking.time
                }? ${
                  selectedBooking.customerEmail
                    ? "They will receive a cancellation email."
                    : ""
                }`
              : ""
          }
          confirmText="Yes, Cancel It"
          loading={deleteLoading}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#4B2E1A]">Appointments</h1>
            <p className="text-gray-500 text-sm">
              {bookings.length} total bookings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={fetchBookings}
              className="px-3 py-1.5 text-sm border border-[#A8D5BA] rounded-lg hover:bg-[#A8D5BA] transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm bg-[#2F4F4F] text-white rounded-lg hover:bg-[#3d6363] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats - Compact */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-bold text-[#4B2E1A]">
              {bookings.length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500">Upcoming</p>
            <p className="text-2xl font-bold text-[#2F4F4F]">
              {bookings.filter((b) => isUpcoming(b.date)).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              €{bookings.reduce((sum, b) => sum + b.service.price, 0)}
            </p>
          </div>
        </div>

        {/* Bookings List - Compact */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <p className="text-gray-500">No bookings yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedDates.map((dateKey) => (
              <div
                key={dateKey}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="bg-[#A8D5BA] px-4 py-2">
                  <h2 className="font-medium text-sm text-[#4B2E1A]">
                    {formatDate(dateKey)}
                    <span className="text-gray-500 ml-2">
                      ({groupedBookings[dateKey].length} appointments)
                    </span>
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {groupedBookings[dateKey].map((booking) => (
                    <div
                      key={booking.id}
                      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Time */}
                        <div className="text-center w-14">
                          <p className="text-lg font-bold text-[#2F4F4F]">
                            {booking.time}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#4B2E1A] truncate">
                              {booking.customerName}
                            </span>
                            {isUpcoming(booking.date) ? (
                              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-green-100 text-green-600">
                                Upcoming
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-gray-100 text-gray-500">
                                Past
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {booking.service.name} • {booking.service.duration}
                            min
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" aria-hidden="true" />
                              {booking.customerPhone}
                            </span>
                            {booking.customerEmail && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" aria-hidden="true" />
                                {booking.customerEmail}
                              </span>
                            )}
                            {booking.customerAddress && (
                              <span className="flex items-center gap-1">
                                <MapPin
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                />
                                {booking.customerAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-semibold text-[#4B2E1A]">
                          €{booking.service.price}
                        </span>
                        <button
                          onClick={() => openCancelModal(booking)}
                          className="px-3 py-1 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Admin Page Component
function AdminPageContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4E1D2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2F4F4F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <Dashboard />;
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminPageContent />
    </AuthProvider>
  );
}
