import {
  type buttonProps,
  LIGHTER_BUTTON_BG,
  BUTTON_VARIANT_MAP,
  BUTTON_VARIANT_MAP_ACTIVE,
  BUTTON_VARIANT_MAP_HOVER,
  BUTTON_VARIANT_MAP_BORDER,
  BUTTON_VARIANT_MAP_TEXT,
  BUTTON_SIZE_MAP,
} from "./types";
import { cn } from "@/utils/tools";
import { useMemo } from "react";
export const Button: React.FC<buttonProps> = function (props: buttonProps) {
  const {
    className = "",
    variant = "primary",
    icon,
    size = "default",
    effect = "solid",
    children,
    disabled,
    ...restProps
  } = props;
  const baseClass =
    "inline-block text-neutral-300 font-semibold select-none transition-all box-border border-2 border-transparent cursor-pointer";
  const variantClass = BUTTON_VARIANT_MAP[variant];
  const pseudoClass = `${BUTTON_VARIANT_MAP_ACTIVE[variant]} ${BUTTON_VARIANT_MAP_HOVER[variant]}`;
  const sizeClass = BUTTON_SIZE_MAP[size];
  const disabledClass = disabled && "bg-disabled pointer-events-none";
  const effectClass = useMemo(() => {
    if (effect === "outlined") {
      return `border-2 bg-transparent ${LIGHTER_BUTTON_BG[variant]} ${BUTTON_VARIANT_MAP_BORDER[variant]} ${BUTTON_VARIANT_MAP_TEXT[variant]}`;
    }
    if (effect === "text") {
      return `bg-transparent ${BUTTON_VARIANT_MAP_TEXT[variant]} border-transparent`;
    }
    return "";
  }, [effect, variant]);
  const classes = cn(
    baseClass,
    variantClass,
    pseudoClass,
    disabledClass,
    sizeClass,
    effectClass,
    className,
  );
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      <div className="w-full flex items-center gap-3">
        {icon}
        <div className="text-md flex-1 text-left text-nowrap">{children}</div>
      </div>
    </button>
  );
};
