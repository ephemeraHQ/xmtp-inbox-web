import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { HeaderDropdown } from "./HeaderDropdown";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export default {
  title: "HeaderDropdown",
  component: HeaderDropdown,
  argTypes: {
    onChange: { control: false },
    dropdownOptions: { control: false },
    defaultSelected: { control: false },
    onClick: { control: false },
  },
} as ComponentMeta<typeof HeaderDropdown>;

const Template: ComponentStory<typeof HeaderDropdown> = (args) => (
  <HeaderDropdown {...args} />
);

export const HeaderDropdownOpenDefault = Template.bind({});
HeaderDropdownOpenDefault.args = {
  onChange: () => {},
};

export const HeaderDropdownDifferentOption = Template.bind({});
HeaderDropdownDifferentOption.args = {
  defaultSelected: t("messages.filter_requests"),
  onChange: () => {},
};
