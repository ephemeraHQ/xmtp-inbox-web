import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ConversationList } from "./ConversationList";
import { Avatar } from "../Avatar/Avatar";
import { MessagePreviewCard } from "../MessagePreviewCard/MessagePreviewCard";

export default {
  title: "ConversationList",
  component: ConversationList,
  argTypes: {
    messages: { control: false },
    isLoading: { control: false },
  },
} as ComponentMeta<typeof ConversationList>;

const Template: ComponentStory<typeof ConversationList> = (args) => (
  <ConversationList {...args} />
);

export const ConversationListDefault = Template.bind({});
ConversationListDefault.args = {
  messages: Array(20).fill(<MessagePreviewCard />),
};

export const ConversationListWithMessagesLoading = Template.bind({});
ConversationListWithMessagesLoading.args = {
  messages: Array(20).fill(<MessagePreviewCard isLoading />),
};

export const ConversationListWithEmptyMessages = Template.bind({});
ConversationListWithEmptyMessages.args = {
  messages: [],
};

export const ConversationListLoading = Template.bind({});
ConversationListLoading.args = {
  messages: [],
  isLoading: true,
};
