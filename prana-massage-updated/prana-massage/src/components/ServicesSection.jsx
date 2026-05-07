"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, Leaf, Dumbbell, Flame, Flower2, Zap } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Relaxation Massage",
    nameDe: "Entspannungsmassage",
    description:
      "A gentle, soothing massage designed to relieve stress and promote deep relaxation.",
    descriptionDe:
      "Eine sanfte, beruhigende Massage zur Stresslinderung und tiefen Entspannung.",
    duration: "60",
    price: "€75",
    Icon: Leaf,
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    nameDe: "Tiefengewebsmassage",
    description:
      "Targeted massage focusing on deeper muscle layers to release chronic tension.",
    descriptionDe:
      "Gezielte Massage der tieferen Muskelschichten zur Lösung chronischer Verspannungen.",
    duration: "60",
    price: "€90",
    Icon: Dumbbell,
  },
  {
    id: 3,
    name: "Hot Stone Therapy",
    nameDe: "Hot Stone Therapie",
    description:
      "Warm basalt stones combined with massage techniques for ultimate relaxation.",
    descriptionDe:
      "Warme Basaltsteine kombiniert mit Massagetechniken für ultimative Entspannung.",
    duration: "75",
    price: "€110",
    Icon: Flame,
  },
  {
    id: 4,
    name: "Aromatherapy Massage",
    nameDe: "Aromatherapie Massage",
    description:
      "Essential oils blended for your needs enhance this relaxing massage experience.",
    descriptionDe:
      "Ätherische Öle, die auf Ihre Bedürfnisse abgestimmt sind, verbessern dieses entspannende Massageerlebnis.",
    duration: "60",
    price: "€85",
    Icon: Flower2,
  },
  {
    id: 5,
    name: "Sports Massage",
    nameDe: "Sportmassage",
    description:
      "Designed for active individuals to prevent injuries and speed up recovery.",
    descriptionDe:
      "Entwickelt für aktive Menschen zur Verletzungsprävention und schnelleren Erholung.",
    duration: "45",
    price: "€70",
    Icon: Zap,
  },
];

export default function ServicesSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="py-20 bg-[#A8D5BA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
            {t("services.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            {t("services.title")}
            <span className="text-[#2F4F4F]">
              {" "}
              {t("services.titleHighlight")}
            </span>
          </h2>
          <p className="text-[#4B2E1A]/70 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const ServiceIcon = service.Icon;
            return (
              <div
                key={service.id}
                className="bg-[#F4E1D2] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-[#2F4F4F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2F4F4F] transition-colors">
                  <ServiceIcon
                    className="w-7 h-7 text-[#2F4F4F] group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#4B2E1A] mb-2">
                  {lang === "de" ? service.nameDe : service.name}
                </h3>
                <p className="text-[#4B2E1A]/70 text-sm mb-4 leading-relaxed">
                  {lang === "de" ? service.descriptionDe : service.description}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {service.duration} {t("booking.min")}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-[#2F4F4F]">
                    {service.price}
                  </span>
                </div>

                {/* Book Button */}
                <Link
                  href="/booking"
                  className="block w-full text-center py-3 border-2 border-[#2F4F4F] text-[#2F4F4F] rounded-lg font-semibold hover:bg-[#2F4F4F] hover:text-white transition-all"
                >
                  {t("services.bookNow")}
                </Link>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-[#2F4F4F] to-[#4a7a7a] rounded-2xl p-6 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">{t("services.notSure")}</h3>
            <p className="text-white/90 mb-6">{t("services.consultation")}</p>
            <Link
              href="#contact"
              className="inline-block bg-white text-[#2F4F4F] px-6 py-3 rounded-lg font-semibold hover:bg-[#F4E1D2] transition-colors text-center"
            >
              {t("services.getInTouch")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
