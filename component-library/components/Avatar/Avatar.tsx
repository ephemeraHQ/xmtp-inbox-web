import React from "react";
import Blockies from "react-blockies";

interface AvatarProps {
  /**
   * Are we waiting on an avatar url?
   */
  isLoading?: boolean;
  /**
   * What, if any, avatar url is there?
   */
  url?: string;
  /**
   * What is the address associated with this avatar?
   */
  address?: string;
}

export const Avatar = ({ url, isLoading, address }: AvatarProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse flex">
        <div className="rounded-full bg-gray-200 h-12 w-12" />
      </div>
    );
  }

  if (url) {
    return (
      <div data-testid="avatar">
        <img className="w-[60px] rounded-full" src={url} alt={address} />
      </div>
    );
  }

  return (
    <div data-testid="avatar">
      <Blockies
        seed={address?.toLowerCase() || ""}
        scale={5}
        size={8}
        className="rounded-full"
      />
    </div>
  );
};
