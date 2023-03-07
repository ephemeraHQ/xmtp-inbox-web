import React, { useCallback, useState } from "react";
import { MessagesList } from "./";
import Loader from "../../components/Loader";
import useGetMessages from "../../hooks/useGetMessages";
import useSendMessage from "../../hooks/useSendMessage";
import { useXmtpStore } from "../../store/xmtp";
import useWalletAddress from "../../hooks/useWalletAddress";
import { isEnsAddress } from "../../helpers";
import { MessageInput } from "../../component-library/components/MessageInput/MessageInput";

const Conversation = (): JSX.Element => {
  const conversations = useXmtpStore((state) => state.conversations);
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  // Since conversationId can be set to an ENS name, we reset it below for those cases to pull from the ENS address
  // Resolves bug where entering an existing conversation with ENS name in "new message" doesn't retrieve conversations
  const { ensAddress } = useWalletAddress();
  const storeConversationId =
    useXmtpStore((state) => state.conversationId) ?? "";
  const conversationId = isEnsAddress(storeConversationId)
    ? ensAddress
    : storeConversationId;
  const selectedConversation = conversations.get(conversationId as string);

  const { sendMessage } = useSendMessage(selectedConversation);

  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());

  const { convoMessages: messages, hasMore } = useGetMessages(
    conversationId as string,
    endTime.get(conversationId as string),
  );

  const fetchNextMessages = useCallback(() => {
    if (
      hasMore &&
      Array.isArray(messages) &&
      messages.length > 0 &&
      conversationId
    ) {
      const lastMsgDate = messages[messages.length - 1].sent;
      const currentEndTime = endTime.get(conversationId);
      if (!currentEndTime || lastMsgDate <= currentEndTime) {
        endTime.set(conversationId, lastMsgDate);
        setEndTime(new Map(endTime));
      }
    }
  }, [conversationId, hasMore, messages, endTime]);

  const hasMessages = Number(messages?.length ?? 0) > 0;

  if (loadingConversations && !hasMessages) {
    return (
      <Loader
        headingText="Loading messages..."
        subHeadingText="Please wait a moment"
        isLoading
      />
    );
  }

  return (
    <>
      <div className="bg-white h-[calc(100vh-7rem)]">
        <div className="h-full flex justify-between flex-col">
          <MessagesList
            fetchNextMessages={fetchNextMessages}
            messages={messages ?? []}
            hasMore={hasMore}
          />
        </div>
      </div>
      <MessageInput onSubmit={sendMessage} />
    </>
  );
};

export default React.memo(Conversation);
