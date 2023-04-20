import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { emitMsgSentEvent } from "../helpers/internalTracking";
import { useClient, useConversations } from "@xmtp/react-sdk";

const useSendMessage = (conversationId: address) => {
  const { client } = useClient();
  const { conversations } = useConversations();

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  const sendMessage = useCallback(
    async (message: string) => {
      let selectedConversation = conversations.find(
        (convo) => getConversationId(convo) === conversationId,
      );
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
          conversations.push(conversation);
        }
      }
      await selectedConversation?.send(message);

      /* The emitMsgSentEvent function is called only when
          specific XMTP Labs team wallets use
          the internal domain alpha.xmtp.chat. This
          tracking is temporary and meant to help
          surface insights about team usage to
          help build a better app. */
      await emitMsgSentEvent(
        // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
        selectedConversation?.client.address,
        recipientWalletAddress as address,
      );
    },
    [conversationId, recipientWalletAddress, conversations],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
