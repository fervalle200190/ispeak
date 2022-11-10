import { Button, Grid, Modal, Typography } from "@mui/material";
import { CardsContainer } from "components/CardsContainer";
import { useState } from "react";

export const MeetingModal = ({ isModalOpen, closeModal, professorsModal }) => {
     const [appointmentShow, setAppointmentShow] = useState(false);
     const onAppointmentShow = () => {
          setAppointmentShow(true);
     };
     return (
          <Modal
               open={isModalOpen}
               sx={{ display: "flex", alignItems: "center" }}
          >
               <Grid
                    container
                    sx={{
                         backgroundColor: "#fff",
                         margin: "auto",
                         width: {xs: '90%', md: '50%'},
                         borderRadius: "7px",
                         p: 4,
                         outline: "none",
                         overflowY: "auto",
                         maxHeight: "500px",
                    }}
               >
                    <Grid item xs={12}>
                         <Typography
                              variant="h5"
                              color="#1e3a8a"
                              fontWeight={600}
                              textAlign={"center"}
                         >
                              Great job! Time to practice with a coach
                         </Typography>
                    </Grid>
                    {appointmentShow && <CardsContainer professorsModal={professorsModal} closeModal={closeModal} />}
                    {!appointmentShow && (
                         <Grid item xs={12} display="flex" justifyContent="center" marginTop={3}>
                              <Button variant="contained" color="error" onClick={closeModal}>
                                   No, thank you
                              </Button>
                              <Button
                                   onClick={onAppointmentShow}
                                   variant="contained"
                                   sx={{
                                        backgroundColor: "#5df99c",
                                        ml: 2,
                                        color: "#1e3a8a",
                                        ":hover": { backgroundColor: "#4bd88b" },
                                   }}
                              >
                                   Yes, schedule my class
                              </Button>
                         </Grid>
                    )}
               </Grid>
          </Modal>
     );
};
