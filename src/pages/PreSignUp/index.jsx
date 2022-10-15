import { Grid, Typography } from "@mui/material";
import { PreSignUpForm } from "components/PreSignUpForm";
import Logo from "../../assets/ispeak-logo.png";
import PreImage from "../../assets/preregistro.png";
import PreImageMobile from "../../assets/preregistro-movil.png";

export const PreSignUp = ({ params }) => {
     return (
          <Grid
               container
               minHeight={"100vh"}
               alignItems="center"
               justifyContent={"center"}
               sx={{ backgroundColor: "#fff" }}
          >
               <Grid
                    container
                    maxWidth={1300}
                    alignItems={"center"}
                    sx={{ pt: 5 }}
               >
                    <Grid item xs={12} md={4}>
                         <Grid
                              container
                              sx={{
                                   justifyContent: {
                                        xs: "center",
                                        md: "flex-end",
                                   },
                              }}
                         >
                              <Grid
                                   item
                                   sx={{
                                        width: { xs: "80%", md: "461px" },
                                        ml: 4,
                                   }}
                              >
                                   <Grid container justifyContent={"center"}>
                                        <Grid item>
                                             <img src={Logo} alt="ispeak" />
                                        </Grid>
                                        <Typography
                                             width={"100%"}
                                             variant="h6"
                                             fontSize={"23px"}
                                             fontWeight={700}
                                             fontFamily={"Poppins"}
                                             textAlign="center"
                                             mt={3}
                                             mb={4}
                                        >
                                             Crea tu usuario de acceso
                                        </Typography>
                                        <PreSignUpForm params={params} />
                                   </Grid>
                              </Grid>
                         </Grid>
                    </Grid>
                    <Grid
                         item
                         xs={12}
                         md={8}
                         sx={{ pt: { xs: "80px", md: "0" }, pb: 5 }}
                    >
                         <img src={PreImage} alt="pre-register" className="desktop-form" />
                         <img src={PreImageMobile} alt="pre-register-mobile" className="mobile-form" />
                    </Grid>
               </Grid>
          </Grid>
     );
};
