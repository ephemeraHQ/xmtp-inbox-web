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

//See everyname's tlds list: https://docs.everyname.xyz/api/get-supported-tlds
export const ALLOWED_EVERYNAME_SUFFIXES = [
  ".algo",
  ".apt",
  ".avax",
  ".bnb",
  ".btc",
  ".cosmos",
  ".dot",
  ".eth",
  ".fn",
  ".sol",
  ".stark",
  ".tez",
  ".lens",
  ".cb.id",
  ".ecc.eth",
];

export const ALLOWED_UNS_SUFFIXES = [
  ".crypto",
  ".bitcoin",
  ".blockchain",
  ".dao",
  ".nft",
  ".888",
  ".wallet",
  ".x",
  ".klever",
  ".zil",
  ".hi",
  ".kresus",
  ".polygon",
  ".anime",
  ".manga",
  ".binanceus",
];

export const XMTP_FEEDBACK_ADDRESS =
  "0x8bcF8AFF8Cb99335CD9f4d9866a40e05E23373ff";
