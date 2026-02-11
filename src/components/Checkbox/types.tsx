import type { inputProps } from "../Input/types";

export interface checkboxProps extends Omit<inputProps, "size" | "prefix"> {
  checked?: boolean;
  className?: string;
  style?: React.CSSProperties;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  children?: React.ReactNode;
}
export interface groupOptions {
  label: string;
  value: string;
}
export interface groupProps extends Omit<checkboxProps, "defaultChecked" | "onChange"> {
  layout?: groupLayout;
  options: groupOptions[];
  defaultChecked?: string[];
  value?: string[];
  onChange?: (val: string[]) => void;
}
