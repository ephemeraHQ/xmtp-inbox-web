import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "../../component-library/Button";
import { wipeKeys } from "../../helpers";
import { useXmtpStore } from "../../store/xmtp";

const DisconnectButton = () => {
  const { address } = useAccount();
  const setShowMessageView = useXmtpStore((state) => state.setShowMessageView);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  return (
    <div className="mb-2">
      <Button
        buttonSize="small"
        background="ghost"
        primary={false}
        category="text"
        label="Disconnect wallet"
        icon={<ArrowRightIcon width={12} />}
        onClick={() => {
          wipeKeys(address ?? "");
          disconnectWagmi();
          resetWagmi();
          resetXmtpState();
          setShowMessageView?.(false);
        }}
      />
    </div>
  );
};

export default DisconnectButton;
