import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./index";
import { Button } from "../Button";

const Meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Modal>;

export default Meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    children: <h1>Hello world</h1>,
  },
};
