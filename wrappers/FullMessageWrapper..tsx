import React, { useEffect, useState } from "react";
import { useEnsName } from "wagmi";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import {
  fetchUnsName,
  isValidLongWalletAddress,
  shortAddress,
} from "../helpers";
import { address } from "../pages/inbox";
import MessageContentWrapper from "./MessageContentWrapper";
import { useClient } from "@xmtp/react-sdk";

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
  const { client } = useClient();

  // Get ENS if exists from full address
  const { data: ensName } = useEnsName({
    address: msg.senderAddress as address,
    enabled: isValidLongWalletAddress(msg.senderAddress),
  });

  // Get UNS if exists from full address
  const [unsNameFullMessage, setUnsNameFullMessage] = useState<string | null>();

  useEffect(() => {
    const getUns = async () => {
      if (isValidLongWalletAddress(msg.senderAddress)) {
        const name = await fetchUnsName(msg.senderAddress);
        setUnsNameFullMessage(name);
      } else {
        setUnsNameFullMessage(null);
      }
    };

    getUns();
  }, []);

  const domain = ensName ?? unsNameFullMessage;

  return (
    <FullMessage
      text={<MessageContentWrapper content={msg.content} />}
      key={`${msg.id}_${idx}`}
      from={{
        displayAddress: domain ?? shortAddress(msg.senderAddress),
        isSelf: client?.address === msg.senderAddress,
      }}
      datetime={msg.sent}
    />
  );
};
