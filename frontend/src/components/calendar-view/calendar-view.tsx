import { useEffect, useState } from "react";

type Preference = "considering" | "applying" | "applied" | "none";

type ClubDeadline = {
  id: number;
  club_name: string;
  type: string;
  app_date: string;    // ISO string from backend
  preference: Preference;
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();   // e.g. "10/1/2025, 11:59 PM"
}

export default function CalendarView() {
  const [deadlines, setDeadlines] = useState<ClubDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeadlines() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:3000/api/calendar/deadlines", {
          credentials: "include", // send session cookie for auth
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

  if (loading) {
    return <p>Loading deadlines…</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (deadlines.length === 0) {
    return <p>You don't have any upcoming deadlines yet.</p>;
  }

  return (
    <ul className="deadline-list">
      {deadlines.map((d) => (
        <li key={d.id} className="deadline-card">
          <strong>{d.club_name}</strong>
          <div>{d.type}</div>
          <div>Deadline: {formatDateTime(d.app_date)}</div>
          <div>Status: {d.preference}</div>
        </li>
      ))}
    </ul>
  );
}
