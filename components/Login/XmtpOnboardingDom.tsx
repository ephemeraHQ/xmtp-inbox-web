import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../component-library/Button";
import { LoginPageHeaderText, LoginPageInfoText } from "./LoginDomTextElements";
import DisconnectButton from "./DisconnectButton";

type XmtpOnboardingDomProps = {
  cta: () => void;
  ctaText: string;
  infoText: string;
  stepNumber: string;
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
  loadingHeader,
  header,
}: XmtpOnboardingDomProps) => {
  return (
    <>
      <div className="md:max-w-[45%] sm:max-w-[75%]">
        <LoginPageHeaderText
          stepNumber={stepNumber}
          text={isLoading ? loadingHeader : header}
          isLoading={isLoading}
        />
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
