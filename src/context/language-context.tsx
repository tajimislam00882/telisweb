
'use client';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import bn from '@/locales/bn.json';

type Language = 'en' | 'bn';

const translations = { en, bn };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'bn'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
      document.body.classList.toggle('font-bn', savedLanguage === 'bn');
    } else {
        document.body.classList.remove('font-bn');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.body.classList.toggle('font-bn', lang === 'bn');
  };

  const t = useCallback((key: string, replacements?: { [key: string]: string | number }) => {
    let translation = translations[language][key as keyof typeof translations[Language]] || key;
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
        });
    }
    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
