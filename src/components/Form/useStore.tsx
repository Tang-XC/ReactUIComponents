import { useState, useReducer } from "react";
import Schema, { type RuleItem, type ValidateError } from "async-validator";
export interface CustomRuleFuncParams {
  getFieldValue: (name: string) => any;
}
export type CustomRuleFunc = (params: CustomRuleFuncParams) => Promise<any>;
export type CustomRule = RuleItem | CustomRuleFunc;
export interface FieldDetail {
  name: string;
  label?: string;
  value?: string;
  rules?: CustomRule[];
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
  const getFieldValue = (name: string) => {
    return fields[name] && fields[name].value;
  };
  const transformRules = (rules: CustomRule[]) => {
    return rules.map((rule) => {
      if (typeof rule === "function") {
        const calledRule = rule({ getFieldValue });
        return calledRule;
      } else {
        return rule;
      }
    });
  };
  const validateField = async (name: string) => {
    const { value, rules = [] } = fields[name];
    const afterRules = transformRules(rules);
    const descriptor = {
      [name]: afterRules,
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
    getFieldValue,
  };
}
export default useStore;
