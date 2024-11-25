import Image from "next/image";
import React, { useState, useRef, useEffect, FC } from "react";

interface CalendarInputProps {
  label?: string;
  selectedDate?: Date | null;
  onDateChange?: (date: Date | null) => void;
  value: any;
  error: any;
}

const CalendarInput: FC<CalendarInputProps> = ({
  label,
  selectedDate: initialSelectedDate = null,
  onDateChange,
  error,
  value,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate,
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const years = Array.from(
    { length: 101 },
    (_, i) => i + (new Date().getFullYear() - 50),
  ); // Range of 50 years back and forward

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const generateDates = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const dates = Array(firstDay).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  const handleDateSelect = (day: number | null) => {
    if (day) {
      const newDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(newDate);
      onDateChange && onDateChange(newDate);
      setIsOpen(false);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(event.target.value));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(event.target.value));
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative w-full" ref={calendarRef}>
      <span className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-[#47B6F2]">
        {label}
      </span>

      <div
        className={`mt-2 flex h-[47.47px] w-full cursor-pointer items-center rounded-[12px] border px-3 ${
          error ? "border-red-500" : "border-[#47B6F2]"
        } focus:outline-none focus:ring-2 focus:ring-[#47B6F2]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{formatDate(selectedDate)}</span>
        <button
          type="button"
          className="ml-auto flex items-center justify-center"
        >
          <Image
            src="/images/calendar.png"
            alt="calendar-img"
            width={22}
            height={22}
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-bl-blue bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <select
              value={currentMonth}
              onChange={handleMonthChange}
              className="rounded border p-1 text-gray-700"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={currentYear}
              onChange={handleYearChange}
              className="rounded border p-1 text-gray-700"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {daysInWeek.map((day) => (
              <div
                key={day}
                className="mb-2 text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
            {generateDates().map((day, index) => (
              <button
                key={index}
                className={`flex size-8 items-center justify-center rounded-full text-sm
                  ${!day ? "invisible" : "hover:bg-gray-100"}
                  ${
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth === selectedDate.getMonth() &&
                    currentYear === selectedDate.getFullYear()
                      ? "bg-bl-blue text-white"
                      : "text-gray-700"
                  }
                `}
                onClick={() => handleDateSelect(day)}
                disabled={!day}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="mt-1 text-end text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CalendarInput;
