import type { Meta, StoryObj } from "@storybook/react-vite";

import { Menu } from "./index";

const meta = {
  title: "Components/Menu",
  component: Menu as React.FC,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;
const menuItems = [
  {
    label: "菜单一",
    key: "menu-1",
    icon: <Icon name="apple" />,
    children: [
      {
        label: "子菜单一",
        key: "sub-menu-1",
        children: [
          {
            label: "子子菜单一",
            key: "sub-sub-menu-1",
          },
          {
            label: "子子菜单二",
            key: "sub-sub-menu-2",
          },
        ],
      },
      {
        label: "子菜单二",
        key: "sub-menu-2",
      },
    ],
  },
  {
    label: "菜单二",
    key: "menu-2",
    icon: <Icon name="android" />,
    children: [],
  },
  {
    label: "菜单三",
    key: "menu-3",
    icon: <Icon name="hormany" />,
    children: [],
  },
];
export const Default: Story = {
  args: {
    style: { width: 280 },
    items: menuItems,
    selectedKeys: ["sub-sub-menu-1"],
    mode: "vertical",
  },
};
