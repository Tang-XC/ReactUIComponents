import React, { useContext, useEffect } from "react";
import type { itemProps } from "./types";
import { context } from "./index";
export default function (props: itemProps) {
  const {
    label = "",
    name,
    labelWidth,
    layout = "horizontal",
    children,
    valuePropName = "value",
    rules,
    validateTrigger = "onBlur",
  } = props;
  const {
    dispatch,
    fields,
    initialValues,
    labelWidth: contextLabelWidth,
    validateField,
  } = useContext(context);
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const errors = fieldState?.errors;
  const isRequired = rules?.some((rule) => typeof rule !== "function" && rule.required);
  const hasErros = errors && errors.length > 0;

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
  if (rules) {
    controlProps[validateTrigger] = async () => {
      await validateField(name);
    };
  }
  const childrenWithProps = React.cloneElement(child as React.ReactElement, {
    ...controlProps,
  });
  useEffect(() => {
    const value = (initialValues && initialValues[name]) || "";
    dispatch({
      type: "addField",
      name: name,
      value: { label, name, value, isValid: true, rules: rules || [], errors: [] },
    });
  }, []);
  return (
    <div className={`flex mb-6 ${layout === "vertical" ? "flex-col" : "items-center"}`}>
      <label
        className="text-neutral-500 mr-3"
        style={{
          width: contextLabelWidth || labelWidth,
        }}
        title={label}>
        {isRequired && <span className="text-danger-500 mr-1">*</span>}
        {label ? label + ":" : ""}
      </label>
      <div className="flex-1 h-min-[32px]">
        <div className={`${hasErros ? "[&_.form-control]:shadow-error" : ""}`}>
          {childrenWithProps}
        </div>
        <div className={`mt-0.5 ${hasErros ? "text-danger-500" : ""}`}>
          {hasErros ? errors[0].message : ""}
        </div>
      </div>
    </div>
  );
}
