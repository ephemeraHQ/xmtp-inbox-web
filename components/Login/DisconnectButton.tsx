import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { GhostButton } from "../../component-library/components/GhostButton/GhostButton";
import { NegativeGhostButtonSmall } from "../../component-library/components/GhostButton/GhostButton.stories";
import { DisconnectIcon } from "../../component-library/components/Icons/DisconnectIcon";
import { wipeKeys } from "../../helpers";
import { useXmtpStore } from "../../store/xmtp";

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
