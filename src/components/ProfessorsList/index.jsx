import { Box, Grid, Typography } from "@mui/material";
import { ProfessorMeet } from "components/ProfessorMeet";
import Emoji from 'a11y-react-emoji'

export const ProfessorsList = ({ professors, onClickButton }) => {
     return (
          <>
               <Box display='flex' width={'100%'} flexDirection='column' justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                         <Emoji symbol="👋" />
                         <Emoji symbol="💣" />
                         <Emoji symbol="🔥" />
                    </Grid>
                    <Typography textAlign={"center"} fontWeight={600}>
                         Remember! Don’t schedule the same class with different coaches
                    </Typography>
               </Box>
               {professors.map((prof) => (
                    <ProfessorMeet key={prof.id} {...prof} onClickButton={onClickButton} />
               ))}
          </>
     );
};
