import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des traductions COMMON
import commonFR from '../locales/fr/common.json';
import commonEN from '../locales/en/common.json';
import commonES from '../locales/es/common.json';
import commonDE from '../locales/de/common.json';
import commonIT from '../locales/it/common.json';
import commonPT from '../locales/pt/common.json';
import commonGR from '../locales/gr/common.json';
import commonFI from '../locales/fi/common.json';
import commonNL from '../locales/nl/common.json';
import commonAZ from '../locales/az/common.json';
import commonPL from '../locales/pl/common.json';
import commonMT from '../locales/mt/common.json';
import commonCS from '../locales/cs/common.json';

// Import des traductions HOME
import homeFR from '../locales/fr/home.json';
import homeEN from '../locales/en/home.json';
import homeES from '../locales/es/home.json';
import homeDE from '../locales/de/home.json';
import homeIT from '../locales/it/home.json';
import homePT from '../locales/pt/home.json';
import homeGR from '../locales/gr/home.json';
import homeFI from '../locales/fi/home.json';
import homeNL from '../locales/nl/home.json';
import homeAZ from '../locales/az/home.json';
import homePL from '../locales/pl/home.json';
import homeMT from '../locales/mt/home.json';
import homeCS from '../locales/cs/home.json';

// Import des traductions ABOUT
import aboutFR from '../locales/fr/about.json';
import aboutEN from '../locales/en/about.json';
import aboutES from '../locales/es/about.json';
import aboutDE from '../locales/de/about.json';
import aboutIT from '../locales/it/about.json';
import aboutPT from '../locales/pt/about.json';
import aboutGR from '../locales/gr/about.json';
import aboutFI from '../locales/fi/about.json';
import aboutNL from '../locales/nl/about.json';
import aboutAZ from '../locales/az/about.json';
import aboutPL from '../locales/pl/about.json';
import aboutMT from '../locales/mt/about.json';
import aboutCS from '../locales/cs/about.json';

// Import des traductions CONTACT
import contactFR from '../locales/fr/contact.json';
import contactEN from '../locales/en/contact.json';
import contactES from '../locales/es/contact.json';
import contactDE from '../locales/de/contact.json';
import contactIT from '../locales/it/contact.json';
import contactPT from '../locales/pt/contact.json';
import contactGR from '../locales/gr/contact.json';
import contactFI from '../locales/fi/contact.json';
import contactNL from '../locales/nl/contact.json';
import contactAZ from '../locales/az/contact.json';
import contactPL from '../locales/pl/contact.json';
import contactMT from '../locales/mt/contact.json';
import contactCS from '../locales/cs/contact.json';

// Import des traductions SIMULATION
import simulationFR from '../locales/fr/simulation.json';
import simulationEN from '../locales/en/simulation.json';
import simulationES from '../locales/es/simulation.json';
import simulationDE from '../locales/de/simulation.json';
import simulationIT from '../locales/it/simulation.json';
import simulationPT from '../locales/pt/simulation.json';
import simulationGR from '../locales/gr/simulation.json';
import simulationFI from '../locales/fi/simulation.json';
import simulationNL from '../locales/nl/simulation.json';
import simulationAZ from '../locales/az/simulation.json';
import simulationPL from '../locales/pl/simulation.json';
import simulationMT from '../locales/mt/simulation.json';
import simulationCS from '../locales/cs/simulation.json';


const resources = {
  fr: { common: commonFR, home: homeFR, about: aboutFR, contact: contactFR, simulation: simulationFR },
  en: { common: commonEN, home: homeEN, about: aboutEN, contact: contactEN, simulation: simulationEN },
  es: { common: commonES, home: homeES, about: aboutES, contact: contactES, simulation: simulationES },
  de: { common: commonDE, home: homeDE, about: aboutDE, contact: contactDE, simulation: simulationDE },
  it: { common: commonIT, home: homeIT, about: aboutIT, contact: contactIT, simulation: simulationIT },
  pt: { common: commonPT, home: homePT, about: aboutPT, contact: contactPT, simulation: simulationPT },
  gr: { common: commonGR, home: homeGR, about: aboutGR, contact: contactGR, simulation: simulationGR },
  fi: { common: commonFI, home: homeFI, about: aboutFI, contact: contactFI, simulation: simulationFI },
  nl: { common: commonNL, home: homeNL, about: aboutNL, contact: contactNL, simulation: simulationNL },
  az: { common: commonAZ, home: homeAZ, about: aboutAZ, contact: contactAZ, simulation: simulationAZ },
  pl: { common: commonPL, home: homePL, about: aboutPL, contact: contactPL, simulation: simulationPL },
  mt: { common: commonMT, home: homeMT, about: aboutMT, contact: contactMT, simulation: simulationMT },
  cs: { common: commonCS, home: homeCS, about: aboutCS, contact: contactCS, simulation: simulationCS },
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: import.meta.env.DEV,
    ns: ['common', 'home', 'about', 'contact', 'simulation'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  });


export default i18n;
