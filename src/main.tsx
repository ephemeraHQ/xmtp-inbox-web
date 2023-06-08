import "./polyfills";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { XMTPProvider } from "@xmtp/react-sdk";
import App from "./controllers/AppController";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { isAppEnvDemo } from "./helpers";
import { mockConnector } from "./helpers/mockConnector";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: process.env.VITE_INFURA_ID ?? "" }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "XMTP Inbox Web",
  chains,
});

const wagmiDemoClient = createClient({
  autoConnect: true,
  connectors: [mockConnector],
  provider,
  webSocketProvider,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={isAppEnvDemo() ? wagmiDemoClient : wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <StrictMode>
        <XMTPProvider>
          <App />
        </XMTPProvider>
      </StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
);
