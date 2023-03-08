import { ChatAlt2Icon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import {
  ChevronDownIcon,
  CogIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import { classNames, shortAddress } from "../../../helpers";
import { XmtpIcon } from "../Icons/XmtpIcon";
import { useState } from "react";
import { AvatarWithHooks } from "../ComponentsWithHooks/AvatarWithHooks";

interface SideNav {
  /**
   * Is Side Nav Open?
   */
  isOpen?: boolean;
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
   * Function to navigate
   */
  onClick?: Function;
}

const SideNav = ({
  isOpen = false,
  icon = <XmtpIcon />,
  displayAddress,
  walletAddress,
  onClick,
}: SideNav) => {
  const icons = [
    <ChatAlt2Icon key="Messages" width={24} className={isOpen ? "mr-4" : ""} />,
    <SparklesIcon key="Gallery" width={24} className={isOpen ? "mr-4" : ""} />,
    <CogIcon key="Settings" width={24} className={isOpen ? "mr-4" : ""} />,
    <ChevronDoubleRightIcon
      key="Collapse"
      width={24}
      className={isOpen ? "mr-4" : ""}
    />,
  ];
  const [currentIcon, setCurrentIcon] = useState(icons[0].key);

  const mappedButtons = icons.map((icon) => {
    return (
      <button
        key={icon.key}
        type="button"
        onClick={(event) => {
          setCurrentIcon((event.target as HTMLElement).innerText);
          onClick && onClick(icon.key);
        }}
        aria-label={currentIcon as string}
        className={`${
          currentIcon === icon.key && "font-bold"
        } hover:bg-gray-200 p-2 hover:text-black text-gray-400 rounded-lg w-full flex item-center h-fit rounded cursor-pointer`}>
        <>
          <div className="flex justify-center items-center h-fit">
            {icon}
            {isOpen && icon.key}
          </div>
        </>
      </button>
    );
  });

  return (
    <div
      className={classNames(
        "flex flex-col justify-between items-center h-screen bg-gray-50 px-2 w-fit",
      )}>
      <div className="flex flex-col items-start space-y-4 w-full">
        <div className="py-4 flex">
          <div>
            <div className="flex mb-12">
              <div>
                <AvatarWithHooks address={walletAddress} />
              </div>
              {isOpen && (
                <div className="flex items-center">
                  <div className="flex flex-col px-2 justify-center`">
                    <span className="font-bold">
                      {shortAddress(displayAddress ?? "")}
                    </span>
                    {walletAddress && (
                      <span className="font-sm">
                        {shortAddress(walletAddress)}
                      </span>
                    )}
                  </div>
                  <div>
                    <ChevronDownIcon width={16} />
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
      <div className="pb-4 w-full">{icon}</div>
    </div>
  );
};

export default SideNav;
