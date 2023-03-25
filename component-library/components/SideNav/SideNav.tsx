import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import {
  ChatAlt2Icon,
  CheckCircleIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { CogIcon, SparklesIcon } from "@heroicons/react/outline";
import { classNames, shortAddress } from "../../../helpers";
import { XmtpIcon } from "../Icons/XmtpIcon";
import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { GhostButton } from "../GhostButton/GhostButton";
import { DisconnectIcon } from "../Icons/DisconnectIcon";
import { useTranslation } from "react-i18next";
import i18next, { resourceMap } from "../../../i18n";

interface SideNav {
  /**
   * Contents inside side nav
   */
  icon?: React.ReactNode;
  /**
   * What is the display address?
   */
  displayAddress?: string;
  /**
   * What is the wallet address?
   */
  walletAddress?: string;
  /**
   * What is the avatarUrl?
   */
  avatarUrl?: string;
  /**
   * What should happen when disconnect is clicked?
   */
  onDisconnect?: () => void;
}

const SideNav = ({
  icon = <XmtpIcon />,
  displayAddress,
  walletAddress,
  avatarUrl,
  onDisconnect,
}: SideNav) => {
  const [mappedLangs, setMappedLangs]: [
    Array<{ displayText?: string; isSelected?: boolean; lang?: string }>,
    Function,
  ] = useState([]);
  // When language changes, change the modal text to render the corresponding locale selector within that language
  useEffect(() => {
    const mappedLangs = Object.keys(resourceMap).map((lang: string) => {
      let languageNames = new Intl.DisplayNames([i18next.language], {
        type: "language",
      });

      return {
        displayText: languageNames.of(lang) || languageNames.of("en"),
        isSelected: i18next.language === lang,
        lang,
      };
    });
    setMappedLangs(mappedLangs);
  }, [i18next.language]);

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSideNavBtnClick = (key: string) => {
    if (key === t("menu.collapse_header")) setIsOpen(!isOpen);
  };

  const onXmtpIconClick = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const icons = [
    <ChatAlt2Icon
      key={t("menu.messages_header")}
      width={24}
      className={isOpen ? "mr-4" : ""}
      data-testid="messages-icon"
    />,
    <SparklesIcon
      key={t("menu.gallery_header")}
      width={24}
      className={isOpen ? "mr-4" : ""}
      data-testid="gallery-icon"
    />,
    <CogIcon
      key={t("menu.settings_header")}
      width={24}
      className={isOpen ? "mr-4" : ""}
      data-testid="settings-icon"
    />,
    <ChevronDoubleRightIcon
      key={t("menu.collapse_header")}
      width={24}
      className={isOpen ? "mr-4" : ""}
      data-testid="collapse-icon"
    />,
  ];
  const [currentIcon, setCurrentIcon] = useState(icons[0].key);

  const mappedButtons = icons.map((icon) => {
    return (
      <button
        title={
          icon.key === "Messages" || icon.key === "Collapse"
            ? (icon.key as string)
            : (t("menu.coming_soon") as string)
        }
        key={icon.key}
        type="button"
        onClick={(event) => {
          setCurrentIcon((event.target as HTMLElement).innerText);
          onSideNavBtnClick(icon.key as string);
        }}
        aria-label={icon.key as string}
        className={classNames(
          currentIcon === icon.key ? "font-bold" : "",
          "hover:bg-gray-200",
          "p-2",
          "hover:text-black",
          "text-gray-500",
          "rounded-lg",
          "w-full",
          "flex",
          "item-center",
          "h-fit",
          "rounded",
          "cursor-pointer",
          isOpen ? "w-[300px]" : "",
        )}>
        <>
          <div className="flex justify-center items-center h-fit">
            {icon}
            <span data-testId={icon.key}>{isOpen && icon.key}</span>
          </div>
        </>
      </button>
    );
  });

  return (
    <div
      className={classNames(
        "flex flex-col justify-between items-center h-screen bg-gray-50 px-3 absolute z-10 border-r border-gray-200",
      )}>
      <div className="flex flex-col items-start space-y-4 w-full">
        <div className="py-4 flex">
          <div>
            <div className="flex mb-12">
              <div>
                <Avatar url={avatarUrl} address={walletAddress} />
              </div>
              {isOpen && (
                <div className="flex items-center">
                  <div className="flex flex-col px-2 justify-center">
                    <span className="font-bold" data-testid="wallet-address">
                      {shortAddress(displayAddress ?? "")}
                    </span>
                    {walletAddress && (
                      <span className="font-sm">
                        {shortAddress(walletAddress)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-start pt-4 space-y-4">
              {mappedButtons}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center font-bold w-full pb-8">
        <div
          onClick={onXmtpIconClick}
          onKeyDown={onXmtpIconClick}
          tabIndex={0}
          className="cursor-pointer"
          data-testid="icon">
          {icon}
        </div>
      </div>
      <Transition.Root show={isDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="overflow-y-auto"
          onClose={onXmtpIconClick}
          aria-label={t("menu.settings") || ""}>
          <div className="bg-white w-fit rounded-lg absolute bottom-16 left-12 p-2 z-20">
            <div className="max-h-80 overflow-auto">
              {mappedLangs.map(({ displayText, isSelected, lang }) => {
                return (
                  <div className="flex p-2 justify-between" key={lang}>
                    <button
                      type="button"
                      onClick={() => {
                        i18next.changeLanguage(lang);
                        onXmtpIconClick();
                      }}
                      className={classNames(
                        "text-sm",
                        isSelected ? "font-bold" : "",
                      )}>
                      {displayText}
                    </button>
                    {isSelected && (
                      <CheckCircleIcon
                        width="16"
                        fill="limegreen"
                        className="ml-4"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <hr className="m-2" />
            <GhostButton
              onClick={onDisconnect}
              label={t("common.disconnect")}
              variant="secondary"
              size="small"
              testId="disconnect-wallet-cta"
              icon={<DisconnectIcon />}
            />
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SideNav;
