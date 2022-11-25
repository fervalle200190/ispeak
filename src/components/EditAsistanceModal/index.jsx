import { Box, Grid, Modal } from "@mui/material";
import { FormEditAsistance } from "components/FormEditAsistance";

export const EditAsistanceModal = ({ isModalOpen, modalData, closeModal, getData }) => {
     return (
          <Modal open={isModalOpen} onClose={closeModal}>
               <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ position: "relative", top: "50%", transform: "translate(0,-50%)" }}
               >
                    <Box
                         sx={{
                              backgroundColor: "#fff",
                              width: { xs: "90%", md: "50%" },
                              borderRadius: "5px",
                         }}
                    >
                         <FormEditAsistance modalInfo={modalData} closeModal={closeModal} getData={getData} />
                    </Box>
               </Grid>
          </Modal>
     );
};
