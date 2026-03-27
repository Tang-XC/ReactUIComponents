export interface selectOptions {
  label: string;
  value: string | number;
}
export type selectSize = "small" | "default" | "large";
export interface selectProps {
  className?: string;
  style?: React.CSSProperties;
  options: selectOptions[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: selectSize;
}

export const SELECT_SIZE_MAP: Record<selectSize, string> = {
  small: " py-0 text-sm",
  default: "py-1 text-md",
  large: "py-1.5 text-lg [&_input]:h-6",
};
