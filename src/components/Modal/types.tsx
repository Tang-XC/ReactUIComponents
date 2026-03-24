export interface modalProps extends React.ComponentPropsWithoutRef<"dialog"> {
  classNames?: string;
  style?: React.CSSProperties;
  title?: string;
  open?: boolean;
  children?: React.ReactNode;
  showClose?: boolean;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
}
