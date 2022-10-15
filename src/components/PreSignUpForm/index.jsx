import { Box, Grid } from "@mui/material";
import { useForm } from "hooks/useForm";
import { useEffect, useState } from "react";
import { checkEmail } from "services/checkEmail";
import { postMercadoPago } from "services/postMercadoPago";

const initialForm = {
     Name: "",
     Surname: "",
     Email: "",
};

export const PreSignUpForm = ({ params }) => {
     const {
          formState: { Name, Surname, Email },
          onInputChange,
     } = useForm(initialForm);
     const [error, setError] = useState(false);

     const check = async (email) => {
          const res = await checkEmail(email);
          if (res) {
               setError(false);
               return;
          }
          setError(true);
     };

     useEffect(() => {
          if (Email !== "") {
               check(Email);
          }
     }, [Email]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (Name === "" || Surname === "" || Email === "") {
               return;
          }
          const dataToSend = {
               countryId: params.countryId,
               planId: params.planId,
               register: true,
               pasarela: (parseInt(params.countryId) === 1) || (parseInt(params.countryId) === 2)? 'mercadopago': 'ebanx',
               payer: {
                    Name,
                    Surname,
                    Email,
               },
          };
          const res = await postMercadoPago(dataToSend);
          if(res.redirect_url) {
               window.location.replace(res.redirect_url);
               return
          }
          if (res.url) {
               window.location.replace(res.url);
          }
     };
     return (
          <Box
               component={"form"}
               sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
               }}
               onSubmit={handleSubmit}
          >
               <Grid
                    container
                    sx={{
                         pl: { xs: 5, lg: 10 },
                         pr: { xs: 5, lg: 10 },
                         pt: 5,
                         pb: 6,
                         backgroundColor: "#fff",
                         borderRadius: "10px",
                         boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                         width: { md: "80%", lg: "100%" },
                    }}
               >
                    <Grid item xs={12} sx={{ mt: 1 }}>
                         <label className="pre-label">
                              Email*
                              <input
                                   type="email"
                                   name="Email"
                                   onChange={onInputChange}
                                   value={Email}
                                   className={`input-pre ${
                                        error ? "error-input-pre" : ""
                                   }`}
                              />
                              {error && (
                                   <span className="text-red-600">
                                        Este correo ya existe
                                   </span>
                              )}
                         </label>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                         <label className="pre-label">
                              Name*
                              <input
                                   type="text"
                                   name={"Name"}
                                   onChange={onInputChange}
                                   value={Name}
                                   className="input-pre"
                              />
                         </label>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 1 }}>
                         <label className="pre-label">
                              Last name*
                              <input
                                   type="text"
                                   name="Surname"
                                   onChange={onInputChange}
                                   value={Surname}
                                   className="input-pre"
                              />
                         </label>
                    </Grid>
               </Grid>
               <Grid container justifyContent={"center"}>
                    <button className="btn-pre-form" type="submit">
                         inicia ahora
                    </button>
               </Grid>
          </Box>
     );
};
