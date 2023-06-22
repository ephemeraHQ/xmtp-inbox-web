import { ExclamationIcon } from "@heroicons/react/solid";
import { useTranslation, Trans } from "react-i18next";
import { PillButton } from "../../components/PillButton/PillButton";

interface ErrorPageProps {
  icon?: React.ReactNode;
  header: string;
  description: string;
  cta?: React.ReactNode;
  subtext: string;
}

export const ErrorPage = ({
  icon = <ExclamationIcon width="60" className="text-red-600" />,
  header,
  description,
  cta,
  subtext,
}: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white h-screen max-w-sm flex flex-col justify-center items-center m-auto text-center">
      {icon}
      <div className="text-4xl font-bold mb-4">
        {header || t("status_messaging.error_1_header")}
      </div>
      {description || (
        <div className="inline">
          <Trans
            t={t}
            i18nKey="status_messaging.error_1_subheader"
            // eslint-disable-next-line jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content
            components={[<a key={0} href="mailto:hi@xmtp.com" />]}
          />
        </div>
      )}
      {cta || (
        <PillButton
          label={t("status_messaging.error_1_button")}
          variant="secondary"
          onClick={() => window.location.replace(window.location.origin)}
        />
      )}
      <div className="text-gray-300 text-sm font-bold">{subtext}</div>
    </div>
  );
};
