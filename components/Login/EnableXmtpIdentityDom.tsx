import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";
import Loader from "../Loader";
import DisconnectButton from "./DisconnectButton";

const EnableXmtpIdentityDom = ({
  enableXmtpIdentity,
  isLoading,
}: {
  enableXmtpIdentity: () => void;
  isLoading: boolean;
}) => {
  return (
    <>
      <div>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <img
            className="h-[84vh] w-auto"
            src="/login-page-step-img.png"
            alt="XMTP Logo"
            data-testid="xmtp-logo"
          />
        )}
      </div>
      <div className="text-base mt-[-172px]">Step 2 of 2</div>
      <div className="font-bold text-3xl text-center">
        {isLoading ? (
          <>
            Almost there! <br /> One more signature.
          </>
        ) : (
          <>
            Enable messaging <br /> on XMTP
          </>
        )}
      </div>
      <div className="text-lg mt-2 text-center">
        {isLoading ? (
          <>
            Look for a confirmation dialog in the wallet <br /> you&apos;ve
            selected.
          </>
        ) : (
          <>
            You&apos;re activated on the XMTP network! Now <br /> let&apos;s
            enable your ability to start messaging and <br /> you can start
            messaging wallets right away.
          </>
        )}
      </div>
      <div className="mt-2">
        <Button
          onClick={enableXmtpIdentity}
          category="text"
          label="Enable XMTP identity"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <DisconnectButton />
    </>
  );
};

export default EnableXmtpIdentityDom;
