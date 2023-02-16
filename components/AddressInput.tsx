import { fetchEnsAddress } from "@wagmi/core";
import React, { useEffect, useState } from "react";
import {
  classNames,
  isEnsAddress,
  isValidLongWalletAddress,
  RecipientInputMode,
} from "../helpers";
import { address } from "./Address";

type AddressInputProps = {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  submitValue?: (address: address) => void;
  setRecipientInputMode?: (value: number) => void;
};

const AddressInput = ({
  id,
  className,
  placeholder,
  submitValue,
  setRecipientInputMode,
}: AddressInputProps): JSX.Element => {
  const [recipientEnteredValue, setRecipientEnteredValue] =
    useState<string>("");

  useEffect(() => {
    const handleSubmit = async () => {
      if (recipientEnteredValue) {
        if (isEnsAddress(recipientEnteredValue)) {
          setRecipientInputMode &&
            setRecipientInputMode(RecipientInputMode.FindingEntry);
          const address = await fetchEnsAddress({
            name: recipientEnteredValue,
          });
          if (address) {
            submitValue && submitValue(address);
          }
        } else if (isValidLongWalletAddress(recipientEnteredValue)) {
          submitValue && submitValue(recipientEnteredValue as address);
        } else {
          setRecipientInputMode &&
            setRecipientInputMode(RecipientInputMode.InvalidEntry);
        }
      }
    };
    handleSubmit();
  }, [recipientEnteredValue]);

  return (
    <input
      id={id}
      name="recipient"
      className={classNames(className || "")}
      placeholder={placeholder}
      onChange={(e) =>
        setRecipientEnteredValue((e.target as HTMLInputElement).value)
      }
      value={recipientEnteredValue}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      data-testid="message-to-input"
    />
  );
};

export default AddressInput;
