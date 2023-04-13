import React from "react";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";

interface Props {
  sendMessage: (message: string) => Promise<void>;
}

export const MessageInputWrapper = ({ sendMessage }: Props) => {
  // XMTP Hooks
  const { recipientInputMode } = useGetRecipientInputMode();

  return (
    <MessageInput
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      onSubmit={sendMessage}
    />
  );
};
