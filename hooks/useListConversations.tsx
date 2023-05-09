import { Conversation } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import {
  useClient,
  useConversations,
  useStreamConversations,
} from "@xmtp/react-sdk";

export const useListConversations = () => {
  const { address: walletAddress } = useAccount();
  const { client } = useClient();

  const {
    conversations: allConversations,
    error,
    isLoading,
  } = useConversations();

  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );
  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);

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

  useEffect(() => {
    const fetchMessagePreviews = async () => {
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

      setPreviewMessages(new Map(newPreviewMessages));
      setConversations(new Map(conversations));
      setLoadingConversations(false);

      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    };

    if (walletAddress && !isLoading && !error && client) {
      fetchMessagePreviews();
    } else if (isLoading) {
      setLoadingConversations(true);
    }
  }, [walletAddress, isLoading, error, allConversations, client]);
};

export default useListConversations;
