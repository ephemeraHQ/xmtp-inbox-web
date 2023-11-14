import { startDemoEnv, sendAndEnterMessage, checkElement } from "../test_utils";

describe(
  "Reactions Test Cases",
  {
    retries: {
      runMode: 3,
      openMode: 2,
    },
  },
  () => {
    const testUserWithXmtpAccount =
      "0x78BfD39428C32Be149892d64bEE6C6f90aedEec1";

    const shortMessage = "hello";
    beforeEach(() => {
      startDemoEnv();
      // In connected flow, conversation list header should render before any tests run
      checkElement("conversation-list-header");
      // Message should be sent as well before testing reactions
      sendAndEnterMessage(testUserWithXmtpAccount, shortMessage);
    });

    it("can react to a message", () => {
      checkElement("reactions-container").children().should("have.length", 0);

      // When clicking on the message (or hovering), the bar should appear
      checkElement("message-tile-text").children().first().click();
      checkElement("reactions-bar");

      // Click on first emoji
      checkElement("reaction").children().first().click();

      // Reactions should show now
      checkElement("reactions-container").children().should("have.length", 1);
      checkElement("reactions-container")
        .children()
        .first()
        .should("have.text", "👍");
    });
    it("can unreact to a message", () => {
      // React to message like above
      checkElement("message-tile-text").children().first().click();
      checkElement("reactions-bar");
      checkElement("reaction").children().first().click();
      checkElement("reactions-container").children().should("have.length", 1);

      // Unreact to message
      checkElement("reactions-container").children().first().click();
      checkElement("reactions-container").children().should("have.length", 0);
    });
    it("can react in multiple ways to a message", () => {
      // React to message like above
      checkElement("message-tile-text").children().first().click();
      checkElement("reactions-bar");
      checkElement("reaction").children().first().click();
      checkElement("reactions-container").children().should("have.length", 1);
      checkElement("reactions-container")
        .children()
        .first()
        .should("have.text", "👍");

      // React with a different emoji
      checkElement("message-tile-text").children().first().click();
      checkElement("reactions-bar");
      checkElement("reaction").children().last().click();
      checkElement("reactions-container").children().should("have.length", 2);
      checkElement("reactions-container")
        .children()
        .last()
        .should("have.text", "❤️");
    });
  },
);
