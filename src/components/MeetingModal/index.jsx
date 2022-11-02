import { Button, Grid, Modal, Typography } from "@mui/material";

export const MeetingModal = ({ isModalOpen, closeModal }) => {
     return (
          <Modal open={isModalOpen} onClose={closeModal} sx={{ display: "flex", alignItems: "center" }}>
               <Grid
                    container
                    sx={{
                         backgroundColor: "#fff",
                         margin: "auto",
                         width: "50%",
                         borderRadius: "7px",
                         p: 4,
                         outline: "none",
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
                    <Grid item xs={12} display="flex" justifyContent="center" marginTop={3}>
                         <Button variant="contained" color="error">
                              No, thank you
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
                              Yes, schedule my class
                         </Button>
                    </Grid>
               </Grid>
          </Modal>
     );
};
