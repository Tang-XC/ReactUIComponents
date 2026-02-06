import type { inputProps } from "../Input/types";
export interface autoCompleteProps extends Omit<inputProps, "onSelect"> {
  options?: string[];
  popupWidth?: string | number;
  fetchOptions?: () => Promise<string[]>;
  onSelect?: (val: string) => void;
}
