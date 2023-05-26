import { fetchEnsAddress } from "@wagmi/core";
import { useEffect } from "react";
import {
  isEverynameAddress,
  isUnsAddress,
  isValidLongWalletAddress,
  RecipientInputMode,
  fetchUnsAddress,
  fetchEverynameAddress,
} from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import { useCanMessage } from "@xmtp/react-sdk";

const useGetRecipientInputMode = () => {
  const { canMessage: canMessageUser } = useCanMessage();

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  const recipientInputMode = useXmtpStore((state) => state.recipientInputMode);
  const setRecipientInputMode = useXmtpStore(
    (state) => state.setRecipientInputMode,
  );

  const recipientEnteredValue = useXmtpStore(
    (state) => state.recipientEnteredValue,
  );
  const setRecipientEnteredValue = useXmtpStore(
    (state) => state.setRecipientEnteredValue,
  );

  const checkIfOnNetwork = async (address: string) => {
    try {
      const canMessage = await canMessageUser(address);
      if (!canMessage) {
        setRecipientInputMode(RecipientInputMode.NotOnNetwork);
      } else {
        setRecipientInputMode(RecipientInputMode.OnNetwork);
        setRecipientWalletAddress(address);
        // When coming from the input (vs the preview panel), conversation ids will always be in XMTP format.
        setConversationId(address);
      }
    } catch (e) {
      setRecipientInputMode(RecipientInputMode.NotOnNetwork);
    }
  };

  useEffect(() => {
    const checkRecipient = async () => {
      try {
        const canMessage = await canMessageUser(recipientWalletAddress);
        if (!canMessage) {
          setRecipientWalletAddress("");
          setRecipientEnteredValue(recipientWalletAddress);
          setRecipientInputMode(RecipientInputMode.NotOnNetwork);
        } else {
          setRecipientInputMode(RecipientInputMode.OnNetwork);
        }
      } catch (e) {
        setRecipientInputMode(RecipientInputMode.NotOnNetwork);
      }
    };
    if (
      recipientWalletAddress &&
      recipientInputMode !== RecipientInputMode.OnNetwork
    ) {
      checkRecipient();
    }
  }, [recipientInputMode, recipientWalletAddress]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (recipientEnteredValue) {
        if (isEverynameAddress(recipientEnteredValue)) {
          setRecipientInputMode(RecipientInputMode.FindingEntry);
          const address = await fetchEverynameAddress(recipientEnteredValue);
          if (address) {
            checkIfOnNetwork(address);
          } else {
            setRecipientInputMode(RecipientInputMode.InvalidEntry);
          }
        } else if (isUnsAddress(recipientEnteredValue)) {
          setRecipientInputMode(RecipientInputMode.FindingEntry);
          const address = await fetchUnsAddress(recipientEnteredValue);
          if (address) {
            checkIfOnNetwork(address);
          } else {
            setRecipientInputMode(RecipientInputMode.InvalidEntry);
          }
        } else if (isValidLongWalletAddress(recipientEnteredValue)) {
          checkIfOnNetwork(recipientEnteredValue as address);
        } else {
          setRecipientInputMode(RecipientInputMode.InvalidEntry);
        }
      }
    };
    handleSubmit();
  }, [recipientEnteredValue]);

  return {
    recipientInputMode,
    setRecipientInputMode,
    recipientEnteredValue,
    setRecipientEnteredValue,
  };
};

export default useGetRecipientInputMode;
