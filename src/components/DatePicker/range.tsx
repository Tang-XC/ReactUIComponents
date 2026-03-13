import { useState, useMemo, useEffect } from "react";
import useClickOutSide from "@/hooks/useClickOutSide";
import type { rangeProps } from "./types";
import Panel from "./panel";
export default function (props: rangeProps) {
  const {
    className,
    style,
    size = "default",
    placeholder,
    disabled,
    onChange,
    ...restProps
  } = props;
  const { ref, isFocus, setIsFocus } = useClickOutSide();
  const [startTime, setStartTime] = useState(
    restProps.defaultValue && restProps.defaultValue.length > 0
      ? new Date(restProps.defaultValue[0])
      : null,
  );
  const [endTime, setEndTime] = useState(
    restProps.defaultValue && restProps.defaultValue.length > 1
      ? new Date(restProps.defaultValue[1])
      : null,
  );
  const mergedValueStart = useMemo(() => {
    const isControlled = "value" in restProps && restProps.value instanceof Array;
    if (isControlled) {
      if (restProps.value && restProps.value?.length > 0) {
        return new Date(restProps.value[0]);
      } else {
        return null;
      }
    }
    return startTime;
  }, [restProps.value, startTime]);
  const mergedValueEnd = useMemo(() => {
    const isControlled = "value" in restProps && restProps.value instanceof Array;
    if (isControlled) {
      if (restProps.value && restProps.value?.length > 1) {
        return new Date(restProps.value[1]);
      } else {
        return null;
      }
    }
    return endTime;
  }, [restProps.value, endTime]);
  const [hoverDate, setHoverDate] = useState(mergedValueEnd ? mergedValueEnd : null);
  const focusStyle = useMemo(
    () => (isFocus ? "border-transparent shadow-focus! bg-transparent" : ""),
    [isFocus],
  );
  const disabledStyle = useMemo(
    () => (disabled ? "pointer-events-none opacity-50 bg-disabled" : ""),
    [disabled],
  );
  const getViewData = () => {
    if (mergedValueEnd) {
      return {
        start: new Date(mergedValueEnd.getFullYear(), mergedValueEnd.getMonth() - 1),
        end: mergedValueEnd,
      };
    } else {
      let date = new Date();
      return {
        start: date,
        end: new Date(date.getFullYear(), date.getMonth() + 1),
      };
    }
  };
  const formateTime = (date: Date | unknown): string | null => {
    if (!(date instanceof Date)) {
      return null;
    }
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  const handleHover = (date: Date) => {
    setHoverDate(date);
  };
  const restoreHoverDate = () => {
    setHoverDate(mergedValueEnd);
  };
  const handleClick = () => {
    if (disabled) return;
    setIsFocus(true);
  };
  const handleChange = (date: Date) => {
    if (startTime === date || endTime === date) {
      setStartTime(null);
      setEndTime(null);
      return;
    }
    if (!startTime || date < startTime) {
      setStartTime(date);
      setEndTime(null);
      return;
    }
    if (date >= startTime) {
      setEndTime(date);
      onChange?.([startTime, date]);
      setIsFocus(false);
    }
  };
  useEffect(() => {
    restoreHoverDate();
  }, [isFocus]);
  return (
    <div
      ref={ref}
      className={`w-full flex items-center px-2.5 box-border rounded-sm shadow-border hover:shadow-hover ${className} ${focusStyle} ${disabledStyle} ${DATEPICKER_SIZE_MAP[size]}`}
      style={style}
      onClick={handleClick}>
      <Popover
        trigger="click"
        hasArrow={false}
        open={isFocus}
        className="w-full"
        contentStyle={{ width: 664 }}
        content={
          <div className="flex justify-between" onMouseLeave={restoreHoverDate}>
            <Panel
              rangeCurrentData={[startTime, endTime]}
              viewDate={getViewData().start}
              isRange={true}
              hoverDate={hoverDate}
              onChange={handleChange}
              onHover={handleHover}
            />
            <Panel
              rangeCurrentData={[startTime, endTime]}
              viewDate={getViewData().end}
              isRange={true}
              hoverDate={hoverDate}
              onChange={handleChange}
              onHover={handleHover}
            />
          </div>
        }>
        <div className="w-full h-5.5 flex items-center ">
          <div className="flex-1 text-center">
            {formateTime(mergedValueStart) || (
              <div className="text-neutral-400">{placeholder && placeholder[0]}</div>
            )}
          </div>
          <Icon name="to" color="#999999" />
          <div className="flex-1 text-center">
            {formateTime(mergedValueEnd) || (
              <div className="text-neutral-400">{placeholder && placeholder[1]}</div>
            )}
          </div>
          <Icon name="date" color="#999999" />
        </div>
      </Popover>
    </div>
  );
}
