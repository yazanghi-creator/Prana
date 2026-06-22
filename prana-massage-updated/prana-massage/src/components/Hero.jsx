"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowDown, Sparkles, Leaf, HandHeart } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4E1D2] via-[#A8D5BA] to-[#F4E1D2]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#2F4F4F]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2F4F4F]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#2F4F4F]/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-[#2F4F4F]/20 rounded-full animate-pulse delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" aria-hidden="true" />{" "}
              {t("hero.welcome")}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B2E1A] leading-tight mb-6">
              {t("hero.title")}
              <span className="text-[#2F4F4F]">
                {" "}
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-lg text-[#4B2E1A]/70 mb-8 max-w-xl mx-auto lg:mx-0">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/booking" className="btn-primary text-center text-lg px-8 py-4">
                {t("hero.bookAppointment")}
              </Link>
              <Link href="#services" className="px-8 py-4 border-2 border-[#4B2E1A] text-[#4B2E1A] rounded-lg font-semibold hover:bg-[#4B2E1A] hover:text-white transition-all text-center">
                {t("hero.viewServices")}
              </Link>
            </div>

            <div className="flex justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2F4F4F]">500+</p>
                <p className="text-sm text-[#4B2E1A]/60">{t("hero.happyClients")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2F4F4F]">10+</p>
                <p className="text-sm text-[#4B2E1A]/60">{t("hero.yearsExperience")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2F4F4F]">5.0</p>
                <div className="flex justify-center gap-0.5 my-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#4B2E1A]/60">507+ Bewertungen</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2F4F4F] to-[#4a7a7a] rounded-full shadow-2xl"></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Prana Massage Praxis" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <p className="flex items-center gap-2 text-sm font-medium text-[#4B2E1A]">
                  <Leaf className="w-4 h-4 text-[#2F4F4F]" aria-hidden="true" />{" "}
                  {t("hero.natural")}
                </p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-[#4B2E1A]">
                  <HandHeart className="w-4 h-4 text-[#2F4F4F]" aria-hidden="true" />{" "}
                  {t("hero.expertCare")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-[#2F4F4F]" aria-hidden="true" />
      </div>
    </section>
  );
}
