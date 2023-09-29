import { useConnectModal } from "@rainbow-me/rainbowkit";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { useConnect } from "wagmi";
import { isAppEnvDemo } from "../helpers";
import walletClient from "../helpers/createWalletClient";

const useHandleConnect = () => {
  const { openConnectModal } = useConnectModal();

  const { connect: connectWallet } = useConnect();

  const handleConnectDemo = () => {
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
