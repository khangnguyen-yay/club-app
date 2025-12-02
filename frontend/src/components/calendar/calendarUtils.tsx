
export type Preference = "considering" | "applying" | "applied" | "none";

export type ClubDeadline = {
  id: number;
  club_name: string;
  type: string;
  app_date: string; // ISO string from backend
  preference: Preference;
};

export type DeadlineCalendarProps = {
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

export default groupByDate;