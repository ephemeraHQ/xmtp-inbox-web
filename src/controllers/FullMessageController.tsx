import React from "react";
import { useEnsName } from "wagmi";
import { useClient } from "@xmtp/react-sdk";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { isValidLongWalletAddress, shortAddress } from "../helpers";
import type { address } from "../pages/inbox";
import MessageContentController from "./MessageContentController";
import useSendMessage from "../hooks/useSendMessage";
import { useXmtpStore } from "../store/xmtp";

interface FullMessageControllerProps {
  msg: {
    id: string;
    senderAddress: string;
    content: string;
    sent: Date;
  };
  idx: number;
}

export const FullMessageController = ({
  msg,
  idx,
}: FullMessageControllerProps) => {
  const { client } = useClient();

  // Get ENS if exists from full address
  const { data: ensName } = useEnsName({
    address: msg.senderAddress as address,
    enabled: isValidLongWalletAddress(msg.senderAddress),
  });
  const conversationId = useXmtpStore((state) => state.conversationId);

  const { loading, error } = useSendMessage(conversationId as address);

  return (
    <FullMessage
      text={
        <MessageContentController
          content={msg.content}
          isSelf={client?.address === msg.senderAddress}
          isLoading={loading}
          isError={!!error}
        />
      }
      isError={!!error}
      key={`${msg.id}_${idx}`}
      from={{
        displayAddress: ensName ?? shortAddress(msg.senderAddress),
        isSelf: client?.address === msg.senderAddress,
      }}
      datetime={msg.sent}
    />
  );
};
