import React from "react";
import { PillButton } from "../PillButton/PillButton";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import { ExclamationIcon } from "@heroicons/react/solid";

interface ErrorProps {
  /**
   * What is the error?
   */
  errorText?: string;
  /**
   * What function should be run to connect to a wallet?
   */
  onConnect?: () => void;
}

export const Error = ({ errorText, onConnect }: ErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white flex flex-col justify-center items-center max-w-sm text-center m-auto w-screen p-4 h-screen">
      <ExclamationIcon className="text-red-600" width={82} />
      <div className="mt-2">
        <h1 className="text-4xl font-bold p-4 pt-0">{t("error.header")}</h1>
        <p>
          <Trans i18nKey={errorText ? errorText : ""} />
        </p>
        <div className="p-2">
          <PillButton
            variant="secondary"
            label={t("error.connect_again_button")}
            onClick={onConnect}
            testId="enable-xmtp-identity-cta"
          />
        </div>
        <p className="font-bold text-md text-gray-500">
          {t("common.private_key_note")}
        </p>
      </div>
    </div>
  );
};
