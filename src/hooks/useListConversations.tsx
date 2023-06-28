import { useConversations, useStreamConversations } from "@xmtp/react-sdk";
import type { Conversation } from "@xmtp/react-sdk";
import { useCallback } from "react";
import { useAccount } from "wagmi";
import { getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";

const useListConversations = () => {
  const { address: walletAddress } = useAccount();
  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );
  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);

  const fetchMessagePreviews = useCallback(async (convos: Conversation[]) => {
    const newPreviewMessages = new Map(previewMessages);

    await Promise.all(
      convos.map(async (convo) => {
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
      void Notification.requestPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useConversations({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onConversations: fetchMessagePreviews,
  });

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

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  useStreamConversations(streamConversations);
};

export default useListConversations;
