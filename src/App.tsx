import { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const handleFetch = async () => {
    return Promise.resolve(["go", "abc", "defg", "asdf"]);
  };
  return (
    <div className="w-screen h-screen grid place-content-center flex flex-col gap-2">
      {value}
      <Input
        size="large"
        suffix={<Icon name="search" />}
        value={value}
        onChange={(val) => setValue(val.target.value)}></Input>
      <AutoComplete
        options={["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Purple"]}
        value={value}
        fetchOptions={handleFetch}
        onChange={(val) => setValue(val.target.value)}
        onSelect={(val) => setValue(val)}></AutoComplete>
    </div>
  );
}

export default App;
