import { SortDirection } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { MESSAGE_LIMIT } from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useGetMessages = (conversationKey: string, endTime?: Date) => {
  const convoMessages = useXmtpStore((state) =>
    state.convoMessages.get(conversationKey),
  );
  const conversation = useXmtpStore((state) =>
    state.conversations.get(conversationKey),
  );
  const addMessages = useXmtpStore((state) => state.addMessages);
  const [hasMore, setHasMore] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const loadMessages = async () => {
      const newMessages = await conversation.messages({
        direction: SortDirection.SORT_DIRECTION_DESCENDING,
        limit: MESSAGE_LIMIT,
        endTime: endTime,
      });
      if (newMessages.length > 0) {
        addMessages(conversationKey, newMessages);
        if (newMessages.length < MESSAGE_LIMIT) {
          hasMore.set(conversationKey, false);
          setHasMore(new Map(hasMore));
        } else {
          hasMore.set(conversationKey, true);
          setHasMore(new Map(hasMore));
        }
      } else {
        hasMore.set(conversationKey, false);
        setHasMore(new Map(hasMore));
      }
    };
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, conversationKey, endTime]);

  return {
    convoMessages,
    hasMore: hasMore.get(conversationKey) ?? false,
  };
};

export default useGetMessages;
