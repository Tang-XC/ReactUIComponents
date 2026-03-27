import type { Meta, StoryObj } from "@storybook/react-vite";

import { Cascader } from "./index";

const meta = {
  title: "Components/Cascader",
  component: Cascader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Cascader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      {
        label: "北京",
        value: "beijing",
        children: [
          {
            label: "朝阳区",
            value: "chaoyang",
            children: [
              {
                label: "望京",
                value: "wangjing",
              },
              {
                label: "酒仙桥",
                value: "jiuxianqiao",
              },
              {
                label: "798艺术区",
                value: "798",
              },
              {
                label: "大山子",
                value: "dashanzi",
              },
            ],
          },
          {
            label: "海淀区",
            value: "haidian",
            children: [
              {
                label: "五道口",
                value: "wudaokou",
              },
              {
                label: "中关村",
                value: "zhongguancun",
              },
              {
                label: "西二旗",
                value: "xierqi",
              },
              {
                label: "上地",
                value: "shangdi",
              },
            ],
          },
          {
            label: "东城区",
            value: "dongcheng",
            children: [
              {
                label: "王府井",
                value: "wangfujing",
              },
              {
                label: "东直门",
                value: "dongzhimen",
              },
              {
                label: "东单",
                value: "dongdan",
              },
              {
                label: "南锣鼓巷",
                value: "nanluoguxiang",
              },
            ],
          },
          {
            label: "西城区",
            value: "xicheng",
            children: [
              {
                label: "西单",
                value: "xidan",
              },
              {
                label: "西直门",
                value: "xizhimen",
              },
              {
                label: "宣武门",
                value: "xuanwumen",
              },
              {
                label: "西四",
                value: "xishi",
              },
            ],
          },
        ],
      },
      {
        label: "上海",
        value: "shanghai",
        children: [
          {
            label: "浦东新区",
            value: "pudong",
            children: [
              {
                label: "陆家嘴",
                value: "luojiangzhu",
              },
              {
                label: "张江高科",
                value: "zhangjiang",
              },
              {
                label: "世纪公园",
                value: "shijigongyuan",
              },
              {
                label: "花木",
                value: "huamu",
              },
            ],
          },
          {
            label: "徐汇区",
            value: "xuhui",
            children: [
              {
                label: "徐家汇",
                value: "xujiahui",
              },
              {
                label: "漕河泾",
                value: "caohajin",
              },
              {
                label: "田子坊",
                value: "tianzifang",
              },
              {
                label: "田林",
                value: "tianlin",
              },
            ],
          },
        ],
      },
    ],
  },
};
