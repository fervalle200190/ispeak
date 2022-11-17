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
               <Grid item>
                    <Typography color="#0d2e68" fontWeight={500}>
                         {name}
                    </Typography>
               </Grid>
               <Grid item>
                    <Button
                         variant="contained"
                         sx={{ backgroundColor: "#0d2e68" }}
                         onClick={() => onClickButton(link)}
                    >
                         Schedule
                    </Button>
               </Grid>
          </Grid>
     );
};
