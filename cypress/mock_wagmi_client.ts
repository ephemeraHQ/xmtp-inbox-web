// @ts-nocheck
import { configureChains, createClient, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MockConnector } from "@wagmi/core/connectors/mock";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
);

const mockConnector = new MockConnector({ options: { signer: "" } });

export const mockClient = createClient({
  autoConnect: true,
  connectors: [mockConnector],
  provider,
  webSocketProvider,
});

export const providerChains = chains;
