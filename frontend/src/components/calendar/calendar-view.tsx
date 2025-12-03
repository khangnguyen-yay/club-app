import { useEffect, useState } from "react";
import DeadlineCalendar from "./deadlineCalendar";
import type { ClubDeadline } from "./calendarUtils";
import "../../styles/calendar.css";
import CalendarLegend from "./calendar-legend";

const CalendarView: React.FC = () => {
  const [deadlines, setDeadlines] = useState<ClubDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*Fetching the app_date data from the backend API endpoint */
  useEffect(() => {
    async function fetchDeadlines() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:3000/api/calendar/deadlines", {
          credentials: "include", //Sending session cookies for authentication
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
    return <p>You don't have any upcoming deadlines yet.</p>;
  }

  return  (
    <>
      <section className="calendar-legend-row">
      <CalendarLegend />
      </section>
      <DeadlineCalendar deadlines={deadlines} />
    </>
  );
};

export default CalendarView;
