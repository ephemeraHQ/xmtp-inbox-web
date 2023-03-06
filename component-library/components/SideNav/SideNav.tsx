import { ChatAlt2Icon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { CogIcon, SparklesIcon } from "@heroicons/react/outline";
import { classNames } from "../../../helpers";
import { ListButton } from "../ListButton/ListButton";
import { XmtpIcon } from "../Icons/XmtpIcon";

interface SideNav {
  /**
   * Is Side Nav Open?
   */
  isOpen?: boolean;
  /**
   * Contents inside side nav
   */
  icon?: React.ReactNode;
}

const SideNav = ({ isOpen = false, icon = <XmtpIcon /> }: SideNav) => {
  const closedNavListItems = (
    <div className="flex flex-col space-y-4 mt-10">
      <ListButton
        startIconOverride={<ChatAlt2Icon width={24} />}
        className="p-2 bg-gray-200 rounded-lg font-bold w-full flex item-center justify-center"
      />
      <ListButton
        startIconOverride={<SparklesIcon width={24} />}
        className="hover:bg-gray-200 hover:text-black p-2 text-gray-400 rounded-lg w-full flex item-center justify-center"
      />
      <ListButton
        startIconOverride={<CogIcon width={24} />}
        className="hover:bg-gray-200 hover:text-black p-2 text-gray-400 rounded-lg w-full flex item-center justify-center"
      />
      <ListButton
        startIconOverride={<ChevronDoubleRightIcon width={24} />}
        className="hover:bg-gray-200 hover:text-black p-2 text-gray-400 rounded-lg w-full flex item-center justify-center"
      />
    </div>
  );

  const openNavListItems = (
    <div className="flex flex-col items-start p-4 space-y-4">
      <ListButton
        label="Messages"
        startIconOverride={<ChatAlt2Icon width={24} className="mr-4" />}
        className="py-3 px-4 bg-gray-200 rounded-lg font-bold w-full flex"
      />
      <ListButton
        label="Gallery"
        startIconOverride={<SparklesIcon width={24} className="mr-4" />}
        className="hover:bg-gray-200 hover:text-black py-3 px-4 text-gray-400 rounded-lg w-full flex"
      />
      <ListButton
        label="Settings"
        startIconOverride={<CogIcon width={24} className="mr-4" />}
        className="hover:bg-gray-200 hover:text-black py-3 px-4 text-gray-400 rounded-lg w-full flex"
      />
      <ListButton
        label="Collapse"
        startIconOverride={
          <ChevronDoubleRightIcon width={24} className="mr-4" />
        }
        className="hover:bg-gray-200 hover:text-black py-3 px-4 text-gray-400 rounded-lg w-full flex"
      />
    </div>
  );

  return (
    <div
      className={classNames(
        "flex flex-col justify-between items-center h-screen bg-gray-50 p-4",
        isOpen ? "w-[20vw]" : "w-[5vw]",
      )}>
      {isOpen ? openNavListItems : closedNavListItems}
      <div className="pb-4">{icon}</div>
    </div>
  );
};

export default SideNav;
