import type { Meta, StoryObj } from "@storybook/react-vite";

import { DatePicker } from "./index";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select a date",
    defaultValue: new Date(),
  },
};
