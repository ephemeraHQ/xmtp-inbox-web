import { useCallback } from "react";
import ReactGA from "react-ga4";
import { useXmtpStore } from "../store/xmtp";
import { TRACK_WALLETS } from "../helpers";
import { fetchEnsName } from "@wagmi/core";
import { address } from "../pages/inbox";

const useSendMessage = (conversationId: address) => {
  const conversations = useXmtpStore((state) => state.conversations);
  const selectedConversation = conversations.get(conversationId);

  const sendMessage = useCallback(
    async (message: string) => {
      await selectedConversation?.send(message);
      if (TRACK_WALLETS.includes(conversationId)) {
        const ensNameSender = await fetchEnsName({
          // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
          address: selectedConversation?.client.address,
        });
        const ensNameReciever = await fetchEnsName({
          address: conversationId,
        });
        ReactGA.event({
          category: "Msg sent event",
          // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
          action: `${ensNameSender ?? selectedConversation?.client.address}-${
            ensNameReciever ?? conversationId
          }`,
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
