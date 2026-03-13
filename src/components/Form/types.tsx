import type { ReactNode } from "react";
import useStore from "./useStore";
import { type RuleItem } from "async-validator";

export type formLayout = "horizontal" | "vertical" | "inline";
export interface formRules {
  required?: boolean;
  message?: string;
}
export interface formProps {
  name?: string;
  labelWidth?: string | number;
  layout?: formLayout;
  children?: ReactNode;
  initialValues?: Record<string, any>;
}
export interface itemProps {
  label?: string;
  name: string;
  rules?: RuleItem[];
  children?: ReactNode;
  layout?: formLayout;
  labelWidth?: string | number;
  valuePropName?: "value" | "checked";
  validateTrigger?: string;
}
export type formContext = ReturnType<typeof useStore> &
  Pick<formProps, "initialValues" | "labelWidth">;
