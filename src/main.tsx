import "./polyfills";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  attachmentContentTypeConfig,
  reactionContentTypeConfig,
  replyContentTypeConfig,
  XMTPProvider,
} from "@xmtp/react-sdk";
import {
  ContentTypeScreenEffect,
  ScreenEffectCodec,
} from "@xmtp/experimental-content-type-screen-effect";
import App from "./controllers/AppController";
import { getWagmiConfig } from "./helpers/config";

// Increment with any schema change; e.g. adding support for a new content type
const DB_VERSION = 6;

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

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiProvider config={getWagmiConfig()}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <StrictMode>
          <XMTPProvider
            contentTypeConfigs={contentTypeConfigs}
            dbVersion={DB_VERSION}>
            <App />
          </XMTPProvider>
        </StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>,
);
