import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextWithIcon } from "./TextWithIcon";

export default {
  title: "TextWithIcon/Primary",
  component: TextWithIcon,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: "text", defaultValue: "Placeholder header" },
    subtext: { control: false },
    leftIcon: {
      options: [
        "SUPPORT",
        "PRIVACY",
        "DATA",
        "DISCONNECT",
        "COLLECTIBLES",
        "NOTIFICATIONS",
      ],
      control: { type: "radio" },
      defaultValue: "SUPPORT",
    },
  },
} as ComponentMeta<typeof TextWithIcon>;

const Template: ComponentStory<typeof TextWithIcon> = (args) => (
  <TextWithIcon {...args} variant="primary" />
);

export const PrimaryTextWithIcon = Template.bind({});
PrimaryTextWithIcon.args = {
  header: "Support",
  leftIcon: "SUPPORT",
};

export const PrimaryTextWithIconAndTooltip = Template.bind({});
PrimaryTextWithIconAndTooltip.args = {
  header: "Support",
  leftIcon: "SUPPORT",
  rightIcon: true,
};

export const PrimaryTextWithIconLoading = Template.bind({});
PrimaryTextWithIconLoading.args = {
  isLoading: true,
};

export const PrimaryTextWithIconAndTooltipLoading = Template.bind({});
PrimaryTextWithIconAndTooltipLoading.args = {
  rightIcon: true,
  isLoading: true,
};
