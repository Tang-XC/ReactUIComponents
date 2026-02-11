import { useState } from "react";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="w-screen h-screen grid place-content-center">
      <Form>
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
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
        <Form.Item name="isAgree">
          <Checkbox.Group
            options={[
              {
                label: "唱歌",
                value: 0,
              },
              {
                label: "跳舞",
                value: 2,
              },
              {
                label: "Rap",
                value: 1,
              },
            ]}></Checkbox.Group>
        </Form.Item>
        <div className="w-full text-right">
          <Button type="submit" size="small">
            提交
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default App;
