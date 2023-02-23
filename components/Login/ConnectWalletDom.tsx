import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";

const ConnectWalletDom = ({
  handleConnect,
}: {
  handleConnect?: () => void;
}) => {
  return (
    <>
      <div>
        <img
          className="h-[60vh] ml-12 w-auto"
          src="/login-page-logo.png"
          alt="XMTP Logo"
          data-testid="xmtp-logo"
        />
      </div>
      <div className="font-bold text-3xl mt-[-28px] text-center">
        Your interoperable web3 inbox
      </div>
      <div className="text-lg mt-2 text-center">
        {"You're just a few steps away from secure, wallet-to-wallet messaging"}
      </div>
      <div className="mt-2">
        <Button
          buttonSize="small"
          onClick={handleConnect}
          category="text"
          label="Connect your wallet"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <div className="text-sm mt-2 font-bold">
        No private keys will be shared
      </div>
    </>
  );
};

export default ConnectWalletDom;
