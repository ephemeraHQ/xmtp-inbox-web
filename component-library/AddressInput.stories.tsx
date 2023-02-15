import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Input/AddressInput',
  component: Input,
  argTypes: {
    type: { control: false },
    isDisabled: { control: false }
  }
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} type="address" />;

export const AddressInput = Template.bind({});
AddressInput.args = {
  subtext: 'Please enter a valid wallet address'
};

export const AddressInputLoading = Template.bind({});
AddressInputLoading.args = {
  subtext: 'Fetching ENS address...',
  isLoading: true
};

export const AddressInputError = Template.bind({});
AddressInputError.args = {
  subtext: 'Error fetching address',
  isError: true
};
