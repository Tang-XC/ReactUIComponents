import type { Placement } from "@floating-ui/react-dom";
export type triggerType = "click" | "hover" | "focus";
export interface popoverProps {
  title?: String;
  content: React.ReactNode;
  placement?: Placement;
  open?: boolean;
  hasArrow?: boolean;
  offset?: number;
  children: React.ReactNode;
  trigger?: triggerType;
  contentClass?: string;
  contentStyle?: React.CSSProperties;
  onOpenChange?: (type: boolean) => void;
}
