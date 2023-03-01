import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { LoginPageHeaderText, LoginPageInfoText } from "./LoginDomTextElements";
import DisconnectButton from "./DisconnectButton";
import { PillButton } from "../../component-library/components/PillButton/PillButton";

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
          <PillButton onClick={cta} label={ctaText} />
        </div>
        <DisconnectButton />
      </div>
    </>
  );
};

export default XmtpOnboardingDom;
