import { Alert, Snackbar } from "@mui/material";

export const SnackBarComponent = ({ message, isSnackbarOpen, handleClose }) => {
    const horizontal = "right"
    const vertical = "bottom"
     return (
          <Snackbar
               open={isSnackbarOpen}
               onClose={handleClose}
               anchorOrigin={{ horizontal, vertical }}
               autoHideDuration={6000}
               sx={{width: '300px'}}
          >
               <Alert severity="success" sx={{ width: "100%", backgroundColor: "#b2ffb5" }}>
                    {message}
               </Alert>
          </Snackbar>
     );
};
