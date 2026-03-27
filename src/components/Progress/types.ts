export type progressVariant = 'primary' | 'success' | 'danger' | 'warning'
export interface progressProps {
  width?: number | string;
  strokeWidth?: number | string;
  variant?: progressVariant;
  showText?: boolean;
  percentage: number;
}
export const PROGRESS_VARIANT_MAP: Record<progressVariant, string> = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
}