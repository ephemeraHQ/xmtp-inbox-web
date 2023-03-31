import React from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useSendMessage from "../hooks/useSendMessage";
import useGetConversationId from "../hooks/useGetConversationId";

export const MessageInputWrapper = () => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();
  const { conversationId } = useGetConversationId();
  const { sendMessage } = useSendMessage(conversationId as string);

  return (
    <MessageInput
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      onSubmit={sendMessage}
    />
  );
};
