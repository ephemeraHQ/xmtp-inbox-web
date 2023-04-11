import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { emitMsgSentEvent } from "../helpers/internalTracking";


const useSendMessage = (conversationId: address) => {
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
      /* The function below, emitMsgSentEvent will only be called for specific 
          wallets of XMTP-LABS team members using the interal domain alpha.xmtp.chat 
          to gather insights about user behaviour which can help the team 
          to build a better app. */
      await emitMsgSentEvent(
        // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
        selectedConversation?.client.address,
        conversationId,
      );
    },
    [conversationId, recipientWalletAddress, conversations],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
