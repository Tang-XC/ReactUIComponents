import { useEffect, useMemo, useRef, useState } from "react";
import useClickOutSide from "@/hooks/useClickOutSide";
import { type selectProps, SELECT_SIZE_MAP } from "./types";
import type { item } from "../Menu/types";
export const Select: React.FC<selectProps> = (props) => {
  const {
    className = "",
    style,
    size = "default",
    placeholder = "",
    value,
    options = [],
    disabled,
    defaultValue = "",
    onChange,
  } = props;
  const { ref, isFocus, setIsFocus } = useClickOutSide();
  const [innerValue, setInnerValue] = useState(defaultValue);
  const mergedValue = useMemo(() => {
    const isControlled = value !== undefined;
    const key = isControlled ? value : innerValue;
    const result = options.find((item) => item.value === key);
    return result ? result.label : "";
  }, [value, innerValue]);
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const focusStyle = useMemo(
    () => (isFocus ? "border-transparent shadow-focus! bg-transparent" : ""),
    [isFocus],
  );

  const handleClick = () => {
    if (disabled) return;
    setIsFocus((prev) => !prev);
  };
  const handleSelect = (val: string | number) => {
    if (disabled) return;
    setInnerValue(val);
    onChange?.(val);
  };

  const renderOptions = (
    <Menu
      onSelect={handleSelect}
      selectedKeys={[value !== undefined ? value : innerValue]}
      items={options.map((item) => {
        return {
          label: item.label,
          key: item.value,
        } as unknown as item;
      })}
    />
  );
  return (
    <div
      ref={ref}
      className={`form-control w-full px-2.5 box-border rounded-sm shadow-border hover:shadow-hover ${SELECT_SIZE_MAP[size]} ${disabledStyle} ${focusStyle} ${className}`}
      style={style}
      onClick={handleClick}>
      <Popover
        trigger="click"
        hasArrow={false}
        open={isFocus}
        className="w-full"
        contentStyle={{ width: ref.current?.offsetWidth + "px" }}
        content={renderOptions}>
        <div className="w-full h-5.5 flex items-center">
          <div className="flex-1">
            {mergedValue === "" ? (
              <div className="text-neutral-400">{placeholder}</div>
            ) : (
              <div>{mergedValue}</div>
            )}
          </div>
          <Icon name="down" color="#999999" />
        </div>
      </Popover>
    </div>
  );
};
