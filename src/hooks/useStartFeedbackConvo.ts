import { useClient } from "@xmtp/react-sdk";
import type { DecodedMessage } from "@xmtp/react-sdk";
import { useEffect } from "react";
import { XMTP_FEEDBACK_ADDRESS, getConversationId } from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useStartFeedbackConvo = () => {
  const { client } = useClient();

  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  useEffect(() => {
    const startFeedbackConvo = async () => {
      if (
        !loadingConversations &&
        client &&
        !conversations.has(XMTP_FEEDBACK_ADDRESS)
      ) {
        const conversation = await client?.conversations.newConversation(
          XMTP_FEEDBACK_ADDRESS,
        );

        conversations.set(getConversationId(conversation), conversation);

        setPreviewMessage(XMTP_FEEDBACK_ADDRESS, {
          content: "Send feedback",
          id: "Feedback_Msg",
        } as DecodedMessage);

        setConversations(new Map(conversations));
        setConversationId(XMTP_FEEDBACK_ADDRESS);
        setRecipientWalletAddress(XMTP_FEEDBACK_ADDRESS);
      }
    };
    void startFeedbackConvo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingConversations, client, conversations]);
};

export default useStartFeedbackConvo;
