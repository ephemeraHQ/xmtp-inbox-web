import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { Spinner } from "./Spinner";

export default {
  title: "Loaders/Spinner",
  component: Spinner,
  argTypes: {},
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = () => <Spinner />;

export const SpinnerDefault = Template.bind({});
