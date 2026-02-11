import { useState, useReducer } from "react";
export interface FieldDetail {
  name: string;
  label?: string;
  value?: string;
  rules?: any[];
  isValid?: boolean;
  errors?: any[];
}
export interface FieldsState {
  [key: string]: FieldDetail;
}
export interface FormState {
  isValid: boolean;
}
export interface FieldsAction {
  type: "addField" | "updateField";
  name: string;
  value: any;
}
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [action.name]: { ...action.value },
      };
    case "updateField":
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value },
      };
    default:
      return state;
  }
}
function useStore() {
  const [form, setForm] = useState<FormState>({ isValid: true });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  return {
    form,
    fields,
    dispatch,
  };
}
export default useStore;
