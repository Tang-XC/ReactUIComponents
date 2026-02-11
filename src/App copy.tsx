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
  const handleClick = () => {
    alert("hello");
  };
  return (
    <>
      <div className="bg-bgColor w-screen  flex justify-center items-start gap-4 p-24">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <Button onClick={handleClick}>Hello World</Button>
            <Button variant="success">Hello</Button>
            <Button variant="warning">Hello</Button>
            <Button variant="danger">Hello</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button effect="outlined">Hello</Button>
            <Button variant="success" effect="outlined">
              Hello
            </Button>
            <Button variant="warning" effect="outlined">
              Hello
            </Button>
            <Button variant="danger" effect="outlined">
              Hello
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button effect="text">Hello</Button>
            <Button variant="success" effect="text">
              Hello
            </Button>
            <Button variant="warning" effect="text">
              Hello
            </Button>
            <Button variant="danger" effect="text">
              Hello
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="small">Hello</Button>
            <Button size="medium">Hello</Button>
            <Button size="large">Hello</Button>
          </div>
          <div>
            <Button disabled>Hello</Button>
          </div>
          <div className="flex items-center gap-4">
            <Icon name="apple" size={24} color="gray" />
            <Icon name="android" size={32} color="green" />
            <Icon name="hormany" size={64} color="red" />
          </div>
          <div className="flex items-center gap-8">
            <Menu
              style={{
                width: 280,
              }}
              items={menuItems}
              selectedKeys={["sub-sub-menu-1"]}
              mode="vertical"
            />
            <Menu
              style={{
                width: "auto",
              }}
              items={menuItems}
              selectedKeys={["sub-sub-menu-1"]}
              mode="horizontal"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-center gap-3">
            <Popover placement="top-start" content={<div>Hello world</div>}>
              <Button>top-start</Button>
            </Popover>
            <Popover placement="top" content={<div>Hello world</div>}>
              <Button>top</Button>
            </Popover>
            <Popover placement="top-end" content={<div>Hello world</div>}>
              <Button>top-end</Button>
            </Popover>
          </div>
          <div className="w-full flex items-center justify-between gap-3 my-2">
            <Popover
              placement="left-start"
              content={<div>Hello world Hello world Hello world Hello world</div>}>
              <Button>left-start</Button>
            </Popover>
            <Popover
              placement="right-start"
              content={<div>Hello world Hello world Hello world Hello world</div>}>
              <Button>right-start</Button>
            </Popover>
          </div>
          <div className="w-[120%] flex items-center justify-between gap-3 my-2">
            <Popover placement="left" content={<div>Hello world</div>}>
              <Button>left</Button>
            </Popover>
            <Popover placement="right" content={<div>Hello world</div>}>
              <Button>right</Button>
            </Popover>
          </div>
          <div className="w-[110%] flex items-center justify-between gap-3 my-2">
            <Popover placement="left-end" content={<div>Hello world</div>}>
              <Button>left-end</Button>
            </Popover>
            <Popover placement="right-end" content={<div>Hello world</div>}>
              <Button>right-end</Button>
            </Popover>
          </div>
          <div className="w-full flex items-center justify-center gap-3">
            <Popover placement="bottom-start" content={<div>Hello world</div>}>
              <Button>bottom-start</Button>
            </Popover>
            <Popover placement="bottom" content={<div>Hello world</div>}>
              <Button>bottom</Button>
            </Popover>
            <Popover placement="bottom-end" content={<div>Hello world</div>}>
              <Button>bottom-end</Button>
            </Popover>
          </div>
          <div>
            <Input size="large" suffix={<Icon name="search" />}></Input>
            <AutoComplete
              options={[
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Cyan",
                "Blue",
                "Purple",
              ]}></AutoComplete>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
