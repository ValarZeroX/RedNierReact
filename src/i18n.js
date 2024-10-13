import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import zhtw from './locales/zh-tw.json';

// 初始化 i18n
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    zhtw: {
      translation: zhtw
    }
  },
  lng: 'en',  // 默认语言
  fallbackLng: 'en',  // 如果当前语言的翻译不存在，回退到英文
  interpolation: {
    escapeValue: false  // React 已经自动防止 XSS 注入
  }
});

export default i18n;