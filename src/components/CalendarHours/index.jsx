export const CalendarHours = ({ hour, handleHour, hourSelected }) => {
     return (
          <div
               className={`blue-border ${
                    hour === hourSelected ? "active-border" : ""
               }`}
               onClick={() => handleHour(hour)}
          >
               {hour}
          </div>
     );
};
