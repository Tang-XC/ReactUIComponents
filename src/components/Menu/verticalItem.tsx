import { useMemo, useState, useContext, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import type { menuItemProps, item } from "./types";
import { context } from "./index";
import MenuItem from "./verticalItem";
export default function (props: menuItemProps) {
  const { itemData } = props;
  const selectedStyle = "bg-primary-700 text-primary-300";
  const { selectedKeys, setSelectedKeys, size } = useContext(context);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const subRef = useRef(null);
  const hasSubMenu = useMemo(() => itemData.children && itemData.children?.length > 0, [itemData]);
  const isSelected = useMemo(() => selectedKeys?.includes(itemData.key), [selectedKeys]);
  const toggleCollapsed = (val: boolean) => {
    setIsCollapsed(val);
  };
  const handleClick = () => {
    if (!hasSubMenu) {
      setSelectedKeys?.(itemData.key);
    }

    toggleCollapsed(!isCollapsed);
  };
  const openSub = () => {
    const traverse = (list: item[]) => {
      for (let item of list) {
        if (selectedKeys?.includes(item.key)) {
          toggleCollapsed(false);
        }
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        }
      }
    };
    if (itemData.children) traverse(itemData.children);
  };
  const RenderSub = () => {
    return (
      <CSSTransition
        nodeRef={subRef}
        in={!isCollapsed}
        timeout={300}
        classNames="fadeInDown"
        unmountOnExit>
        <ul ref={subRef} className="ml-7 pl-1.5 border-l-2 border-neutral-200">
          {itemData.children!.map((item) => {
            return <MenuItem itemData={item} key={`sub-${item.key}`} />;
          })}
        </ul>
      </CSSTransition>
    );
  };
  useEffect(() => {
    openSub();
  }, [selectedKeys]);
  return (
    <li className="mb-1 last:mb-0">
      <Button
        className={`w-full ${size === "mini" ? "h-[30]" : "h-[44px]"} ${isSelected && selectedStyle}`}
        icon={itemData.icon}
        size={size}
        effect="text"
        onClick={handleClick}>
        <div className="flex items-center">
          <div className="flex-1">{itemData.label}</div>
          {hasSubMenu && <Icon name={isCollapsed ? "down" : "up"} />}
        </div>
      </Button>
      {hasSubMenu && RenderSub()}
    </li>
  );
}
