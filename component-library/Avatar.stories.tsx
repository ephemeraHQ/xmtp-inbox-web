import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Avatar } from "./Avatar";

export default {
  title: "Avatar/Avatars",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} address={"0x123TestAddress"} />
);

export const AvatarWithCustomImage = Template.bind({});
AvatarWithCustomImage.args = {
  avatarUrl: "https://picsum.photos/200/300",
};

export const AvatarWithoutCustomImage = Template.bind({});
AvatarWithoutCustomImage.args = {};

export const AvatarLoading = Template.bind({});
AvatarLoading.args = {
  isLoading: true,
};
