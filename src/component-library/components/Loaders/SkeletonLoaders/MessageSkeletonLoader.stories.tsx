import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MessageSkeletonLoader } from "./MessageSkeletonLoader";

export default {
  title: "Loaders/SkeletonLoaders/Message",
  component: MessageSkeletonLoader,
  argTypes: {},
} as ComponentMeta<typeof MessageSkeletonLoader>;

const Template: ComponentStory<typeof MessageSkeletonLoader> = (args) => (
  <MessageSkeletonLoader {...args} />
);

export const MessageSkeletonLoaderIncoming = Template.bind({});
MessageSkeletonLoaderIncoming.args = {};

export const MessageSkeletonLoaderOutgoing = Template.bind({});
MessageSkeletonLoaderOutgoing.args = {
  incoming: false,
};
