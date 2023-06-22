import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Error } from "./Error";

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
  errorText:
    "A properly detailed error message describing the error goes here.",
  onConnect: () => {},
};
