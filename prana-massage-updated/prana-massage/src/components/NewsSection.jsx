"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Newspaper } from "lucide-react";

const news = [
  {
    id: 1,
    title: "New Hot Stone Therapy Available",
    titleDe: "Neue Hot Stone Therapie verfügbar",
    date: "December 2024",
    dateDe: "Dezember 2024",
    excerpt:
      "Experience our newest treatment featuring volcanic basalt stones for deep relaxation and muscle tension relief.",
    excerptDe:
      "Erleben Sie unsere neueste Behandlung mit vulkanischen Basaltsteinen für tiefe Entspannung und Lösung von Muskelverspannungen.",
    category: "New Service",
    categoryDe: "Neue Leistung",
  },
  {
    id: 2,
    title: "Holiday Gift Certificates",
    titleDe: "Geschenkgutscheine für die Feiertage",
    date: "December 2024",
    dateDe: "Dezember 2024",
    excerpt:
      "Give the gift of wellness this holiday season! Our gift certificates are now available for all services.",
    excerptDe:
      "Verschenken Sie Wellness in dieser Festsaison! Unsere Geschenkgutscheine sind jetzt für alle Leistungen verfügbar.",
    category: "Promotion",
    categoryDe: "Angebot",
  },
  {
    id: 3,
    title: "Extended Evening Hours",
    titleDe: "Verlängerte Abendöffnungszeiten",
    date: "November 2024",
    dateDe: "November 2024",
    excerpt:
      "We now offer appointments until 8 PM on weekdays to better accommodate your busy schedule.",
    excerptDe:
      "Wir bieten jetzt Termine bis 20 Uhr an Wochentagen an, um Ihrem vollen Terminkalender besser gerecht zu werden.",
    category: "Update",
    categoryDe: "Aktualisierung",
  },
];

export default function NewsSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="news" className="py-20 bg-[#F4E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
            {t("news.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            {t("news.title")}
            <span className="text-[#2F4F4F]"> {t("news.titleHighlight")}</span>
          </h2>
          <p className="text-[#4B2E1A]/70 max-w-2xl mx-auto">
            {t("news.subtitle")}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-[#A8D5BA] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-[#2F4F4F]/20 to-[#2F4F4F]/5 flex items-center justify-center">
                <div className="w-16 h-16 bg-[#2F4F4F]/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Newspaper
                    className="w-8 h-8 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-xs font-medium">
                    {lang === "de" ? item.categoryDe : item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {lang === "de" ? item.dateDe : item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#4B2E1A] mb-2 group-hover:text-[#2F4F4F] transition-colors">
                  {lang === "de" ? item.titleDe : item.title}
                </h3>
                <p className="text-[#4B2E1A]/70 text-sm leading-relaxed">
                  {lang === "de" ? item.excerptDe : item.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
