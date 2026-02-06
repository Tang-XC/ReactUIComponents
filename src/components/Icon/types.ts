type iconVariant = 'primary' | 'success' | 'danger' | 'warning';
export interface iconProps {
  className?: string;
  style?: React.CSSProperties;
  name: string;
  size?: number | string;
  color?: string;
  variant?: iconVariant
}
export const ICON_VARIANT_MAP: Record<iconVariant, string> = {
  primary: 'fill-primary-500',
  success: 'fill-success-500',
  danger: 'fill-danger-500',
  warning: 'fill-warning-500',
}