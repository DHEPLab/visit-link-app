import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import enTranslation from "./locales/en/translation";
import zhTranslation from "./locales/zh/translation";

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";

export const defaultNS = "Common";
export const resources = {
  en: enTranslation,
  zh: zhTranslation,
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  debug: false,
  defaultNS,
  resources,
});

export default i18n;
