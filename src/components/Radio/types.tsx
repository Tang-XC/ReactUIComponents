import type { inputProps } from "../Input/types";
export interface radioProps extends Omit<inputProps, "size" | "prefix"> {
  checked?: boolean;
  className?: string;
  style?: React.CSSProperties;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  children?: React.ReactNode;
}
export type groupLayout = "vertical" | "horizontal";
export interface groupOptions<T = string | number> {
  label: string;
  value: T;
}
export interface groupProps<T> extends radioProps {
  options: groupOptions<T>[];
  layout?: groupLayout;
}
