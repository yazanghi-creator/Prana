"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Home, Dumbbell, Plane, Trophy, Globe } from "lucide-react";

// Import Aboniki product images
import aboniki1 from "@/images/aboniki/aboniki1.jpg";
import aboniki2 from "@/images/aboniki/aboniki2.jpg";
import aboniki3 from "@/images/aboniki/aboniki3.jpg";
import aboniki4 from "@/images/aboniki/aboniki4.webp";

const productImages = [aboniki1, aboniki2, aboniki3, aboniki4];

export default function ProductsSection() {
  const { t, lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="products" className="py-20 bg-[#F4E1D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#2F4F4F]/10 text-[#2F4F4F] rounded-full text-sm font-medium mb-4">
            {t("products.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4B2E1A] mb-4">
            {t("products.title")}
            <span className="text-[#2F4F4F]">
              {" "}
              {t("products.titleHighlight")}
            </span>
          </h2>
          <p className="text-[#4B2E1A]/70 max-w-3xl mx-auto leading-relaxed">
            {t("products.subtitle")}
          </p>
        </div>

        {/* Product Display - Single Product with Gallery */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery Side */}
            <div className="p-8 bg-gradient-to-br from-[#A8D5BA]/20 to-[#F4E1D2]">
              {/* Main Image */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-4 bg-white shadow-lg">
                <Image
                  src={productImages[selectedImage]}
                  alt="Aboniki Balm"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-3 ring-[#2F4F4F] scale-105 shadow-lg"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Aboniki Balm view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info Side */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Product Name */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#4B2E1A] mb-4">
                Aboniki Balm
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl sm:text-5xl font-bold text-[#2F4F4F]">
                  €20
                </span>
                <span className="text-gray-500 text-sm">
                  {t("products.perUnit")}
                </span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8D5BA]/30 text-[#2F4F4F] rounded-full font-medium">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  {t("products.antiInflammatory")}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8D5BA]/30 text-[#2F4F4F] rounded-full font-medium">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  {t("products.painRelief")}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#A8D5BA]/30 text-[#2F4F4F] rounded-full font-medium">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  {t("products.antiBacterial")}
                </span>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 mb-8 text-[#4B2E1A]/80">
                <div className="flex items-start gap-3">
                  <Home
                    className="w-5 h-5 text-[#2F4F4F] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{t("products.benefit1")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Dumbbell
                    className="w-5 h-5 text-[#2F4F4F] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{t("products.benefit2")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Plane
                    className="w-5 h-5 text-[#2F4F4F] flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{t("products.benefit3")}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Trophy
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                  <span>{t("products.awardWinning")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe
                    className="w-5 h-5 text-[#2F4F4F]"
                    aria-hidden="true"
                  />
                  <span>{t("products.trustedWorldwide")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
