import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./index";

const Meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default Meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: "Checkbox",
  },
};
