import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SettingsCard } from "../SettingsCard/SettingsCard";

export default {
  title: "SettingsCard",
  component: SettingsCard,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: "text", defaultValue: "Placeholder header" },
    subtext: { control: false },
    onToggle: { control: false },
    leftIcon: {
      options: [
        "SUPPORT",
        "PRIVACY",
        "DATA",
        "DISCONNECT",
        "COLLECTIBLES",
        "NOTIFICATIONS",
        "CREATE_WALLET",
        "CONNECT_WALLET",
      ],
      control: { type: "radio" },
      defaultValue: "SUPPORT",
    },
  },
} as ComponentMeta<typeof SettingsCard>;

const Template: ComponentStory<typeof SettingsCard> = (args) => (
  <SettingsCard {...args} />
);

export const SettingsCardPrimary = Template.bind({});
SettingsCardPrimary.args = {
  header: "Support",
  leftIcon: "SUPPORT",
  onToggle: undefined,
};

export const SettingsCardPrimaryWithTooltip = Template.bind({});
SettingsCardPrimaryWithTooltip.args = {
  header: "Support",
  leftIcon: "SUPPORT",
  onToggle: () => {},
};

export const SettingsCardPrimaryLoading = Template.bind({});
SettingsCardPrimaryLoading.args = {
  isLoading: true,
  onToggle: undefined,
};

export const SettingsCardPrimaryWithTooltipLoading = Template.bind({});
SettingsCardPrimaryWithTooltipLoading.args = {
  onToggle: () => {},
  isLoading: true,
};

export const SettingsCardSecondary = Template.bind({});
SettingsCardPrimary.args = {
  variant: "secondary",
  header: "Create wallet",
  leftIcon: "CREATE_WALLET",
};

export const SettingsCardSecondaryWithTooltip = Template.bind({});
SettingsCardSecondaryWithTooltip.args = {
  variant: "secondary",
  header: "Create wallet",
  leftIcon: "CREATE_WALLET",
  onToggle: () => {},
};

export const SettingsCardSecondaryLoading = Template.bind({});
SettingsCardSecondaryLoading.args = {
  variant: "secondary",
  isLoading: true,
  onToggle: undefined,
};

export const SettingsCardSecondaryWithTooltipLoading = Template.bind({});
SettingsCardSecondaryWithTooltipLoading.args = {
  variant: "secondary",
  onToggle: () => {},
  isLoading: true,
};
