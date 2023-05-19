import React, { useEffect, useState } from "react";
import { useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import SideNav from "../component-library/components/SideNav/SideNav";
import { fetchUnsName, wipeKeys } from "../helpers";
import { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";
import { useClient } from "@xmtp/react-sdk";

export const SideNavWrapper = () => {
  const { client, disconnect } = useClient();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const [unsNameConnected, setUnsNameConnected] = useState<string | null>();

  useEffect(() => {
    const getUns = async () => {
      const name = await fetchUnsName(client?.address);
      setUnsNameConnected(name);
    };

    getUns();
  }, []);

  const { data: ensNameConnectedWallet } = useEnsName({
    address: client?.address as address,
  });

  const { data: selfAvatarUrl } = useEnsAvatar({
    address:
      (ensNameConnectedWallet as address) ?? (client?.address as address),
  });
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  const domain = ensNameConnectedWallet ?? unsNameConnected;

  return (
    <SideNav
      displayAddress={domain ?? client?.address}
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
