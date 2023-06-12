import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";

const createWallet = Wallet.createRandom();

// mock connector for demos
export const mockConnector = new MockConnector({
  options: { signer: createWallet },
});
