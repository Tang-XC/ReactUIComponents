export type menuMode = "vertical" | "horizontal";
export type menuSize = 'mini' | 'small' | 'default' | 'large'
export interface item {
  label: string;
  key: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: item[];
}
export interface menuItemProps {
  itemData: item;
  asChild?: boolean;
}
export interface menuProps {
  className?: string;
  style?: React.CSSProperties;
  mode?: menuMode;
  selectedKeys?: (string | number)[];
  multiple?: boolean;
  items: item[];
  size?: menuSize;
  onSelect?: (selectedKey: string | number, selectedKeys: (string | number)[]) => void;
}
export interface contextType {
  size?: menuSize;
  selectedKeys?: (string | number)[];
  setSelectedKeys?: (key: string | number) => void;
}