import { CalendarHours } from "components/CalendarHours";
import { ModalPremium } from "components/ModalPremium";
import { useDates } from "hooks/useDates";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import getAlumnoById from "services/getAlumnoById";
import getAllDates from "services/getAllDates";
import { postCalendar } from "services/postCalendar";
import "../../styles/Calendar.css";

let hours = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const CalendarPage = () => {
     const [calendar, setCalendar] = useState(new Date());
     const [hourSelected, setHour] = useState("");
     const [date, setDate] = useState({});
     const { getMinDate, getMaxDate } = useDates();
     const getDate = async () => {
          let id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
          let student = await getAlumnoById(id);
          setDate({
               ...date,
               id: student.id,
               completa: false,
               titulo: "Reunion",
               url: "ejemplo",
               idProfesor:
                    student.profesor === ""
                         ? 2006
                         : student.profesor,
          });
     };

     const handleSend = () => {
          if (calendar.getDay() === new Date().getDay()) {
               console.log("hola")
               return;
          }
          console.log(calendar.toLocaleString().split(',')[0])
          const dateToSend = {
               ...date,
               fecha: "18-8-2022",
               horaInicio: hourSelected,
               horaFin: "12",
               fechaModificacion: "18-8-2022"
          };
          console.log(JSON.stringify(dateToSend));
          postCalendar(JSON.stringify(dateToSend));
     };
     const handleHour = (hourSelected) => {
          setHour(hourSelected);
     };

     useEffect(() => {
          getDate();
     }, []);

     return (
          <div className="calendar-container">
               {/* <ModalPremium /> */}
               <div className="blue-box">
                    <h1 className="main-title">
                         Schedule your meeting <br className="br-calendar" />{" "}
                         with a teacher
                    </h1>
                    <p>
                         Start practicing at your <br className="br-calendar" />{" "}
                         own personal pace!
                    </p>
               </div>
               <div className="calendar-inner-container">
                    <Calendar
                         onChange={setCalendar}
                         value={calendar}
                         minDate={getMinDate()}
                         maxDate={getMaxDate()}
                    />
                    <div className="hours-container">
                         {hours.map((hour) => (
                              <CalendarHours
                                   key={hour}
                                   hour={hour}
                                   handleHour={handleHour}
                                   hourSelected={hourSelected}
                              />
                         ))}
                    </div>
               </div>
               <button className="btn-blue" onClick={handleSend}>
                    schedule meeting
               </button>
          </div>
     );
};

export default CalendarPage;
