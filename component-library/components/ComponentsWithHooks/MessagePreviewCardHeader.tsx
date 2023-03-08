import React from "react";
import { useEnsName } from "wagmi";
import { address } from "../../../components/Address";
import { shortAddress } from "../../../helpers";

interface MessagePreviewCardHeaderProps {
  /**
   * What is the address associated with this avatar?
   */
  address?: string;
}

export const MessagePreviewCardHeader = ({
  address,
}: MessagePreviewCardHeaderProps) => {
  const { data: ensName } = useEnsName({
    address: address as address,
  });

  return (
    <span className="text-md font-bold">
      {ensName || shortAddress(address ?? "")}
    </span>
  );
};
