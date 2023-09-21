import { useStartConversation } from "@xmtp/react-sdk";
import { useEffect, useMemo } from "react";
import { XMTP_FEEDBACK_ADDRESS } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { findFeedbackConversation } from "../helpers/findFeedbackConversation";
import useListConversations from "./useListConversations";

const useStartFeedbackConvo = () => {
  const { conversations, isLoaded } = useListConversations();
  const { startConversation } = useStartConversation();
  const setRecipientOnNetwork = useXmtpStore((s) => s.setRecipientOnNetwork);
  const setRecipientAddress = useXmtpStore((s) => s.setRecipientAddress);
  const setRecipientState = useXmtpStore((s) => s.setRecipientState);
  const setRecipientInput = useXmtpStore((s) => s.setRecipientInput);
  const setConversationTopic = useXmtpStore((s) => s.setConversationTopic);

  const feedbackConversation = useMemo(
    () => findFeedbackConversation(conversations),
    [conversations],
  );

  useEffect(() => {
    const startFeedbackConvo = async () => {
      if (isLoaded && !feedbackConversation) {
        // start the conversation, but don't send an initial message
        const { cachedConversation } = await startConversation(
          XMTP_FEEDBACK_ADDRESS,
          undefined,
        );

        // conversation started, select it
        if (cachedConversation) {
          setRecipientState("valid");
          setRecipientInput(XMTP_FEEDBACK_ADDRESS);
          setRecipientOnNetwork(true);
          setRecipientAddress(XMTP_FEEDBACK_ADDRESS);
          setConversationTopic(cachedConversation.topic);
        }
      }
    };
    void startFeedbackConvo();
  }, [
    feedbackConversation,
    isLoaded,
    setConversationTopic,
    setRecipientAddress,
    setRecipientInput,
    setRecipientOnNetwork,
    setRecipientState,
    startConversation,
  ]);
};

export default useStartFeedbackConvo;
