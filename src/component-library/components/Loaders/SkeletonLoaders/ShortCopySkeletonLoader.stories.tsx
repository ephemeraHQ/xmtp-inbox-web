import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShortCopySkeletonLoader } from "./ShortCopySkeletonLoader";

export default {
  title: "Loaders/SkeletonLoaders/ShortCopy",
  component: ShortCopySkeletonLoader,
  argTypes: {},
} as ComponentMeta<typeof ShortCopySkeletonLoader>;

const Template: ComponentStory<typeof ShortCopySkeletonLoader> = (args) => (
  <ShortCopySkeletonLoader {...args} />
);

export const ShortCopySkeletonLoaderOneLiner = Template.bind({});
ShortCopySkeletonLoaderOneLiner.args = {};

export const ShortCopySkeletonLoaderTwoLiner = Template.bind({});
ShortCopySkeletonLoaderTwoLiner.args = {
  lines: 2,
};
