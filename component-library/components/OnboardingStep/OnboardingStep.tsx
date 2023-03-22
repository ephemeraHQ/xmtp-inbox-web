import React from "react";
import { Spinner } from "../Loaders/Spinner";
import { ctaStep, stepMapping } from "./stepMapping";
import { GhostButton } from "../GhostButton/GhostButton";
import { DisconnectIcon } from "../Icons/DisconnectIcon";
import { logoSvg as Logo } from "./logo";
import { PillButton } from "../PillButton/PillButton";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

interface OnboardingStepProps {
  /**
   * What step in the process is this?
   */
  step: number;
  /**
   * Is the message content loading?
   */
  isLoading?: boolean;
  /**
   * What function should be run to connect to a wallet?
   */
  onConnect?: () => void;
  /**
   * What function should be run to create an XMTP identity?
   */
  onCreate?: () => void;
  /**
   * What function should be run to enable an XMTP identity?
   */
  onEnable?: () => void;
  /**
   * What function should be run to disconnect a wallet?
   */
  onDisconnect?: () => void;
}

export const OnboardingStep = ({
  step,
  isLoading,
  onConnect,
  onCreate,
  onEnable,
  onDisconnect,
}: OnboardingStepProps) => {
  const { t } = useTranslation();

  const stepInfo = isLoading
    ? stepMapping[step]?.loading
    : stepMapping[step]?.default;

  if (stepInfo) {
    const { header, subheader, cta, subtext } = stepInfo;

    return (
      <div className="bg-white flex flex-col justify-center items-center max-w-sm text-center m-auto w-screen p-4 h-screen">
        {isLoading ? (
          <Spinner />
        ) : (
          <div data-testid="xmtp-logo" className="h-1/2">
            <Logo />
          </div>
        )}
        <div className="mt-8">
          {step > 1 ? (
            <p className="pt-4">{t("common.step_of_2", { NUM: step - 1 })}</p>
          ) : null}
          <h1
            className="text-4xl font-bold p-4 pt-0"
            data-testid={step === 1 && "no-wallet-connected-header"}>
            {t(header)}
          </h1>
          <p data-testid={step === 1 && "no-wallet-connected-subheader"}>
            <Trans i18nKey={subheader} />
          </p>
          <div className="p-2">
            {cta === ctaStep.ENABLE ? (
              <PillButton
                label={t("onboarding.enable_button")}
                onClick={onEnable}
                testId="enable-xmtp-identity-cta"
              />
            ) : cta === ctaStep.CREATE ? (
              <PillButton
                label={t("onboarding.create_button")}
                onClick={onCreate}
                testId="create-xmtp-identity-cta"
              />
            ) : cta === ctaStep.CONNECT ? (
              <PillButton
                label={t("onboarding.intro_button")}
                onClick={onConnect}
                testId="no-wallet-connected-cta"
              />
            ) : null}
          </div>
          {subtext ? (
            <p
              className="font-bold text-md text-gray-500"
              data-testid={step === 1 && "no-wallet-connected-subtext"}>
              {t(subtext)}
            </p>
          ) : (
            <GhostButton
              onClick={onDisconnect}
              label={t("common.disconnect")}
              variant="secondary"
              icon={<DisconnectIcon />}
            />
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
