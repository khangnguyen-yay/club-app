import React, { useState } from "react";
import { monthNames, weekDays } from "./constants";
import type { DeadlineCalendarProps } from "./calendarUtils";
import groupByDate from "./calendarUtils";
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

const DeadlineCalendar: React.FC<DeadlineCalendarProps> = ({ deadlines }) => {
  const grouped = groupByDate(deadlines);

  //start on current month or month of first deadline
  const initialMonth = (() => {
    if (deadlines.length === 0) return new Date();
    const sorted = [...deadlines].sort(
      (a, b) =>
        new Date(a.app_date).getTime() - new Date(b.app_date).getTime()
    );
    return new Date(sorted[0].app_date);
  })();

  const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); 

  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay(); // 0 (Sun) – 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build array of cells for a 6x7 grid
  const cells: (number | null)[] = [];
  // leading blanks for days not in the currently rendered month
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  // days 1..30/31
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  // trailing blanks to complete 42 cells/blanks for days after currently rendered month
  while (cells.length < 42) cells.push(null);

  const today = new Date();
  //Creating today's date in 'YYYY-MM-DD' format
  const todayKey = today.toLocaleDateString("en-CA");

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar-grid-container">
      <div className="calendar-grid-header">
        {/*Using react icons for calendar traversal arrows */}
        <button
          type="button"
          className="calendar-nav-button"
          onClick={handlePrevMonth}
        >
          <FiChevronLeft />
        </button>
        <h2 className="calendar-month-title">
          {monthNames[month]} {year}
        </h2>
        <button
          type="button"
          className="calendar-nav-button"
          onClick={handleNextMonth}
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="calendar-grid">
        {weekDays.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}

        {cells.map((day, index) => {
          if (day === null) {
            return <div key={index} className="calendar-cell empty" />;
          }

          const dateObj = new Date(year, month, day);
          const key = dateObj.toLocaleDateString("en-CA");
          const dayDeadlines = grouped[key] || [];
          const isToday = key === todayKey;

          return (
            <div
              key={index}
              className={
                "calendar-cell" +
                (isToday ? " today" : "") +
                (dayDeadlines.length ? " has-deadlines" : "")
              }
            >
              <div className="calendar-date-number">{day}</div>
              {dayDeadlines.length > 0 && (
                <ul className="calendar-events">
                  {dayDeadlines.map((dline) => (
                    <li
                      key={dline.id}
                      className={
                        "calendar-event event-" + dline.preference.toLowerCase()
                      }
                    >
                      {dline.club_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadlineCalendar;
