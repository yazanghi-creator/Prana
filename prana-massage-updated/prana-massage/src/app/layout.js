import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F4E1D2]`}
      >
        <Providers>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
