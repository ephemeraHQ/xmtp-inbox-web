// Temporarily removing until we pull components from the SDK.
// import "@xmtp/react-sdk/style.css";
import "../../.storybook/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { fetchEnsAddress } from "@wagmi/core";
import { mainnet } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import React, { useEffect, useState } from "react";
import {
  isAppEnvDemo,
  isEnsAddress,
  isValidRecipientAddressFormat,
} from "../helpers";
import "../helpers/i18n";
import { XMTPProvider } from "@xmtp/react-sdk";
import { mockConnector } from "../helpers/mockConnector";
import { useXmtpStore } from "../store/xmtp";
import { useRouter } from "next/router";

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

function AppController({ Component, pageProps }: AppProps) {
  const [client, setClient] = useState<typeof wagmiClient | null>(null);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  const router = useRouter();

  useEffect(() => {
    if (isAppEnvDemo()) {
      setClient(wagmiDemoClient);
    } else {
      setClient(wagmiClient);
    }
  }, []);

  useEffect(() => {
    const routeToInbox = async () => {
      let recipient = window.location.href.split("/").slice(-1)[0];
      if (isValidRecipientAddressFormat(recipient)) {
        if (isEnsAddress(recipient)) {
          recipient =
            (await fetchEnsAddress({
              name: recipient,
            })) ?? "";
        }
        if (recipient) {
          setConversationId(recipient);
          setRecipientWalletAddress(recipient);
          router.push("/inbox");
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    };
    if (window?.location?.href.includes("/dm")) {
      routeToInbox();
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

export default AppController;
