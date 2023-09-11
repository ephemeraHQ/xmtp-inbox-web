import { useStartConversation } from "@xmtp/react-sdk";
import { useEffect, useMemo } from "react";
import { XMTP_FEEDBACK_ADDRESS } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { findFeedbackConversation } from "../helpers/findFeedbackConversation";
import useListConversations from "./useListConversations";

const useStartFeedbackConvo = () => {
  const { conversations } = useListConversations();
  const { startConversation } = useStartConversation();

  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationTopic = useXmtpStore(
    (state) => state.setConversationTopic,
  );

  const feedbackConversation = useMemo(
    () => findFeedbackConversation(conversations),
    [conversations],
  );

  useEffect(() => {
    const startFeedbackConvo = async () => {
      if (!loadingConversations && !feedbackConversation) {
        // start the conversation, but don't send an initial message
        const { cachedConversation } = await startConversation(
          XMTP_FEEDBACK_ADDRESS,
          undefined,
        );

        if (cachedConversation) {
          setConversationTopic(cachedConversation.topic);
          setRecipientWalletAddress(XMTP_FEEDBACK_ADDRESS);
        }
      }
    };
    void startFeedbackConvo();
  }, [
    feedbackConversation,
    loadingConversations,
    setConversationTopic,
    setRecipientWalletAddress,
    startConversation,
  ]);
};

export default useStartFeedbackConvo;
