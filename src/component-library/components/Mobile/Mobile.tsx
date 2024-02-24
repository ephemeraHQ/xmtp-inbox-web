import { DeviceMobileIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";

export const Mobile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <DeviceMobileIcon width="100" className="text-indigo-600" />
      <h1 className="text-2xl font-bold">{t("mobile.mobile_detected")}</h1>
      <p className="mt-8">{t("mobile.group_chat_cta")}</p>
      <a
        href="https://testflight.apple.com/join/xEJOvzEx"
        target="_blank"
        className="flex justify-center text-blue-600 text-center cursor-pointer"
        rel="noreferrer">
        https://testflight.apple.com/join/xEJOvzEx
      </a>
      <p className="mt-8">{t("mobile.reference_app_cta")}</p>
      <a
        href="https://github.com/xmtp-labs/xmtp-inbox-mobile"
        target="_blank"
        className="flex justify-center text-blue-600 cursor-pointer"
        rel="noreferrer">
        https://github.com/xmtp-labs/xmtp-inbox-mobile
      </a>
    </div>
  );
};
