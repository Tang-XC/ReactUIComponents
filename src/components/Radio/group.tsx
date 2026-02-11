import { useState, type ChangeEvent } from "react";
import type { groupProps } from "./types";
export default function (props: groupProps<string | number>) {
  const { className, style, options, value, defaultValue, layout = "horziontal", onChange } = props;
  const [checkedOption, setCheckedOption] = useState(
    value || defaultValue || (options && options[0].value),
  );
  const isControlled = value !== undefined;
  const mergeValue = isControlled ? value : checkedOption;
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCheckedOption(evt.target.value);
    onChange?.(evt);
  };
  return (
    <div className={`flex ${layout === "vertical" ? "flex-col" : ""} ${className}`} style={style}>
      {options.map((item) => {
        return (
          <Radio
            key={item.value}
            className="mx-1 my-2"
            value={item.value}
            onChange={handleChange}
            checked={item.value === mergeValue}>
            {item.label}
          </Radio>
        );
      })}
    </div>
  );
}
