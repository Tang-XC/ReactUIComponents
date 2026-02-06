import type { Meta, StoryObj } from "@storybook/react-vite";

import { Popover } from "./index";
import { Button } from "../Button/index";

const meta = {
  title: "Components/Popover",
  component: Popover as React.FC,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: <p>Hello world</p>,
    children: <Button>Popover</Button>,
  },
};
