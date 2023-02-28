import React from "react";
import { Spinner } from "../Loaders/Spinner";
import stepMapping from "./stepMapping";
import { GhostButton } from "../GhostButton/GhostButton";
import { DisconnectIcon } from "../Icons/DisconnectIcon";
import { logoSvg as Logo } from "./logo";

interface OnboardingStepProps {
  /**
   * What step in the process is this?
   */
  step: number;
  /**
   * Is the message content loading?
   */
  isLoading?: boolean;
}

const OnboardingStep = ({ step, isLoading }: OnboardingStepProps) => {
  const stepInfo = isLoading
    ? stepMapping[step]?.loading
    : stepMapping[step]?.default;

  if (stepInfo) {
    const { header, subheader, cta, subtext } = stepInfo;

    return (
      <div className="flex flex-col justify-center items-center max-w-sm text-center m-auto h-screen">
        {isLoading ? <Spinner /> : <Logo />}
        <p className="pt-4">{step > 1 ? `Step ${step - 1} of 2` : null}</p>
        <h1 className="text-4xl font-bold p-4">{header}</h1>
        <p>{subheader}</p>
        <div className="p-4">{cta}</div>
        {subtext ? (
          <p className="font-bold text-md text-gray-500">{subtext}</p>
        ) : (
          <GhostButton
            // To-do: Add proper click handler
            label="Disconnect Wallet"
            variant="secondary"
            icon={<DisconnectIcon />}
          />
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default OnboardingStep;
