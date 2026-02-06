import { useMemo, useState, useContext } from "react";
import type { menuItemProps } from "./types";
import { context } from "./index";
import MenuItem from "./horizontalItem";
import { Popover } from "../Popover";
export default function (props: menuItemProps) {
  const { itemData, asChild } = props;
  const selectedStyle = "bg-primary-700 text-primary-300";
  const { selectedKeys, setSelectedKeys, size } = useContext(context);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const hasSubMenu = useMemo(() => itemData.children && itemData.children?.length > 0, [itemData]);
  const isSelected = useMemo(() => selectedKeys?.includes(itemData.key), [selectedKeys]);
  const iconName = useMemo(() => {
    if (asChild) {
      return isCollapsed ? "right" : "left";
    } else {
      return isCollapsed ? "down" : "up";
    }
  }, [isCollapsed, asChild]);
  const handleClick = () => {
    if (!hasSubMenu) {
      setSelectedKeys?.(itemData.key);
    }
  };
  const handleVisibleChange = (val: boolean) => {
    setIsCollapsed(!val);
  };
  const RenderSub = (
    <ul className="border-neutral-200">
      {itemData.children &&
        itemData.children.map((item) => {
          return <MenuItem asChild itemData={item} key={`sub-${item.key}`} />;
        })}
    </ul>
  );
  return (
    <li className={`my-1 ${asChild ? "min-w-[180px]" : "min-w-[200px]"}`}>
      <Popover
        placement={asChild ? "right" : "bottom"}
        offset={asChild ? 16 : 12}
        hasArrow={!asChild}
        content={hasSubMenu && RenderSub}
        onVisibleChange={handleVisibleChange}>
        <Button
          className={`w-full h-[44px] ${isSelected && selectedStyle}`}
          icon={itemData.icon}
          size={size}
          effect="text"
          onClick={handleClick}>
          <div className="flex items-center">
            <div className="flex-1">{itemData.label}</div>
            {hasSubMenu && <Icon name={iconName} />}
          </div>
        </Button>
      </Popover>
    </li>
  );
}
