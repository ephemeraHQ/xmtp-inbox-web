import { Conversation, Stream } from "@xmtp/xmtp-js";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getConversationId } from "../helpers";
import fetchMostRecentMessage from "../helpers/fetchMostRecentMessage";
import { useXmtpStore } from "../store/xmtp";
import { useConversationCache } from "../store/conversationCache";
import useStreamAllMessages from "./useStreamAllMessages";

export const useListConversations = () => {
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
  const setConversationCache = useConversationCache(
    (state) => state.setConversations,
  );
  const addToConversationCache = useConversationCache(
    (state) => state.addConversation,
  );

  useStreamAllMessages();

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

      if (walletAddress) {
        // Update the cache with the full conversation exports
        const convoExports = await client.conversations.export();
        setConversationCache(walletAddress, convoExports);
      }
    };

    const streamConversations = async () => {
      conversationStream = await client.conversations.stream();
      for await (const convo of conversationStream) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationId(convo), convo);
          setConversations(new Map(conversations));

          if (walletAddress) {
            // Add the newly streamed conversation to the cache
            addToConversationCache(walletAddress, convo.export());
          }

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
