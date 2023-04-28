import { DecodedMessage } from "@xmtp/xmtp-js";

export const MESSAGE_LIMIT = 20;

export const ENVIRONMENT = {
  DEMO: "demo",
  ALPHA: "alpha.xmtp.chat",
};

export const RecipientInputMode = {
  InvalidEntry: 0,
  FindingEntry: 1,
  Submitted: 2,
  NotOnNetwork: 3,
  OnNetwork: 4,
};

export const CONVERSATION_CACHE_VERSION = 1;

/* The number below 767 is to match tailwinds breakpoint for md that is of 768 */
export const TAILWIND_MD_BREAKPOINT = 767;

export const ALLOWED_ENS_SUFFIXES = [".eth", ".cb.id"];

export const XMTP_FEEDBACK_ADDRESS =
  "0x8bcF8AFF8Cb99335CD9f4d9866a40e05E23373ff";

export const XMTP_FEEDBACK_FIRST_MSG = {
  id: "feedbackMessage",
  senderAddress: XMTP_FEEDBACK_ADDRESS,
  content: `Welcome to XMTP Inbox!

This conversation can be used to provide feedback about the
protocol and this app.

Here are a few things you can do:
Send a new message to anyone using a Ox or ENS address:
xmtp.chat/new

Find the perfect app for you on our showcase of apps
powered by the XMTP network:
xmtp.chat/showcase

If you're a developer, explore our developer documentation
for how to build your own apps on the XMTP network:
xmtp.org`,
} as DecodedMessage;
