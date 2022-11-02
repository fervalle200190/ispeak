import { ModalPremium } from "components/ModalPremium";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../../styles/Calendar.css";
import { ModalSucceed } from "components/ModalSucceed";
import { Grid } from "@mui/material";
import { ProfessorCard } from "components/ProfessorCard";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import firebaseApp from "../../firebase/credentials";

let hours = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const firestore = getFirestore(firebaseApp);

const CalendarPage = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [activeLink, setActiveLink] = useState("");
     const [professors, setProfessors] = useState([]);

     const handleActiveLink = (url) => {
          setActiveLink(url);
     };

     const handleModal = () => {
          setIsModalOpen(!isModalOpen);
     };

     useEffect(() => {
          //   modalPremium
          onSnapshot(collection(firestore, "professors"), (querySnapshot) => {
               const mensajesArr = [];
               querySnapshot.forEach((doc) => {
                    mensajesArr.push(doc.data());
               });
               setProfessors([...mensajesArr]);
          });
     }, []);

     return (
          <div className="calendar-container" style={{ paddingBottom: 60 }}>
               {/* <ModalPremium /> */}
               <ModalSucceed isModalOpen={isModalOpen} handleModal={handleModal} />
               <div className="blue-box">
                    <h1 className="main-title">
                         Schedule your meeting <br className="br-calendar" /> with a teacher
                    </h1>
                    <p>
                         Start practicing at your <br className="br-calendar" /> own personal pace!
                    </p>
               </div>
               <Grid sx={{ width: "95%" }}>
                    {professors.map((link,i) => (
                         <ProfessorCard
                              key={i}
                              {...link}
                              activeLink={activeLink}
                              handleActiveLink={handleActiveLink}
                         />
                    ))}
                    {/* <InlineWidget url="https://calendly.com/fervalle200190" /> */}
               </Grid>
          </div>
     );
};

export default CalendarPage;
