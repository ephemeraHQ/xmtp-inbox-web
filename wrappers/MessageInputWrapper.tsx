import React from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useSendMessage from "../hooks/useSendMessage";
import { useXmtpStore } from "../store/xmtp";

export const MessageInputWrapper = () => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();
  const conversationId = useXmtpStore((state) => state.conversationId);
  const { sendMessage } = useSendMessage(conversationId as string);

  return (
    <MessageInput
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      onSubmit={sendMessage}
    />
  );
};
