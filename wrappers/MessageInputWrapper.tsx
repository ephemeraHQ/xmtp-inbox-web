import React, { useCallback, useState } from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode, getConversationId } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import { useXmtpStore } from "../store/xmtp";
import {
  useSendMessage,
  useConversations,
  useStartConversation,
} from "@xmtp/react-sdk";
import { Conversation } from "@xmtp/xmtp-js";
import { emitMsgSentEvent } from "../helpers/internalTracking";
import { address } from "../pages/inbox";

export const MessageInputWrapper = () => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();
  const conversationId = useXmtpStore((state) => state.conversationId);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  const { conversations } = useConversations();
  const conversation = conversations.find(
    (convo) => getConversationId(convo) === conversationId,
  );

  const [isSending, setIsSending] = useState(false);
  const sendMessage = useSendMessage(conversation as Conversation);
  const startConversation = useStartConversation();

  const handleSendMessage = useCallback(
    async (message: string) => {
      setIsSending(true);
      if (!conversation && conversationId) {
        await startConversation(conversationId, message);
      } else {
        await sendMessage(message);
      }
      /* The emitMsgSentEvent function is called only when
          specific XMTP Labs team wallets use
          the internal domain alpha.xmtp.chat. This
          tracking is temporary and meant to help
          surface insights about team usage to
          help build a better app. */
      await emitMsgSentEvent(
        // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
        conversation?.client.address,
        recipientWalletAddress as address,
      );
      setIsSending(false);
    },
    [sendMessage],
  );

  return (
    <MessageInput
      isDisabled={
        recipientInputMode !== RecipientInputMode.OnNetwork || isSending
      }
      onSubmit={handleSendMessage}
      conversationId={conversationId}
    />
  );
};
