import { Grid, Modal, Typography } from "@mui/material";

export const ModalSucceed = ({isModalOpen, handleModal}) => {
     return (
          <>
               <Modal
                    open={isModalOpen}
                    onClose={handleModal}
                    sx={{ "& .MuiBackdrop-root": { backgroundColor: "#fff0" } }}
               >
                    <Grid container>
                         <Grid
                              className="animate-up"
                              container
                              sx={{
                                   backgroundColor: "#fff",
                                   position: "absolute",
                                   top: "50%",
                                   left: "50%",
                                   transform: "translate(-50%,-50%)",
                                   padding: 10,
                                   width: 500,
                                   boxShadow: "0 0 20px #ccc",
                                   borderRadius: "5px",
                              }}
                         >
                              <Typography
                                   variant="h4"
                                   color="primary"
                                   textAlign={"center"}
                              >
                                   Ya has agendado una cita correctamente
                              </Typography>
                         </Grid>
                    </Grid>
               </Modal>
          </>
     );
};
