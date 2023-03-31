import { isEnsAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import useWalletAddress from "./useWalletAddress";

const useGetConversationKey = () => {
  const storeConversationId =
    useXmtpStore((state) => state.conversationId) || "";

  const { ensAddress } = useWalletAddress();
  const conversationKey = isEnsAddress(storeConversationId)
    ? ensAddress
    : storeConversationId;

  return {
    conversationKey,
  };
};

export default useGetConversationKey;
