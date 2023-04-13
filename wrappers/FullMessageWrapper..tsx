import React from "react";
import { useEnsName } from "wagmi";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { isValidLongWalletAddress, shortAddress } from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import MessageContentWrapper from "./MessageContentWrapper";

interface FullMessageWrapperProps {
  msg: {
    id: string;
    senderAddress: string;
    content: string;
    sent: Date;
  };
  idx: number;
}

export const FullMessageWrapper = ({ msg, idx }: FullMessageWrapperProps) => {
  const client = useXmtpStore((state) => state.client);

  // Get ENS if exists from full address
  const { data: ensName } = useEnsName({
    address: msg.senderAddress as address,
    enabled: isValidLongWalletAddress(msg.senderAddress),
  });

  return (
    <FullMessage
      text={<MessageContentWrapper content={msg.content} />}
      key={`${msg.id}_${idx}`}
      from={{
        displayAddress: ensName ? ensName : shortAddress(msg.senderAddress),
        isSelf: client?.address === msg.senderAddress,
      }}
      datetime={msg.sent}
    />
  );
};
