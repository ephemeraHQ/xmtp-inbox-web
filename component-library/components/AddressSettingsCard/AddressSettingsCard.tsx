import { CheckIcon } from "@heroicons/react/outline";
import React from "react";
import { WalletAddressIcon } from "../Icons/WalletAddressIcon";
import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";

interface AddressSettingsCardProps {
  /**
   * What is the header text?
   */
  header: string;
  /**
   * What is the subtext?
   */
  subtext?: string;
  /**
   * What avatar is shown?
   */
  avatar?: React.ReactNode;
  /**
   * Is the address associated with this account connected?
   */
  isConnected?: boolean;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
}
/**
 *
 * Settings card that displays an address
 */
export const AddressSettingsCard = ({
  header,
  subtext,
  avatar,
  isConnected = false,
  isLoading = false,
}: AddressSettingsCardProps) => {
  return (
    <div
      className={`max-w-full bg-gray-50 flex p-2 flex items-center justify-between`}>
      <div className="flex items-center">
        {avatar}
        <div className="flex flex-col">
          {isLoading ? (
            <ShortCopySkeletonLoader lines={2} />
          ) : (
            <>
              <div className="font-bold ml-4">{header}</div>
              {subtext && (
                <span className="font-mono text-md flex ml-4">
                  <WalletAddressIcon />
                  <span className="ml-2">{subtext}</span>
                </span>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        {isLoading && isConnected ? (
          <IconSkeletonLoader />
        ) : (
          isConnected && <CheckIcon width="24" />
        )}
      </div>
    </div>
  );
};
