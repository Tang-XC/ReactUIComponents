import type { Meta, StoryObj } from "@storybook/react-vite";
import { message } from "./index";
import { Button } from "../Button";

const Meta = {
  title: "Components/Message",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default Meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
    onClick: () => message.danger({ content: "This is a success message" }),
  },
};
