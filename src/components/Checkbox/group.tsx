import { useState, type ChangeEvent } from "react";
import type { groupProps } from "./types";
export default function (props: groupProps) {
  const {
    className,
    style,
    options,
    value,
    defaultChecked,
    layout = "horziontal",
    onChange,
  } = props;
  const [checkedOption, setCheckedOption] = useState<string[]>(value! || defaultChecked! || []);
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentValue = evt.target.value;
    let newValue;
    if (checkedOption.includes(currentValue)) {
      newValue = checkedOption.filter((item) => item !== currentValue);
    } else {
      newValue = [...checkedOption, currentValue];
    }
    setCheckedOption(newValue);
    onChange?.(newValue);
  };
  return (
    <div className={`flex ${layout === "vertical" ? "flex-col" : ""} ${className}`} style={style}>
      {options.map((item) => {
        return (
          <Checkbox
            key={item.value}
            className="mx-1 my-2"
            value={item.value}
            onChange={handleChange}
            checked={checkedOption.includes(String(item.value))}>
            {item.label}
          </Checkbox>
        );
      })}
    </div>
  );
}
