import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { emitMsgSentEvent } from "../helpers/internalTracking";
import {
  useSendMessage as useSendMessageHook,
  useStartConversation,
} from "@xmtp/react-sdk";
import { Conversation } from "@xmtp/react-sdk";

const useSendMessage = (conversationId: address) => {
  const conversations = useXmtpStore((state) => state.conversations);
  let selectedConversation = conversations.get(conversationId);
  const startConversation = useStartConversation();
  const sendMessageFromHook = useSendMessageHook(
    selectedConversation as Conversation,
  );
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
        const conversation = await startConversation(
          recipientWalletAddress,
          message,
        );
        if (conversation) {
          selectedConversation = conversation;
          conversations.set(getConversationId(conversation), conversation);
          setConversations(new Map(conversations));
        }
      } else {
        await sendMessageFromHook(message);
      }

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
