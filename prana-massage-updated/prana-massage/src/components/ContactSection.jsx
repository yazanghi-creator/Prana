"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-[#A8D5BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
              {t("contact.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-6">
              {t("contact.title")}
              <span className="text-[#2F4F4F]">
                {" "}
                {t("contact.titleHighlight")}
              </span>
            </h2>
            <p className="text-[#4B2E1A]/70 mb-8 leading-relaxed">
              {t("contact.description")}
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2F4F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin
                    className="w-6 h-6 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A] mb-1">
                    {t("contact.location")}
                  </h4>
                  <p className="text-[#4B2E1A]/70">Sulzbacher Str. 94</p>
                  <p className="text-[#4B2E1A]/70">
                    90489 Nürnberg, Deutschland
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2F4F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone
                    className="w-6 h-6 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A] mb-1">
                    {t("contact.phone")}
                  </h4>
                  <p className="text-[#4B2E1A]/70">+49 176 21440748</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2F4F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#2F4F4F]" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A] mb-1">
                    {t("contact.email")}
                  </h4>
                  <p className="text-[#4B2E1A]/70">pranaway7@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#2F4F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock
                    className="w-6 h-6 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A] mb-1">
                    {t("contact.hours")}
                  </h4>
                  <p className="text-[#4B2E1A]/70">{t("contact.mon")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.tue")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.wed")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.thu")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.fri")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.sat")}</p>
                  <p className="text-[#4B2E1A]/70">{t("contact.sun")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#F4E1D2] rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#4B2E1A] mb-6">
              {t("contact.formTitle")}
            </h3>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle
                  className="w-12 h-12 text-green-500 mx-auto mb-4"
                  aria-hidden="true"
                />
                <p className="text-green-800 font-medium">
                  {t("contact.thankYou")}
                </p>
                <p className="text-green-600 text-sm mt-2">
                  {t("contact.getBack")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#4B2E1A] mb-2"
                  >
                    {t("contact.fullName")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all bg-white"
                    placeholder={t("contact.placeholder.name")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#4B2E1A] mb-2"
                  >
                    {t("contact.emailAddress")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all bg-white"
                    placeholder={t("contact.placeholder.email")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#4B2E1A] mb-2"
                  >
                    {t("contact.phoneNumber")}{" "}
                    <span className="text-gray-400">
                      {t("contact.optional")}
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all bg-white"
                    placeholder={t("contact.placeholder.phone")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#4B2E1A] mb-2"
                  >
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-[#A8D5BA] focus:border-[#2F4F4F] focus:ring-2 focus:ring-[#2F4F4F]/20 outline-none transition-all bg-white resize-none"
                    placeholder={t("contact.placeholder.message")}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                >
                  {loading ? t("contact.sending") : t("contact.sendMessage")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
