import {
  ContentTypeId,
  Conversation,
  DecodedMessage,
  Stream,
} from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ContentTypeReadReceipt, ReadReceipt } from "../codecs/ReadReceipt";
import { getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import useStreamAllMessages from "./useStreamAllMessages";

export const useListConversations = (
  sendMessage: (
    message: string | ReadReceipt,
    contentType?: ContentTypeId,
    receiverAddress?: string,
  ) => Promise<void>,
) => {
  const { address: walletAddress } = useAccount();
  const client = useXmtpStore((state) => state.client);

  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);
  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );

  const onMessageCallback = (message: DecodedMessage) => {
    if (
      message?.contentType?.typeId !== ContentTypeReadReceipt?.typeId &&
      walletAddress !== message?.senderAddress
    ) {
      const readReceipt: ReadReceipt = {
        messageId: message?.id,
        status: "DELIVERED",
      };

      sendMessage(readReceipt, ContentTypeReadReceipt, message?.senderAddress);
    }
  };

  useStreamAllMessages(onMessageCallback);

  useEffect(() => {
    if (!client) {
      return;
    }

    let conversationStream: Stream<Conversation>;

    const listConversations = async () => {
      setLoadingConversations(true);
      const newPreviewMessages = new Map(previewMessages);
      const convos = await client.conversations.list();
      const previews = await Promise.all(convos.map(fetchMostRecentMessage));

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
        }
      }
      setPreviewMessages(newPreviewMessages);

      for (const convo of convos) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
        }
      }
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
