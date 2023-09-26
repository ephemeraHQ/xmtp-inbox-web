import { MockConnector } from "@wagmi/core/connectors/mock";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";

// mock connector for demos
export const mockConnector = new MockConnector({
  options: {
    walletClient: createWalletClient({
      account: privateKeyToAccount(generatePrivateKey()),
      chain: mainnet,
      transport: http(),
    }),
  },
});
