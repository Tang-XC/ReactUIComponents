import { useEffect, useRef, useState, type ComponentRef, useMemo, useCallback } from "react";
import type { autoCompleteProps } from "./types";
import { debounce } from "@/utils/tools";

export const AutoComplete: React.FC<autoCompleteProps> = (props) => {
  const {
    options = [],
    value: propsValue,
    defaultValue = "",
    popupWidth = "auto",
    fetchOptions,
    onSelect,
    onChange,
    ...restProps
  } = props;

  const inputRef = useRef<ComponentRef<typeof Input>>(null);
  const isControlled = propsValue !== undefined;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const mergedValue = isControlled ? propsValue : innerValue;
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [currentPopupWidth, setCurrentPopupWidth] = useState<string | number>(popupWidth);
  const performSearch = useCallback(
    async (searchValue: string) => {
      if (fetchOptions) {
        try {
          const result = await fetchOptions();
          setCurrentOptions(result || []);
        } catch (err) {
          console.error("fetchOptions error", err);
          setCurrentOptions([]);
        }
      } else {
        const result = options.filter((item) => item.includes(searchValue));
        setCurrentOptions(result);
      }
    },
    [fetchOptions, options],
  );
  const debouncedSearch = useMemo(() => {
    return debounce(performSearch, 300);
  }, [performSearch]);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    if (!isControlled) {
      setInnerValue(newValue);
    }
    onChange?.(evt);
    debouncedSearch(newValue);
  };
  const handleSelect = (val: string) => {
    if (!isControlled) {
      setInnerValue(val);
    }
    setCurrentOptions([]);
    onSelect?.(val);
  };
  useEffect(() => {
    if (popupWidth === "auto" && inputRef.current) {
      setCurrentPopupWidth(inputRef.current.offsetWidth);
    }
  }, [popupWidth]);

  const renderMenu = () => {
    if (currentOptions.length === 0) return null;
    return (
      <Menu
        style={{ width: currentPopupWidth }}
        onSelect={handleSelect}
        items={currentOptions.map((item) => ({ label: item, key: item }))}
      />
    );
  };

  return (
    <div>
      <Popover
        trigger="focus"
        hasArrow={false}
        content={mergedValue !== "" && currentOptions.length > 0 ? renderMenu() : null}
        placement="bottom">
        <Input ref={inputRef} value={mergedValue} onChange={handleChange} {...restProps} />
      </Popover>
    </div>
  );
};
