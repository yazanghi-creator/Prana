'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations, getTranslation } from '@/lib/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('de'); // German as default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'de' || savedLang === 'en')) {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
  };

  const t = (path) => getTranslation(lang, path);

  // Always wrap children in the provider, even before mounting
  // Just use default language until mounted
  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
