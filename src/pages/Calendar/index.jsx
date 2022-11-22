import { ModalPremium } from "components/ModalPremium";
import React, { useContext, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";
import { ModalSucceed } from "components/ModalSucceed";
import { Grid, Typography } from "@mui/material";
import { ProfessorCard } from "components/ProfessorCard";
import {
     collection,
     doc,
     getDoc,
     getDocs,
     getFirestore,
     onSnapshot,
     query,
} from "firebase/firestore";
import firebaseApp, { firestore } from "../../firebase/credentials";
import { USER_ID } from "services/settings";
import { CoursesContext } from "context/coursesContext";

let hours = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const CalendarPage = () => {
     const { userPlan } = useContext(CoursesContext);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [professors, setProfessors] = useState([]);
     const [meetingSelected, setMeetingSelected] = useState("");

     const getData = async () => {
          const docRef = doc(firestore, "meetings", `${USER_ID}`);
          const res = await getDoc(docRef);
          const meetings = res.data() ? res.data().meetingsToDo : false;
          if (!meetings) return;
          const meetingsNotBooked = [];
          for (const meeting in meetings) {
               if (!meetings[meeting].isBooked) {
                    meetingsNotBooked.push(parseInt(meeting));
               }
          }
          if (meetingsNotBooked.length <= 0) return;
          const profRef = query(collection(firestore, "professors"));
          const profRes = await getDocs(profRef);
          const professorsList = [];
          profRes.forEach((prof) => {
               professorsList.push(prof.data());
          });
          const professorsListFiltered = professorsList.filter((prof) =>
               meetingsNotBooked.includes(prof.meetingId)
          );
          setProfessors(professorsListFiltered);
     };

     useEffect(() => {
          if (userPlan.nombre === "Basic") {
               return setIsModalOpen(true)
          };
          getData();
     }, [userPlan]);

     return (
          <div className="calendar-container" style={{ paddingBottom: 60 }}>
               <div className="blue-box">
                    <h1 className="main-title">
                         Schedule your live <br className="br-calendar" /> class
                    </h1>
               </div>
               <ModalPremium isModalOpen={isModalOpen} />
               <Grid sx={{ width: "95%" }}>
                    {professors.length <= 0 ? (
                         <>
                              <Typography color="#0d2e68" variant="h5" fontWeight={500}>
                                   Congrats! You’ve completed all your classes this month!
                              </Typography>
                         </>
                    ) : (
                         professors.map((prof, i) => (
                              <ProfessorCard
                                   key={i}
                                   {...prof}
                                   meetingSelected={meetingSelected}
                                   setMeetingSelected={setMeetingSelected}
                              />
                         ))
                    )}
               </Grid>
          </div>
     );
};

export default CalendarPage;
