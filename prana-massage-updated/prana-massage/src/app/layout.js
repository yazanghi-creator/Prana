import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prana Massage Praxis Nürnberg | Massage & Heilung in Nürnberg",
  description:
    "Prana Massage Praxis in Nürnberg Sulzbacher Str. 94 – Schmerzfrei Massage, Hot Stone, Schröpfen, Reflexzonenmassage & mehr. Jetzt Termin buchen! ⭐ 5.0 Sterne · 706 Bewertungen.",
  keywords:
    "Massage Nürnberg, Massagepraxis Nürnberg, Schmerzfrei Massage Nürnberg, Hot Stone Massage Nürnberg, Schröpfen Nürnberg, Hacamat Nürnberg, Reflexzonenmassage Nürnberg, Sportmassage Nürnberg, Prana Massage, Massage Sulzbacher Straße",
  openGraph: {
    title: "Prana Massage Praxis Nürnberg",
    description:
      "Professionelle Massage-Therapie in Nürnberg. Schmerzfrei Massage, Hot Stone, Schröpfen & mehr. ⭐ 5.0 · 706 Bewertungen.",
    url: "https://www.prana-massage.com",
    siteName: "Prana Massage Praxis",
    locale: "de_DE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.prana-massage.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        {/* Local Business JSON-LD Structured Data */}
        <Script id="local-business-schema" type="application/ld+json" strategy="beforeInteractive">
          {`{
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyBusiness",
            "name": "Prana Massage Praxis",
            "image": "https://www.prana-massage.com/logo.png",
            "url": "https://www.prana-massage.com",
            "telephone": "+4917621440748",
            "email": "pranaway7@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sulzbacher Str. 94",
              "addressLocality": "Nürnberg",
              "postalCode": "90489",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 49.4593,
              "longitude": 11.1078
            },
            "openingHoursSpecification": [
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "09:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "09:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "20:00" },
              { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "18:00" }
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "reviewCount": "706"
            },
            "priceRange": "€€",
            "currenciesAccepted": "EUR",
            "paymentAccepted": "Cash, Credit Card",
            "areaServed": "Nürnberg",
            "serviceType": ["Schmerzfrei Massage", "Hot Stone Massage", "Schröpfen", "Reflexzonenmassage", "Sportmassage", "Aura und Chakra Reinigung"]
          }`}
        </Script>
        {/* Google Consent Mode v2 - must run BEFORE the Google Tag */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
          `}
        </Script>
        {/* Google Tag AW-16521107857 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16521107857"
          strategy="afterInteractive"
        />
        <Script id="google-tag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16521107857');

            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-16521107857/sOsdCI6Cy7IdEJGz8MU9',
                'value': 1.0,
                'currency': 'EUR',
                'event_callback': callback
              });
              return false;
            }

            // Fire the "Termin Buchen Prana" conversion for every booking link
            // (header, hero, services, products, footer, mobile menu).
            // Capture phase so it runs before Next.js handles the navigation.
            document.addEventListener('click', function (e) {
              var link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
              if (!link) return;
              var path;
              try { path = new URL(link.href, window.location.href).pathname; } catch (err) { return; }
              if (path !== '/booking' && path !== '/booking/') return;
              gtag('event', 'conversion', {
                'send_to': 'AW-16521107857/sOsdCI6Cy7IdEJGz8MU9',
                'value': 1.0,
                'currency': 'EUR',
                'transport_type': 'beacon'
              });
            }, true);
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F4E1D2]`}
      >
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
