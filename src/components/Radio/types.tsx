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
export interface groupOptions {
  label: string;
  value: any;
}
export interface groupProps extends radioProps {
  options: groupOptions[];
  layout?: groupLayout;
}
