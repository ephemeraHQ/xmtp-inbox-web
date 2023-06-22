import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessagePreviewCard } from "./MessagePreviewCard";

export default {
  title: "MessagePreviewCard",
  component: MessagePreviewCard,
  argTypes: {
    text: { control: "text" },
    displayAddress: { control: "text" },
    avatar: { control: false },
    datetime: { control: false },
  },
} as ComponentMeta<typeof MessagePreviewCard>;

const Template: ComponentStory<typeof MessagePreviewCard> = (args) => (
  <MessagePreviewCard {...args} />
);

export const MessagePreviewMessageDefault = Template.bind({});
MessagePreviewMessageDefault.args = {
  text: "Hello there",
  displayAddress: "hi.xmtp.eth",
  datetime: new Date(),
};

export const MessagePreviewMessageLoading = Template.bind({});
MessagePreviewMessageLoading.args = {
  isLoading: true,
};

export const MessagePreviewAttachment = Template.bind({});
MessagePreviewAttachment.args = {
  text: "Attachment",
  displayAddress: "hi.xmtp.eth",
  datetime: new Date(),
};
