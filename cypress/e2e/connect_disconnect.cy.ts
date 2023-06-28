import { checkElement, startDemoEnv, TIMEOUT } from "../test_utils";

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
        "new-message-icon-cta",
        "conversations-list-panel",
      ];

      elements.forEach((element) => {
        checkElement(element);
      });
    });

    it("Shows feedback convo with a preview message", () => {
      checkElement("conversations-list-panel");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500);
      cy.get(`[data-testid=message-tile-text]`, { timeout: TIMEOUT })
        .first()
        .should("exist");
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

    it("Opens new message view when clicking on plus icon from left panel", () => {
      // Need to break up the click chain for GitHub actions
      cy.get(`[data-testid=new-message-icon-cta]`).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500);
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
