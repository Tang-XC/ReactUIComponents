import React, { useRef, useState, useMemo, useEffect } from "react";
import { type datePickerProps, DATEPICKER_SIZE_MAP } from "./types";
import Pannel from "./pannel";
export const DatePicker: React.FC<datePickerProps> = (props) => {
  const {
    className,
    style,
    size = "default",
    defaultValue = new Date(),
    onChange,
    placeholder,
    disabled,
    ...restProps
  } = props;
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const mergedValue = useMemo(() => {
    const isControlled = "value" in restProps && typeof restProps.value === "object";
    return isControlled ? restProps.value : innerValue;
  }, [restProps.value, innerValue]);
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
  const prev = (year: number, month: number) => {
    setCurrentValue(new Date(year, month - 1, 1));
  };
  const next = (year: number, month: number) => {
    setCurrentValue(new Date(year, month + 1, 1));
  };
  const handleChange = (day: number) => {
    const date = new Date(currentValue.getFullYear(), currentValue.getMonth(), day);
    setCurrentValue(date);
    onChange?.(date);
    setIsFocus(false);
  };
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(evt.target as Node)) {
        setIsFocus(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={datePickerRef}
      className={`w-full flex items-center px-2.5 box-border rounded-sm shadow-border hover:shadow-hover ${className} ${focusStyle} ${disabledStyle} ${DATEPICKER_SIZE_MAP[size]}`}
      style={style}
      onClick={handleClick}>
      <Popover
        trigger="click"
        hasArrow={false}
        open={isFocus}
        className="w-full"
        contentStyle={{ width: 288 }}
        content={
          <Pannel
            value={mergedValue}
            current={currentValue}
            prev={prev}
            next={next}
            onChange={handleChange}
          />
        }>
        <div className="w-full h-5.5 flex items-center ">
          <div className="flex-1">
            {mergedValue?.toLocaleDateString("en-CA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            {/* {mergedValue ? (
              <div className="text-neutral-400">{placeholder}</div>
            ) : (
              <div>{mergedValue}</div>
            )} */}
          </div>
          <Icon name="date" color="#999999" />
        </div>
      </Popover>
    </div>
  );
};
