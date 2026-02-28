import { useMemo, useState } from "react";
import type { pannelProps } from "./types";
export default function (props: pannelProps) {
  const { value = new Date(), current = new Date(), prev, next, onChange } = props;

  const weekList = ["日", "一", "二", "三", "四", "五", "六"];
  const year = current.getFullYear();
  const month = current.getMonth();
  const _year = value.getFullYear();
  const _month = value.getMonth();
  const _day = value.getDate();
  const [day, setDay] = useState(current.getDate());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const isSelected = (val: number) => {
    return _day === val + 1 && year === _year && month === _month;
  };
  const handlePrev = () => {
    prev?.(year, month);
    setDay(_day);
  };
  const handleNext = () => {
    next?.(year, month);
    setDay(_day);
  };
  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-xl gap-2">
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
      <div className="grid grid-cols-7 gap-2 max-w-4xl text-center mx-auto">
        {weekList.map((item, index) => (
          <div className="w-9 h-9" key={index}>
            {item}
          </div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => i).map((item) => (
          <div className="w-9 h-9" key={item}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i).map((item) => (
          <div
            className={`w-9 h-9 grid place-content-center cursor-pointer hover:bg-primary-300 ${isSelected(item) ? "bg-primary-500 text-primary-100" : ""}`}
            key={item}
            onClick={() => onChange?.(item + 1)}>
            {item + 1}
          </div>
        ))}
        {Array.from({ length: 42 - daysInMonth - firstDay }, (_, i) => i).map((item) => (
          <div className="w-9 h-9" key={item}></div>
        ))}
      </div>
    </div>
  );
}
