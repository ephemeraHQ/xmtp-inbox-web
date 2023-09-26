import { useConnectModal } from "@rainbow-me/rainbowkit";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { useConnect } from "wagmi";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";
import { isAppEnvDemo } from "../helpers";

const useHandleConnect = () => {
  const { openConnectModal } = useConnectModal();

  const { connect: connectWallet } = useConnect();

  const handleConnectDemo = () => {
    const walletClient = (() =>
      createWalletClient({
        account: privateKeyToAccount(generatePrivateKey()),
        chain: mainnet,
        transport: http(),
      }))();
    const mockConnector = new MockConnector({
      options: { walletClient },
    });
    connectWallet({ connector: mockConnector });
  };

  return {
    handleConnect: isAppEnvDemo() ? handleConnectDemo : openConnectModal,
  };
};

export default useHandleConnect;
