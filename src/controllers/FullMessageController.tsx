import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import { useClient } from "@xmtp/react-sdk";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { shortAddress } from "../helpers";
import MessageContentController from "./MessageContentController";
import { useXmtpStore } from "../store/xmtp";

interface FullMessageControllerProps {
  conversation: CachedConversation;
  isLastReadMessage?: boolean;
  message: CachedMessageWithId;
}

export const FullMessageController = ({
  conversation,
  isLastReadMessage,
  message,
}: FullMessageControllerProps) => {
  const { client } = useClient();
  const recipientName = useXmtpStore((s) => s.recipientName);

  return (
    <FullMessage
      isLastReadMessage={isLastReadMessage}
      message={message}
      conversation={conversation}
      key={message.xmtpID}
      from={{
        displayAddress: recipientName ?? shortAddress(message.senderAddress),
        isSelf: client?.address === message.senderAddress,
      }}
      datetime={message.sentAt}>
      <MessageContentController
        conversation={conversation}
        message={message}
        isSelf={client?.address === message.senderAddress}
      />
    </FullMessage>
  );
};
