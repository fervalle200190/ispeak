import { KeyboardArrowDownRounded } from "@material-ui/icons";

const { Grid, Box, Typography, Button } = require("@mui/material");

export const ProfessorMeet = ({ link, name, photo, onClickButton }) => {
     return (
          <Grid
               item
               xs={12}
               flexDirection={"row"}
               p={2}
               display={"flex"}
               alignItems={"center"}
               justifyContent={"space-between"}
          >
               <Grid item display={"flex"} alignItems={"center"} gap={2}>
                    <Box
                         style={{
                              width: 60,
                              height: 60,
                              borderRadius: "50%",
                              overflow: "hidden",
                         }}
                    >
                         <img src={photo} alt="name" style={{ width: "100%" }} />
                    </Box>
                    <Box>
                         <Typography color="#0d2e68" fontWeight={500}>
                              {name}
                         </Typography>
                    </Box>
               </Grid>
               <Grid item>
                    <button className="professors-buttons" onClick={() => onClickButton(link)}>
                         Schedule
                         <KeyboardArrowDownRounded />
                    </button>
               </Grid>
          </Grid>
     );
};
