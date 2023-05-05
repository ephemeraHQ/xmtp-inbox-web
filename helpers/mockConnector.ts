import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";

// mock connector for demos

export const getMockConnector = () => {
  const mockWallet = Wallet.createRandom();

  return new MockConnector({
    options: { signer: mockWallet },
  });
};
