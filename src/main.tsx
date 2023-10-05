import "./polyfills";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { publicProvider } from "wagmi/providers/public";
import { attachmentContentTypeConfig, XMTPProvider } from "@xmtp/react-sdk";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import App from "./controllers/AppController";
import { isAppEnvDemo } from "./helpers";
import { mockConnector } from "./helpers/mockConnector";

const DB_VERSION = 2;

const contentTypeConfigs = [attachmentContentTypeConfig];

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: import.meta.env.VITE_INFURA_ID ?? "" }),
    publicProvider(),
  ],
);

const projectId = import.meta.env.VITE_PROJECT_ID;
const appName = "XMTP Inbox Web";

const { wallets } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [trustWallet({ projectId, chains })],
  },
]);

const wagmiDemoConfig = createConfig({
  autoConnect: true,
  connectors: [mockConnector],
  publicClient,
  webSocketPublicClient,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig config={isAppEnvDemo() ? wagmiDemoConfig : wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <StrictMode>
        <XMTPProvider
          contentTypeConfigs={contentTypeConfigs}
          dbVersion={DB_VERSION}>
          <App />
        </XMTPProvider>
      </StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
);
