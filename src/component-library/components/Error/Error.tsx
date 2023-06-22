import React from "react";
import { useTranslation , Trans } from "react-i18next";
import { ExclamationIcon } from "@heroicons/react/solid";
import { PillButton } from "../PillButton/PillButton";

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
        <h1 className="text-4xl font-bold p-4 pt-0">
          {t("status_messaging.error_1_header")}
        </h1>
        <p>
          <Trans
            i18nKey={
              errorText || "status_messaging.error_1_subheader"
            }
          />
        </p>
        <div className="p-2">
          <PillButton
            variant="secondary"
            label={t("status_messaging.error_1_button")}
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
