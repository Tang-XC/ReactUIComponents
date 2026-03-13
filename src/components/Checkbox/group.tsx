import { useState, type ChangeEvent } from "react";
import type { groupProps } from "./types";
const formatType = (val: any[]) => {
  return val.map((item) => String(item));
};
export default function (props: groupProps) {
  const {
    className,
    style,
    options,
    value,
    defaultChecked,
    disabled,
    layout = "horziontal",
    onChange,
  } = props;
  const [checkedOption, setCheckedOption] = useState<string[]>(
    formatType(value! || defaultChecked! || []),
  );
  const isControlled = value !== undefined;
  const mergedValue = isControlled ? formatType(value) : checkedOption || [];
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentValue = evt.target.value;
    let newValue;
    if (mergedValue.includes(currentValue)) {
      newValue = mergedValue.filter((item) => item !== currentValue);
    } else {
      newValue = [...mergedValue, currentValue];
    }
    setCheckedOption(newValue);
    onChange?.(newValue);
  };
  return (
    <div
      className={`form-control flex ${layout === "vertical" ? "flex-col" : ""} ${className}`}
      style={style}>
      {options.map((item) => {
        return (
          <Checkbox
            key={item.value}
            className="mx-1 my-2"
            value={item.value}
            onChange={handleChange}
            disabled={disabled}
            checked={mergedValue.map((item) => item).includes(String(item.value))}>
            {item.label}
          </Checkbox>
        );
      })}
    </div>
  );
}
