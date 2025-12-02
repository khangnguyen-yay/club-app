import CalendarView from "../components/calendar/calendar-view";


const Calendar = () => {

  return (
    <div className="calendar-page">
      <h1 className="calendar-title">Calendar</h1>
      <p>
        Upcoming application deadlines for clubs you're considering or
        applying to.
      </p>

      <CalendarView />
    </div>
  );
}

export default Calendar;