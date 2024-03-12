import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useConsent } from "@xmtp/react-sdk";
import { useXmtpStore } from "../../../store/xmtp";

export const AcceptOrDeny = ({ address }: { address: string }) => {
  const { t } = useTranslation();
  const { allow, deny } = useConsent();
  const activeTab = useXmtpStore((s) => s.activeTab);
  const changedConsentCount = useXmtpStore((s) => s.changedConsentCount);
  const setChangedConsentCount = useXmtpStore((s) => s.setChangedConsentCount);

  const [modalOpen, setModalOpen] = useState(true);

  return activeTab === "requests" && modalOpen ? (
    <div
      className="bg-gray-100 p-4 w-full flex flex-col justify-center items-center text-gray-500 border-2 border-gray-300"
      data-testid="accept_or_deny_container">
      <h3 className="font-bold">{t("consent.new_message_request")}</h3>
      <p>{t("consent.new_message_request_description")}</p>
      <div className="flex w-full justify-between p-3 gap-2">
        <button
          type="button"
          className="text-indigo-600 flex w-full justify-center border border-2 border-indigo-600 rounded-md p-2 hover:bg-indigo-600 hover:text-white"
          onClick={() => {
            void allow([address]);
            setModalOpen(false);
            setChangedConsentCount(changedConsentCount + 1);
          }}>
          {t("consent.accept")}
        </button>
        <button
          type="button"
          className="text-red-600 flex w-full justify-center border border-2 border-red-600 rounded-md p-2 hover:bg-red-600 hover:text-white"
          onClick={() => {
            void deny([address]);
            setModalOpen(false);
            setChangedConsentCount(changedConsentCount + 1);
          }}>
          {t("consent.block")}
        </button>
      </div>
    </div>
  ) : null;
};
