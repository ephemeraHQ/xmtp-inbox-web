import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const walletClient = createWalletClient({
  account: privateKeyToAccount(generatePrivateKey()),
  chain: mainnet,
  transport: http(),
});

const mockConnector = new MockConnector({ options: { walletClient } });

export const mockClient = createConfig({
  autoConnect: true,
  connectors: [mockConnector],
  publicClient,
  webSocketPublicClient,
});

export const providerChains = chains;
