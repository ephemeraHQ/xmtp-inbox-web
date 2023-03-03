import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FullMessage } from "./FullMessage";
import { shortAddress } from "../../../helpers";

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
  text: "Heyyyyyy there",
  from: {
    displayAddress: "hi.xmtp.eth",
    isSelf: true,
  },
  datetime: new Date(),
};

export const FullIncomingMessage = Template.bind({});
FullIncomingMessage.args = {
  text: "Heyyyyyy there",
  from: {
    displayAddress: shortAddress("0x0123456789012345678901234567890123456789"),
    isSelf: false,
  },
  datetime: new Date(),
};
