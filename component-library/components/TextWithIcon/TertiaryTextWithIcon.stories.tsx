import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextWithIcon } from "./TextWithIcon";

export default {
  title: "TextWithIcon/Tertiary",
  component: TextWithIcon,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: "text", defaultValue: "Placeholder header" },
    subtext: { control: "text", defaultValue: "Placeholder subtext" },
    leftIcon: {
      options: ["NEW_MESSAGE", "GALLERY", "DOCUMENTATION"],
      control: { type: "radio" },
      defaultValue: "NEW_MESSAGE",
    },
  },
} as ComponentMeta<typeof TextWithIcon>;

const Template: ComponentStory<typeof TextWithIcon> = (args) => (
  <TextWithIcon {...args} variant="tertiary" />
);

export const TertiaryTextWithIcon = Template.bind({});
TertiaryTextWithIcon.args = {
  leftIcon: "NEW_MESSAGE",
  header: "Send a new message",
  subtext:
    "Find an existing contact or message someone using their wallet address or ENS address",
};

export const TertiaryTextWithIconAndArrow = Template.bind({});
TertiaryTextWithIconAndArrow.args = {
  leftIcon: "NEW_MESSAGE",
  rightIcon: true,
  header: "Send a new message",
  subtext:
    "Find an existing contact or message someone using their wallet address or ENS address",
};

export const TertiaryTextWithIconLoading = Template.bind({});
TertiaryTextWithIconLoading.args = {
  isLoading: true,
};

export const TertiaryTextWithIconAndArrowLoading = Template.bind({});
TertiaryTextWithIconAndArrowLoading.args = {
  rightIcon: true,
  isLoading: true,
};
