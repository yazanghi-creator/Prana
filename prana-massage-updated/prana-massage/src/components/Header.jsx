"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, changeLanguage, t } = useLanguage();
  const pathname = usePathname();

  const getHref = (href) => {
    if (href.startsWith("#") && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#news", label: t("nav.news") },
    { href: "#contact", label: t("nav.contact") },
    { href: "/booking", label: t("nav.bookNow"), isButton: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Vacation Banner */}
      <div className="bg-[#2F4F4F] text-white text-center py-2 px-4 text-sm">
        🌴 <strong>Urlaubszeit:</strong> Unsere Praxis ist vom <strong>09.07.2026 bis einschließlich 23.07.2026</strong> geschlossen. Ab <strong>24.07.2026</strong> sind wir wieder für euch da. Danke für euer Verständnis! &nbsp;|&nbsp; 🌴 <strong>Vacation:</strong> Closed from <strong>July 9–23, 2026</strong>. Back on <strong>July 24</strong>. Thank you!
      </div>
      <div className="bg-[#F4E1D2]/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Prana Massage Logo" className="w-12 h-12 rounded-full object-cover" />
            <span className="text-xl font-semibold text-[#4B2E1A]">
              Prana Massage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.isButton ? (
                <Link key={link.href} href={link.href} className="btn-primary">
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  className="text-[#4B2E1A] hover:text-[#2F4F4F] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="flex items-center border-l border-[#A8D5BA] pl-4 ml-2">
              <button
                onClick={() => changeLanguage("de")}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  lang === "de"
                    ? "bg-[#2F4F4F] text-white"
                    : "text-[#4B2E1A] hover:bg-[#A8D5BA]"
                }`}
              >
                DE
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                  lang === "en"
                    ? "bg-[#2F4F4F] text-white"
                    : "text-[#4B2E1A] hover:bg-[#A8D5BA]"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#A8D5BA] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#4B2E1A]" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-[#4B2E1A]" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#A8D5BA]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  className={
                    link.isButton
                      ? "btn-primary text-center"
                      : "text-[#4B2E1A] hover:text-[#2F4F4F] transition-colors font-medium py-2"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-[#A8D5BA]">
                <span className="text-sm text-gray-500">Language:</span>
                <button
                  onClick={() => changeLanguage("de")}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    lang === "de"
                      ? "bg-[#2F4F4F] text-white"
                      : "bg-[#A8D5BA] text-[#4B2E1A]"
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                    lang === "en"
                      ? "bg-[#2F4F4F] text-white"
                      : "bg-[#A8D5BA] text-[#4B2E1A]"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      </div>
    </header>
  );
}
