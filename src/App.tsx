import { useState } from "react";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-screen h-screen grid place-content-center">
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
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input type="password" disabled />
        </Form.Item>
        <Form.Item name="gender">
          <Radio.Group
            options={[
              { label: "男", value: "male" },
              { label: "女", value: "female" },
            ]}
          />
        </Form.Item>
        <Form.Item name="isAgree">
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
          <DatePicker />
        </Form.Item>
        <div className="w-full text-right">
          {/* <Button type="submit" size="small">
            提交
          </Button> */}
        </div>
      </Form>
    </div>
  );
}

export default App;
