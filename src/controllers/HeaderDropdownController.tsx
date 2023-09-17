import { HeaderDropdown } from "../component-library/components/HeaderDropdown/HeaderDropdown";
import { TAILWIND_MD_BREAKPOINT } from "../helpers";
import useWindowSize from "../hooks/useWindowSize";
import { useXmtpStore } from "../store/xmtp";

export const HeaderDropdownController = () => {
  const resetRecipient = useXmtpStore((s) => s.resetRecipient);
  const setConversationTopic = useXmtpStore((s) => s.setConversationTopic);
  const conversationTopic = useXmtpStore((s) => s.conversationTopic);
  const setStartedFirstMessage = useXmtpStore((s) => s.setStartedFirstMessage);
  const [width] = useWindowSize();

  return (
    <HeaderDropdown
      conversationTopic={conversationTopic}
      onClick={() => {
        resetRecipient();
        setConversationTopic();
        setStartedFirstMessage(true);
      }}
      disabled
      isMobileView={width <= TAILWIND_MD_BREAKPOINT}
    />
  );
};
