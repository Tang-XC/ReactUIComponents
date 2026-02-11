import { useRef, useState, type ChangeEvent } from "react";
import type { checkboxProps } from "./types";
import { CSSTransition } from "react-transition-group";
import Group from "./group";

export const Checkbox: React.FC<checkboxProps> & { Group: typeof Group } = (props) => {
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
      <div className="w-[16px] h-[16px] grid place-content-center cursor-pointer rounded-sm shadow-border">
        <CSSTransition
          nodeRef={pointRef}
          in={mergedValue}
          timeout={300}
          classNames="popUp"
          unmountOnExit>
          <div
            ref={pointRef}
            className="rounded-sm w-[16px] h-[16px] bg-primary-500 grid place-content-center">
            <Icon name="yes" color="#FFF" size={10} />
          </div>
        </CSSTransition>

        <input
          className="absolute w-[16px] h-[16px] opacity-0 z-10"
          {...restProps}
          type="checkbox"
          checked={mergedValue}
          onChange={handleChange}
        />
      </div>
      <div className="inline-block px-2">{children}</div>
    </div>
  );
};
Checkbox.Group = Group;
