import React, { useRef, useState, useMemo, useEffect } from "react";
import { type datePickerProps, DATEPICKER_SIZE_MAP } from "./types";
import Panel from "./panel";
import Range from "./range";
import useClickOutSide from "@/hooks/useClickOutSide";
export const DatePicker: React.FC<datePickerProps> & { Range: typeof Range } = (props) => {
  const {
    className,
    style,
    size = "default",
    defaultValue,
    onChange,
    placeholder,
    disabled,
    ...restProps
  } = props;
  const { ref, isFocus, setIsFocus } = useClickOutSide();
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const mergedValue = useMemo(() => {
    const isControlled = "value" in restProps && typeof restProps.value === "object";
    return isControlled ? restProps.value : currentValue;
  }, [restProps.value, currentValue]);

  const focusStyle = useMemo(
    () => (isFocus ? "border-transparent shadow-focus! bg-transparent" : ""),
    [isFocus],
  );
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const handleClick = () => {
    if (disabled) return;
    setIsFocus(true);
  };
  const handleChange = (date: Date) => {
    setCurrentValue(date);
  };
  return (
    <div
      ref={ref}
      className={`w-full flex items-center px-2.5 box-border rounded-sm shadow-border hover:shadow-hover ${className} ${focusStyle} ${disabledStyle} ${DATEPICKER_SIZE_MAP[size]}`}
      style={style}
      onClick={handleClick}>
      <Popover
        trigger="click"
        hasArrow={false}
        open={isFocus}
        className="w-full"
        contentStyle={{ width: 316 }}
        content={<Panel currentDate={mergedValue} viewDate={new Date()} onChange={handleChange} />}>
        <div className="w-full h-5.5 flex items-center ">
          <div className="flex-1">
            {mergedValue?.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            {!mergedValue && <div className="text-neutral-400">{placeholder}</div>}
          </div>
          <Icon name="date" color="#999999" />
        </div>
      </Popover>
    </div>
  );
};
DatePicker.Range = Range;
