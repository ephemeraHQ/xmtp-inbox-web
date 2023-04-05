import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";

const useSendMessage = (conversationKey: string) => {
  const client = useXmtpStore((state) => state.client);
  const conversations = useXmtpStore((state) => state.conversations);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setConversations = useXmtpStore((state) => state.setConversations);

  const sendMessage = useCallback(
    async (message: string) => {
      let selectedConversation =
        conversations.get(recipientWalletAddress) ||
        conversations.get(conversationKey);
      if (
        isValidLongWalletAddress(recipientWalletAddress) &&
        !selectedConversation
      ) {
        const conversationId = conversationKey?.replace(
          recipientWalletAddress + "/",
          "",
        );
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
    [conversationKey, recipientWalletAddress, conversations],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
