import { SortDirection } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { MESSAGE_LIMIT } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { useMessages } from "@xmtp/react-sdk";

const useGetMessages = (conversationId: string, endTime?: Date) => {
  const convoMessages = useXmtpStore((state) =>
    state.convoMessages.get(conversationId),
  );
  const conversation = useXmtpStore((state) =>
    state.conversations.get(conversationId),
  );
  const { messages, hasMore } = useMessages(conversation, {
    limit: MESSAGE_LIMIT,
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
    endTime,
  });

  const addMessages = useXmtpStore((state) => state.addMessages);

  useEffect(() => {
    if (!conversation) {
      return;
    }
    const loadMessages = async () => {
      if (messages.length > 0) {
        addMessages(conversationId, messages);
      }
    };
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, conversationId, endTime, messages]);

  return {
    convoMessages,
    hasMore,
  };
};

export default useGetMessages;
