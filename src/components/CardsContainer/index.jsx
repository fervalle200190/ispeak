import { Button, Grid, Typography } from "@mui/material";
import { CardModal } from "components/CardModal";
import { firestore } from "../../firebase/credentials";
import { useState } from "react";
import { USER_ID } from "services/settings";
import { useEffect } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const CardsContainer = ({ professorsModal, closeModal }) => {
     const [professorSelected, setProfessorSelected] = useState("");
     const [meetingsInfo, setMeetingsInfo] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const onCardClick = (link) => {
          setProfessorSelected(link);
     };

     const getData = async () => {
          const checkRef = doc(firestore, "meetings", `${USER_ID}`);
          const check = await getDoc(checkRef);
          const meetingsDone = check.data();
          setMeetingsInfo(meetingsDone);
     };

     useEffect(() => {
          getData();
     }, []);

     const onClickNoButton = async () => {
          const meetingToSend = {
               ...meetingsInfo,
               meetingsToDo: {
                    ...meetingsInfo.meetingsToDo,
                    [professorsModal.meetingId]: {
                         isBooked: false,
                    },
               },
          };
          setIsLoading(true);
          const docRef = doc(firestore, "meetings", `${USER_ID}`);
          await setDoc(docRef, meetingToSend, { merge: true });
          setIsLoading(false);
          closeModal();
     };

     const onClickYesButton = async () => {
          const meetingToSend = {
               ...meetingsInfo,
               meetingsToDo: {
                    ...meetingsInfo.meetingsToDo,
                    [professorsModal.meetingId]: {
                         isBooked: true,
                    },
               },
          };
          setIsLoading(true);
          const docRef = doc(firestore, "meetings", `${USER_ID}`);
          await setDoc(docRef, meetingToSend, { merge: true });
          setIsLoading(false);
          closeModal();
     };
     return (
          <Grid container>
               {professorSelected === "" ? (
                    professorsModal.professors.map((prof) => (
                         <CardModal key={prof.name} {...prof} onCardClick={onCardClick} />
                    ))
               ) : (
                    <>
                         <iframe
                              src={`${professorSelected}?embed=1&embedType=iframe`}
                              loading="lazy"
                              style={{
                                   border: "none",
                                   minWidth: "320px",
                                   minHeight: "244px",
                                   height: "966px",
                                   width: "100%",
                              }}
                              id="zcal-invite"
                         ></iframe>
                         <Typography variant="h6" color={"#1e3a8a"} sx={{ width: "100%" }}>
                              Did you book the appointment?
                         </Typography>
                         <Button
                              variant="contained"
                              color="error"
                              onClick={onClickNoButton}
                              disabled={isLoading}
                         >
                              No
                         </Button>
                         <Button
                              variant="contained"
                              onClick={onClickYesButton}
                              disabled={isLoading}
                              sx={{
                                   backgroundColor: "#5df99c",
                                   ml: 2,
                                   color: "#1e3a8a",
                                   ":hover": { backgroundColor: "#4bd88b" },
                              }}
                         >
                              Yes
                         </Button>
                    </>
               )}
          </Grid>
     );
};
