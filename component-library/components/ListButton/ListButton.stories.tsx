import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListButton } from "./ListButton";
import { ChatAlt2Icon } from "@heroicons/react/solid";

export default {
  title: "ListButton",
  component: ListButton,
  argTypes: {
    label: { control: "text", defaultValue: "Messages" },
    icon: { control: false },
    variant: { control: false },
  },
} as ComponentMeta<typeof ListButton>;

const TextTemplate: ComponentStory<typeof ListButton> = (args) => (
  <ListButton {...args} />
);

export const ListButtonDefault = TextTemplate.bind({});
ListButtonDefault.args = {};

export const ListButtonGray = TextTemplate.bind({});
ListButtonGray.args = {
  startIconOverride: <ChatAlt2Icon width={24} className="mr-4" />,
  className: "py-2 px-4 text-gray-300 rounded-lg",
};

export const ListButtonWithIcon = TextTemplate.bind({});
ListButtonWithIcon.args = {
  startIconOverride: <ChatAlt2Icon width={24} className="mr-4" />,
  className: "py-2 px-4 bg-gray-100 rounded-lg font-bold",
};
