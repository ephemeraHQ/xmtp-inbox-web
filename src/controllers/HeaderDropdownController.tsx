import { HeaderDropdown } from "../component-library/components/HeaderDropdown/HeaderDropdown";
import { useXmtpStore } from "../store/xmtp";

export const HeaderDropdownController = () => {
  const resetRecipient = useXmtpStore((s) => s.resetRecipient);
  const setConversationTopic = useXmtpStore((s) => s.setConversationTopic);
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const setStartedFirstMessage = useXmtpStore((s) => s.setStartedFirstMessage);

  return (
    <HeaderDropdown
      recipientInput={recipientInput}
      onClick={() => {
        resetRecipient();
        setConversationTopic();
        setStartedFirstMessage(true);
      }}
    />
  );
};
