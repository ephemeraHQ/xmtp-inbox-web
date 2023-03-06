import React from "react";
import { isEnsAddress } from "../../../helpers";
import { iconMapping, TagIcon } from "./iconMapping";

interface TagProps {
  /**
   * What text is associated with this tag?
   */
  text: string;
  /**
   * What icon is associated with this tag?
   */
  icon?: TagIcon;
  /**
   * Are we waiting on something?
   */
  isLoading?: boolean;
}

export const Tag = ({ text, icon, isLoading = false }: TagProps) => {
  let mappedIcon = icon ? iconMapping[icon] : undefined;
  if (!mappedIcon) {
    mappedIcon = text.startsWith("0x") ? (
      iconMapping[TagIcon.WALLET_ADDRESS]
    ) : isEnsAddress(text) ? (
      iconMapping[TagIcon.ENS_ADDRESS]
    ) : text.endsWith(".lens") ? (
      iconMapping[TagIcon.LENS_ADDRESS]
    ) : (
      <></>
    );
  }

  return (
    <div className="flex inline-flex items-center text-xs h-6 font-bold leading-sm shadow-lg p-3 rounded-full m-1">
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
