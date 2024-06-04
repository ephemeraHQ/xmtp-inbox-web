import { createConnector } from "wagmi";
import { mainnet } from "viem/chains";
import randomWalletClient from "./createRandomWallet";

// wagmi connector for demos
export const demoConnector = createConnector(() => ({
  id: "demoConnector",
  name: "Demo Connector",
  type: "demo",
  // eslint-disable-next-line @typescript-eslint/require-await
  async connect() {
    return {
      accounts: [randomWalletClient.account.address],
      chainId: mainnet.id,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async disconnect() {},
  // eslint-disable-next-line @typescript-eslint/require-await
  async getAccounts() {
    return [randomWalletClient.account.address];
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getClient() {
    return randomWalletClient;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async getChainId() {
    return mainnet.id;
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async isAuthorized() {
    return true;
  },
  onAccountsChanged() {},
  onChainChanged() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onDisconnect() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async getProvider() {},
}));
