import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";
import {
  LoginPageHeaderText,
  LoginPageInfoText,
  LoginSubText,
} from "./ConnectingDom";

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
      <LoginPageHeaderText
        text="Your interoperable web3 inbox"
        marginTop="-28px"
      />
      <LoginPageInfoText text="You're just a few steps away from secure, wallet-to-wallet messaging" />
      <div className="mt-2">
        <Button
          onClick={handleConnect}
          category="text"
          label="Connect your wallet"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <LoginSubText />
    </>
  );
};

export default ConnectWalletDom;
