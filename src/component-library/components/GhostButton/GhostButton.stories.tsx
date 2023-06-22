import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { GhostButton } from "./GhostButton";

export default {
  title: "GhostButton",
  component: GhostButton,
  argTypes: {
    label: { control: "text", defaultValue: "Disconnect wallet" },
    icon: { control: false },
    variant: { control: false },
  },
} as ComponentMeta<typeof GhostButton>;

const TextTemplate: ComponentStory<typeof GhostButton> = (args) => (
  <GhostButton {...args} />
);

export const PrimaryGhostButton = TextTemplate.bind({});
PrimaryGhostButton.args = {};

export const SecondaryGhostButton = TextTemplate.bind({});
SecondaryGhostButton.args = {
  variant: "secondary",
};

export const PrimaryGhostButtonLoading = TextTemplate.bind({});
PrimaryGhostButtonLoading.args = {
  isLoading: true,
};

export const SecondaryGhostButtonLoading = TextTemplate.bind({});
SecondaryGhostButtonLoading.args = {
  variant: "secondary",
  isLoading: true,
};

export const PrimaryGhostButtonDisabled = TextTemplate.bind({});
PrimaryGhostButtonDisabled.args = {
  isDisabled: true,
};

export const SecondaryGhostButtonDisabled = TextTemplate.bind({});
SecondaryGhostButtonDisabled.args = {
  variant: "secondary",
  isDisabled: true,
};

export const PrimaryGhostButtonSmall = TextTemplate.bind({});
PrimaryGhostButtonSmall.args = {
  size: "small",
};

export const NegativeGhostButtonSmall = TextTemplate.bind({});
NegativeGhostButtonSmall.args = {
  variant: "secondary",
  size: "small",
};

export const PrimaryGhostButtonSmallLoading = TextTemplate.bind({});
PrimaryGhostButtonSmallLoading.args = {
  size: "small",
  isLoading: true,
};

export const NegativeGhostButtonSmallLoading = TextTemplate.bind({});
NegativeGhostButtonSmallLoading.args = {
  variant: "secondary",
  size: "small",
  isLoading: true,
};
