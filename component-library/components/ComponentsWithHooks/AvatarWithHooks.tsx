import React from "react";
import { useEnsAvatar } from "wagmi";
import { address } from "../../../components/Address";
import { Avatar } from "../Avatar/Avatar";

interface AvatarWithHooksProps {
  /**
   * What is the address associated with this avatar?
   */
  address?: string;
}

export const AvatarWithHooks = ({ address }: AvatarWithHooksProps) => {
  const { data: url, isLoading } = useEnsAvatar({
    address: address as address,
  });

  return <Avatar url={url ?? ""} isLoading={isLoading} address={address} />;
};
