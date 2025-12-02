// src/pages/calendar-view.tsx  (or wherever you keep it)
import { useEffect, useState } from "react";
import "../../styles/calendar.css";

type Preference = "considering" | "applying" | "applied" | "none";

export type ClubDeadline = {
  id: number;
  club_name: string;
  type: string;
  app_date: string; // ISO string from backend
  preference: Preference;
};

type DeadlineCalendarProps = {
  deadlines: ClubDeadline[];
};

function groupByDate(deadlines: ClubDeadline[]) {
  const map: Record<string, ClubDeadline[]> = {};
  for (const d of deadlines) {
    const date = new Date(d.app_date);
    // YYYY-MM-DD in local time
    const key = date.toLocaleDateString("en-CA");
    if (!map[key]) map[key] = [];
    map[key].push(d);
  }
  return map;
}

const monthNames = [
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

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DeadlineCalendar: React.FC<DeadlineCalendarProps> = ({ deadlines }) => {
  const grouped = groupByDate(deadlines);

  // Start on the month of the earliest deadline, or current month if none
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
  const month = currentMonth.getMonth(); // 0–11

  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay(); // 0 (Sun) – 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build array of cells for a 6x7 grid
  const cells: (number | null)[] = [];
  // leading blanks
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  // days 1..N
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  // trailing blanks to reach 42 cells (6 weeks)
  while (cells.length < 42) cells.push(null);

  const today = new Date();
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
        <button
          type="button"
          className="calendar-nav-button"
          onClick={handlePrevMonth}
        >
          ‹
        </button>
        <h2 className="calendar-month-title">
          {monthNames[month]} {year}
        </h2>
        <button
          type="button"
          className="calendar-nav-button"
          onClick={handleNextMonth}
        >
          ›
        </button>
      </div>

      <div className="calendar-grid">
        {weekDays.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}

        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={idx} className="calendar-cell empty" />;
          }

          const dateObj = new Date(year, month, day);
          const key = dateObj.toLocaleDateString("en-CA");
          const dayDeadlines = grouped[key] || [];
          const isToday = key === todayKey;

          return (
            <div
              key={idx}
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

const CalendarView2: React.FC = () => {
  const [deadlines, setDeadlines] = useState<ClubDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeadlines() {
      try {
        setLoading(true);
        setError(null);

        // use the URL that already works for you
        const res = await fetch("http://localhost:3000/api/calendar/deadlines", {
          credentials: "include",
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Failed to fetch deadlines");
        }

        const data = await res.json();
        setDeadlines(data.deadlines || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchDeadlines();
  }, []);

  if (loading) return <p>Loading deadlines…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  if (deadlines.length === 0) {
    return <p>You don&apos;t have any upcoming deadlines yet.</p>;
  }

  return <DeadlineCalendar deadlines={deadlines} />;
};

export default CalendarView2;
