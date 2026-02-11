import React, { useMemo, useContext, useEffect, type ChangeEvent } from "react";
import type { itemProps } from "./types";
import { context } from "./index";
export default function (props: itemProps) {
  const {
    label = "",
    name,
    labelWidth = "auto",
    layout = "horizontal",
    children,
    valuePropName = "value",
  } = props;
  const { dispatch, fields } = useContext(context);
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;

  if (React.Children.toArray(children).length === 0) {
    console.warn("No child element found in Form.Item,please provide one");
  }
  if (React.Children.toArray(children).length > 1) {
    console.warn("Only support one child element in Form.Item,others will be omitted");
  }
  const child = React.Children.toArray(children)[0] as React.ReactElement<any>;
  if (!React.isValidElement(child)) {
    console.error("Child component is not a valid React Element");
  }
  const controlProps: Record<string, any> = {
    value: value,
    onChange: (...args: any[]) => {
      const evt = args[0];
      let newValue;
      if (evt && typeof evt === "object" && "target" in evt) {
        newValue = evt.target[valuePropName];
      } else {
        newValue = evt;
      }
      dispatch({
        type: "updateField",
        name: name,
        value: newValue,
      });

      const originalOnChange = child.props.onChange;
      if (originalOnChange && typeof originalOnChange === "function") {
        originalOnChange(...args);
      }
    },
  };
  const childrenWithProps = React.cloneElement(child as React.ReactElement, {
    ...controlProps,
  });
  useEffect(() => {
    dispatch({
      type: "addField",
      name: name,
      value: { label, name, value: value },
    });
  }, []);
  return (
    <div className={`flex mb-4 ${layout === "vertical" ? "flex-col" : "items-center"}`}>
      <label
        className="text-neutral-500 mr-3"
        style={{
          width: labelWidth,
        }}
        title={label}>
        {label ? label + ":" : ""}
      </label>
      <div className="flex-1">{childrenWithProps}</div>
    </div>
  );
}
