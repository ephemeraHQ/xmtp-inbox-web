import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { mainnet } from "@wagmi/core/chains";
import type { Config } from "@wagmi/core";
import { http, fallback } from "@wagmi/core";
import { createConfig } from "wagmi";
import { demoConnector } from "./demoConnector";
import { isAppEnvDemo } from "./env";

// Required field as of WalletConnect v2.
// Replace with your project id: https://www.rainbowkit.com/docs/migration-guide#2-supply-a-walletconnect-cloud-projectid
const projectId = import.meta.env.VITE_PROJECT_ID || "ADD_PROJECT_ID_HERE";
const appName = "Aurora";

const { wallets } = getDefaultWallets({
  appName,
  projectId,
});

const connectors = connectorsForWallets(
  [
    ...wallets,
    {
      groupName: "Other",
      wallets: [trustWallet],
    },
  ],
  {
    appName,
    projectId,
  },
);

const transports = {
  [mainnet.id]: fallback([
    http(
      `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID ?? ""}`,
    ),
    http(),
  ]),
};

let config: Config;

export const getWagmiConfig = () => {
  if (!config) {
    if (isAppEnvDemo()) {
      config = createConfig({
        connectors: [demoConnector],
        chains: [mainnet],
        transports,
      });
    } else {
      config = createConfig({
        connectors,
        chains: [mainnet],
        transports,
      });
    }
  }
  return config;
};
