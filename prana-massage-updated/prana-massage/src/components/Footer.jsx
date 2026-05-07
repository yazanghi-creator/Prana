"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const getHref = (href) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  return (
    <footer className="bg-[#4B2E1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2F4F4F] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-semibold">Prana Massage</span>
            </div>
            <p className="text-gray-400 max-w-md">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#A8D5BA]">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("footer.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={getHref("#about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href={getHref("#services")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t("nav.bookNow")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#A8D5BA]">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="https://maps.google.com/?q=Sulzbacher+Str.+94,+90489+Nürnberg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <MapPin
                    className="w-5 h-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>Sulzbacher Str. 94, 90489 Nürnberg</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4917621440748"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>+49 176 21440748</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:pranaway7@gmail.com"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>pranaway7@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Prana Massage. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
