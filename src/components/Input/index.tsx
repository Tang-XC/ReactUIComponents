import { useEffect, useMemo, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { type inputProps, INPUT_SIZE_MAP, INPUT_EFFECT_MAP } from "./types";

export const Input = forwardRef<HTMLInputElement, inputProps>((props, ref) => {
  const {
    disabled = false,
    clearable = false,
    effect = "outlined",
    size = "default",
    prefix,
    suffix,
    onChange,
    onClear,
    onBlur,
    onFocus,
    ...restProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const focusStyle = useMemo(
    () => (isFocus ? "border-transparent shadow-focus! bg-transparent" : ""),
    [isFocus],
  );
  const isShowClear = useMemo(() => clearable && restProps.value, [clearable, restProps.value]);
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none bg-disabled" : ""),
    [disabled],
  );
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    onChange?.(evt);
  };
  const handleFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    onFocus?.(evt);
  };
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    onBlur?.(evt);
  };
  const handleClear = (evt: React.MouseEvent) => {
    if (disabled) return;
    evt.stopPropagation();
    const emptyEvt = {
      ...evt,
      target: {
        ...evt.currentTarget,
        value: "",
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(emptyEvt);
    onClear?.();
    inputRef.current?.focus();
  };
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  useImperativeHandle(ref, () => inputRef.current!);
  return (
    <div
      className={`flex items-center  px-2.5 box-border hover:shadow-hover ${INPUT_EFFECT_MAP[effect]} ${INPUT_SIZE_MAP[size]} ${focusStyle} ${disabledStyle}`}>
      {prefix && <div className="mr-2">{prefix}</div>}
      <input
        {...restProps}
        ref={inputRef}
        className="w-full h-[22px] outline-none placeholder-neutral-300"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}></input>

      {isShowClear && (
        <div className="cursor-pointer" onClick={handleClear}>
          <Icon name="clear" size={14} className="text-gray-300!" />
        </div>
      )}
      {suffix && <div className="ml-2">{suffix}</div>}
    </div>
  );
});
