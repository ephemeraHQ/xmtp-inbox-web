import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.screenshotOnRunFailure = false;
      config.video = false;
      return config;
    }
  },

  component: {
    video: false,
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
