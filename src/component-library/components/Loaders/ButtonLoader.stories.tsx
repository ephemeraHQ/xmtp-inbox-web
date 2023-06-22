import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonLoader } from "./ButtonLoader";

export default {
  title: "Loaders/ButtonLoader",
  component: ButtonLoader,
  argTypes: {},
} as ComponentMeta<typeof ButtonLoader>;

const Template: ComponentStory<typeof ButtonLoader> = (args) => (
  <ButtonLoader {...args} />
);

export const ButtonLoaderDefault = Template.bind({});
ButtonLoaderDefault.args = {
  size: "small",
};

export const ButtonLoaderLarge = Template.bind({});
ButtonLoaderLarge.args = {
  size: "large",
};
