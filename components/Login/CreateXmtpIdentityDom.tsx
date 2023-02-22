import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";
import Loader from "../Loader";
import DisconnectButton from "./DisconnectButton";

const CreateXmtpIdentityDom = ({
  createXmtpIdentity,
  isLoading,
}: {
  createXmtpIdentity: () => void;
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
      <div className="text-base mt-[-172px]">Step 1 of 2</div>
      <div className="font-bold text-3xl text-center">
        {isLoading ? <>Create</> : <>Creating</>} your XMTP <br /> identity
      </div>
      <div className="text-lg mt-2 text-center">
        {isLoading ? (
          <>
            Look for a confirmation dialog in the wallet <br /> you&apos;ve
            selected.
          </>
        ) : (
          <>
            Now that your wallet is connected, we&apos;re going <br /> to create
            your XMTP identity on our network <br /> with a wallet signature.
          </>
        )}
      </div>
      <div className="mt-2">
        <Button
          onClick={createXmtpIdentity}
          category="text"
          label="Create XMTP identity"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <DisconnectButton />
    </>
  );
};

export default CreateXmtpIdentityDom;
