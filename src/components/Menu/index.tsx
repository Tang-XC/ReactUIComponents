import type { menuProps, contextType } from "./types";
import VerticalItem from "./verticalItem";
import HorizontalItem from "./horizontalItem";
import { createContext, useEffect, useState } from "react";
export const context = createContext<contextType>({});
export const Menu: React.FC<menuProps> = function (props) {
  const {
    className = "",
    style,
    items,
    mode = "vertical",
    size = "mini",
    selectedKeys = [],
    multiple = false,
    onSelect,
  } = props;
  const [currentSelectedKeys, setCurrentSelectedKeys] = useState<string[]>(selectedKeys);
  const setSelectedKeys = (key: string) => {
    onSelect?.(key, selectedKeys);
    if (multiple) {
      if (currentSelectedKeys.includes(key)) {
        setCurrentSelectedKeys(currentSelectedKeys.filter((item) => item !== key));
      } else {
        setCurrentSelectedKeys([...currentSelectedKeys, key]);
      }
    } else {
      setCurrentSelectedKeys([key]);
    }
  };

  return (
    <context.Provider
      value={{
        size: size,
        selectedKeys: currentSelectedKeys,
        setSelectedKeys,
      }}>
      <ul
        className={`w-full ${className} flex ${mode === "vertical" ? "flex-col" : "flex-row"}`}
        style={style}>
        {items.map((item) => {
          return mode === "vertical" ? (
            <VerticalItem itemData={item} key={item.key} />
          ) : (
            <HorizontalItem itemData={item} key={item.key} />
          );
        })}
      </ul>
    </context.Provider>
  );
};
