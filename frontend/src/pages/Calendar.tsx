//import CalendarView from "../components/calendar-view/calendar-view";
import CalendarView2 from "../components/calendar-view/cal-view2";


const Calendar = () => {

  return (
    <div className="calendar-page">
      <h1 className="calendar-title">Calendar</h1>
      <p>
        Upcoming application deadlines for clubs you're considering or
        applying to.
      </p>

      <CalendarView2 />
    </div>  
  );
}

export default Calendar;