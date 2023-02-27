import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";

export default {
  title: "Button/TextButton",
  component: Button,
  argTypes: {
    label: { control: "text", defaultValue: "Connect your wallet" },
    icon: { control: false },
    variant: { control: false },
  },
} as ComponentMeta<typeof Button>;

const TextTemplate: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const PrimaryPill = TextTemplate.bind({});
PrimaryPill.args = {
  variant: "pill",
};

export const NegativePill = TextTemplate.bind({});
NegativePill.args = {
  variant: "pill",
  primary: false,
};

export const PrimaryPillLoading = TextTemplate.bind({});
PrimaryPillLoading.args = {
  variant: "pill",
  isLoading: true,
};

export const NegativePillLoading = TextTemplate.bind({});
NegativePillLoading.args = {
  variant: "pill",
  primary: false,
  isLoading: true,
};

export const PrimaryPillDisabled = TextTemplate.bind({});
PrimaryPillDisabled.args = {
  variant: "pill",
  isDisabled: true,
};

export const NegativePillDisabled = TextTemplate.bind({});
NegativePillDisabled.args = {
  variant: "pill",
  primary: false,
  isDisabled: true,
};

export const PrimaryPillSmall = TextTemplate.bind({});
PrimaryPillSmall.args = {
  variant: "pill",
  size: "small",
};

export const NegativePillSmall = TextTemplate.bind({});
NegativePillSmall.args = {
  primary: false,
  size: "small",
};

export const PrimaryPillSmallLoading = TextTemplate.bind({});
PrimaryPillSmallLoading.args = {
  variant: "pill",
  size: "small",
  isLoading: true,
};

export const NegativePillSmallLoading = TextTemplate.bind({});
NegativePillSmallLoading.args = {
  primary: false,
  size: "small",
  isLoading: true,
};

export const PrimaryGhost = TextTemplate.bind({});
PrimaryGhost.args = {
  variant: "ghost",
};

export const NegativeGhost = TextTemplate.bind({});
NegativeGhost.args = {
  variant: "ghost",
  primary: false,
};

export const PrimaryGhostLoading = TextTemplate.bind({});
PrimaryGhostLoading.args = {
  variant: "ghost",
  isLoading: true,
};

export const NegativeGhostLoading = TextTemplate.bind({});
NegativeGhostLoading.args = {
  variant: "ghost",
  primary: false,
  isLoading: true,
};

export const PrimaryGhostDisabled = TextTemplate.bind({});
PrimaryGhostDisabled.args = {
  variant: "ghost",
  isDisabled: true,
};

export const NegativeGhostDisabled = TextTemplate.bind({});
NegativeGhostDisabled.args = {
  variant: "ghost",
  primary: false,
  isDisabled: true,
};

export const PrimaryGhostSmall = TextTemplate.bind({});
PrimaryGhostSmall.args = {
  variant: "ghost",
  size: "small",
};

export const NegativeGhostSmall = TextTemplate.bind({});
NegativeGhostSmall.args = {
  variant: "ghost",
  primary: false,
  size: "small",
};

export const PrimaryGhostSmallLoading = TextTemplate.bind({});
PrimaryGhostSmallLoading.args = {
  variant: "ghost",
  size: "small",
  isLoading: true,
};

export const NegativeGhostSmallLoading = TextTemplate.bind({});
NegativeGhostSmallLoading.args = {
  variant: "ghost",
  primary: false,
  size: "small",
  isLoading: true,
};
