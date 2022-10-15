import { Grid, Modal, Typography } from "@mui/material";
import { useLocation } from "wouter";

export const ModalTest = ({ isModalOpen, message, url }) => {
     const [location, setLocation] = useLocation();
     const handleClick = () => {
          window.location.replace(url);
     };
     return (
          <Modal open={isModalOpen}>
               <Grid
                    container
                    className="not-focus"
                    sx={{
                         position: "absolute",
                         top: "50%",
                         left: "50%",
                         transform: "translate(-50%,-50%)",
                         backgroundColor: "#fff",
                         width: { xs: "90%", sm: "50%" },
                         maxWidth: "600px",
                         borderRadius: "20px",
                         p: 4,
                    }}
               >
                    <Grid item xs={12}>
                         <Typography variant="h6" textAlign={"center"} mb={2}>
                              {message}
                         </Typography>
                    </Grid>
                    <Grid container justifyContent={"center"}>
                         <button
                              className="btn-modal-redirect"
                              onClick={handleClick}
                         >
                              Ir ahora
                         </button>
                    </Grid>
               </Grid>
          </Modal>
     );
};
