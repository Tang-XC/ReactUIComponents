import { useMemo } from "react";
import type { iconProps } from "./types";
import { ICON_VARIANT_MAP } from "./types";
import { cn } from "@/utils/tools";
export const Icon: React.FC<iconProps> = function (props) {
  const { className = "", style, name, size, color = "inherit", variant } = props;
  const variantClass = useMemo(() => {
    if (variant) {
      return ICON_VARIANT_MAP[variant];
    }
    return "fill-current";
  }, [variant, color]);
  const classes = cn(variantClass, className);
  const symbolId = useMemo(() => `#icon-${name}`, [name]);
  return (
    <svg
      className={classes}
      style={{
        width: "1.5em",
        height: "1.5em",
        fontSize: size,
        color: color,
        display: "inline-block",
        ...style,
      }}>
      <use href={symbolId} />
    </svg>
  );
};
