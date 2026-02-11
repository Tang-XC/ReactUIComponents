import { useState, useRef, useEffect, type ChangeEvent } from "react";
import type { radioProps } from "./types";
import Group from "./group";
import { CSSTransition } from "react-transition-group";

export const Radio: React.FC<radioProps> & { Group: typeof Group } = (props) => {
  const { children, className, style, checked, onChange, ...restProps } = props;
  const pointRef = useRef(null);
  const [active, setActive] = useState(restProps.defaultChecked);
  const isControlled = checked !== undefined;
  const mergedValue = isControlled ? checked : active;
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setActive(evt.target.checked);
    onChange?.(evt);
  };
  return (
    <div className={`flex ${className}`} style={style}>
      <div className="w-[16px] h-[16px] grid place-content-center cursor-pointer rounded-lg shadow-border">
        <CSSTransition
          nodeRef={pointRef}
          in={mergedValue}
          timeout={300}
          classNames="popUp"
          unmountOnExit>
          <div ref={pointRef} className="rounded-lg w-[12px] h-[12px] bg-primary-500"></div>
        </CSSTransition>
        <input
          className="absolute w-[16px] h-[16px] opacity-0 z-10"
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
