import { useLastMessage, type CachedConversation } from "@xmtp/react-sdk";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MessagePreviewCard } from "../component-library/components/MessagePreviewCard/MessagePreviewCard";
import { shortAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import type { PeerIdentityMetadata } from "../helpers/conversation";
import { getPeerAddressIdentity } from "../helpers/conversation";

interface MessagePreviewCardControllerProps {
  convo: CachedConversation;
}

export const MessagePreviewCardController = ({
  convo,
}: MessagePreviewCardControllerProps) => {
  const { t } = useTranslation();
  const lastMessage = useLastMessage(convo.topic);
  // XMTP State
  const recipientAddress = useXmtpStore((s) => s.recipientAddress);
  const setRecipientInput = useXmtpStore((s) => s.setRecipientInput);
  const setRecipientAddress = useXmtpStore((s) => s.setRecipientAddress);
  const setRecipientName = useXmtpStore((s) => s.setRecipientName);
  const setRecipientAvatar = useXmtpStore((s) => s.setRecipientAvatar);
  const setRecipientState = useXmtpStore((s) => s.setRecipientState);
  const setRecipientOnNetwork = useXmtpStore((s) => s.setRecipientOnNetwork);
  const setConversationTopic = useXmtpStore((s) => s.setConversationTopic);
  const conversationTopic = useXmtpStore((state) => state.conversationTopic);

  // Helpers
  const isSelected = conversationTopic === convo.topic;

  const onConvoClick = useCallback(
    (conversation: CachedConversation) => {
      if (recipientAddress !== conversation.peerAddress) {
        const peerAddress = conversation.peerAddress as `0x${string}`;
        const { name, avatar } = getPeerAddressIdentity(conversation);
        setRecipientAvatar(avatar);
        setRecipientName(name);
        setRecipientAddress(peerAddress);
        setRecipientOnNetwork(true);
        setRecipientState("valid");
        setRecipientInput(peerAddress);
        setConversationTopic(conversation.topic);
      }
    },
    [
      recipientAddress,
      setConversationTopic,
      setRecipientAddress,
      setRecipientAvatar,
      setRecipientInput,
      setRecipientName,
      setRecipientOnNetwork,
      setRecipientState,
    ],
  );

  const conversationDomain = convo?.context?.conversationId.split("/")[0] ?? "";

  const content = lastMessage?.content
    ? typeof lastMessage.content !== "string"
      ? t("messages.attachment") || "Attachment"
      : lastMessage?.content
    : undefined;

  const conversationPeerIdentity = useMemo(
    () => convo.metadata?.peerIdentity as PeerIdentityMetadata,
    [convo.metadata?.peerIdentity],
  );

  return (
    <MessagePreviewCard
      isSelected={isSelected}
      key={lastMessage?.xmtpID}
      text={content}
      datetime={convo?.updatedAt}
      displayAddress={
        conversationPeerIdentity?.name ?? shortAddress(convo?.peerAddress || "")
      }
      onClick={() => {
        if (convo) {
          void onConvoClick?.(convo);
        }
      }}
      avatarUrl={conversationPeerIdentity?.avatar || ""}
      conversationDomain={shortAddress(conversationDomain)}
      address={convo?.peerAddress}
    />
  );
};
