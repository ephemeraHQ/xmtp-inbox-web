import { ContentTypeId } from "@xmtp/xmtp-js";
import React from "react";
import { useEnsName } from "wagmi";
import { ReadReceipt } from "../codecs/ReadReceipt";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { isValidLongWalletAddress, shortAddress } from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";

interface FullMessageWrapperProps {
  msg: {
    id: string;
    senderAddress: string;
    content: string;
    sent: Date;
  };
  idx: number;
  readReceiptStatus: "SENT" | "DELIVERED" | "SEEN";
  sendMessage: (
    message: string | ReadReceipt,
    contentType?: ContentTypeId | undefined,
  ) => Promise<void>;
}

export const FullMessageWrapper = ({
  msg,
  idx,
  sendMessage,
  readReceiptStatus,
}: FullMessageWrapperProps) => {
  const client = useXmtpStore((state) => state.client);

  // Get ENS if exists from full address
  const { data: ensName } = useEnsName({
    address: msg.senderAddress as address,
    enabled: isValidLongWalletAddress(msg.senderAddress),
  });

  return (
    <FullMessage
      text={msg.content}
      key={`${msg.id}_${idx}`}
      from={{
        displayAddress: ensName ? ensName : shortAddress(msg.senderAddress),
        isSelf: client?.address === msg.senderAddress,
      }}
      datetime={msg.sent}
      sendMessage={sendMessage}
      senderAddress={msg?.senderAddress}
      messageId={msg?.id}
      readReceiptStatus={readReceiptStatus}
    />
  );
};
