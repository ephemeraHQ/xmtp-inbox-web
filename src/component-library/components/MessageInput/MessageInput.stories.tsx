import type { ComponentStory, ComponentMeta } from "@storybook/react";

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

const Template: ComponentStory<typeof MessageInput> = () => (
  <MessageInput
    setAttachment={() => {}}
    setAttachmentPreview={() => {}}
    setIsDragActive={() => {}}
  />
);

export const MessageInputDefault = Template.bind({});
MessageInputDefault.args = {};

export const MessageInputDisabled = Template.bind({});
MessageInputDisabled.args = {
  isDisabled: true,
};
