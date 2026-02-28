import React, { createContext } from "react";
import type { formProps, formContext } from "./types";
import Item from "./item";
import useStore from "./useStore";
export const context = createContext<formContext>({} as formContext);
export const Form: React.FC<formProps> & { Item: typeof Item } = (props) => {
  const { name, children, layout = "vertical", labelWidth, initialValues } = props;
  const { form, fields, dispatch } = useStore();
  return (
    <form name={name}>
      <context.Provider
        value={{
          dispatch,
          fields,
          form,
          initialValues,
          labelWidth,
        }}>
        {children}
      </context.Provider>
      <div className="w-75">{JSON.stringify(fields)}</div>
    </form>
  );
};
Form.Item = Item;
