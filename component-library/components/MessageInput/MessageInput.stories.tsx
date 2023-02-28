import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { MessageInput } from "./MessageInput";

export default {
  title: "MessageInput",
  component: MessageInput,
  argTypes: {
    variant: { control: false },
    subtext: { control: false },
    avatarUrlProps: { control: false },
    isError: { control: false },
    isLoading: { control: false },
  },
} as ComponentMeta<typeof MessageInput>;

const Template: ComponentStory<typeof MessageInput> = (args) => (
  <MessageInput {...args} />
);

export const MessageInputDefault = Template.bind({});
MessageInputDefault.args = {};

export const MessageInputDisabled = Template.bind({});
MessageInputDisabled.args = {
  isDisabled: true,
};
