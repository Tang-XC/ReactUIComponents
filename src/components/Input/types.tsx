import type { InputHTMLAttributes } from "react";

export type inputSize = "small" | "default" | "large";
export type inputEffect = "outlined" | "filled" | "borderless" | "underlined";
export interface inputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "prefix"
> {
  disabled?: boolean;
  size?: inputSize;
  clearable?: boolean;
  placeholder?: string;
  effect?: inputEffect;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}
export const INPUT_SIZE_MAP: Record<inputSize, string> = {
  small: " py-0 text-sm",
  default: "py-1 text-md",
  large: "py-1.5 text-lg [&_input]:h-[24px]",
};
export const INPUT_EFFECT_MAP: Record<inputEffect, string> = {
  outlined: "rounded-sm shadow-border",
  filled: "rounded-sm bg-neutral-100",
  borderless: "",
  underlined: "border-b-1 border-neutral-500! shadow-none",
};
