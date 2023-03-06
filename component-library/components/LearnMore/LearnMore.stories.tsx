import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { LearnMore } from "./LearnMore";

export default {
  title: "LearnMore",
  component: LearnMore,
  argTypes: {},
} as ComponentMeta<typeof LearnMore>;

const Template: ComponentStory<typeof LearnMore> = () => <LearnMore />;

export const LearnMoreDefault = Template.bind({});
LearnMoreDefault.args = {};
