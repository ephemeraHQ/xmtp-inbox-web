import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";
import { PlusCircleIcon } from "@heroicons/react/outline";

export default {
  title: "Button/IconButton",
  component: Button,
  argTypes: {
    variant: { control: false },
    background: { control: false },
    icon: { control: false },
    label: { control: false },
  },
} as ComponentMeta<typeof Button>;

const IconTemplate: ComponentStory<typeof Button> = (args) => (
  <Button variant="icon" {...args} />
);

export const Circle = IconTemplate.bind({});
Circle.args = {};

export const Message = IconTemplate.bind({});
Message.args = {
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
  size: "small",
};

export const MessageSmall = IconTemplate.bind({});
MessageSmall.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  primary: false,
  size: "small",
};

export const CircleSmallLoading = IconTemplate.bind({});
CircleSmallLoading.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  size: "small",
  isLoading: true,
};

export const MessageSmallLoading = IconTemplate.bind({});
MessageSmallLoading.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  primary: false,
  size: "small",
  isLoading: true,
};

export const CircleSmallDisabled = IconTemplate.bind({});
CircleSmallDisabled.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  size: "small",
  isDisabled: true,
};

export const MessageSmallDisabled = IconTemplate.bind({});
MessageSmallDisabled.args = {
  label: <PlusCircleIcon width={20} color="white" />,
  primary: false,
  size: "small",
  isDisabled: true,
};
