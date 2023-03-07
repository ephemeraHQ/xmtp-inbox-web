import { useXmtpStore } from "../store/xmtp";
import { useAccount } from "wagmi";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { Conversation } from "@xmtp/xmtp-js";
import { getConversationId } from "../helpers";
import { MessagePreviewCard } from "../component-library/components/MessagePreviewCard/MessagePreviewCard";

const NavigationPanel = (): JSX.Element => {
  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-8rem)] overflow-y-auto">
      <ConversationsPanel />
    </div>
  );
};

const ConversationsPanel = (): JSX.Element => {
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const conversations = useXmtpStore((state) => state.conversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const conversationId = useXmtpStore((state) => state.conversationId);
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  const orderByLatestMessage = (
    convoA: Conversation,
    convoB: Conversation,
  ): number => {
    const convoALastMessageDate =
      previewMessages.get(getConversationId(convoA))?.sent || new Date();
    const convoBLastMessageDate =
      previewMessages.get(getConversationId(convoB))?.sent || new Date();
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1;
  };

  const onClick = (conversation: Conversation) => {
    setRecipientWalletAddress(conversation.peerAddress);
    setConversationId(getConversationId(conversation));
  };

  return (
    <ConversationList
      isLoading={loadingConversations}
      messages={Array.from(conversations.values())
        .sort(orderByLatestMessage)
        .map((convo) => {
          const previewMessage = previewMessages.get(getConversationId(convo));
          const isSelected = conversationId === getConversationId(convo);
          return (
            <MessagePreviewCard
              isSelected={isSelected}
              key={previewMessage?.id}
              text={previewMessage?.content}
              datetime={previewMessage?.sent}
              displayAddress={convo?.peerAddress}
              onClick={() => {
                onClick(convo);
              }}
            />
          );
        })}
    />
  );
};

export default NavigationPanel;
