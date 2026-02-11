import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import {
  useInteractions,
  useFloating,
  useHover,
  useClick,
  offset as offsetVal,
  arrow,
  FloatingArrow,
  flip,
  useDismiss,
  safePolygon,
  autoUpdate,
  useFocus,
} from "@floating-ui/react";

import type { popoverProps } from "./types";
export const Popover: React.FC<popoverProps> = function (props) {
  const {
    title,
    content,
    placement = "bottom",
    hasArrow = true,
    offset = 12,
    children,
    contentClass,
    contentStyle,
    trigger = "hover",
    onOpenChange,
  } = props;
  const arrowRef = useRef(null);
  const contentRef = useRef(null);
  const [show, setShow] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: show,
    onOpenChange: (nextShow) => {
      setShow(nextShow);
      onOpenChange?.(nextShow);
    },
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offsetVal(offset),
      arrow({
        element: arrowRef,
      }),
      flip(),
    ],
  });
  const hover = useHover(context, {
    enabled: trigger === "hover",
    handleClose: safePolygon(),
    delay: { close: 150 },
  });

  const click = useClick(context, {
    enabled: trigger === "click",
  });

  // 新增：Focus 交互
  const focus = useFocus(context, {
    enabled: trigger === "focus",
  });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, focus, dismiss]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {content ? (
        <CSSTransition
          nodeRef={contentRef}
          in={show}
          timeout={300}
          classNames="zoomIn"
          unmountOnExit>
          <div ref={contentRef} className="absolute origin-center">
            <div
              className={`bg-white p-2 rounded-sm shadow-around ${contentClass}`}
              ref={refs.setFloating}
              style={{ ...floatingStyles, ...(contentStyle || {}) }}
              {...getFloatingProps()}>
              {content}
              {hasArrow && (
                <FloatingArrow ref={arrowRef} context={context} fill="#fff" stroke="#000" />
              )}
            </div>
          </div>
        </CSSTransition>
      ) : null}
    </>
  );
};
