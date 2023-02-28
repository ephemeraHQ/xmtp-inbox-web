import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "./Image";
import { PillButton } from "../PillButton/PillButton";

export default {
  title: "Image",
  component: Image,
  argTypes: {
    src: { control: "text", defaultValue: "https://picsum.photos/2000/1000" },
    header: { control: "text", defaultValue: "" },
    subtext: { control: "text", defaultValue: "" },
    eyebrowText: { control: "text", defaultValue: "" },
    cta: { control: false },
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => (
  <Image
    {...args}
    alt="Placeholder alt text"
    src={"https://picsum.photos/2000/1000"}
  />
);

export const DefaultImage = Template.bind({});
DefaultImage.args = {};

export const ImageWithText = Template.bind({});
ImageWithText.args = {
  header: "Sales3",
  subtext: "Stay connected to your sales leads confidently and securely",
  eyebrowText: "Featured App",
  cta: <PillButton label="Visit site" />,
};
