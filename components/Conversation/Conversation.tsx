import React, { useCallback, useState } from 'react';
import { MessagesList, MessageComposer } from './';
import Loader from '../../components/Loader';
import useGetMessages from '../../hooks/useGetMessages';
import useSendMessage from '../../hooks/useSendMessage';
import { getConversationKey } from '../../helpers';
import { useXmtpStore } from '../../store/xmtp';

type ConversationProps = {
  recipientWalletAddr: string;
};

const Conversation = ({ recipientWalletAddr }: ConversationProps): JSX.Element => {
  const conversations = useXmtpStore((state) => state.conversations);
  const loadingConversations = useXmtpStore((state) => state.loadingConversations);

  const selectedConversation = conversations.get(recipientWalletAddr);
  const conversationKey = getConversationKey(selectedConversation);

  const { sendMessage } = useSendMessage(selectedConversation);

  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());

  const { convoMessages: messages, hasMore } = useGetMessages(conversationKey, endTime.get(conversationKey));

  const fetchNextMessages = useCallback(() => {
    if (hasMore && Array.isArray(messages) && messages.length > 0 && conversationKey) {
      const lastMsgDate = messages[messages.length - 1].sent;
      const currentEndTime = endTime.get(conversationKey);
      if (!currentEndTime || lastMsgDate <= currentEndTime) {
        endTime.set(conversationKey, lastMsgDate);
        setEndTime(new Map(endTime));
      }
    }
  }, [conversationKey, hasMore, messages, endTime]);

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
