"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import profileImage from "@/images/user/profile.jpeg";
import { CheckCircle, Check } from "lucide-react";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-[#F4E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
              {/* Background decorative element */}
              <div className="absolute inset-0 bg-[#2F4F4F]/10 rounded-3xl transform rotate-3"></div>

              {/* Main image container */}
              <div className="relative bg-[#A8D5BA] rounded-3xl overflow-hidden h-full">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-[#2F4F4F]/20">
                    <Image
                      src={profileImage}
                      alt="Anas Alkaram - Licensed Massage Therapist"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-[center_30%]"
                      priority
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#4B2E1A] mb-2">
                    Anas Alkaram
                  </h3>
                  <p className="text-[#2F4F4F] font-medium mb-4">
                    {t("about.therapist")}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                      LMT
                    </span>
                    <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                      {t("about.certified")}
                    </span>
                    <span className="px-3 py-1 bg-white/50 rounded-full text-sm">
                      10+ {t("about.years")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#2F4F4F]/10 rounded-full flex items-center justify-center">
                    <CheckCircle
                      className="w-6 h-6 text-[#2F4F4F]"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#4B2E1A]">
                      500+ {t("about.clients")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("about.treated")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-6">
              {t("about.title")}
              <span className="text-[#2F4F4F]">
                {" "}
                {t("about.titleHighlight")}
              </span>
            </h2>
            <p className="text-[#4B2E1A]/70 mb-6 leading-relaxed">
              {t("about.description1")}
            </p>
            <p className="text-[#4B2E1A]/70 mb-8 leading-relaxed">
              {t("about.description2")}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#2F4F4F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A]">
                    {t("about.certifiedExpert")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t("about.licensedTherapist")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#2F4F4F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A]">
                    {t("about.personalizedCare")}
                  </h4>
                  <p className="text-sm text-gray-500">{t("about.tailored")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#2F4F4F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A]">
                    {t("about.relaxingSpace")}
                  </h4>
                  <p className="text-sm text-gray-500">{t("about.tranquil")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#2F4F4F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#4B2E1A]">
                    {t("about.flexibleHours")}
                  </h4>
                  <p className="text-sm text-gray-500">{t("about.fitsYou")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
