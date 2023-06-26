/* eslint-disable no-param-reassign */
import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  env: {
    server_url: "http://localhost:5173",
  },

  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", vitePreprocessor());
      config.screenshotOnRunFailure = false;
      config.video = false;
      return config;
    },
  },

  component: {
    video: false,
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
