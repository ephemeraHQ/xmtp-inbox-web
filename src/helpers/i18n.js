import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { format as formatDate, isDate, formatDistanceStrict } from "date-fns";
import * as locales from "date-fns/locale"; // import all locales we need

// Get translated JSON files from locales folder so we don't need to import here individually
const localeFiles = import.meta.glob("../../src/locales/*.json");
const filenames = Object.keys(localeFiles).map(
  (item) => item.split("locales/")[1],
); // => ['./de_DE.json, './en_US.json']

const keyValuePairs = await Promise.all(
  filenames.map(async (name) => {
    const locale = name.match(/\/(\w+)\.json$/)?.[1] || "en_US.json";
    const file = await localeFiles[`../locales/${locale}`]();
    return [locale.split(".json")[0], file];
  }),
);

// Create object with languages and corresponding file mappings
const messages = Object.fromEntries(keyValuePairs);

// Populate mapping of language to locale file resources
export let resourceMap = {};

Object.keys(messages).forEach((locale) => {
  const lang = locale?.split("_")?.[0];
  resourceMap[lang] = { translation: messages[locale] };
});

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(backend)
  .init({
    fallbackLng: "en",
    resources: resourceMap,
    interpolation: {
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];

          if (format === "long_date") {
            return formatDate(value, "PPP", { locale });
          }
          if (format === "time") {
            return formatDate(value, "h:mm a", { locale });
          }
          if (format === "ago")
            return formatDistanceStrict(value, new Date(), {
              locale,
              addSuffix: true,
            });
          return formatDate(value, format, { locale });
        } else {
          return "";
        }
      },
    },
  });

export default i18next;
