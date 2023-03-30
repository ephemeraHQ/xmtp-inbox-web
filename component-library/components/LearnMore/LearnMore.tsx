import React from "react";
import { Image } from "../Images/Image";
import { InfoCardIcon } from "../InfoCard/iconMapping";
import { InfoCard } from "../InfoCard/InfoCard";
import { useTranslation } from "react-i18next";

interface LearnMoreProps {
  highlightedCompanies?: Array<{
    name: string;
    description: string;
    tags: React.ReactNode;
  }>;
  version: string;
  setStartedFirstMessage: () => void;
}

export const LearnMore = ({
  highlightedCompanies = [],
  version,
  setStartedFirstMessage,
}: LearnMoreProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center max-w-xl p-4 md:h-full m-0 m-auto">
      <div>
        <h1 className="text-4xl font-bold my-4" data-testId="learn-more-header">
          {t("messages.messages_empty_header")}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        {highlightedCompanies.map(({ name, description, tags }) => {
          return (
            <div className="flex" key={name}>
              <div className="flex flex-col max-w-sm p-2">
                <Image src="https://picsum.photos/350/150" alt="Company 1" />
                <h2 className="text-lg font-extrabold">{name}</h2>
                <p className="text-md">{description}</p>
                <div className="flex justify-start">{tags}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2 className="text-lg font-bold my-4" data-testId="get-started-header">
          {t("messages.messages_empty_subheader")}
        </h2>
        <InfoCard
          header={t("messages.messages_empty_cta_1_header")}
          subtext={t("messages.messages_empty_cta_1_subheader") || ""}
          leftIcon={InfoCardIcon.NEW_MESSAGE}
          onClick={setStartedFirstMessage}
          testId="message"
        />
        <InfoCard
          header={t("messages.messages_empty_cta_2_header")}
          subtext={t("messages.messages_empty_cta_2_subheader") || ""}
          leftIcon={InfoCardIcon.GALLERY}
          styles={"border-t-0"}
          testId="community"
          url="https://community.xmtp.org"
        />
        <InfoCard
          header={t("messages.messages_empty_cta_3_header")}
          subtext={t("messages.messages_empty_cta_3_subheader") || ""}
          leftIcon={InfoCardIcon.DOCUMENTATION}
          styles={"border-t-0"}
          testId="docs"
          url="https://docs.xmtp.org"
        />
      </div>
    </div>
  );
};
