import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";

export default {
  title: "Button/TextButton",
  component: Button,
  argTypes: {
    label: { control: "text", defaultValue: "Connect your wallet" },
    icon: { control: false },
    category: { control: false },
  },
} as ComponentMeta<typeof Button>;

const TextTemplate: ComponentStory<typeof Button> = (args) => (
  <Button category="text" {...args} />
);

export const PrimaryPill = TextTemplate.bind({});
PrimaryPill.args = {};

export const NegativePill = TextTemplate.bind({});
NegativePill.args = {
  primary: false,
};

export const PrimaryPillLoading = TextTemplate.bind({});
PrimaryPillLoading.args = {
  isLoading: true,
};

export const NegativePillLoading = TextTemplate.bind({});
NegativePillLoading.args = {
  primary: false,
  isLoading: true,
};

export const PrimaryPillDisabled = TextTemplate.bind({});
PrimaryPillDisabled.args = {
  isDisabled: true,
};

export const NegativePillDisabled = TextTemplate.bind({});
NegativePillDisabled.args = {
  primary: false,
  isDisabled: true,
};

export const PrimaryPillSmall = TextTemplate.bind({});
PrimaryPillSmall.args = {
  buttonSize: "small",
  icon: <ArrowCircleRightIcon width={20} />,
};

export const NegativePillSmall = TextTemplate.bind({});
NegativePillSmall.args = {
  primary: false,
  buttonSize: "small",
  icon: <ArrowCircleRightIcon width={20} />,
};

export const PrimaryGhost = TextTemplate.bind({});
PrimaryGhost.args = {
  background: "ghost",
};

export const NegativeGhost = TextTemplate.bind({});
NegativeGhost.args = {
  primary: false,
  background: "ghost",
};

export const PrimaryGhostLoading = TextTemplate.bind({});
PrimaryGhostLoading.args = {
  isLoading: true,
  background: "ghost",
};

export const NegativeGhostLoading = TextTemplate.bind({});
NegativeGhostLoading.args = {
  primary: false,
  isLoading: true,
  background: "ghost",
};

export const PrimaryGhostDisabled = TextTemplate.bind({});
PrimaryGhostDisabled.args = {
  isDisabled: true,
  background: "ghost",
};

export const NegativeGhostDisabled = TextTemplate.bind({});
NegativeGhostDisabled.args = {
  primary: false,
  isDisabled: true,
  background: "ghost",
};

export const PrimaryGhostSmall = TextTemplate.bind({});
PrimaryGhostSmall.args = {
  buttonSize: "small",
  background: "ghost",
  icon: <ArrowCircleRightIcon width={20} />,
};

export const NegativeGhostSmall = TextTemplate.bind({});
NegativeGhostSmall.args = {
  primary: false,
  buttonSize: "small",
  background: "ghost",
  icon: <ArrowCircleRightIcon width={20} />,
};
