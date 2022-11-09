import { Button, Grid, Typography } from "@mui/material";
import { CardModal } from "components/CardModal";
import { useState } from "react";

export const CardsContainer = ({ professorsModal }) => {
     const [professorSelected, setProfessorSelected] = useState("");
     const onCardClick = (link) => {
          setProfessorSelected(link);
     };
     return (
          <Grid container>
               {professorSelected === "" ? (
                    professorsModal.map((prof) => (
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
                         <Typography variant='h6' color={"#1e3a8a"} sx={{width: '100%'}} >Did you book the appointment?</Typography>
                         <Button variant="contained" color="error">
                              No
                         </Button>
                         <Button
                              variant="contained"
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
