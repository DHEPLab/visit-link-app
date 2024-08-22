import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import enTranslation from './locales/en/translation';
import zhTranslation from './locales/zh/translation';

const ENGLISH_LOCALES = [
    'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-NZ', 'en-IE', 'en-ZA', 'en-IN'
];

const CHINESE_LOCALES = [
    'zh-CN', 'zh-SG', 'zh-HK', 'zh-TW'
];

function getLanguageFromLocale(locale) {
    if (CHINESE_LOCALES.includes(locale) || locale.startsWith('zh')) return 'zh';
    if (ENGLISH_LOCALES.includes(locale)) return 'en';
    return 'en';
}

const deviceLanguage = getLanguageFromLocale(Localization.locale);

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: enTranslation,
            zh: zhTranslation
        },
        lng: deviceLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;