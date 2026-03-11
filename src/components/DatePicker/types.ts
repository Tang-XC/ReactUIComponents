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
export interface rangeProps extends Omit<datePickerProps, 'value' | 'defaultValue' | 'placeholder' | 'onChange'> {
  value?: [Date, Date];
  defaultValue?: [Date, Date];
  placeholder?: [string, string];
  onChange?: (val: [Date, Date]) => void
}
export interface panelProps {
  currentDate?: Date;
  rangeCurrentData?: [Date | null, Date | null];
  viewDate?: Date;
  hoverDate?: Date | null;
  isRange?: boolean;
  onChange?: (date: Date) => void;
  onHover?: (date: Date) => void;
  setToday?: () => void;
}
export const DATEPICKER_SIZE_MAP: Record<datePickerSize, string> = {
  small: "py-0 text-sm",
  default: "py-1 text-md",
  large: "py-1.5 text-lg [&_input]:h-6",
};