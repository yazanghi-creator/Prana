"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else if (consent === "granted") {
      grantConsent();
    }
  }, []);

  function grantConsent() {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
  }

  function handleAccept() {
    localStorage.setItem("cookie_consent", "granted");
    grantConsent();
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookie_consent", "denied");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2F4F4F] text-white px-6 py-5 shadow-2xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-white/90 flex-1">
          Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu
          bieten und unsere Werbemaßnahmen zu verbessern. Mit dem Klick auf
          „Alle akzeptieren" stimmen Sie der Nutzung von Cookies gemäß unserer
          Datenschutzrichtlinie zu.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium border border-white/40 rounded-lg hover:bg-white/10 transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-sm font-semibold bg-[#F4E1D2] text-[#2F4F4F] rounded-lg hover:bg-white transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}

