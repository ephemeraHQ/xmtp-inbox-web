import { useEffect, useRef } from "react";
import { useCanMessage } from "@xmtp/react-sdk";
import debounce from "lodash/debounce";
import {
  isEnsName,
  isUnsName,
  isValidLongWalletAddress,
  throttledFetchAddressIdentity,
  throttledFetchEnsAddress,
  throttledFetchEnsAvatar,
  throttledFetchUnsAddress,
} from "../helpers";
import { useXmtpStore } from "../store/xmtp";

/**
 * Hook to manage the state of the recipient address input
 *
 * DO NOT RENDER THIS HOOK MORE THAN ONCE
 */
export const useAddressInput = () => {
  const validatingRef = useRef(false);
  const { canMessage } = useCanMessage();
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const recipientAddress = useXmtpStore((s) => s.recipientAddress);
  const recipientName = useXmtpStore((s) => s.recipientName);
  const recipientAvatar = useXmtpStore((s) => s.recipientAvatar);
  const recipientOnNetwork = useXmtpStore((s) => s.recipientOnNetwork);
  const setRecipientState = useXmtpStore((s) => s.setRecipientState);
  const setRecipientAddress = useXmtpStore((s) => s.setRecipientAddress);
  const setRecipientName = useXmtpStore((s) => s.setRecipientName);
  const setRecipientAvatar = useXmtpStore((s) => s.setRecipientAvatar);
  const setRecipientOnNetwork = useXmtpStore((s) => s.setRecipientOnNetwork);

  useEffect(() => {
    const validateAddress = debounce(async () => {
      // if we're currently validating, don't do anything
      if (validatingRef.current) {
        return;
      }
      validatingRef.current = true;
      try {
        // we have a valid address
        if (recipientAddress) {
          // but no name
          if (!recipientName) {
            setRecipientState("loading");
            // check for name and avatar
            const { name, avatar } = await throttledFetchAddressIdentity(
              recipientAddress,
            );
            setRecipientName(name);
            setRecipientAvatar(avatar);
            // we have a name, but no avatar
          } else if (!recipientAvatar) {
            setRecipientState("loading");
            // check for avatar
            const avatar = await throttledFetchEnsAvatar({
              address: recipientAddress,
            });
            setRecipientAvatar(avatar);
          }
          setRecipientState("valid");
          // make sure we can message the recipient
          if (!recipientOnNetwork) {
            const validRecipient = await canMessage(recipientAddress);
            if (validRecipient) {
              setRecipientOnNetwork(true);
            }
          }
          // we don't yet have a valid address, check input for address
        } else if (isValidLongWalletAddress(recipientInput)) {
          setRecipientState("loading");
          // check for name and avatar
          const { name, avatar } = await throttledFetchAddressIdentity(
            recipientInput,
          );
          setRecipientAddress(recipientInput);
          setRecipientName(name);
          setRecipientAvatar(avatar);
          setRecipientState("valid");
          // if input is an ens name
        } else if (isEnsName(recipientInput)) {
          setRecipientState("loading");
          // fetch ens address
          const address = await throttledFetchEnsAddress({
            name: recipientInput,
          });
          if (address) {
            setRecipientAddress(address);
            setRecipientName(recipientInput);
            setRecipientState("valid");
          } else {
            setRecipientState("invalid");
          }
          // if input is a uns name
        } else if (isUnsName(recipientInput)) {
          setRecipientState("loading");
          // fetch uns address
          const address = await throttledFetchUnsAddress(recipientInput);
          if (address) {
            setRecipientAddress(address);
            setRecipientName(recipientInput);
            setRecipientState("valid");
          } else {
            setRecipientState("invalid");
          }
        }
      } catch {
        setRecipientState("error");
      } finally {
        validatingRef.current = false;
      }
    }, 500);
    void validateAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientInput, recipientAddress]);
};
