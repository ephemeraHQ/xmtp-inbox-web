import { Conversation, DecodedMessage, Stream } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { XMTP_FEEDBACK_ADDRESS, getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import useStreamAllMessages from "./useStreamAllMessages";
import { useConversations, useStreamConversations } from "@xmtp/react-sdk";

export const useListConversations = () => {
  const { address: walletAddress } = useAccount();

  const {
    conversations: allConversations,
    error,
    isLoading,
  } = useConversations();

  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);
  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );

  const streamConversations = async (conversation: Conversation) => {
    if (conversation.peerAddress !== walletAddress) {
      conversations.set(getConversationId(conversation), conversation);
      setConversations(new Map(conversations));

      const preview = await fetchMostRecentMessage(conversation);
      if (preview.message) {
        setPreviewMessage(preview.key, preview.message);
      }
    }
  };

  useStreamConversations(streamConversations);
  useStreamAllMessages();

  useEffect(() => {
    const listConversations = async () => {
      let isFeedbackConvoPresent = false;
      setLoadingConversations(true);
      const newPreviewMessages = new Map(previewMessages);
      const previews = await Promise.all(
        allConversations.map(fetchMostRecentMessage),
      );

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
          if (preview.key === XMTP_FEEDBACK_ADDRESS) {
            isFeedbackConvoPresent = true;
          }
        }
      }

      for (const convo of allConversations) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
        }
      }

      if (!isFeedbackConvoPresent) {
        newPreviewMessages.set(XMTP_FEEDBACK_ADDRESS, {
          content: "Send Feedback",
        } as DecodedMessage);
        conversations.set(XMTP_FEEDBACK_ADDRESS, {
          peerAddress: XMTP_FEEDBACK_ADDRESS,
        } as Conversation);
      }

      setPreviewMessages(newPreviewMessages);
      setConversations(new Map(conversations));
      setLoadingConversations(false);
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    };

    if (!isLoading && !error) {
      listConversations();
    } else if (isLoading) {
      setLoadingConversations(true);
    }
  }, [walletAddress, isLoading, error, allConversations]);
};

export default useListConversations;
