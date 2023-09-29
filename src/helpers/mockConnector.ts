import { MockConnector } from "@wagmi/core/connectors/mock";
import walletClient from "./createRandomWallet";

// mock connector for demos
export const mockConnector = new MockConnector({
  options: {
    walletClient,
  },
});
