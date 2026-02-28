export interface cascaderOption {
  label: string;
  value: string | number;
  children?: cascaderOption[];
}
export type cascaderSize = "small" | "default" | "large";
export interface cascaderContext {
  handleChange?: (val: string | number) => void;
}
export interface cascaderProps {
  className?: string;
  style?: React.CSSProperties;
  options: cascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: cascaderSize;
}
export interface cascaderMenuProps {
  value?: (string | number)[];
  options?: cascaderOption[];
  optionWidth?: string;
}
export const CASCADER_SIZE_MAP: Record<cascaderSize, string> = {
  small: " py-0 text-sm",
  default: "py-1 text-md",
  large: "py-1.5 text-lg [&_input]:h-[24px]",
};
