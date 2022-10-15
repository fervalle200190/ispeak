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
import { ModalSucceed } from "components/ModalSucceed";
import { ScheduledMeeting } from "components/ScheduledMeeting";
import { InlineWidget } from "react-calendly";
import { Grid } from "@mui/material";

let hours = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const CalendarPage = () => {
     const [calendar, setCalendar] = useState(new Date());
     const [scheduleDate, setScheduleDate] = useState([]);
     const [hourSelected, setHourSelected] = useState("");
     const [date, setDate] = useState({});
     const { getMinDate, getMaxDate, getSundayOfTheWeek } = useDates();
     const [isModalOpen, setIsModalOpen] = useState(false);
     const getDate = async () => {
          let id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
          let student = await getAlumnoById(id);
          setDate({
               ...date,
               id: student.id,
               completa: false,
               titulo: "Reunion",
               url: "ejemplo",
               idProfesor: student.profesor === "" ? 2006 : student.profesor,
          });
     };

     const handleSend = () => {
          if (calendar.getDay() === new Date().getDay()) {
               console.log("hola");
               return;
          }
          if (hourSelected === "") return;
          const dataToSave = {
               startHour: hourSelected,
               fecha: calendar,
          };
          setTimeout(() => {
               setScheduleDate([...scheduleDate, dataToSave]);
               setHourSelected("");
               handleModal();
          }, 200);

          // const dateToSend = {
          //      ...date,
          //      fecha: "18-8-2022",
          //      horaInicio: hourSelected,
          //      horaFin: "12",
          //      fechaModificacion: "18-8-2022",
          // };
          // console.log(JSON.stringify(dateToSend));
          // postCalendar(JSON.stringify(dateToSend));
     };
     const handleHour = (hourSelected) => {
          setHourSelected(hourSelected);
     };

     const handleModal = () => {
          setIsModalOpen(!isModalOpen);
     };

     const checkDates = () => {
          const dates = localStorage.getItem("calendar") || null;
          console.log(dates);
          if (dates === null) {
               return;
          }

          setScheduleDate(JSON.parse(dates));
     };

     useEffect(() => {
          if (scheduleDate.length !== 0) {
               localStorage.setItem("calendar", JSON.stringify(scheduleDate));
          }
     }, [scheduleDate]);

     useEffect(() => {
          getDate();
          checkDates();
     }, []);

     return (
          <div className="calendar-container" style={{ paddingBottom: 60 }}>
               {/* <ModalPremium /> */}
               <ModalSucceed
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
               />
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
               <Grid sx={{ width: "100%" }}>
                    <>
                         <iframe
                              src="https://zcal.co/i/03a22KdZ?embed=1&embedType=iframe"
                              loading="lazy"
                              style={{border: "none", minWidth: "320px", minHeight: "544px", height: "600px", width: "100%"}}
                              id="zcal-invite"
                         ></iframe>
                         <iframe
                              src="https://zcal.co/i/fNr9k0nq?embed=1&embedType=iframe"
                              loading="lazy"
                              style={{border: "none", minWidth: "320px", minHeight: "544px", height: "600px", width: "100%"}}
                              id="zcal-invite"
                         ></iframe>
                         <iframe
                              src="https://zcal.co/i/zRn4u6es?embed=1&embedType=iframe"
                              loading="lazy"
                              style={{border: "none", minWidth: "320px", minHeight: "544px", height: "600px", width: "100%"}}
                              id="zcal-invite"
                         ></iframe>
                    </>
                    {/* <InlineWidget url="https://calendly.com/fervalle200190" /> */}
               </Grid>
          </div>
     );
};

export default CalendarPage;

{
     /* <div className="calendar-inner-container">
                    <Calendar
                         onChange={setCalendar}
                         value={calendar}
                         minDate={
                              scheduleDate.length !== 0
                                   ? getSundayOfTheWeek(
                                          scheduleDate[scheduleDate.length - 1]
                                               .fecha
                                     )
                                   : getMinDate()
                         }
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
               {scheduleDate.length !== 0 &&
                    scheduleDate.map((date, index) => (
                         <ScheduledMeeting key={date.fecha} {...date} index={index} />
                    ))}
               <button
                    className="btn-blue"
                    style={{ fontWeight: 600 }}
                    onClick={handleSend}
               >
                    schedule meeting
               </button> */
}
