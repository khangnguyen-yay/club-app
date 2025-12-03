import CalendarView from "../components/calendar/calendar-view";
import "../styles/calendar.css"

const Calendar = () => {
  return (
    <main className="calendar-page calendar-root">
      <section className="calendar-header-container">
        <h1 className="calendar-heading">Calendar</h1>
        <p className="calendar-subtitle">
          Upcoming application deadlines for clubs you're considering or applying to.
        </p>
      </section>

      <CalendarView />
    </main>
  );
};

export default Calendar;
