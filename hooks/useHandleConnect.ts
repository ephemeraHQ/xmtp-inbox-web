import { useConnectModal } from "@rainbow-me/rainbowkit";
import { isAppEnvDemo } from "../helpers";

const useHandleConnect = () => {
  const { openConnectModal } = useConnectModal();

  return {
    handleConnect: !isAppEnvDemo() ? openConnectModal : null,
  };
};

export default useHandleConnect;
