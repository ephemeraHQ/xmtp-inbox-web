import React from "react";
import { isEnsAddress } from "../../../helpers";
import { iconMapping } from "./iconMapping";

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

export const Tag = ({ text, isLoading = false }: TagProps) => {
  let mappedIcon = iconMapping[text];
  if (!mappedIcon && text) {
    const addressIcon = text.startsWith("0x") ? (
      iconMapping.WALLET_ADDRESS
    ) : isEnsAddress(text) ? (
      iconMapping.ENS_ADDRESS
    ) : text.endsWith(".lens") ? (
      iconMapping.LENS_ADDRESS
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
