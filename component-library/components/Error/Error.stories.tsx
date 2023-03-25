import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Error } from "./Error";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export default {
  title: "Error",
  component: Error,
  argTypes: {
    avatar: { control: false },
    addresses: { control: false },
    collectibles: { control: false },
  },
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const ErrorDefault = Template.bind({});
ErrorDefault.args = {
  errorText: t("status_messaging.error_1_subheader"),
  onConnect: () => {},
};
