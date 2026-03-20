import { type progressProps, PROGRESS_VARIANT_MAP } from "./types";

export const Progress: React.FC<progressProps> = (props) => {
  const {
    variant = "primary",
    percentage = 0,
    width = "100%",
    strokeWidth = "8px",
    showText = true,
  } = props;
  return (
    <div
      className="flex items-center"
      style={{
        width,
        height: strokeWidth,
      }}>
      <div className="w-full h-full bg-neutral-200">
        <div
          className={`h-full ${PROGRESS_VARIANT_MAP[variant]}`}
          style={{
            width: percentage + "%",
          }}></div>
      </div>
      {showText && <div className="ml-3">{percentage}%</div>}
    </div>
  );
};
