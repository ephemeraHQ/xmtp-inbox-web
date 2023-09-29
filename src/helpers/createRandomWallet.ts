import { createWalletClient as createRandomWallet, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { mainnet } from "viem/chains";

export default createRandomWallet({
  account: privateKeyToAccount(generatePrivateKey()),
  chain: mainnet,
  transport: http(),
});
