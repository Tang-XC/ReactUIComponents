import { useState, useRef, useMemo, type ChangeEvent } from "react";
import type { radioProps } from "./types";
import Group from "./group";
import { CSSTransition } from "react-transition-group";

export const Radio: React.FC<radioProps> & { Group: typeof Group } = (props) => {
  const { children, className, style, checked, disabled, onChange, ...restProps } = props;
  const pointRef = useRef(null);
  const [active, setActive] = useState(restProps.defaultChecked);
  const isControlled = checked !== undefined;
  const mergedValue = isControlled ? checked : active;
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setActive(evt.target.checked);
    onChange?.(evt);
  };
  return (
    <div className={`flex ${className}`} style={style}>
      <div
        className={`form-control w-4 h-4 grid place-content-center cursor-pointer rounded-lg shadow-border ${disabledStyle}`}>
        <CSSTransition
          nodeRef={pointRef}
          in={mergedValue}
          timeout={300}
          classNames="popUp"
          unmountOnExit>
          <div ref={pointRef} className={`rounded-lg w-3 h-3 bg-primary-500`}></div>
        </CSSTransition>
        <input
          className="absolute w-4 h-4 opacity-0 z-10"
          {...restProps}
          type="radio"
          checked={mergedValue}
          onChange={handleChange}
        />
      </div>
      <div className="inline-block px-2">{children}</div>
    </div>
  );
};
Radio.Group = Group;
