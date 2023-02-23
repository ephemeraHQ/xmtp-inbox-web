import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";

export default {
  title: "Input/MessageInput",
  component: Input,
  argTypes: {
    variant: { control: false },
    subtext: { control: false },
    avatarUrlProps: { control: false },
    isError: { control: false },
    isLoading: { control: false },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args} variant="message" />
);

export const MessageInput = Template.bind({});
MessageInput.args = {};

export const MessageInputDisabled = Template.bind({});
MessageInputDisabled.args = {
  isDisabled: true,
};
