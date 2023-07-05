import type { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Cypress {
      env(key: "server_url"): string;
    }

    interface Chainable {
      mount: typeof mount;
    }
  }
}
