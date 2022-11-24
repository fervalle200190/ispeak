import { KeyboardArrowDownRounded } from "@material-ui/icons";

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
                    <button className="professors-buttons">
                         Schedule
                         <KeyboardArrowDownRounded />
                    </button>
               </Grid>
          </>
     );
};
