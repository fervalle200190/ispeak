import { Box, Button, Grid, Typography } from "@mui/material";

export const ProfessorCard = ({ name, profilePhoto, link, activeLink, handleActiveLink }) => {
     return (
          <>
               <Grid
                    container
                    maxWidth={500}
                    alignItems="center"
                    justifyContent={"space-between"}
                    onClick={() => handleActiveLink(link)}
                    sx={{
                         boxShadow: "0px 0px 10px #cfcfcf",
                         borderRadius: "7px",
                         p: 2,
                         cursor: "pointer",
                         ":hover": { boxShadow: "0px 0px 20px #bfbfbf" },
                         transition: "all 0.2s ease-in-out",
                         my: 3,
                    }}
               >
                    <Grid item flexDirection={"row"}>
                         <Box
                              style={{
                                   width: 60,
                                   height: 60,
                                   borderRadius: "50%",
                                   overflow: "hidden",
                              }}
                         >
                              <img src={profilePhoto} alt="name" style={{ width: "100%" }} />
                         </Box>
                    </Grid>
                    <Grid item>
                         <Typography color="#0d2e68" fontWeight={500}>
                              {name}
                         </Typography>
                    </Grid>
                    <Grid item>
                         <Button variant="contained" sx={{ backgroundColor: "#0d2e68" }}>
                              Agendar reunion
                         </Button>
                    </Grid>
               </Grid>
               {activeLink === link && (
                    <iframe
                         src={link}
                         loading="lazy"
                         style={{
                              border: "none",
                              minWidth: "320px",
                              minHeight: "544px",
                              height: "966px",
                              width: "100%",
                         }}
                         id="zcal-invite"
                    ></iframe>
               )}
          </>
     );
};
