import { Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { XMTP_FEEDBACK_ADDRESS, getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import useStreamAllMessages from "./useStreamAllMessages";
import {
  useConversations,
  useStartConversation,
  useStreamConversations,
} from "@xmtp/react-sdk";

export const useListConversations = () => {
  const { address: walletAddress } = useAccount();
  const startConversation = useStartConversation();

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
      setLoadingConversations(true);
      const newPreviewMessages = new Map(previewMessages);
      const previews = await Promise.all(
        allConversations.map(fetchMostRecentMessage),
      );

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
        }
      }

      for (const convo of allConversations) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
        }
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

  useEffect(() => {
    const addFeedbackConvo = async () => {
      if (
        conversations.size &&
        !conversations.has(XMTP_FEEDBACK_ADDRESS) &&
        !isLoading
      ) {
        await startConversation(XMTP_FEEDBACK_ADDRESS, "Hey");
        previewMessages.set(XMTP_FEEDBACK_ADDRESS, {
          content: "Send feedback",
        } as DecodedMessage);
        conversations.set(XMTP_FEEDBACK_ADDRESS, {
          peerAddress: XMTP_FEEDBACK_ADDRESS,
        } as Conversation);

        setPreviewMessages(new Map(previewMessages));
        setConversations(new Map(conversations));
      }
    };

    addFeedbackConvo();
  }, [conversations, isLoading]);
};

export default useListConversations;
