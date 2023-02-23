import {
  CreditCardIcon,
  ShoppingBagIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { ChatIcon } from "@heroicons/react/solid";
import React from "react";
import { isEnsAddress } from "../../../helpers";
import { EnsAddress } from "../Icons/EnsAddress";
import { LensAddress } from "../Icons/LensAddress";
import { WalletAddress } from "../Icons/WalletAddress";

interface TagProps {
  /**
   * What text is associated with this tag?
   */
  text:
    | "audio"
    | "messaging"
    | "shopping"
    | "transactions"
    | "walletAddress"
    | "ensAddress"
    | "lensAddress";
  /**
   * What icon, if any, is associated with this tag?
   */
  icon?: React.ReactNode;
  /**
   * Are we waiting on something?
   */
  isLoading?: boolean;
}

const IconMapping = {
  audio: <SpeakerphoneIcon width="16" />,
  messaging: <ChatIcon width="16" />,
  shopping: <ShoppingBagIcon width="16" />,
  transactions: <CreditCardIcon width="16" />,
  walletAddress: <WalletAddress />,
  ensAddress: <EnsAddress />,
  lensAddress: <LensAddress />,
};

export const Tag = ({ text, isLoading = false }: TagProps) => {
  let mappedIcon = IconMapping[text];
  if (!mappedIcon && text) {
    const addressIcon = text.startsWith("0x") ? (
      IconMapping.walletAddress
    ) : isEnsAddress(text) ? (
      IconMapping.ensAddress
    ) : text.endsWith(".lens") ? (
      IconMapping.lensAddress
    ) : (
      <></>
    );
    mappedIcon = addressIcon;
  }
  return (
    <div className="flex inline-flex items-center text-xs h-6 font-bold leading-sm shadow-lg p-3 rounded-full">
      {isLoading ? (
        <div role="status" className="max-w-sm animate-pulse m-0 p-1">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 m-0"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <div className="my-2">{mappedIcon}</div>
          <p className="ml-2">{text}</p>
        </>
      )}
    </div>
  );
};
