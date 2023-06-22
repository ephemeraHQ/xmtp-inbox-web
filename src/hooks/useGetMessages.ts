import type { DecodedMessage } from "@xmtp/react-sdk";
import { SortDirection, useCachedMessages } from "@xmtp/react-sdk";
import { useCallback, useMemo } from "react";
import { MESSAGE_LIMIT, getAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { useMessages } from "@xmtp/react-sdk";

const useGetMessages = (conversationId: string) => {
  const messages = useXmtpStore((state) =>
    state.convoMessages.get(conversationId),
  );

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

  const { next, hasMore, isLoading } = useMessages(conversation, {
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
    limit: MESSAGE_LIMIT,
    onMessages,
  });

  return {
    messages,
    next,
    hasMore,
    isLoading,
  };
};

export default useGetMessages;
