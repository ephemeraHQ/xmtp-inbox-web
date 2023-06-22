import React, { useEffect, useState } from "react";
import { useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { useClient } from "@xmtp/react-sdk";
import SideNav from "../component-library/components/SideNav/SideNav";
import { fetchUnsName, isValidLongWalletAddress, wipeKeys } from "../helpers";
import type { address } from "../pages/inbox";
import { useXmtpStore } from "../store/xmtp";

export const SideNavController = () => {
  const { client, disconnect } = useClient();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const [unsNameConnected, setUnsNameConnected] = useState<string | null>();

  useEffect(() => {
    const getUns = async () => {
      if (isValidLongWalletAddress(client?.address || "")) {
        const name = await fetchUnsName(client?.address);
        setUnsNameConnected(name);
      } else {
        setUnsNameConnected(null);
      }
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
