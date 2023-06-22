import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { InfoCard } from "./InfoCard";
import { InfoCardIcon } from "./iconMapping";

export default {
  title: "InfoCard",
  component: InfoCard,
  argTypes: {
    variant: { control: false },
    avatar: { control: false },
    header: { control: "text", defaultValue: "Placeholder header" },
    subtext: { control: "text", defaultValue: "Placeholder subtext" },
    onClick: { control: false },
    leftIcon: {
      options: [
        InfoCardIcon.NEW_MESSAGE,
        InfoCardIcon.DOCUMENTATION,
        InfoCardIcon.GALLERY,
      ],
      control: { type: "radio" },
      defaultValue: InfoCardIcon.NEW_MESSAGE,
    },
  },
} as ComponentMeta<typeof InfoCard>;

const Template: ComponentStory<typeof InfoCard> = (args) => (
  <InfoCard {...args} />
);

export const InfoCardNoArrow = Template.bind({});
InfoCardNoArrow.args = {
  leftIcon: InfoCardIcon.NEW_MESSAGE,
  header: "Send a new message",
  subtext:
    "Find an existing contact or message someone using their wallet address, ENS, or UNS address",
  onClick: undefined,
};

export const InfoCardWithArrow = Template.bind({});
InfoCardWithArrow.args = {
  leftIcon: InfoCardIcon.NEW_MESSAGE,
  header: "Send a new message",
  subtext:
    "Find an existing contact or message someone using their wallet address, ENS, or UNS address",
  onClick: () => {},
};

export const InfoCardNoArrowLoading = Template.bind({});
InfoCardNoArrowLoading.args = {
  isLoading: true,
  onClick: undefined,
};

export const InfoCardWithArrowLoading = Template.bind({});
InfoCardWithArrowLoading.args = {
  isLoading: true,
  onClick: () => {},
};
