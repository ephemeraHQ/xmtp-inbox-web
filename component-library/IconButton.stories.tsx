import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";
import { PlusCircleIcon } from "@heroicons/react/outline";

export default {
  title: "Button/IconButton",
  component: Button,
  argTypes: {
    category: { control: false },
    background: { control: false },
    icon: { control: false },
    label: { control: false },
  },
} as ComponentMeta<typeof Button>;

const IconTemplate: ComponentStory<typeof Button> = (args) => (
  <Button category="icon" {...args} />
);

export const Circle = IconTemplate.bind({});
Circle.args = {
  label: <PlusCircleIcon width="24" color="white" />,
};

export const Message = IconTemplate.bind({});
Message.args = {
  label: <PlusCircleIcon width={24} color="white" />,
  primary: false,
};

export const CircleLoading = IconTemplate.bind({});
CircleLoading.args = {
  isLoading: true,
};

export const MessageLoading = IconTemplate.bind({});
MessageLoading.args = {
  primary: false,
  isLoading: true,
};

export const CircleDisabled = IconTemplate.bind({});
CircleDisabled.args = {
  isDisabled: true,
};

export const MessageDisabled = IconTemplate.bind({});
MessageDisabled.args = {
  primary: false,
  isDisabled: true,
};

export const CircleSmall = IconTemplate.bind({});
CircleSmall.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  buttonSize: "small",
};

export const MessageSmall = IconTemplate.bind({});
MessageSmall.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  primary: false,
  buttonSize: "small",
};
