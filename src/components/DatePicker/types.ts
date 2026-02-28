export type datePickerSize = "small" | "default" | "large";
export interface datePickerProps {
  className?: string;
  style?: React.CSSProperties;
  value?: Date;
  defaultValue?: Date;
  onChange?: (val: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: datePickerSize;
}
export interface pannelProps {
  value?: Date;
  current?: Date;
  prev?: (year: number, month: number) => void;
  next?: (year: number, month: number) => void;
  onChange?: (day: number) => void;
}
export const DATEPICKER_SIZE_MAP: Record<datePickerSize, string> = {
  small: "py-0 text-sm",
  default: "py-1 text-md",
  large: "py-1.5 text-lg [&_input]:h-6",
};