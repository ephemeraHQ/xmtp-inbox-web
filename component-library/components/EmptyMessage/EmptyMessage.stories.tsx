import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { EmptyMessage } from "./EmptyMessage";

export default {
  title: "EmptyMessage",
  component: EmptyMessage,
} as ComponentMeta<typeof EmptyMessage>;

const Template: ComponentStory<typeof EmptyMessage> = () => <EmptyMessage />;

export const EmptyMessageDefault = Template.bind({});
EmptyMessageDefault.args = {};
