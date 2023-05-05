import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";
import { isAppEnvDemo } from "./env";

// mock connector for demos
export const getMockConnector = () => {
  if (typeof window !== "undefined" && isAppEnvDemo()) {
    const mockWallet = Wallet.createRandom();
    return new MockConnector({
      options: { signer: mockWallet },
    });
  }
};
