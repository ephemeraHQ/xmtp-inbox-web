import {
  startDemoEnv,
  sendAndEnterMessage,
  checkElement,
  sendMessages,
  checkMessageOutput,
  checkMissingElement,
} from "../test_utils";

describe(
  "Replies Test Cases",
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
    const replyMessage = "this is a reply";
    beforeEach(() => {
      startDemoEnv();
      checkElement("conversation-list-header");
      sendAndEnterMessage(testUserWithXmtpAccount, shortMessage);
      checkElement("message-tile-text").children().first().click();
      checkElement("reactions-bar");
      checkElement("reply-icon").click();
      checkElement("replies-container");
    });

    it("can reply to a message", () => {
      sendMessages(1, replyMessage, testUserWithXmtpAccount, false);
      checkMessageOutput(2, replyMessage);
    });
    it("can send multiple replies to a message", () => {
      sendMessages(1, replyMessage, testUserWithXmtpAccount, false);
      sendMessages(1, "here is another reply", testUserWithXmtpAccount, false);
      checkMessageOutput(3, "here is another reply");
    });
    it("can toggle replies view", () => {
      // Click X
      checkElement("replies-close-icon").click();

      // Reply view should be hidden now
      checkMissingElement("replies-container");
      checkElement("address-container");
    });
    it("cannot reply to a reply", () => {
      checkElement("message-tile-text").children().first();
      checkMissingElement("reply-icon");
    });
    it("can react to a reply", () => {
      sendMessages(1, replyMessage, testUserWithXmtpAccount, false);
      checkElement("reactions-container").children().should("have.length", 0);

      // When clicking on the message (or hovering), the bar should appear
      checkElement("message-tile-text").children().last().click();
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
    it("cannot toggle replies view when there are no replies", () => {
      checkElement("replies-close-icon").click();

      // There shouldn't be a view replies CTA before there are replies
      checkMissingElement("view-replies-cta");

      // Click into replies
      checkElement("reply-icon").click();
      checkElement("replies-container");

      // Send reply
      sendMessages(1, replyMessage, testUserWithXmtpAccount, false);

      // Exit
      checkElement("replies-close-icon").click();

      // View replies CTA should appear
      checkElement("view-replies-cta");

      // When clicking into it, it should go to replies view
      checkElement("view-replies-cta").click();
      checkElement("replies-container");
    });
  },
);
