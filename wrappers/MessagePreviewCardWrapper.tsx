import { Conversation } from "@xmtp/react-sdk";
import React, { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import { MessagePreviewCard } from "../component-library/components/MessagePreviewCard/MessagePreviewCard";
import {
  XMTP_FEEDBACK_ADDRESS,
  fetchUnsName,
  getConversationId,
  isValidLongWalletAddress,
  shortAddress,
} from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import MessageContentWrapper from "./MessageContentWrapper";

interface MessagePreviewCardWrapperProps {
  convo?: Conversation;
}
export const MessagePreviewCardWrapper = ({
  convo,
}: MessagePreviewCardWrapperProps) => {
  // XMTP State
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const conversationId = useXmtpStore((state) => state.conversationId);

  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const previewMessage = previewMessages.get(getConversationId(convo));

  // Get ENS name and avatar from Wagmi
  const { data: previewEnsName } = useEnsName({
    address: convo?.peerAddress as address,
  });
  const { data: convoAvatarUrl, isLoading: convoAvatarLoading } = useEnsAvatar({
    address: convo?.peerAddress as address,
  });

  // Get UNS name
  const [previewUnsName, setPreviewUnsName] = useState<string | null>();

  useEffect(() => {
    const getUns = async () => {
      if (isValidLongWalletAddress(convo?.peerAddress || "")) {
        const name = await fetchUnsName(convo?.peerAddress);
        setPreviewUnsName(name);
      } else {
        setPreviewUnsName(null);
      }
    };

    getUns();
  }, [convo?.peerAddress]);

  // Helpers
  const isSelected = conversationId === getConversationId(convo);

  const onConvoClick = (conversation: Conversation) => {
    if (recipientWalletAddress !== conversation.peerAddress) {
      setRecipientWalletAddress(conversation.peerAddress);
    }
    if (conversationId !== getConversationId(conversation)) {
      setConversationId(getConversationId(conversation));
    }
  };

  const conversationDomain = convo?.context?.conversationId.split("/")[0] ?? "";

  return (
    <MessagePreviewCard
      isSelected={isSelected}
      key={previewMessage?.id}
      text={
        previewMessage?.content ? (
          <MessageContentWrapper content={previewMessage?.content} />
        ) : undefined
      }
      datetime={previewMessage?.sent}
      displayAddress={
        previewEnsName ||
        previewUnsName ||
        shortAddress(convo?.peerAddress || "")
      }
      onClick={() => {
        if (convo) {
          onConvoClick?.(convo);
        }
      }}
      isLoading={convoAvatarLoading}
      avatarUrl={convoAvatarUrl || ""}
      conversationDomain={shortAddress(conversationDomain)}
      pinned={convo?.peerAddress === XMTP_FEEDBACK_ADDRESS}
      address={convo?.peerAddress}
    />
  );
};
