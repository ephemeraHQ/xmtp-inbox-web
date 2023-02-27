import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Image } from "./Image";
import { Button } from "../Buttons/Button";

export default {
  title: "Image/Images",
  component: Image,
  argTypes: {
    url: { control: "text", defaultValue: "https://picsum.photos/2000/1000" },
    header: { control: "text", defaultValue: "" },
    subtext: { control: "text", defaultValue: "" },
    eyebrowText: { control: "text", defaultValue: "" },
    cta: { control: false },
  },
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => (
  <Image
    {...args}
    altText="Placeholder alt text"
    url={"https://picsum.photos/2000/1000"}
  />
);

export const DefaultImage = Template.bind({});
DefaultImage.args = {};

export const ImageWithText = Template.bind({});
ImageWithText.args = {
  header: "Sales3",
  subtext: "Stay connected to your sales leads confidently and securely",
  eyebrowText: "Featured App",
  cta: <Button label="Visit site" />,
};
