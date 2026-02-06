export type menuMode = "vertical" | "horizontal";
export type menuSize = 'mini' | 'small' | 'default' | 'large'
export interface item {
  label: string;
  key: string;
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
  selectedKeys?: string[];
  multiple?: boolean;
  items: item[];
  size?: menuSize;
  onSelect?: (selectedKey: string, selectedKeys: string[]) => void;
}
export interface contextType {
  size?: menuSize;
  selectedKeys?: string[];
  setSelectedKeys?: (key: string) => void;
}