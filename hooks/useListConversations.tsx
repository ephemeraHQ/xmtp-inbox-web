import { Conversation, Stream } from '@xmtp/xmtp-js';
import { useEffect } from 'react';
import { getConversationKey } from '../helpers';
import fetchMostRecentMessage from '../helpers/fetchMostRecentMessage';
import { useAppStore } from '../store/app';
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

      Promise.all(
        convos.map(async (convo) => {
          if (convo.peerAddress !== walletAddress) {
            conversations.set(getConversationKey(convo), convo);
            setConversations(new Map(conversations));
          }
        })
      ).then(() => {
        setLoadingConversations(false);
        if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
      });
    };

    const streamConversations = async () => {
      conversationStream = await client.conversations.stream();
      for await (const convo of conversationStream) {
        if (convo.peerAddress !== walletAddress) {
          conversations.set(getConversationKey(convo), convo);
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
