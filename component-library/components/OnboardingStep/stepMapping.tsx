import { PillButton } from "../PillButton/PillButton";

// To-do: Add proper click handler to button
const stepMapping = {
  [1 as number]: {
    default: {
      header: "Your interoperable web3 inbox",
      subheader:
        "You're just a few steps away from secure, wallet-to-wallet messaging",
      cta: <PillButton label="Connect Your Wallet" />,
      subtext: "No private keys will be shared",
    },
    loading: {
      header: "Connecting to your wallet...",
      subheader:
        "Look for a signature dialog in the wallet you previously selected",
      cta: null,
      subtext: "No private keys will be shared",
    },
  },
  [2 as number]: {
    default: {
      header: "Create your XMTP identity",
      subheader:
        "Now that your wallet is connected, we're going to create your XMTP identity on our network with a wallet signature.",
      cta: <PillButton label="Create XMTP Identity" />,
    },
    loading: {
      header: "Creating your XMTP identity...",
      subheader:
        "Look for a confirmation dialog in the wallet you've selected.",
      cta: null,
      subtext: null,
    },
  },
  [3 as number]: {
    default: {
      header: "Enable messaging on XMTP",
      subheader:
        "You're activated on the XMTP network! Now let's enable your ability to start messaging and you can start messaging wallets right away.",
      cta: <PillButton label="Enable XMTP Identity" />,
      subtext: null,
    },
    loading: {
      header: "Almost there! One more signature.",
      subheader:
        "Look for a confirmation dialog in the wallet you've selected.",
      ctaText: null,
      subtext: null,
    },
  },
};

export default stepMapping;
