import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import only English and Kannada for now to minimize initial load
const resources = {
  en: {
    translation: {
      header: {
        search: "Search diseases, pesticides, or connect with farmers...",
        community: "Community",
        shareKnowledge: "Share Knowledge"
      },
      nav: {
        home: "Home",
        diseases: "Diseases",
        pesticides: "Pesticides",
        community: "Community",
        resources: "Resources",
        settings: "Settings"
      },
      feed: {
        title: "Community Knowledge Sharing",
        subtitle: "Learn from other farmers' experiences and share your own insights",
        shareButton: "Share Your Experience"
      },
      languages: {
        en: "English",
        kn: "ಕನ್ನಡ"
      }
    }
  },
  kn: {
    translation: {
      header: {
        search: "ರೋಗಗಳು, ಕೀಟನಾಶಕಗಳು ಅಥವಾ ರೈತರೊಂದಿಗೆ ಸಂಪರ್ಕ ಹುಡುಕಿ...",
        community: "ಸಮುದಾಯ",
        shareKnowledge: "ಜ್ಞಾನ ಹಂಚಿಕೊಳ್ಳಿ"
      },
      nav: {
        home: "ಮುಖಪುಟ",
        diseases: "ರೋಗಗಳು",
        pesticides: "ಕೀಟನಾಶಕಗಳು",
        community: "ಸಮುದಾಯ",
        resources: "ಸಂಪನ್ಮೂಲಗಳು",
        settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು"
      },
      feed: {
        title: "ಸಮುದಾಯ ಜ್ಞಾನ ಹಂಚಿಕೆ",
        subtitle: "ಇತರ ರೈತರ ಅನುಭವಗಳಿಂದ ಕಲಿಯಿರಿ ಮತ್ತು ನಿಮ್ಮ ಒಳನೋಟಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
        shareButton: "ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ"
      },
      languages: {
        en: "English",
        kn: "ಕನ್ನಡ"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;