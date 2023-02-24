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
  text: string;
  /**
   * Are we waiting on something?
   */
  isLoading?: boolean;
}

// To-do: update icon and text logic after we receive from design. These are placeholders for now.
const IconMapping = {
  ["AUDIO" as string]: <SpeakerphoneIcon width="16" />,
  ["MESSAGING" as string]: <ChatIcon width="16" />,
  ["SHOPPING" as string]: <ShoppingBagIcon width="16" />,
  ["TRANSACTIONS" as string]: <CreditCardIcon width="16" />,
  ["WALLET_ADDRESS" as string]: <WalletAddress />,
  ["ENS_ADDRESS" as string]: <EnsAddress />,
  ["LENS_ADDRESS" as string]: <LensAddress />,
};

export const Tag = ({ text, isLoading = false }: TagProps) => {
  let mappedIcon = IconMapping[text];
  if (!mappedIcon && text) {
    const addressIcon = text.startsWith("0x") ? (
      IconMapping.WALLET_ADDRESS
    ) : isEnsAddress(text) ? (
      IconMapping.ENS_ADDRESS
    ) : text.endsWith(".lens") ? (
      IconMapping.LENS_ADDRESS
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
