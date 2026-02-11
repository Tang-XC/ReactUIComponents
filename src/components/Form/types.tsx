import type { ReactNode } from "react";
import useStore from "./useStore";

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
}
export interface itemProps {
  label?: string;
  name: string;
  rules?: formRules;
  children?: ReactNode;
  layout?: formLayout;
  labelWidth?: string | number;
  valuePropName?: "value" | "checked";
}
export type formContext = ReturnType<typeof useStore>;
