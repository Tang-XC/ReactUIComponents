import { useEffect, useRef } from "react";
import { type modalProps } from "./types";
import { CSSTransition } from "react-transition-group";
import { Button, Icon } from "@/components/index";
import "./style.css";

export const Modal: React.FC<modalProps> = (props: modalProps) => {
  const {
    className = "",
    style,
    title = "标题",
    open = false,
    children,
    showClose = true,
    customHeader,
    customFooter,
    onClose,
    onConfirm,
  } = props;
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleEscape = (e?: KeyboardEvent) => {
    if (e?.key === "Escape") onClose?.();
  };
  const handleClose = () => {
    onClose?.();
  };
  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
      window.addEventListener("keydown", handleEscape);
    } else {
      window.removeEventListener("keydown", handleEscape);
    }
  }, [open]);
  return (
    <CSSTransition in={open} timeout={300} classNames="popUp" unmountOnExit nodeRef={modalRef}>
      <dialog
        ref={modalRef}
        className={`modal rounded-xl m-auto max-w-[96%] ::backdrop ${className}`}
        style={style}>
        <div className="min-w-125 overflow-hidden p-3">
          {customHeader ? (
            customHeader
          ) : (
            <div className="flex justify-between items-center">
              <div className="text-xl">{title}</div>
              {showClose && (
                <Button variant="danger" size="mini" effect="text" onClick={handleClose}>
                  <Icon name="close" />
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
        {customFooter ? (
          customFooter
        ) : (
          <div className="p-3 flex gap-2 justify-end">
            <Button size="small" effect="text" variant="neutral" onClick={handleClose}>
              取消
            </Button>
            <Button size="small" onClick={onConfirm}>
              确认
            </Button>
          </div>
        )}
      </dialog>
    </CSSTransition>
  );
};
