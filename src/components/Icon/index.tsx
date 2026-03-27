import type { FC, SVGProps } from "react";
const icons = import.meta.glob<FC<SVGProps<SVGSVGElement>>>("./icons/*.svg", {
  eager: true,
  query: "?react",
  import: "default", // 表示取默认导出
});
const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {};
for (const path in icons) {
  const match = path.match(/\/([^/]+)\.svg$/);
  if (match) {
    const name = match[1];
    iconMap[name] = icons[path];
  }
}
console.log("iconMap", iconMap);
export type iconVariant = "primary" | "success" | "danger" | "warning" | "neutral";
export const ICON_VARIANT_MAP: Record<iconVariant, string> = {
  primary: "fill-primary-500",
  success: "fill-success-500",
  danger: "fill-danger-500",
  warning: "fill-warning-500",
  neutral: "fill-neutral-500",
};
export interface iconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof iconMap;
  size?: number | string;
  color?: string;
  variant?: iconVariant;
}

export const Icon: React.FC<iconProps> = (props) => {
  const { name, size = 20, color, variant } = props;
  const SvgComponent = iconMap[name];
  if (!SvgComponent) {
    throw new Error(`Icon ${name} not found`);
  }
  return (
    <SvgComponent
      className={`${variant ? ICON_VARIANT_MAP[variant] : ""}`}
      width={size}
      height={size}
      fill={color}
      stroke={color}
      {...props}
    />
  );
};
