import { useConnectModal } from "@rainbow-me/rainbowkit";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";
import { useConnect } from "wagmi";
import { isAppEnvDemo } from "../helpers";

const useHandleConnect = () => {
  const { openConnectModal } = useConnectModal();

  const { connect: connectWallet } = useConnect();

  const handleConnectDemo = () => {
    const createWallet = (() => Wallet.createRandom())();
    const mockConnector = new MockConnector({
      options: { signer: createWallet },
    });
    connectWallet({ connector: mockConnector });
  };

  return {
    handleConnect: isAppEnvDemo() ? handleConnectDemo : openConnectModal,
  };
};

export default useHandleConnect;
