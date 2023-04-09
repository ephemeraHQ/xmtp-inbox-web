import { useCallback } from "react";
import ReactGA from "react-ga4";
import { useXmtpStore } from "../store/xmtp";
import { TRACK_WALLETS } from "../helpers";

const useSendMessage = (conversationId: string) => {
  const conversations = useXmtpStore((state) => state.conversations);
  const selectedConversation = conversations.get(conversationId);

  const sendMessage = useCallback(
    async (message: string) => {
      await selectedConversation?.send(message);
      if (TRACK_WALLETS.includes(conversationId)) {
        ReactGA.event({
          category: "Msg sent event",
          // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
          action: `${selectedConversation?.client.address}-${conversationId}`,
        });
      }
    },
    [selectedConversation],
  );

  return {
    sendMessage,
  };
};

export default useSendMessage;
