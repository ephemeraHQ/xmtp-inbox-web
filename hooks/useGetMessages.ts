import { SortDirection } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { MESSAGE_LIMIT } from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useGetMessages = (conversationId: string, endTime?: Date) => {
  const convoMessages = useXmtpStore((state) =>
    state.convoMessages.get(conversationId),
  );
  const conversation = useXmtpStore((state) =>
    state.conversations.get(conversationId),
  );
  const addMessages = useXmtpStore((state) => state.addMessages);
  const [hasMore, setHasMore] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const loadMessages = async () => {
      try {
        const newMessages = await conversation?.messages({
          direction: SortDirection.SORT_DIRECTION_DESCENDING,
          limit: MESSAGE_LIMIT,
          endTime: endTime,
        });
        if (newMessages.length > 0) {
          addMessages(conversationId, newMessages);
          if (newMessages.length < MESSAGE_LIMIT) {
            hasMore.set(conversationId, false);
            setHasMore(new Map(hasMore));
          } else {
            hasMore.set(conversationId, true);
            setHasMore(new Map(hasMore));
          }
        } else {
          hasMore.set(conversationId, false);
          setHasMore(new Map(hasMore));
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, conversationId, endTime]);

  return {
    convoMessages,
    hasMore: hasMore.get(conversationId) ?? false,
  };
};

export default useGetMessages;
