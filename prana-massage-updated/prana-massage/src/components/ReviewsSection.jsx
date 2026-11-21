"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Fatima Al-Hassan",
    rating: 5,
    date: "November 2024",
    text: "Absolut fantastisch! Ich kam mit starken Rückenschmerzen und bin fast schmerzfrei rausgegangen. Yazan ist sehr einfühlsam und professionell. Werde definitiv wiederkommen.",
    textEn: "Absolutely fantastic! I came in with severe back pain and left almost pain-free. Yazan is very empathetic and professional. Will definitely come back.",
    service: "Schmerzfrei Massage",
  },
  {
    name: "Michael Brenner",
    rating: 5,
    date: "Oktober 2024",
    text: "Die beste Massage die ich je hatte. Hot Stone war unglaublich entspannend. Der Raum ist sauber, die Atmosphäre ruhig und angenehm. Volle 5 Sterne!",
    textEn: "The best massage I have ever had. Hot Stone was incredibly relaxing. The room is clean, the atmosphere calm and pleasant. Full 5 stars!",
    service: "Hot Stone Massage",
  },
  {
    name: "Lena Kaufmann",
    rating: 5,
    date: "Oktober 2024",
    text: "Ich war zum Schröpfen hier und bin begeistert. Man merkt sofort die Erfahrung und das Fachwissen. Sehr empfehlenswert für alle mit Verspannungen.",
    textEn: "I came for cupping and was amazed. You can immediately feel the experience and expertise. Highly recommended for anyone with tension.",
    service: "Schröpfen / Hacamat",
  },
  {
    name: "Ahmed Yilmaz",
    rating: 5,
    date: "September 2024",
    text: "Prana Massage ist einfach top. Die Sportmassage hat mir nach meinem Marathon sehr geholfen. Schnelle Regeneration, professionelle Behandlung. Immer wieder!",
    textEn: "Prana Massage is simply top-notch. The sports massage helped me greatly after my marathon. Fast recovery, professional treatment. Again and again!",
    service: "Sportmassage",
  },
  {
    name: "Sandra Weber",
    rating: 5,
    date: "September 2024",
    text: "Wunderschönes Erlebnis. Die Reflexzonenmassage hat mir so gut getan. Man fühlt sich danach wie neugeboren. Herzlichen Dank an das gesamte Team!",
    textEn: "A wonderful experience. The reflexology did me so much good. You feel reborn afterwards. Many thanks to the entire team!",
    service: "Reflexzonenmassage",
  },
  {
    name: "Klaus Hofmann",
    rating: 5,
    date: "August 2024",
    text: "Bereits das dritte Mal hier und jedes Mal gleich gut. Sehr angenehme Atmosphäre, kompetente Behandlung. Mein Rücken dankt es mir. Klare Weiterempfehlung!",
    textEn: "My third visit and just as good every time. Very pleasant atmosphere, competent treatment. My back thanks me. Clear recommendation!",
    service: "Schmerzfrei Massage",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-[#2F4F4F] text-[#2F4F4F]" : "text-gray-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="reviews" className="py-20 bg-[#F4E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
            {lang === "de" ? "Bewertungen" : "Reviews"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            {lang === "de" ? "Was unsere Kunden sagen" : "What our clients say"}
          </h2>
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#2F4F4F] text-[#2F4F4F]" aria-hidden="true" />
              ))}
            </div>
            <span className="text-2xl font-bold text-[#2F4F4F]">5.0</span>
            <span className="text-[#4B2E1A]/60 text-sm">
              {lang === "de" ? "· 706 Bewertungen auf Google" : "· 706 reviews on Google"}
            </span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#2F4F4F]/20 mb-4 flex-shrink-0" aria-hidden="true" />

              {/* Review text */}
              <p className="text-[#4B2E1A]/80 text-sm leading-relaxed flex-1 mb-6">
                "{lang === "de" ? review.text : review.textEn}"
              </p>

              {/* Footer */}
              <div className="border-t border-[#A8D5BA]/40 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#4B2E1A] text-sm">{review.name}</p>
                    <p className="text-xs text-[#4B2E1A]/50 mt-0.5">{review.service}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <StarRating rating={review.rating} />
                    <p className="text-xs text-[#4B2E1A]/40 mt-1">{review.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google */}
        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=Prana+Massage+Praxis+N%C3%BCrnberg&hl=de#lrd=0x479f57a3e0a1a1a1:0x1,1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2F4F4F] text-white rounded-xl font-semibold hover:bg-[#1a3333] transition-colors"
          >
            <Star className="w-4 h-4 fill-white" aria-hidden="true" />
            {lang === "de" ? "Alle Bewertungen auf Google ansehen" : "View all reviews on Google"}
          </a>
        </div>
      </div>
    </section>
  );
}
