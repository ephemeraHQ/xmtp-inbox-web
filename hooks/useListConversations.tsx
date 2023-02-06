import { Conversation, Stream } from '@xmtp/xmtp-js';
import { useEffect } from 'react';
import { getConversationKey } from '../helpers';
import fetchMostRecentMessage from '../helpers/fetchMostRecentMessage';
import { useAppStore } from '../store/app';
import { useConversationCache } from '../store/conversationCache';
import { useXmtpStore } from '../store/xmtp';
import useStreamAllMessages from './useStreamAllMessages';

export const useListConversations = () => {
  const walletAddress = useAppStore((state) => state.address);
  const client = useAppStore((state) => state.client);

  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const setPreviewMessages = useXmtpStore((state) => state.setPreviewMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);
  const setLoadingConversations = useXmtpStore((state) => state.setLoadingConversations);
  const setConversationCache = useConversationCache((state) => state.setConversations);
  const addToConversationCache = useConversationCache((state) => state.addConversation);

  useStreamAllMessages();

  useEffect(() => {
    if (!client) {
      return;
    }

    let conversationStream: Stream<Conversation>;

    const listConversations = async () => {
      if (!walletAddress) {
        return;
      }
      setLoadingConversations(true);
      const newPreviewMessages = new Map(previewMessages);
      const startTime = new Date();
      const convos = await client.conversations.list();
      console.log(`listConversations took ${new Date().getTime() - startTime.getTime()}ms`);
      const previews = await Promise.all(convos.map(fetchMostRecentMessage));

      for (const preview of previews) {
        if (preview.message) {
          newPreviewMessages.set(preview.key, preview.message);
        }
      }
      setPreviewMessages(newPreviewMessages);

      for (const convo of convos) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationKey(convo), convo);
        }
      }
      setConversations(new Map(conversations));
      setLoadingConversations(false);
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }

      // Update the cache with the full conversation exports
      const convoExports = await client.conversations.export();
      setConversationCache(walletAddress, convoExports);
    };

    const streamConversations = async () => {
      conversationStream = await client.conversations.stream();
      for await (const convo of conversationStream) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationKey(convo), convo);
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
