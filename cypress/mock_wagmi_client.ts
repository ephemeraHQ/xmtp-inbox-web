import { configureChains, createClient, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
);

const signer = Wallet.createRandom();

const mockConnector = new MockConnector({ options: { signer } });

export const mockClient = createClient({
  autoConnect: true,
  connectors: [mockConnector],
  provider,
  webSocketProvider,
});

export const providerChains = chains;
