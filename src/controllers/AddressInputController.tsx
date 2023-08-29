import { useEffect, useState } from "react";
import { useEnsAvatar } from "wagmi";
import { AddressInput } from "../component-library/components/AddressInput/AddressInput";
import {
  fetchUnsName,
  getRecipientInputSubtext,
  isValidLongWalletAddress,
  RecipientInputMode,
  shortAddress,
} from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useWalletAddress from "../hooks/useWalletAddress";
import type { address } from "../pages/inbox";
import useWindowSize from "../hooks/useWindowSize";
import { useXmtpStore } from "../store/xmtp";

export const AddressInputController = () => {
  // XMTP State
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setStartedFirstMessage = useXmtpStore(
    (state) => state.setStartedFirstMessage,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const setRecipientInputMode = useXmtpStore(
    (state) => state.setRecipientInputMode,
  );

  // XMTP Hooks
  const {
    recipientInputMode,
    recipientEnteredValue,
    setRecipientEnteredValue,
  } = useGetRecipientInputMode();

  const { isValid, ensName } = useWalletAddress();

  // Wagmi Hooks
  const { data: recipientAvatarUrl, isLoading: avatarLoading } = useEnsAvatar({
    address: recipientWalletAddress as address,
  });

  const size = useWindowSize();

  // UNS Hooks
  const [unsName, setUnsName] = useState<string | null>();

  useEffect(() => {
    const getUns = async () => {
      if (isValidLongWalletAddress(recipientWalletAddress)) {
        const name = await fetchUnsName(recipientWalletAddress);
        setUnsName(name);
      } else {
        setUnsName(null);
      }
    };

    void getUns();
  }, [recipientWalletAddress]);

  const domain = ensName ?? unsName;

  return (
    <AddressInput
      isError={recipientEnteredValue ? !isValid : false}
      subtext={
        !loadingConversations
          ? getRecipientInputSubtext(recipientInputMode, recipientEnteredValue)
          : ""
      }
      resolvedAddress={{
        displayAddress:
          domain ??
          (size[0] < 700
            ? shortAddress(recipientWalletAddress)
            : recipientWalletAddress),
        walletAddress: domain ? recipientWalletAddress : "",
      }}
      onChange={setRecipientEnteredValue}
      isLoading={RecipientInputMode.FindingEntry === recipientInputMode}
      value={recipientEnteredValue}
      avatarUrlProps={{
        url: recipientAvatarUrl || "",
        isLoading: avatarLoading,
        address: recipientWalletAddress,
      }}
      onLeftIconClick={() => {
        setRecipientEnteredValue("");
        setRecipientWalletAddress("");
        setStartedFirstMessage(false);
        setConversationId("");
        setRecipientInputMode(RecipientInputMode.InvalidEntry);
        setUnsName(null);
      }}
    />
  );
};
