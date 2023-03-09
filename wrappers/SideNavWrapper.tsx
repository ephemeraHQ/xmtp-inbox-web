import React from "react";
import { useEnsAvatar, useEnsName } from "wagmi";
import SideNav from "../component-library/components/SideNav/SideNav";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";

export const SideNavWrapper = () => {
  const client = useXmtpStore((state) => state.client);

  const { data: ensNameConnectedWallet } = useEnsName({
    address: client?.address as address,
  });

  const { data: selfAvatarUrl } = useEnsAvatar({
    address:
      (ensNameConnectedWallet as address) ?? (client?.address as address),
  });

  return (
    <SideNav
      displayAddress={ensNameConnectedWallet ?? client?.address}
      walletAddress={ensNameConnectedWallet ? client?.address : undefined}
      avatarUrl={selfAvatarUrl || ""}
    />
  );
};
