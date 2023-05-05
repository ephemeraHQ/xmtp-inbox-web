import { Conversation } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getConversationId } from "../helpers";
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
      const newPreviewMessages = new Map(previewMessages);

      await Promise.all(
        allConversations.map(async (convo) => {
          const preview = await fetchMostRecentMessage(convo);
          if (preview.message) {
            newPreviewMessages.set(preview.key, preview.message);
            if (convo.peerAddress !== walletAddress) {
              conversations.set(getConversationId(convo), convo);
            }
          }
        }),
      );

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
