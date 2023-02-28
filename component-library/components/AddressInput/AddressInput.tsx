import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface AddressInputProps {
  /**
   * What, if any, subtext is there?
   */
  subtext?: string;
  /**
   * What are the props associated with the avatar?
   */
  avatarUrlProps?: {
    // What is the avatar url?
    avatarUrl: string;
    // Is the avatar url loading?
    isLoading: boolean;
    // What's the address of this wallet?
    address: string;
  };

  /**
   * What happens on a submit?
   */
  onSubmit?: () => void;
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
}

export const AddressInput = ({
  subtext,
  avatarUrlProps,
  onSubmit,
  isError,
  isLoading,
  onTooltipClick,
}: AddressInputProps) => {
  const subtextColor = isError ? "text-red-400" : "text-gray-400";
  return (
    <div className="flex align-center">
      <form className="flex w-full" onSubmit={onSubmit}>
        <Avatar {...avatarUrlProps} />
        <div className="ml-4">
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse m-0 pt-1 pb-3">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-0"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <input
              className="text-gray-700 mb-0 pl-0 font-mono text-sm w-full leading-tight border-none focus:ring-0 cursor-text"
              id="address"
              type="text"
              autoFocus
              spellCheck="false"
              autoComplete="false"
              autoCorrect="false"
            />
          )}
          {subtext && (
            <p className={`font-mono text-sm ${subtextColor}`}>{subtext}</p>
          )}
        </div>
      </form>
      <InformationCircleIcon onClick={onTooltipClick} height="24" />
    </div>
  );
};
