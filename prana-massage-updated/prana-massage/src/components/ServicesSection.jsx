"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Clock, Leaf, Dumbbell, Flame, Flower2, Zap, Wind, Star } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Pain-Free Massage – 60 min",
    nameDe: "Schmerzfrei Massage – 60 Min.",
    description:
      "Targeted massage therapy to relieve pain and release deep-seated tension throughout the body.",
    descriptionDe:
      "Gezielte Massagetherapie zur Schmerzlinderung und Lösung tief sitzender Verspannungen im ganzen Körper.",
    duration: "60",
    price: "€75",
    Icon: Leaf,
  },
  {
    id: 2,
    name: "Pain-Free Massage – 30 min",
    nameDe: "Schmerzfrei Massage – 30 Min.",
    description:
      "A focused 30-minute session targeting your most painful areas for quick and effective relief.",
    descriptionDe:
      "Eine gezielte 30-minütige Sitzung für die schmerzhaftesten Bereiche – schnelle und effektive Linderung.",
    duration: "30",
    price: "€50",
    Icon: Zap,
  },
  {
    id: 3,
    name: "Cupping – Vacuum Therapy – Hijama",
    nameDe: "Schröpfen – Vakuumpumpen – Hacamat – حجامة",
    description:
      "Traditional cupping therapy using vacuum suction to stimulate blood flow and relieve tension.",
    descriptionDe:
      "Traditionelle Schröpftherapie mit Vakuumsaugung zur Verbesserung der Durchblutung und Linderung von Verspannungen.",
    duration: "60",
    price: "€75",
    Icon: Wind,
  },
  {
    id: 4,
    name: "Sports & Strong Massage",
    nameDe: "Sport und Starke Massage",
    description:
      "Intensive massage for athletes and active people – prevents injuries and speeds up muscle recovery.",
    descriptionDe:
      "Intensive Massage für Sportler und aktive Menschen – beugt Verletzungen vor und beschleunigt die Muskelregeneration.",
    duration: "60",
    price: "€95",
    Icon: Dumbbell,
  },
  {
    id: 5,
    name: "Sports Massage – 30 min",
    nameDe: "Starke Sport Massage – 30 Min.",
    description:
      "A powerful 30-minute sports massage focused on muscle recovery and performance.",
    descriptionDe:
      "Eine kraftvolle 30-minütige Sportmassage für Muskelregeneration und Leistungssteigerung.",
    duration: "30",
    price: "€50",
    Icon: Zap,
  },
  {
    id: 6,
    name: "Hot Stone Massage",
    nameDe: "Hot Stone Massage",
    description:
      "Warm basalt stones melt away tension while deeply relaxing your muscles and calming your mind.",
    descriptionDe:
      "Warme Basaltsteine lösen Verspannungen, entspannen die Muskeln tief und beruhigen den Geist.",
    duration: "60",
    price: "€75",
    Icon: Flame,
  },
  {
    id: 7,
    name: "Aura & Chakra Cleansing – Energy Refilling",
    nameDe: "Aura und Chakra Reinigung und Energie Ausfüllen",
    description:
      "A holistic energy treatment to cleanse your aura, balance your chakras and restore your inner energy.",
    descriptionDe:
      "Eine ganzheitliche Energiebehandlung zur Reinigung der Aura, Harmonisierung der Chakren und Wiederherstellung der inneren Energie.",
    duration: "60",
    price: "€75",
    Icon: Flower2,
  },
  {
    id: 8,
    name: "Gentle Massage with Warm Oils – 30 min",
    nameDe: "Sanft Massage mit Warmen Ölen – 30 Min.",
    description:
      "A gentle and nurturing 30-minute massage using warm oils to soothe the body and calm the mind.",
    descriptionDe:
      "Eine sanfte, pflegende 30-minütige Massage mit warmen Ölen zur Beruhigung von Körper und Geist.",
    duration: "30",
    price: "€38",
    Icon: Leaf,
  },
  {
    id: 9,
    name: "Gentle Massage with Warm Oils – 90 min",
    nameDe: "Sanft Massage mit Warmen Ölen – 90 Min.",
    description:
      "An extended 90-minute experience of pure relaxation with warm oils melting away all stress.",
    descriptionDe:
      "Ein ausgedehntes 90-minütiges Erlebnis tiefer Entspannung – warme Öle lösen jeden Stress.",
    duration: "90",
    price: "€125",
    Icon: Leaf,
  },
  {
    id: 10,
    name: "Foot Reflexology – 60 min",
    nameDe: "Reflexzonenmassage Füße – 60 Min.",
    description:
      "Therapeutic pressure on reflex zones of the feet to promote healing and balance in the whole body.",
    descriptionDe:
      "Therapeutischer Druck auf Reflexzonen der Füße zur Förderung der Heilung und Balance im gesamten Körper.",
    duration: "60",
    price: "€75",
    Icon: Star,
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
