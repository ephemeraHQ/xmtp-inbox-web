import { isEnsAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import useWalletAddress from "./useWalletAddress";

const useGetConversationId = () => {
  const storeConversationId =
    useXmtpStore((state) => state.conversationId) || "";

  const { ensAddress } = useWalletAddress();
  const conversationId = isEnsAddress(storeConversationId)
    ? ensAddress
    : storeConversationId;

  return {
    conversationId,
  };
};

export default useGetConversationId;
