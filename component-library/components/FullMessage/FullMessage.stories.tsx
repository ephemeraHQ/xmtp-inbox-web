import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FullMessage } from "./FullMessage";
import { shortAddress } from "../../../helpers";
import MessageContentWrapper from "../../../wrappers/MessageContentWrapper";
import { RemoteAttachment } from "../../../attachments";

export default {
  title: "FullMessage",
  component: FullMessage,
  argTypes: {
    text: { control: "text", defaultValue: "Hello!" },
    from: { control: false },
    datetime: { control: false },
  },
} as ComponentMeta<typeof FullMessage>;

const Template: ComponentStory<typeof FullMessage> = (args) => (
  <FullMessage {...args} />
);

export const FullOutgoingMessage = Template.bind({});
FullOutgoingMessage.args = {
  text: (
    <MessageContentWrapper
      content={"Hello there"}
      isSelf={true}
      isLoading={false}
      isError={false}
    />
  ),
  from: {
    displayAddress: "hi.xmtp.eth",
    isSelf: true,
  },
  datetime: new Date(),
};

export const FullIncomingMessage = Template.bind({});
FullIncomingMessage.args = {
  text: (
    <MessageContentWrapper
      content={"Hello there"}
      isSelf={false}
      isLoading={false}
      isError={false}
    />
  ),
  from: {
    displayAddress: shortAddress("0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0"),
    isSelf: false,
  },
  datetime: new Date(),
};

const remoteAttachment: RemoteAttachment = {
  url: "url",
  contentDigest: "",
  salt: new Uint8Array(),
  nonce: new Uint8Array(),
  secret: new Uint8Array(),
  scheme: "",
  contentLength: 1,
  filename: "filename",
};

export const FullOutgoingMessageAttachmentLoading = Template.bind({});
FullOutgoingMessageAttachmentLoading.args = {
  text: (
    <MessageContentWrapper
      content={remoteAttachment}
      isSelf={true}
      isLoading={true}
      isError={false}
    />
  ),
  from: {
    displayAddress: "hi.xmtp.eth",
    isSelf: true,
  },
  datetime: new Date(),
};

export const FullIncomingMessageAttachment = Template.bind({});
FullIncomingMessageAttachment.args = {
  text: (
    <MessageContentWrapper
      content={remoteAttachment}
      isSelf={false}
      isLoading={false}
      isError={false}
    />
  ),
  from: {
    displayAddress: "another.xmtp.eth",
    isSelf: false,
  },
  datetime: new Date(),
};

export const FullIncomingAttachmentError = Template.bind({});
FullIncomingAttachmentError.args = {
  text: (
    <MessageContentWrapper
      content={remoteAttachment}
      isSelf={false}
      isLoading={false}
      isError={true}
    />
  ),
  from: {
    displayAddress: "another.xmtp.eth",
    isSelf: false,
  },
  datetime: new Date(),
};
