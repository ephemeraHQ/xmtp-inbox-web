import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import {
  ContentTypeScreenEffect,
  ScreenEffectCodec,
} from "@xmtp/experimental-content-type-screen-effect";
import {
  XMTPProvider,
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
} from "@xmtp/react-sdk";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { celo, mainnet } from "wagmi/chains";
import App from "./controllers/AppController";
import "./polyfills";

// Increment with any schema change; e.g. adding support for a new content type
const DB_VERSION = 5;

export const ScreenEffectCodecInstance = new ScreenEffectCodec();

const customConfig = {
  codecs: [ScreenEffectCodecInstance],
  contentTypes: [ContentTypeScreenEffect.toString()],
  namespace: "screenEffects",
};

const contentTypeConfigs = [
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  customConfig,
];

// Required field as of WalletConnect v2.
const projectId = "2e0aa029f1ce655dfdbb0abe644ca24a"
const metadata = {
  name: 'Wallet DM',
  description: 'A Chat App for Crypto Enthusiasts',
  url: 'https://walletdm.com/',
  icons: ['https://walletdm.com/favicon.ico']
}

const chains = [celo, mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ 
  wagmiConfig, 
  projectId, 
  chains,
  featuredWalletIds: [
    // Valora Wallet ID https://walletconnect.com/explorer/valora
    'd01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974',
    // Trust Wallet ID https://walletconnect.com/explorer/trust-wallet
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    // MetaMask Wallet ID https://walletconnect.com/explorer/metamask
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ] 
})

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig config={wagmiConfig}>
    <XMTPProvider
      contentTypeConfigs={contentTypeConfigs}
      dbVersion={DB_VERSION}>
      <App />
    </XMTPProvider>
  </WagmiConfig>
);
