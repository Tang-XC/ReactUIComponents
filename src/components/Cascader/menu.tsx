import { useEffect, useRef, useMemo, useState, useContext } from "react";
import type { cascaderMenuProps, cascaderOption } from "./types";
import { CSSTransition } from "react-transition-group";
import CascaderMenu from "./menu";
import { context } from "./index";
export default function (props: cascaderMenuProps) {
  const { options = [], optionWidth, value } = props;
  const { handleChange } = useContext(context);
  const [current, setCurrent] = useState<cascaderOption>();
  const [childOptions, setChildOptions] = useState<cascaderOption[]>([]);
  const subRef = useRef(null);
  const hasChild = useMemo(
    () => current && current?.children && current.children.length > 0,
    [current],
  );
  const selectedStyle = "bg-primary-700 text-primary-300";
  const handleClick = (val: cascaderOption) => {
    setCurrent(val);
    handleChange?.(val.value);
    if (val.children && val.children.length > 0) {
      setChildOptions(val.children);
    }
  };
  useEffect(() => {
    setCurrent(undefined);
  }, [options]);
  // useEffect(() => {
  //   if (current?.children) {
  //     setChildOptions(current.children);
  //   } else {
  //     setChildOptions([]);
  //   }
  // }, [current]);
  useEffect(() => {
    let key = value?.[0];
    if (!key) return;
    let currentOption = options.find((option) => option.value === key);
    setCurrent(currentOption);
  }, []);
  return (
    <div className="flex">
      <div>
        <ul>
          {options.map((option) => (
            <li className="w-full" key={option.value} style={{ minWidth: optionWidth }}>
              <Button
                size="small"
                className={`w-full ${current?.value === option.value && selectedStyle}`}
                key={option.value}
                effect="text"
                onClick={() => handleClick(option)}>
                <div className="flex items-center">
                  <div className="flex-1">{option.label}</div>
                  {option.children && <Icon name="right" size={12} />}
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CSSTransition
          nodeRef={subRef}
          in={!!hasChild}
          timeout={300}
          classNames="fadeInSlide"
          unmountOnExit>
          <div ref={subRef} className="flex h-full">
            <CascaderMenu
              value={value?.slice(1)}
              options={childOptions}
              optionWidth={optionWidth}
            />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
