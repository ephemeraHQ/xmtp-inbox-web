import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SideNav from "./SideNav";
import { ListButton } from "../ListButton/ListButton";
import { ChatAlt2Icon, ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { CogIcon, SparklesIcon } from "@heroicons/react/outline";
import { Avatar } from "../Avatar/Avatar";
import { IconButton } from "../IconButton/IconButton";
import { XmtpIcon } from "../Icons/XmtpIcon";

export default {
  title: "SideNav",
  component: SideNav,
  argTypes: {
    isOpen: { control: "boolean" },
  },
} as ComponentMeta<typeof SideNav>;

const Template: ComponentStory<typeof SideNav> = (args) => (
  <SideNav {...args} />
);

export const SideNavDefault = Template.bind({});
SideNavDefault.args = {
  isOpen: false,
};

export const SideNavOpen = Template.bind({});
SideNavOpen.args = {
  isOpen: true,
};

export const SideNavCloseWithChildren = Template.bind({});
SideNavCloseWithChildren.args = {
  isOpen: false,
  children: (
    <div className="flex flex-col items-center px-2 py-4 space-y-4">
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
  ),
};

export const SideNavOpenWithChildren = Template.bind({});
SideNavOpenWithChildren.args = {
  isOpen: true,
  children: (
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
  ),
};

export const SideNavCloseFullDesign = Template.bind({});
SideNavCloseFullDesign.args = {
  isOpen: false,
  children: (
    <div className="flex flex-col items-center px-2 py-4 h-full justify-between">
      <div>
        <Avatar />
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
      </div>
      <div className="mb-4">
        <XmtpIcon />
      </div>
    </div>
  ),
};

export const SideNavOpenFullDesign = Template.bind({});
SideNavOpenFullDesign.args = {
  isOpen: true,
  children: (
    <div className="flex flex-col p-4 h-full justify-between">
      <div>
        <Avatar />
        <div className="mt-10 flex flex-col items-start space-y-4">
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
      </div>
      <div className="mb-4">
        <XmtpIcon />
      </div>
    </div>
  ),
};
