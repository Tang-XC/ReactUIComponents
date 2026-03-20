import { DatePicker } from "./components/DatePicker";
import type { CustomRule } from "@/components/Form/useStore";
function App() {
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
  const repeatPasswordRule: CustomRule[] = [
    ({ getFieldValue }) => ({
      asyncValidator(_, value) {
        return new Promise((resolve, reject) => {
          if (value !== getFieldValue("password")) {
            reject("Do not match!");
          }
          resolve();
        });
      },
    }),
  ];
  return (
    <div className="w-screen overflow-auto grid place-content-center">
      <Menu
        style={{
          width: "auto",
        }}
        items={menuItems}
        selectedKeys={["sub-sub-menu-1"]}
        mode="horizontal"
      />
      <div className="flex items-center mb-4">
        <AutoComplete
          options={["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple"]}></AutoComplete>
        <Button size="mini" icon={<Icon name="search" />} />
      </div>
      <Form
        labelWidth={80}
        initialValues={{
          username: "TXC",
          password: 123123,
          gender: "female",
          isAgree: [0, 2],
          isOk: true,
          address: ["zhejiang", "hangzhou", "xiasha"],
        }}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item label="重复密码" name="repeatPassword" rules={repeatPasswordRule}>
          <Input type="password" />
        </Form.Item>
        <Form.Item name="gender">
          <Radio.Group
            options={[
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="isAgree"
          rules={[
            {
              type: "enum",
              enum: ["0", "1", "2"],
              message: "请先勾选同意",
            },
          ]}>
          <Checkbox.Group
            options={[
              {
                label: "唱歌",
                value: "0",
              },
              {
                label: "跳舞",
                value: "2",
              },
              {
                label: "Rap",
                value: "1",
              },
            ]}></Checkbox.Group>
        </Form.Item>
        <Form.Item name="habit">
          <Select
            placeholder="请选择"
            options={[
              {
                label: "唱歌",
                value: 0,
              },
              {
                label: "跳舞",
                value: 1,
              },
              {
                label: "Rap",
                value: 2,
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="isOk">
          <Switch />
        </Form.Item>
        <Form.Item name="address">
          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "浙江",
                children: [
                  {
                    value: "hangzhou",
                    label: "杭州",
                    children: [
                      {
                        value: "xihu",
                        label: "西湖",
                      },
                      {
                        value: "xiasha",
                        label: "下沙",
                      },
                      {
                        value: "binjiang",
                        label: "滨江",
                      },
                    ],
                  },
                ],
              },
              {
                value: "jiangsu",
                label: "江苏",
                children: [
                  {
                    value: "nanjing",
                    label: "南京",
                    children: [
                      {
                        value: "zhonghuamen",
                        label: "中华门",
                      },
                      {
                        value: "fuzimiao",
                        label: "夫子庙",
                      },
                      {
                        value: "zhongshanling",
                        label: "中山陵",
                      },
                    ],
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker placeholder="请选择日期" />
        </Form.Item>
        <Form.Item name="daterange">
          <DatePicker.Range
            // defaultValue={["2026-03-05", "2026-05-09"]}
            placeholder={["开始时间", "结束时间"]}
          />
        </Form.Item>
        <Form.Item name="upload">
          <Upload
            tip="jpg/png files with a size less than 500KB."
            listType="text"
            drag={true}
            fileList={[
              {
                name: "pic1",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                uid: "1",
                status: "done",
                size: 1234,
                percent: 100,
                type: "doc",
              },
              {
                name: "pic2",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                uid: "3",
                status: "error",
                size: 1234,
                percent: 100,
                type: "png",
              },
              {
                name: "pic2",
                url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                uid: "2",
                status: "uploading",
                size: 1234,
                percent: 80,
                type: "xls",
              },
            ]}>
            <div className="p-3">
              <Icon name="upload" size={24} />
            </div>
            <div>Click or Drag file to this area to upload</div>
          </Upload>
        </Form.Item>
        <div className="w-full text-right">
          <Button type="submit" size="small">
            提交
          </Button>
        </div>
      </Form>
      <Modal open={true} />
    </div>
  );
}

export default App;
