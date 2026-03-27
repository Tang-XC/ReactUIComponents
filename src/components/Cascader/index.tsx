import React, { useRef, useEffect, useState, useMemo, createContext } from "react";
import CascaderMenu from "./menu";
import {
  type cascaderProps,
  type cascaderContext,
  type cascaderOption,
  CASCADER_SIZE_MAP,
} from "./types";
import { Popover, Icon } from "@/components/index";
export const context = createContext<cascaderContext>({} as cascaderContext);
export const Cascader: React.FC<cascaderProps> = (props) => {
  const {
    className,
    style,
    options,
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled,
    size = "default",
  } = props;
  const cascaderRef = useRef<HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [innerValue, setInnerValue] = useState(defaultValue);
  const focusStyle = useMemo(
    () => (isFocus ? "border-transparent shadow-focus! bg-transparent" : ""),
    [isFocus],
  );
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const mergedValue = useMemo(() => {
    const isControlled = value !== undefined;
    return isControlled ? value : innerValue;
  }, [value, innerValue]);
  const traverse = (
    list: cascaderOption[],
    target: string | number,
    prop: keyof cascaderOption,
    path: any[],
  ): (string | number)[] => {
    for (let item of list) {
      if (item.value === target) {
        return [...path, item[prop]];
      }
      if (item.children && item.children.length > 0) {
        const result = traverse(item.children, target, prop, [...path, item.value]);
        if (result.length > 0) {
          return result;
        }
      }
    }
    return [];
  };
  const formatValue = (val: (string | number)[]) => {
    if (!val || val.length === 0) return [];
    return val.map((v) => {
      const option = traverse(options, v, "label", []);
      return option[option.length - 1];
    });
  };
  const handleClick = () => {
    if (disabled) return;
    setIsFocus(true);
  };
  const handleChange = (val: string | number) => {
    const path = traverse(options, val, "value", []);
    setInnerValue(path);
    onChange?.(path);
  };

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (cascaderRef.current && !cascaderRef.current.contains(evt.target as Node)) {
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
      ref={cascaderRef}
      className={`form-control w-full min-w-40 px-2.5 box-border rounded-sm shadow-border hover:shadow-hover ${CASCADER_SIZE_MAP[size]} ${disabledStyle} ${focusStyle} ${className}`}
      style={style}
      onClick={handleClick}>
      <Popover
        trigger="click"
        hasArrow={false}
        open={isFocus}
        className="w-full"
        contentStyle={{ minWidth: cascaderRef.current?.offsetWidth + "px" }}
        content={
          <context.Provider
            value={{
              handleChange,
            }}>
            <CascaderMenu
              value={mergedValue}
              options={options}
              optionWidth={cascaderRef.current?.offsetWidth + "px"}
            />
          </context.Provider>
        }>
        <div className="w-full h-5.5 flex items-center">
          <div className="flex-1">
            {mergedValue?.length === 0 ? (
              <div className="text-neutral-400">{placeholder}</div>
            ) : (
              <div>{formatValue(mergedValue!)?.join(" / ")}</div>
            )}
          </div>
          <Icon name="down" color="#999999" />
        </div>
      </Popover>
    </div>
  );
};
