import { Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { useEffect, useRef } from "react";
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
  const feedbackConvoPresent = useRef(false);
  const { address: walletAddress } = useAccount();
  const startConversation = useStartConversation();

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
  useStreamAllMessages();

  useEffect(() => {
    const listConversations = async () => {
      const newPreviewMessages = new Map(previewMessages);
      const previews = await Promise.all(
        allConversations.map(fetchMostRecentMessage),
      );

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
        }
        if (preview.key === XMTP_FEEDBACK_ADDRESS) {
          feedbackConvoPresent.current = true;
        }
      }

      for (const convo of allConversations) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
        }
      }

      if (
        !conversations.has(XMTP_FEEDBACK_ADDRESS) &&
        !isLoading &&
        !feedbackConvoPresent.current
      ) {
        await startConversation(XMTP_FEEDBACK_ADDRESS, "Hey");
        previewMessages.set(XMTP_FEEDBACK_ADDRESS, {
          content: "Send feedback",
        } as DecodedMessage);

        conversations.set(XMTP_FEEDBACK_ADDRESS, {
          peerAddress: XMTP_FEEDBACK_ADDRESS,
        } as Conversation);
      }

      setPreviewMessages(newPreviewMessages);
      setConversations(new Map(conversations));

      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    };

    if (walletAddress && !isLoading && !error) {
      listConversations();
      setLoadingConversations(false);
    } else if (isLoading) {
      setLoadingConversations(true);
    }
  }, [walletAddress, isLoading, error, allConversations]);
};

export default useListConversations;
