import { useState, useReducer } from "react";
import Schema, { type RuleItem, type ValidateError } from "async-validator";
export interface FieldDetail {
  name: string;
  label?: string;
  value?: string;
  rules?: RuleItem[];
  isValid?: boolean;
  errors?: ValidateError[];
}
export interface FieldsState {
  [key: string]: FieldDetail;
}
export interface FormState {
  isValid: boolean;
}
export interface FieldsAction {
  type: "addField" | "updateField" | "updateValidateResult";
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
    case "updateValidateResult":
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isValid: action.value.isValid,
          errors: action.value.errors,
        },
      };
    default:
      return state;
  }
}
function useStore() {
  const [form, setForm] = useState<FormState>({ isValid: true });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const validateField = async (name: string) => {
    console.log("fields", fields, name);
    const { value, rules = [] } = fields[name];
    const descriptor = {
      [name]: rules,
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e: any) {
      isValid = false;
      console.log("async-validator", e?.errors);
      errors = e?.errors;
    } finally {
      dispatch({ type: "updateValidateResult", name, value: { isValid, errors } });
    }
  };
  return {
    form,
    fields,
    dispatch,
    validateField,
  };
}
export default useStore;
