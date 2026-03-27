import { useState } from "react";
import type { draggerProps } from "./types";
export default function (props: draggerProps) {
  const { children, onFile } = props;
  const [dragOver, setDragOver] = useState(false);
  const dragOverStyle = "bg-primary-100 text-primary-700 border-primary-700";
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={`w-full h-full p-3 grid place-items-center rounded-xl border-1 border-neutral-400 border-dashed cursor-pointer ${dragOver ? dragOverStyle : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      {children}
    </div>
  );
}
