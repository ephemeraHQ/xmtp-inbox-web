import React, { useEffect, useState } from "react";
import { useEnsAvatar } from "wagmi";
import { AddressInput } from "../component-library/components/AddressInput/AddressInput";
import {
  fetchUnsName,
  getRecipientInputSubtext,
  isValidLongWalletAddress,
  RecipientInputMode,
  shortAddress,
  fetchEverynameName,
} from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useWalletAddress from "../hooks/useWalletAddress";
import { address } from "../pages/inbox";
import useWindowSize from "../hooks/useWindowSize";
import { useXmtpStore } from "../store/xmtp";

export const AddressInputWrapper = () => {
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

  // Wagmi Hooks
  const { data: recipientAvatarUrl, isLoading: avatarLoading } = useEnsAvatar({
    address: recipientWalletAddress as address,
  });

  const size = useWindowSize();

  // Domain name Hooks
  const [unsName, setUnsName] = useState<string | null>();
  const [everynameName, setEverynameName] = useState<string | null>();
  const [isValid, setisValid] = useState<boolean>();

  useEffect(() => {
    const getUns = async () => {
      if (isValidLongWalletAddress(recipientWalletAddress)) {
        const name = await fetchUnsName(recipientWalletAddress);
        setisValid(true);
        setUnsName(name);
      } else {
        setUnsName(null);
      }
    };

    getUns();
  }, [recipientWalletAddress]);

  useEffect(() => {
    const getEveryname = async () => {
      if (isValidLongWalletAddress(recipientWalletAddress)) {
        const name = await fetchEverynameName(recipientWalletAddress);
        setisValid(true);
        setEverynameName(name);
      } else {
        setEverynameName(null);
      }
    };

    getEveryname();
  }, [recipientWalletAddress]);

  const domain = everynameName ?? unsName;

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
      isLoading={
        RecipientInputMode.FindingEntry === recipientInputMode ||
        loadingConversations
      }
      value={recipientEnteredValue}
      avatarUrlProps={{
        url: recipientAvatarUrl || "",
        isLoading: avatarLoading || loadingConversations,
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
