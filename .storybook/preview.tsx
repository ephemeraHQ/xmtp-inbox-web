import "./styles/globals.css";

import i18n, { initialize, supportedLocales } from "../src/helpers/i18n";
import React, { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { Decorator } from "@storybook/react";

const withI18next: Decorator = (story, context) => {
  const [initialized, setInitialized] = useState(false);

  const { locale } = context.globals;

  useEffect(() => {
    const initI18n = async () => {
      await initialize();
      setInitialized(true);
    };
    initI18n();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return initialized ? (
    <I18nextProvider i18n={i18n}>{story(context)}</I18nextProvider>
  ) : (
    <div>Loading translations...</div>
  );
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: supportedLocales.map((lang) => {
        return {
          value: lang,
          title: new Intl.DisplayNames(["en"], { type: "language" }).of(lang),
        };
      }),
      showName: true,
    },
  },
};

export const decorators = [withI18next];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
};
