import React from "react";
import { PillButton } from "../PillButton/PillButton";
import { emptyMessageSvg } from "./EmptyMessageGraphic";
import { useTranslation } from "react-i18next";

interface EmptyMessageProps {
  /**
   * What should we run to trigger the first message being composed?
   */
  setStartedFirstMessage?: () => void;
}

export const EmptyMessage = ({ setStartedFirstMessage }: EmptyMessageProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center h-full text-center md:pl-16">
      <span data-testid="empty-message-icon">{emptyMessageSvg} </span>
      <h2 className="text-xl font-bold mt-4" data-testid="empty-message-header">
        {t("messages.convos_empty_header")}
      </h2>
      <p className="my-4" data-testid="empty-message-subheader">
        {t("messages.convos_empty_subheader")}
      </p>
      <PillButton
        label={t("messages.convos_empty_button")}
        onClick={setStartedFirstMessage}
        testId="empty-message-cta"
      />
    </div>
  );
};
