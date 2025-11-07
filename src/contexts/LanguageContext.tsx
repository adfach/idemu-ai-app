'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import en from '@/lib/translations/en.json';
import id from '@/lib/translations/id.json';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = { en, id };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id');

  useEffect(() => {
    const storedLang = localStorage.getItem('idemu_lang') as Language;
    if (storedLang) {
      setLanguageState(storedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'id') {
        setLanguageState('id');
      } else {
        // Default to Indonesian if not explicitly set or detected
        setLanguageState('id');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('idemu_lang', lang);
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult: any = translations.en;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
        }
        return fallbackResult || key;
      }
    }
    return result || key;
  }, [language]);
  

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
