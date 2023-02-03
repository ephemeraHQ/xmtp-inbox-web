import React, { useCallback, useState } from 'react';
import { MessagesList, MessageComposer } from './';
import Loader from '../../components/Loader';
import useGetMessages from '../../hooks/useGetMessages';
import useSendMessage from '../../hooks/useSendMessage';
import { useXmtpStore } from '../../store/xmtp';

const Conversation = (): JSX.Element => {
  const conversations = useXmtpStore((state) => state.conversations);
  const loadingConversations = useXmtpStore((state) => state.loadingConversations);
  const conversationId = useXmtpStore((state) => state.conversationId) ?? '';

  const selectedConversation = conversations.get(conversationId);

  const { sendMessage } = useSendMessage(selectedConversation);

  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());

  const { convoMessages: messages, hasMore } = useGetMessages(conversationId, endTime.get(conversationId));

  const fetchNextMessages = useCallback(() => {
    if (hasMore && Array.isArray(messages) && messages.length > 0 && conversationId) {
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
    return <Loader headingText="Loading messages..." subHeadingText="Please wait a moment" isLoading />;
  }

  return (
    <>
      <div className="bg-white h-[calc(100vh-7rem)]">
        <div className="h-full flex justify-between flex-col">
          <MessagesList fetchNextMessages={fetchNextMessages} messages={messages ?? []} hasMore={hasMore} />
        </div>
      </div>
      <MessageComposer onSend={sendMessage} />
    </>
  );
};

export default React.memo(Conversation);
