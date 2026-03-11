import { type modalProps } from "./types";
export const Modal: React.FC<modalProps> = (props: modalProps) => {
  const { className, style, ...restProps } = props;
  return (
    <div className={className} style={style}>
      Hello World
    </div>
  );
};
