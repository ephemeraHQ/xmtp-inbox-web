import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PillButton } from "./PillButton";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export default {
  title: "PillButton",
  component: PillButton,
  argTypes: {
    label: { control: "text", defaultValue: t("onboarding.intro_button") },
    icon: { control: false },
    variant: { control: false },
  },
} as ComponentMeta<typeof PillButton>;

const TextTemplate: ComponentStory<typeof PillButton> = (args) => (
  <PillButton {...args} />
);

export const PrimaryPill = TextTemplate.bind({});
PrimaryPill.args = {};

export const NegativePill = TextTemplate.bind({});
NegativePill.args = {
  variant: "secondary",
};

export const PrimaryPillLoading = TextTemplate.bind({});
PrimaryPillLoading.args = {
  isLoading: true,
};

export const NegativePillLoading = TextTemplate.bind({});
NegativePillLoading.args = {
  variant: "secondary",
  isLoading: true,
};

export const PrimaryPillDisabled = TextTemplate.bind({});
PrimaryPillDisabled.args = {
  isDisabled: true,
};

export const NegativePillDisabled = TextTemplate.bind({});
NegativePillDisabled.args = {
  variant: "secondary",
  isDisabled: true,
};

export const PrimaryPillSmall = TextTemplate.bind({});
PrimaryPillSmall.args = {
  size: "small",
};

export const NegativePillSmall = TextTemplate.bind({});
NegativePillSmall.args = {
  variant: "secondary",
  size: "small",
};

export const PrimaryPillSmallLoading = TextTemplate.bind({});
PrimaryPillSmallLoading.args = {
  size: "small",
  isLoading: true,
};

export const NegativePillSmallLoading = TextTemplate.bind({});
NegativePillSmallLoading.args = {
  variant: "secondary",
  size: "small",
  isLoading: true,
};
