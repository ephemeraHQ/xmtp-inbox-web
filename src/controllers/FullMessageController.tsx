import { useEnsName } from "wagmi";
import type { CachedMessageWithId } from "@xmtp/react-sdk";
import { useClient } from "@xmtp/react-sdk";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { isValidLongWalletAddress, shortAddress } from "../helpers";
import type { address } from "../pages/inbox";
import MessageContentController from "./MessageContentController";

interface FullMessageControllerProps {
  message: CachedMessageWithId;
}

export const FullMessageController = ({
  message,
}: FullMessageControllerProps) => {
  const { client } = useClient();

  // Get ENS if exists from full address
  const { data: ensName } = useEnsName({
    address: message.senderAddress as address,
    enabled: isValidLongWalletAddress(message.senderAddress),
  });

  return (
    <FullMessage
      message={message}
      key={message.xmtpID}
      from={{
        displayAddress: ensName ?? shortAddress(message.senderAddress),
        isSelf: client?.address === message.senderAddress,
      }}
      datetime={message.sentAt}>
      <MessageContentController
        message={message}
        isSelf={client?.address === message.senderAddress}
      />
    </FullMessage>
  );
};
