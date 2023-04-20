import "@xmtp/react-sdk/style.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import React, { useEffect, useState } from "react";
import { isAppEnvDemo } from "../helpers";
import "../i18n";
import { XMTPProvider } from "@xmtp/react-sdk";
import { mockConnector } from "../helpers/mockConnector";

const AppWithoutSSR = dynamic(() => import("../components/App"), {
  ssr: false,
});

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? "" }),
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

function AppWrapper({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<typeof wagmiClient | null>(null);
  useEffect(() => {
    if (isAppEnvDemo()) {
      setClient(wagmiDemoClient);
    } else {
      setClient(wagmiClient);
    }
  }, []);
  return (
    client && (
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains}>
          <React.StrictMode>
            <XMTPProvider>
              <AppWithoutSSR>
                <Component {...pageProps} />
              </AppWithoutSSR>
            </XMTPProvider>
          </React.StrictMode>
        </RainbowKitProvider>
      </WagmiConfig>
    )
  );
}

export default AppWrapper;
