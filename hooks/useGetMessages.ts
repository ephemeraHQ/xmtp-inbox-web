import { DecodedMessage, SortDirection } from "@xmtp/react-sdk";
import { useCallback, useMemo } from "react";
import { MESSAGE_LIMIT, getAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { useMessages } from "@xmtp/react-sdk";

const useGetMessages = (conversationId: string) => {
  const messages = useXmtpStore((state) =>
    state.convoMessages.get(conversationId),
  );

<<<<<<< HEAD
=======
  const getAddress = (conversationId) => {
    let addr;
    try {
      addr = utils.getAddress(conversationId);
    } catch {
      addr = conversationId;
    }
    return addr;
  };

>>>>>>> dfee395 (added try/catch for ethers check)
  const conversation = useXmtpStore((state) =>
    state.conversations.get(getAddress(conversationId)),
  );
  const addMessages = useXmtpStore((state) => state.addMessages);

  const onMessages = useCallback(
    (messages: DecodedMessage[]) => {
      addMessages(conversationId, messages);
    },
    [addMessages, conversationId],
  );

  const messageOptions = useMemo(
    () => ({
      direction: SortDirection.SORT_DIRECTION_DESCENDING,
      limit: MESSAGE_LIMIT,
      onMessages,
    }),
    [onMessages],
  );

  const { next, hasMore, isLoading } = useMessages(
    conversation,
    messageOptions,
  );

  return {
    messages,
    next,
    hasMore,
    isLoading,
  };
};

export default useGetMessages;
