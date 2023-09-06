import { HeaderDropdown } from "../component-library/components/HeaderDropdown/HeaderDropdown";
import { RecipientInputMode, TAILWIND_MD_BREAKPOINT } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useWindowSize from "../hooks/useWindowSize";
import { useXmtpStore } from "../store/xmtp";

export const HeaderDropdownController = () => {
  // XMTP State
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationTopic = useXmtpStore(
    (state) => state.setConversationTopic,
  );
  const conversationTopic = useXmtpStore((state) => state.conversationTopic);
  const setStartedFirstMessage = useXmtpStore(
    (state) => state.setStartedFirstMessage,
  );
  const [width] = useWindowSize();

  // XMTP Hooks
  const { setRecipientInputMode, setRecipientEnteredValue } =
    useGetRecipientInputMode();

  return (
    <HeaderDropdown
      conversationTopic={conversationTopic}
      onClick={() => {
        setRecipientWalletAddress("");
        setRecipientInputMode(RecipientInputMode.InvalidEntry);
        setConversationTopic();
        setRecipientEnteredValue("");
        setStartedFirstMessage(true);
      }}
      disabled
      isMobileView={width <= TAILWIND_MD_BREAKPOINT}
    />
  );
};
