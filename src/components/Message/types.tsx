export type messageType = "success" | "danger" | "warning" | "neutral";

export interface messageConfig {
  content?: string;
  type?: messageType;
  duration?: number;
  id?: string;
  nodeRef?: React.RefObject<HTMLDivElement | null>;
}
export interface messageCall extends Pick<messageConfig, "content" | "duration"> {}
export const MESSAGE_TYPE_MAP: Record<messageType, string> = {
  success: "text-success-500",
  danger: "text-danger-500",
  warning: "text-warning-500",
  neutral: "text-neutral-500",
};
