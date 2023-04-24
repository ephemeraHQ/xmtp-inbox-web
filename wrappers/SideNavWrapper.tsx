import React from "react";
import { useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import SideNav from "../component-library/components/SideNav/SideNav";
import { wipeKeys } from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import { useClient } from "@xmtp/react-sdk";

export const SideNavWrapper = () => {
  const { client, disconnect } = useClient();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const { data: ensNameConnectedWallet } = useEnsName({
    address: client?.address as address,
  });

  const { data: selfAvatarUrl } = useEnsAvatar({
    address:
      (ensNameConnectedWallet as address) ?? (client?.address as address),
  });
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  return (
    <SideNav
      displayAddress={ensNameConnectedWallet ?? client?.address}
      walletAddress={client?.address}
      avatarUrl={selfAvatarUrl || ""}
      onDisconnect={() => {
        disconnect();
        wipeKeys(client?.address ?? "");
        disconnectWagmi();
        resetWagmi();
        resetXmtpState();
      }}
    />
  );
};
