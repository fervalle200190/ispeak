import { Button, Grid, Typography } from "@mui/material";
import { firestore } from "../../firebase/credentials";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { USER_ID } from "services/settings";

export const AppointmentProfessor = ({ linkSelected, onClickButton, meetingId, onBooked }) => {
     const [meetingsInfo, setMeetingsInfo] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const getData = async () => {
          const checkRef = doc(firestore, "meetings", `${USER_ID}`);
          const check = await getDoc(checkRef);
          const meetingsDone = check.data();
          setMeetingsInfo(meetingsDone);
     };

     useEffect(() => {
          getData();
     }, []);

     const onClickYesButton = async () => {
          const meetingToSend = {
               ...meetingsInfo,
               meetingsToDo: {
                    ...meetingsInfo.meetingsToDo,
                    [meetingId]: {
                         isBooked: true,
                    },
               },
          };
          setIsLoading(true);
          const docRef = doc(firestore, "meetings", `${USER_ID}`);
          await setDoc(docRef, meetingToSend, { merge: true });
          setIsLoading(false);
          onBooked()
     };

     const onClickNoButton = () => {
          onClickButton("");
     };
     return (
          <>
               <iframe
                    src={`${linkSelected}?embed=1&embedType=iframe`}
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
               <Grid item>
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
                              backgroundColor: "#2c96fb",
                              ml: 2,
                              color: "#fff",
                              ":hover": { backgroundColor: "#4bd88b" },
                         }}
                    >
                         Yes
                    </Button>
               </Grid>
          </>
     );
};
