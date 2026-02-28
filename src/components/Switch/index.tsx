import { type switchProps, SWITCH_SIZE_MAP, SWITCH_VARIANT_MAP } from "./types";
import { useMemo, useState } from "react";

export const Switch: React.FC<switchProps> = (props) => {
  const {
    className = "",
    style,
    size = "default",
    defaultValue = false,
    disabled,
    variant = "primary",
    onChange,
    onClick,
    ...restProps
  } = props;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const mergedValue = useMemo(() => {
    const isControlled = "value" in restProps && typeof restProps.value === "boolean";
    return isControlled ? restProps.value : innerValue;
  }, [innerValue, restProps]);
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setInnerValue(!mergedValue);
    onChange?.(!mergedValue);
    onClick?.(e);
  };
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-border cursor-pointer ${SWITCH_SIZE_MAP[size].track} ${className} ${disabledStyle}`}
      style={style}
      onClick={handleClick}>
      <div
        className={`flex relative transition-transform ease-[cubic-bezier(1,0,1,1)] ${mergedValue ? "" : "translate-x-[-33.33333%]"}  ${SWITCH_SIZE_MAP[size].thumb}`}>
        <div className={`flex-1 ${SWITCH_VARIANT_MAP[variant]}`}></div>
        <div className="flex-1 bg-disabled"></div>
        <div
          className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-4xl bg-white ${SWITCH_SIZE_MAP[size].dot}`}></div>
      </div>
    </div>
  );
};
