import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useSendMessage = (conversationId: string) => {
  const client = useXmtpStore((state) => state.client);
  const conversations = useXmtpStore((state) => state.conversations);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setConversations = useXmtpStore((state) => state.setConversations);

  const sendMessage = useCallback(
    async (message: string) => {
      let selectedConversation = conversations.get(conversationId);
      if (
        isValidLongWalletAddress(recipientWalletAddress) &&
        !selectedConversation
      ) {
        const conversation =
          conversationId &&
          // the line below is to check if the conversation id is valid
          // and a new conversation is not created for a invalid conversation Id
          !conversationId.includes(recipientWalletAddress) &&
          conversationId !== recipientWalletAddress
            ? await client?.conversations?.newConversation(
                recipientWalletAddress,
                {
                  conversationId,
                  metadata: {},
                },
              )
            : await client?.conversations?.newConversation(
                recipientWalletAddress,
              );
        if (conversation) {
          selectedConversation = conversation;
          conversations.set(getConversationId(conversation), conversation);
          setConversations(new Map(conversations));
        }
      }
      await selectedConversation?.send(message);
    },
    [conversationId, recipientWalletAddress, conversations],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
