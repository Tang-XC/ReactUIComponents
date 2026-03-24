import { forwardRef } from "react";
import { type messageConfig, type messageType, MESSAGE_TYPE_MAP } from "./types";
export default forwardRef<HTMLDivElement, messageConfig>((props: messageConfig, ref) => {
  const { content, type = "neutral" } = props;
  const iconMap: Record<messageType, string> = {
    success: "success",
    danger: "danger",
    warning: "warning",
    neutral: "info",
  };
  return (
    <div ref={ref} className="w-fit p-3 flex items-center shadow-lg bg-white rounded-xl">
      <div className={`${MESSAGE_TYPE_MAP[type]}`}>
        <Icon name={iconMap[type]} />
      </div>
      <div className="ml-2">{content}</div>
    </div>
  );
});
