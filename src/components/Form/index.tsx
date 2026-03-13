import React, { createContext } from "react";
import type { formProps, formContext } from "./types";
import Item from "./item";
import useStore from "./useStore";
export const context = createContext<formContext>({} as formContext);
export const Form: React.FC<formProps> & { Item: typeof Item } = (props) => {
  const { name, children, labelWidth, initialValues } = props;
  const { form, fields, dispatch, validateField } = useStore();
  return (
    <form name={name}>
      <context.Provider
        value={{
          dispatch,
          fields,
          form,
          initialValues,
          labelWidth,
          validateField,
        }}>
        {children}
      </context.Provider>
      <div className="w-75">{JSON.stringify(fields)}</div>
    </form>
  );
};
Form.Item = Item;
