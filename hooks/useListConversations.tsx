import { Conversation, DecodedMessage, Stream } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { XMTP_FEEDBACK_ADDRESS, getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import useStreamAllMessages from "./useStreamAllMessages";
import { useClient } from "@xmtp/react-sdk";

export const useListConversations = () => {
  const { address: walletAddress } = useAccount();
  const { client } = useClient();

  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);
  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );

  useStreamAllMessages();

  useEffect(() => {
    if (!client) {
      return;
    }

    let conversationStream: Stream<Conversation>;

    const listConversations = async () => {
      let isFeedbackConvoPresent = false;
      setLoadingConversations(true);
      const newPreviewMessages = new Map(previewMessages);
      const convos = await client.conversations.list();
      const previews = await Promise.all(convos.map(fetchMostRecentMessage));

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
          if (preview.key === XMTP_FEEDBACK_ADDRESS) {
            isFeedbackConvoPresent = true;
          }
        }
      }

      for (const convo of convos) {
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

    const streamConversations = async () => {
      conversationStream = await client.conversations.stream();
      for await (const convo of conversationStream) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
          setConversations(new Map(conversations));

          const preview = await fetchMostRecentMessage(convo);
          if (preview.message) {
            setPreviewMessage(preview.key, preview.message);
          }
        }
      }
    };

    const closeConversationStream = async () => {
      if (!conversationStream) {
        return;
      }
      await conversationStream.return();
    };

    listConversations();
    streamConversations();

    return () => {
      closeConversationStream();
    };
  }, [client, walletAddress]);
};

export default useListConversations;
