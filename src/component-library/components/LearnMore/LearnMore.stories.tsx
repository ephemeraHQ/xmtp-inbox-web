import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { LearnMore } from "./LearnMore";
import { Tag } from "../Tags/Tag";
import { TagIcon } from "../Tags/iconMapping";

export default {
  title: "LearnMore",
  component: LearnMore,
  argTypes: {
    highlightedCompanies: { control: false },
  },
} as ComponentMeta<typeof LearnMore>;

const Template: ComponentStory<typeof LearnMore> = (args) => (
  <LearnMore {...args} />
);

export const LearnMoreDefault = Template.bind({});
LearnMoreDefault.args = {
  version: "7",
};

export const LearnMoreWithCompanies = Template.bind({});
LearnMoreWithCompanies.args = {
  highlightedCompanies: [
    {
      name: "Placeholder company1",
      description: "Really interesting company description",
      tags: (
        <>
          <Tag text="Shopping" icon={TagIcon.SHOPPING} />
          <Tag text="Transactions" icon={TagIcon.TRANSACTIONS} />
        </>
      ),
    },
    {
      name: "Placeholder company2",
      description: "Really interesting company description",
      tags: (
        <>
          <Tag text="Messaging" icon={TagIcon.MESSAGING} />
          <Tag text="Audio" icon={TagIcon.AUDIO} />
        </>
      ),
    },
  ],
  version: "7",
};
