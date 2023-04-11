import { useCallback } from "react";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { emitMsgSentEvent } from "../helpers/internalTracking";

const useSendMessage = (conversationId: address) => {
  const conversations = useXmtpStore((state) => state.conversations);
  const selectedConversation = conversations.get(conversationId);

  const sendMessage = useCallback(
    async (message: string) => {
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
    [selectedConversation],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
