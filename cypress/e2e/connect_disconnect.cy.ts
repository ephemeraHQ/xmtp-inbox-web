import { checkElement, startDemoEnv } from "../test_utils";

describe(
  "Connected Test Cases",
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      startDemoEnv();
      // In connected flow, conversation list header should render before any tests run
      checkElement("conversation-list-header");
    });

    it("Shows expected left panel fields when logged in with a connected wallet and no existing messages", () => {
      const elements = [
        "avatar",
        "messages-icon",
        "gallery-icon",
        "settings-icon",
        "collapse-icon",
        "icon",
        "conversation-list-header",
        "empty-message-icon",
        "empty-message-header",
        "empty-message-subheader",
        "empty-message-cta",
      ];
      elements.forEach((element) => {
        checkElement(element);
      });
    });

    it("Shows expected right panel fields when logged in with a connected wallet and no existing messages", () => {
      const elements = [
        "learn-more-header",
        "get-started-header",
        "message-section-link",
        "message-icon",
        "community-section-link",
        "community-icon",
        "docs-section-link",
        "docs-icon",
      ];
      elements.forEach((element) => {
        checkElement(element);
      });
    });

    it("Shows expected fields when expanding side nav while connected", () => {
      cy.get(`[data-testid="collapse-icon"]`).click();

      const elements = [
        "Messages",
        "Gallery",
        "Settings",
        "Collapse",
        "wallet-address",
      ];

      elements.forEach((element) => {
        checkElement(element);
      });

      cy.get(`[data-testid="icon"]`).click();
      cy.get(`[data-testid="disconnect-wallet-cta"]`).click();
    });

    it("Opens new message view when clicking the CTA from left panel", () => {
      // Need to break up the click chain for GitHub actions
      cy.get(`[data-testid=empty-message-cta]`).click();
      checkElement("message-input");
    });
  },
);

describe("Disconnected Test Cases", () => {
  beforeEach(() => {
    cy.visit(Cypress.env("server_url"));
  });
  it("Shows expected fields when disconnected from a wallet", () => {
    const elements = [
      "xmtp-logo",
      "no-wallet-connected-header",
      "no-wallet-connected-subheader",
      "no-wallet-connected-cta",
      "no-wallet-connected-subtext",
    ];

    elements.forEach((element) => {
      checkElement(element);
    });
  });
});
