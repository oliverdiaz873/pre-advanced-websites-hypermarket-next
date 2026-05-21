"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const SUPPORTED_LANGUAGES = ['es', 'en'] as const;

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    const browserLanguage = navigator.language.split('-')[0];
    const nextLanguage = [storedLanguage, browserLanguage].find((language) =>
      SUPPORTED_LANGUAGES.includes(language as (typeof SUPPORTED_LANGUAGES)[number])
    );

    if (nextLanguage && i18n.language !== nextLanguage) {
      i18n.changeLanguage(nextLanguage);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
