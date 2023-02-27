import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";
import Loader from "../Loader";
import { LoginPageHeaderText, LoginPageInfoText } from "./ConnectingDom";
import DisconnectButton from "./DisconnectButton";

type XmtpOnboardingDomProps = {
  cta: () => void;
  ctaText: string;
  infoText: string;
  stepNumber: string;
  imgSrc: string;
  loadingHeader: string;
  header: string;
  isLoading: boolean;
};

const XmtpOnboardingDom = ({
  cta,
  ctaText,
  isLoading,
  infoText,
  stepNumber,
  imgSrc,
  loadingHeader,
  header,
}: XmtpOnboardingDomProps) => {
  return (
    <>
      <div>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <img
            className="sm:h-[75vh] md:h-[84vh] w-auto"
            src={imgSrc}
            alt="XMTP Logo"
            data-testid="xmtp-logo"
          />
        )}
      </div>
      <div className="md:max-w-[35%] sm:max-w-[75%]">
        <div className="text-base md:mt-[-172px]">Step {stepNumber} of 2</div>
        <LoginPageHeaderText text={isLoading ? loadingHeader : header} />
        <LoginPageInfoText
          text={
            isLoading
              ? "Look for a confirmation dialog in the wallet you've selected."
              : infoText
          }
        />
        <div className="mt-2">
          <Button
            onClick={cta}
            category="text"
            label={ctaText}
            icon={<ArrowCircleRightIcon width={20} />}
          />
        </div>
        <DisconnectButton />
      </div>
    </>
  );
};

export default XmtpOnboardingDom;
