import React, { createContext } from "react";
import type { formProps, formContext } from "./types";
import Item from "./item";
import useStore from "./useStore";
export const context = createContext<formContext>({} as formContext);
export const Form: React.FC<formProps> & { Item: typeof Item } = (props) => {
  const { name, children, layout = "vertical" } = props;
  const { form, fields, dispatch } = useStore();
  return (
    <form name={name} className="">
      <context.Provider
        value={{
          dispatch,
          fields,
          form,
        }}>
        {children}
      </context.Provider>
      <div className="w-[300px]">{JSON.stringify(fields)}</div>
    </form>
  );
};
Form.Item = Item;
