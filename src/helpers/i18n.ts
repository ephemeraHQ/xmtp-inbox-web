import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import { format as formatDate, isDate, formatDistanceStrict } from "date-fns";
import * as locales from "date-fns/locale"; // import all locales we need

type Locales = Record<string, Locale>;

export const supportedLocales = ["en-US", "hi-IN"];

export const initialize = async () => {
  // Get translated JSON files from locales folder so we don't need to import here individually
  // const localeFiles = import.meta.glob("../locales/*.json");
  const localeFiles = {
    "../locales/en_US.json": () => import("../locales/en_US.json"),
    "../locales/hi_IN.json": () => import("../locales/hi_IN.json"),
  };
  const filenames = Object.keys(localeFiles).map(
    (item) => item.split("locales/")[1],
  ); // => ['./de_DE.json, './en_US.json']

  const keyValuePairs = await Promise.all(
    filenames.map(async (name) => {
      const locale = name.match(/(\w+)\.json$/)?.[0] || "en_US.json";
      const file = (await localeFiles[`../locales/${locale}`]()).default;
      return [locale.split(".json")[0], file];
    }),
  );

  // Create object with languages and corresponding file mappings
  const messages = Object.fromEntries(keyValuePairs);
  console.log({ messages });

  // Populate mapping of language to locale file resources
  const resourceMap: Record<
    string,
    {
      translation: Record<string, Record<string, string>>;
    }
  > = {};

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
          if (isDate(value) && format && lng) {
            const locale = (locales as Locales)[lng];

            if (format === "long_date") {
              return formatDate(value, "PPP", { locale });
            }
            if (format === "time") {
              return formatDate(value, "h:mm a", { locale });
            }
            if (format === "ago") {
              return formatDistanceStrict(value, new Date(), {
                locale,
                addSuffix: true,
              });
            }

            return formatDate(value, format, { locale });
          } else {
            return "";
          }
        },
      },
    });
};

export default i18next;
