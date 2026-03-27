import { useMemo, useState } from "react";
import type { panelProps } from "./types";
import { Button, Icon } from "@/components/index";
export default function (props: panelProps) {
  const {
    currentDate = new Date(),
    viewDate = new Date(),
    rangeCurrentData = [],
    hoverDate,
    isRange,
    onChange,
    onHover,
    setToday,
  } = props;
  const [innerView, setInnerView] = useState(viewDate);
  const weekList = ["日", "一", "二", "三", "四", "五", "六"];
  const year = useMemo(() => innerView.getFullYear(), [innerView]);
  const month = useMemo(() => innerView.getMonth(), [innerView]);
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const daysInLastMonth = useMemo(() => new Date(year, month, 0).getDate(), [year, month]);
  const firstDay = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);
  const handlePrev = () => {
    setInnerView(new Date(year, month - 1, 1));
  };
  const handleNext = () => {
    setInnerView(new Date(year, month + 1, 1));
  };
  const compareDate = (date: Date, val: Number): boolean => {
    const innerYear = innerView.getFullYear();
    const innerMonth = innerView.getMonth();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return day === val && year === innerYear && innerMonth === month;
  };
  const rangedStyle = (val: number, month: number) => {
    const toDateOnly = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    if (rangeCurrentData.length > 1 && rangeCurrentData[0] && hoverDate) {
      const valDate = new Date(innerView.getFullYear(), month, val);
      const startDate = toDateOnly(rangeCurrentData[0]);
      const endDate = toDateOnly(hoverDate);
      if (valDate >= startDate && valDate <= endDate) {
        return "bg-primary-100";
      }
    }
    return "";
  };
  const selectedStyle = (val: number) => {
    if (isRange) {
      if (rangeCurrentData.length > 1) {
        let flag = false;
        if (
          rangeCurrentData.length > 0 &&
          rangeCurrentData[0] &&
          compareDate(rangeCurrentData[0], val)
        ) {
          flag = true;
        }
        if (
          rangeCurrentData.length > 1 &&
          rangeCurrentData[1] &&
          compareDate(rangeCurrentData[1], val)
        ) {
          flag = true;
        }
        return flag ? "bg-primary-500 text-primary-100" : "";
      }
    } else {
      return compareDate(currentDate, val) ? "bg-primary-500 text-primary-100" : "";
    }
  };
  return (
    <div className="p-2 max-w-83.75">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-xl">
          <div>{year} 年</div>
          <div>{month + 1} 月</div>
        </div>
        <div>
          <Button
            size="mini"
            effect="text"
            icon={<Icon name="left" />}
            onClick={handlePrev}></Button>
          <Button
            size="mini"
            effect="text"
            icon={<Icon name="right" />}
            onClick={handleNext}></Button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-wrap max-w-4xl text-center mx-auto">
        {weekList.map((item, index) => (
          <div className="w-10 h-10 grid place-content-center" key={index}>
            {item}
          </div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => i)
          .reverse()
          .map((item) => (
            <div
              className={`w-10 h-10 grid place-content-center text-disabled ${rangedStyle(item + 1, innerView.getMonth())}`}
              key={item}>
              {daysInLastMonth - item}
            </div>
          ))}
        {Array.from({ length: daysInMonth }, (_, i) => i).map((item) => (
          <div
            className={`w-10 h-10 grid place-content-center cursor-pointer ${rangedStyle(item + 1, innerView.getMonth())}`}
            key={item}
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(new Date(innerView.getFullYear(), innerView.getMonth(), item + 1));
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              onHover?.(new Date(innerView.getFullYear(), innerView.getMonth(), item + 1));
            }}>
            <div
              className={`w-8 h-8 grid place-content-center hover:bg-primary-300 ${selectedStyle(item + 1)}`}>
              {item + 1}
            </div>
          </div>
        ))}
        {Array.from({ length: 42 - daysInMonth - firstDay }, (_, i) => i).map((item) => (
          <div
            className={`w-10 h-10 grid place-content-center text-disabled  ${rangedStyle(item + 1, innerView.getMonth() + 1)}`}>
            {item + 1}
          </div>
        ))}
      </div>
      {setToday && (
        <div className="mt-2">
          <Button size="small" className="w-full" onClick={setToday}>
            今天
          </Button>
        </div>
      )}
    </div>
  );
}
