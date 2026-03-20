import React, { createContext, type ReactNode } from "react";
import type { formProps, formContext } from "./types";
import Item from "./item";
import useStore from "./useStore";
export const context = createContext<formContext>({} as formContext);
export const Form: React.FC<formProps> & { Item: typeof Item } = (props) => {
  const { name, children, labelWidth, initialValues, onFinish, onFinishFaild } = props;
  const { form, fields, dispatch, validateField, validateAllFields } = useStore();
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFaild) {
      onFinishFaild(values, errors);
    }
  };
  return (
    <form name={name} onSubmit={submitForm}>
      <context.Provider
        value={{
          dispatch,
          fields,
          form,
          initialValues,
          labelWidth,
          validateField,
        }}>
        {typeof children === "function" ? children(form) : children}
      </context.Provider>
      <div className="w-75">{JSON.stringify(fields)}</div>
    </form>
  );
};
Form.Item = Item;
