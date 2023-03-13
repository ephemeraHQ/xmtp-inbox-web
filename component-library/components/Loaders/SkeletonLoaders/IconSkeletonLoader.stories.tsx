import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconSkeletonLoader } from "./IconSkeletonLoader";

export default {
  title: "Loaders/SkeletonLoaders/Icon",
  component: IconSkeletonLoader,
  argTypes: {},
} as ComponentMeta<typeof IconSkeletonLoader>;

const Template: ComponentStory<typeof IconSkeletonLoader> = (args) => (
  <IconSkeletonLoader />
);

export const IconSkeletonLoaderDefault = Template.bind({});
IconSkeletonLoaderDefault.args = {};
