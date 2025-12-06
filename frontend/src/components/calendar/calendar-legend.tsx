import "../../styles/calendar-legend.css";


export default function CalendarLegend() {
  const items = [
    { label: "Considering", className: "event-considering" },
    { label: "Applying Soon", className: "event-applying" },
    { label: "Applied", className: "event-applied" },
  ];

  //Legend component to explain color coding on the calendar events
  // Same colors are used from deadline status color in calendar
  return (
    <div className="calendar-legend-container">
      <h3 className="legend-title">Legend</h3>
      <div className="legend-items">
        {items.map((item) => (
          <div key={item.label} className="legend-item">
            <span className={`legend-color-box ${item.className}`} />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
