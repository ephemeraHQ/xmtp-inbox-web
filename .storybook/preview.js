import "../styles/globals.css";
import i18n from "../i18n";
import React, { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { resourceMap } from "../i18n";

const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const decorators = [withI18next];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: Object.keys(resourceMap).map((lang) => {
        return {
          value: lang,
          title: new Intl.DisplayNames(["en"], { type: "language" }).of(lang),
        };
      }),

      showName: true,
    },
  },
};

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
