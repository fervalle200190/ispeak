import { Grid, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useContext, useEffect } from "react";
import { ModalContext } from "../context";

export const DeleteData = ({ id }) => {
     const { handleModal, handleId, closeModal } = useContext(ModalContext);
     const handleClick = () => {
          handleModal();
          handleId(id);
     };

     useEffect(() => {
         return () => {
               closeModal();
          };
     }, []);
     
     return (
          <>
               <Grid container justifyContent={"center"}>
                    <IconButton onClick={handleClick}>
                         <DeleteRoundedIcon sx={{ color: "primary.main" }} />
                    </IconButton>
               </Grid>
          </>
     );
};
