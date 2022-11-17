import { Grid, Typography } from "@mui/material";
import { AppointmentProfessor } from "components/AppointmentProfessor";
import { MeetingList } from "components/MeetingList";
import { ProfessorsList } from "components/ProfessorsList";
import { useState } from "react";

export const ProfessorCard = ({ professors, meetingId, meetingSelected, setMeetingSelected }) => {
     const [linkSelected, setLinkSelected] = useState("");
     const [isBooked, setIsBooked] = useState(false);

     const height = linkSelected !== "" ? 500 : meetingId === meetingSelected ? 200 : 69;

     const onClickButton = (link) => {
          setLinkSelected(link);
     };

     const onBooked = () => {
          setLinkSelected("");
          setIsBooked(true);
          setMeetingSelected("");
     };

     const onClickSchedule = () => {
          if(isBooked) return
          setMeetingSelected(meetingId === meetingSelected ? "" : meetingId);
     };
     return (
          <>
               <Grid
                    container
                    maxWidth={600}
                    height={height}
                    alignItems="center"
                    justifyContent={"space-between"}
                    onClick={onClickSchedule}
                    sx={{
                         boxShadow: "0px 0px 10px #cfcfcf",
                         borderRadius: "7px",
                         p: 2,
                         cursor: "pointer",
                         ":hover": { boxShadow: "0px 0px 20px #bfbfbf" },
                         transition: "all 0.2s ease-in-out",
                         my: 3,
                         overflowY: "auto",
                    }}
               >
                    {!isBooked &&
                         (linkSelected === "" ? (
                              meetingSelected !== meetingId ? (
                                   <MeetingList meetingId={meetingId} />
                              ) : (
                                   <ProfessorsList
                                        professors={professors}
                                        onClickButton={onClickButton}
                                   />
                              )
                         ) : (
                              <AppointmentProfessor
                                   linkSelected={linkSelected}
                                   onClickButton={onClickButton}
                                   meetingId={meetingId}
                                   onBooked={onBooked}
                              />
                         ))}
                    {isBooked && (
                         <Typography color="#0d2e68" fontWeight={500}>
                              You've scheduled your meeting !!
                         </Typography>
                    )}
               </Grid>
          </>
     );
};
