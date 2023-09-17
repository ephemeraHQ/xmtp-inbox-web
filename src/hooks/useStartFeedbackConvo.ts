import { useStartConversation } from "@xmtp/react-sdk";
import { useEffect, useMemo } from "react";
import { XMTP_FEEDBACK_ADDRESS } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { findFeedbackConversation } from "../helpers/findFeedbackConversation";
import useListConversations from "./useListConversations";

const useStartFeedbackConvo = () => {
  const { conversations, isLoaded } = useListConversations();
  const { startConversation } = useStartConversation();
  const setRecipientAddress = useXmtpStore((s) => s.setRecipientAddress);

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

        if (cachedConversation) {
          // set recipient address, which will set the conversation topic
          setRecipientAddress(XMTP_FEEDBACK_ADDRESS);
        }
      }
    };
    void startFeedbackConvo();
  }, [feedbackConversation, isLoaded, setRecipientAddress, startConversation]);
};

export default useStartFeedbackConvo;
