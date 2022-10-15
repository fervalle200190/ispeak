import { Button, Grid, Typography } from "@mui/material";

export const ScheduledMeeting = ({ fecha, startHour, index }) => {
     return (
          <Grid
               container
               direction={"column"}
               alignItems="center"
               sx={{ display: `${index !== 0 ? "none" : "flex"}` }}
          >
               <Typography>
                    Ya tienes una cita agendada para{" "}
                    {new Date(fecha).toLocaleDateString()} a las {startHour}
               </Typography>
               <Button
                    disabled
                    variant="filled"
                    sx={{ backgroundColor: "#ccc" }}
               >
                    Entra a la Reunion
               </Button>
          </Grid>
     );
};
