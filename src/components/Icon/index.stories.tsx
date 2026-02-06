import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./index";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "apple",
    size: 128,
  },
};
