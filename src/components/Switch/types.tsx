export type switchSize = "small" | "default" | "large";
export type switchVariant = "primary" | "success" | "danger" | "warning";
export interface switchProps {
  className?: string;
  style?: React.CSSProperties;
  size?: switchSize;
  defaultValue?: boolean;
  value?: boolean;
  disabled?: boolean;
  variant?: switchVariant;
  onChange?: (val: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const SWITCH_SIZE_MAP: Record<switchSize, any> = {
  small: {
    track: "w-10 h-5",
    thumb: "w-15 h-5",
    dot: "w-5 h-5",
  },
  default: {
    track: "w-12 h-6",
    thumb: "w-18 h-6",
    dot: "w-6 h-6",
  },
  large: {
    track: "w-14 h-7",
    thumb: "w-21 h-7",
    dot: "w-7 h-7",
  },
};
export const SWITCH_VARIANT_MAP: Record<switchVariant, string> = {
  primary: "bg-primary-500",
  success: "bg-success-500",
  danger: "bg-danger-500",
  warning: "bg-warning-500",
};
