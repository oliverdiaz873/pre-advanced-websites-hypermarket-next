import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esCategories from '@/public/locales/es/categories.json';
import esCommon from '@/public/locales/es/common.json';
import esContact from '@/public/locales/es/contact.json';
import esFooter from '@/public/locales/es/footer.json';
import esHeader from '@/public/locales/es/header.json';
import esHome from '@/public/locales/es/home.json';
import esLegal from '@/public/locales/es/legal.json';
import esOffers from '@/public/locales/es/offers.json';
import esProducts from '@/public/locales/es/products.json';
import esSearch from '@/public/locales/es/search.json';
import enCategories from '@/public/locales/en/categories.json';
import enCommon from '@/public/locales/en/common.json';
import enContact from '@/public/locales/en/contact.json';
import enFooter from '@/public/locales/en/footer.json';
import enHeader from '@/public/locales/en/header.json';
import enHome from '@/public/locales/en/home.json';
import enLegal from '@/public/locales/en/legal.json';
import enOffers from '@/public/locales/en/offers.json';
import enProducts from '@/public/locales/en/products.json';
import enSearch from '@/public/locales/en/search.json';

const resources = {
  es: {
    categories: esCategories,
    common: esCommon,
    contact: esContact,
    footer: esFooter,
    header: esHeader,
    home: esHome,
    legal: esLegal,
    offers: esOffers,
    products: esProducts,
    search: esSearch,
  },
  en: {
    categories: enCategories,
    common: enCommon,
    contact: enContact,
    footer: enFooter,
    header: enHeader,
    home: enHome,
    legal: enLegal,
    offers: enOffers,
    products: enProducts,
    search: enSearch,
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'es',
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    load: 'languageOnly',
    resources,
    ns: ['common', 'header', 'home', 'footer', 'categories', 'legal', 'products', 'search', 'contact', 'offers'],
    defaultNS: 'common',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;
