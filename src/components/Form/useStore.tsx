import { useState, useReducer } from "react";
import Schema, { type RuleItem, type ValidateError } from "async-validator";
export interface CustomRuleFuncParams {
  getFieldValue: (name: string) => any;
}
export type CustomRuleFunc = (params: CustomRuleFuncParams) => RuleItem;
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
export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
}
export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, ValidateError[]>;
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
  const [form, setForm] = useState<FormState>({ isValid: true, isSubmitting: false, errors: {} });
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
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    let valueMap: Record<string, any> = {};
    let descriptor: Record<string, any> = {};
    Object.keys(fields).forEach((item) => {
      valueMap[item] = fields[item].value;
      descriptor[item] = transformRules(fields[item].rules!);
    });
    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as ValidateErrorType;
      errors = err.fields;
      Object.keys(fields).forEach((item) => {
        const name = item;
        const value = fields[name];
        if (errors[name]) {
          const itemErrors = errors[name];
          dispatch({
            type: "updateValidateResult",
            name,
            value: {
              isValid: false,
              errors: itemErrors,
            },
          });
        } else if (value && value.rules && value.rules.length > 0 && !errors[name]) {
          dispatch({
            type: "updateValidateResult",
            name,
            value: {
              isValid: true,
              errors: [],
            },
          });
        }
      });
    } finally {
      setForm({
        ...form,
        isSubmitting: false,
        isValid,
        errors,
      });
      return {
        isValid,
        errors,
        values: valueMap,
      };
    }
  };
  return {
    form,
    fields,
    dispatch,
    validateField,
    getFieldValue,
    validateAllFields,
  };
}
export default useStore;
