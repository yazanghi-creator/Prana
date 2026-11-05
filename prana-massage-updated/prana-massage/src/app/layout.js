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
  title: "Prana Massage | Therapeutic Massage Therapy in Nürnberg",
  description:
    "Experience the healing power of therapeutic massage in Nürnberg. Our expert therapists are dedicated to helping you achieve balance, relaxation, and wellness.",
  keywords:
    "massage, therapy, relaxation, wellness, deep tissue, hot stone, aromatherapy, Nürnberg, Germany",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
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
