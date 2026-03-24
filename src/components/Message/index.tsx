import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { type messageConfig, type messageCall } from "./types";
import Message from "./message";
import { createRoot } from "react-dom/client";
let messageQueue: messageConfig[] = [];
let addMessage: ((msg: messageConfig) => void) | null = null;

const MessageContainer: React.FC = () => {
  const [messages, setMessages] = useState<messageConfig[]>([]);
  useEffect(() => {
    addMessage = (msg: messageConfig) => {
      const id = msg.id || Math.random().toString(36).substring(2, 9);
      const nodeRef = React.createRef<HTMLDivElement>();
      const newMsg = { ...msg, id, nodeRef };
      setMessages((prev) => [...prev, newMsg]);
      const duration = msg.duration !== undefined ? msg.duration : 3000;
      if (duration > 0) {
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => m.id !== id));
        }, duration);
      }
    };
    while (messageQueue.length > 0) {
      const msg = messageQueue.shift();
      if (msg && addMessage) addMessage(msg);
    }
  }, []);
  return (
    <div className="fixed top-8 left-0 right-0 z-[9999] pointer-events-none flex flex-col items-center gap-3">
      <TransitionGroup component={null}>
        {messages.map((msg) => (
          <CSSTransition
            key={msg.id}
            timeout={300}
            nodeRef={msg.nodeRef}
            classNames={{
              enter: "opacity-0 -translate-y-4 scale-95",
              enterActive:
                "opacity-100 translate-y-0 scale-100 transition-all duration-300 ease-out",
              exit: "opacity-100 translate-y-0 scale-100",
              exitActive:
                "!opacity-0 !-translate-y-4 !scale-95 transition-all duration-200 ease-in",
            }}>
            <Message ref={msg.nodeRef} {...msg} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
let isInitialized = false;
const initMessageManger = () => {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(<MessageContainer />);
};
export const message = {
  open: (config: messageConfig) => {
    if (addMessage) {
      addMessage(config);
    } else {
      messageQueue.push(config);
      initMessageManger();
    }
  },
  info: (props: messageCall) =>
    message.open({
      type: "neutral",
      ...props,
    }),
  success: (props: messageCall) =>
    message.open({
      type: "neutral",
      ...props,
    }),
  danger: (props: messageCall) =>
    message.open({
      type: "neutral",
      ...props,
    }),
  warning: (props: messageCall) =>
    message.open({
      type: "neutral",
      ...props,
    }),
};
