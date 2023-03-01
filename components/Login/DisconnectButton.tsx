import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "../../component-library/Button";
import { wipeKeys } from "../../helpers";
import { useXmtpStore } from "../../store/xmtp";

const DisconnectButton = () => {
  const { address } = useAccount();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  return (
    <div className="mb-2">
      <Button
        size="small"
        variant="ghost"
        primary={false}
        category="text"
        label="Disconnect wallet"
        icon={<ArrowRightIcon width={12} />}
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
