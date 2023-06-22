import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { IconSkeletonLoader } from "./IconSkeletonLoader";

export default {
  title: "Loaders/SkeletonLoaders/Icon",
  component: IconSkeletonLoader,
  argTypes: {},
} as ComponentMeta<typeof IconSkeletonLoader>;

const Template: ComponentStory<typeof IconSkeletonLoader> = () => (
  <IconSkeletonLoader />
);

export const IconSkeletonLoaderDefault = Template.bind({});
IconSkeletonLoaderDefault.args = {};
