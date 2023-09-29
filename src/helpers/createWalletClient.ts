import { createWalletClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

export default createWalletClient({
  account: privateKeyToAccount(generatePrivateKey()),
  chain: mainnet,
  transport: http(),
});
