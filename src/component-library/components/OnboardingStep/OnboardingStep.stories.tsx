import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { OnboardingStep } from "./OnboardingStep";

export default {
  title: "OnboardingStep",
  component: OnboardingStep,
  argTypes: {},
} as ComponentMeta<typeof OnboardingStep>;

const Template: ComponentStory<typeof OnboardingStep> = (args) => (
  <OnboardingStep {...args} />
);

export const OnboardingStepOne = Template.bind({});
OnboardingStepOne.args = {
  step: 1,
};

export const OnboardingStepOneLoading = Template.bind({});
OnboardingStepOneLoading.args = {
  step: 1,
  isLoading: true,
};

export const OnboardingStepTwo = Template.bind({});
OnboardingStepTwo.args = {
  step: 2,
};

export const OnboardingStepTwoLoading = Template.bind({});
OnboardingStepTwoLoading.args = {
  step: 2,
  isLoading: true,
};

export const OnboardingStepThree = Template.bind({});
OnboardingStepThree.args = {
  step: 3,
};

export const OnboardingStepThreeLoading = Template.bind({});
OnboardingStepThreeLoading.args = {
  step: 3,
  isLoading: true,
};
