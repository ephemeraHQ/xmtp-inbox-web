import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";
import React, { useEffect, useState } from "react";
import { isAppEnvDemo } from "../helpers";
import "../i18n";

const AppWithoutSSR = dynamic(() => import("../components/App"), {
  ssr: false,
});

const createWallet = (() => Wallet.createRandom())();

function AppWrapper({ Component, pageProps }: AppProps) {
  const [isDemo, setIsDemo] = useState(false);

  const mockConnector = new MockConnector({
    options: { signer: createWallet },
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

  const wagmiClient = createClient({
    autoConnect: true,
    connectors: isDemo ? [mockConnector] : connectors,
    provider,
    webSocketProvider,
  });

  useEffect(() => {
    setIsDemo(isAppEnvDemo());
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <React.StrictMode>
          <AppWithoutSSR>
            <Component {...pageProps} />
          </AppWithoutSSR>
        </React.StrictMode>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default AppWrapper;
