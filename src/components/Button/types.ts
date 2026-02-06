export type buttonVariant = 'primary' | 'success' | 'danger' | 'warning'
export type buttonEffect = 'outlined' | 'solid' | 'text'
export type buttonSize = 'mini' | 'small' | 'default' | 'large'

interface BaseButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: buttonSize;
  variant?: buttonVariant;
  effect?: buttonEffect;
  icon?: React.ReactNode;
}
export type buttonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export const BUTTON_VARIANT_MAP: Record<buttonVariant, string> = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
}
export const LIGHTER_BUTTON_BG: Record<buttonVariant, string> = {
  primary: 'hover:bg-primary-100',
  success: 'hover:bg-success-100',
  danger: 'hover:bg-danger-100',
  warning: 'hover:bg-warning-100',
}
export const BUTTON_VARIANT_MAP_ACTIVE: Record<buttonVariant, string> = {
  primary: 'active:bg-primary-700 active:text-primary-300',
  success: 'active:bg-success-700 active:text-success-300',
  danger: 'active:bg-danger-700 active:text-danger-300',
  warning: 'active:bg-warning-700 active:text-warning-300',
}
export const BUTTON_VARIANT_MAP_HOVER: Record<buttonVariant, string> = {
  primary: 'hover:bg-primary-300 hover:text-primary-700',
  success: 'hover:bg-success-300 hover:text-success-700',
  danger: 'hover:bg-danger-300 hover:text-danger-700',
  warning: 'hover:bg-warning-300 hover:text-warning-700',
}
export const BUTTON_VARIANT_MAP_BORDER: Record<buttonVariant, string> = {
  primary: 'border-primary-500',
  success: 'border-success-500',
  danger: 'border-danger-500',
  warning: 'border-warning-500',
}
export const BUTTON_VARIANT_MAP_TEXT: Record<buttonVariant, string> = {
  primary: 'text-primary-500',
  success: 'text-success-500',
  danger: 'text-danger-500',
  warning: 'text-warning-500',
}
export const BUTTON_SIZE_MAP: Record<buttonSize, string> = {
  mini: 'px-2 py-1',
  small: 'px-4 py-2',
  default: 'px-6 py-3',
  large: 'px-8 py-4',
}
