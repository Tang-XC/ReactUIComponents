import { useRef, useState, useMemo, type ChangeEvent } from "react";
import type { checkboxProps } from "./types";
import { CSSTransition } from "react-transition-group";
import Group from "./group";

export const Checkbox: React.FC<checkboxProps> & { Group: typeof Group } = (props) => {
  const { children, className, disabled, style, checked, onChange, ...restProps } = props;
  const pointRef = useRef(null);
  const [active, setActive] = useState(restProps.defaultChecked);
  const isControlled = checked !== undefined;
  const mergedValue = isControlled ? checked : active;
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setActive(evt.target.checked);
    onChange?.(evt);
  };
  return (
    <div className={`flex ${className}`} style={style}>
      <div
        className={`form-control w-4 h-4 grid place-content-center cursor-pointer rounded-sm shadow-border ${disabledStyle}`}>
        <CSSTransition
          nodeRef={pointRef}
          in={mergedValue}
          timeout={300}
          classNames="popUp"
          unmountOnExit>
          <div
            ref={pointRef}
            className="rounded-sm w-4 h-4 bg-primary-500 grid place-content-center">
            <Icon name="yes" color="#FFF" size={10} />
          </div>
        </CSSTransition>

        <input
          className="absolute w-4 h-4 opacity-0 z-10"
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
