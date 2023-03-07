import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { wipeKeys } from "../../../helpers";
import { useXmtpStore } from "../../../store/xmtp";
import { GhostButton } from "../GhostButton/GhostButton";
import { DisconnectIcon } from "../Icons/DisconnectIcon";

const DisconnectButton = () => {
  const { address } = useAccount();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  return (
    <div className="my-2">
      <GhostButton
        variant="secondary"
        label="Disconnect wallet"
        icon={<DisconnectIcon />}
        onClick={() => {
          wipeKeys(address ?? "");
          disconnectWagmi();
          resetWagmi();
          resetXmtpState();
        }}
      />
    </div>
  );
};

export default DisconnectButton;
