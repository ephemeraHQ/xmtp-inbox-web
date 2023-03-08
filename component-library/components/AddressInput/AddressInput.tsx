import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { AvatarWithHooks } from "../ComponentsWithHooks/AvatarWithHooks";

interface AddressInputProps {
  /**
   * What, if any, resolved address is there?
   */
  resolvedAddress?: {
    displayAddress: string;
    walletAddress?: string;
  };
  /**
   * What, if any, subtext is there?
   */
  subtext?: string;
  // /**
  //  * What are the props associated with the avatar?
  //  */
  // avatarUrlProps?: {
  //   // What is the avatar url?
  //   avatarUrl: string;
  //   // Is the avatar url loading?
  //   isLoading: boolean;
  //   // What's the address of this wallet?
  //   address: string;
  // };
  /**
   * What happens on a submit?
   */
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Upon submit, has there been an error?
   */
  isError?: boolean;
  /**
   * Upon submit, is something loading?
   */
  isLoading?: boolean;
  /**
   * Is there a tooltip click event that needs to be handled?
   */
  onTooltipClick?: () => void;
  /**
   * Input Value
   */
  value?: string;
  // What's the address of this wallet?
  address?: string;
}

export const AddressInput = ({
  resolvedAddress,
  subtext,
  address,
  onChange,
  isError,
  isLoading,
  onTooltipClick,
  value,
}: AddressInputProps) => {
  const subtextColor = isError ? "text-red-400" : "text-gray-400";
  return (
    <div className="flex items-center px-4 py-3 border border-gray-100 border-l-0 z-10 w-full">
      <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
        <AvatarWithHooks address={address} />
        <div className="ml-4 flex flex-col justify-center">
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse m-0 pt-1 pb-1">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-0"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : resolvedAddress?.displayAddress ? (
            <div className="flex flex-col text-md">
              <span className="font-bold">
                {resolvedAddress.displayAddress}
              </span>
              {resolvedAddress.walletAddress && (
                <span className="text-sm font-mono">
                  {resolvedAddress.walletAddress}
                </span>
              )}
            </div>
          ) : (
            <input
              className="text-gray-700 m-0 p-0 font-mono text-sm w-full leading-tight border-none focus:ring-0 cursor-text"
              id="address"
              type="text"
              autoFocus
              spellCheck="false"
              autoComplete="false"
              autoCorrect="false"
              autoCapitalize="off"
              onChange={(e) =>
                onChange && onChange((e.target as HTMLInputElement).value)
              }
              value={value}
            />
          )}
          <p className={`font-mono text-xs ${subtextColor}`}>{subtext}</p>
        </div>
      </form>
      {onTooltipClick && (
        <InformationCircleIcon onClick={onTooltipClick} height="24" />
      )}
    </div>
  );
};
