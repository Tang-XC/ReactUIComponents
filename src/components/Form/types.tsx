import type { ReactNode } from "react";
import useStore from "./useStore";
import type { CustomRule } from "./useStore";
import type { ValidateError } from "async-validator";
export type RenderProps = (form: FormState) => ReactNode;
export type formLayout = "horizontal" | "vertical" | "inline";
export interface formRules {
  required?: boolean;
  message?: string;
}
export interface formProps {
  name?: string;
  labelWidth?: string | number;
  layout?: formLayout;
  children?: ReactNode | RenderProps;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFaild?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export interface itemProps {
  label?: string;
  name: string;
  rules?: CustomRule[];
  children?: ReactNode;
  layout?: formLayout;
  labelWidth?: string | number;
  valuePropName?: "value" | "checked";
  validateTrigger?: string;
}
export type formContext = ReturnType<typeof useStore> &
  Pick<formProps, "initialValues" | "labelWidth">;
