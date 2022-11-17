const { Grid, Button, Typography } = require("@mui/material");

export const MeetingList = ({ meetingId }) => {
     return (
          <>
               <Grid item>
                    <Typography color="#0d2e68" fontWeight={500}>
                         {`Live class ${meetingId}`}
                    </Typography>
               </Grid>
               <Grid item>
                    <Button variant="contained" sx={{ backgroundColor: "#0d2e68" }}>
                         Schedule
                    </Button>
               </Grid>
          </>
     );
};
