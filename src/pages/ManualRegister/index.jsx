import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { useForm } from "hooks/useForm";

const initialForm = {
     nombre: "",
     apellido: "",
     correo: "",
     paymentId: "",
     amount: "",
     descripcion: "",
};

export const ManualRegisterPage = () => {
     const { nombre, apellido, correo, paymentId, amount, descripcion, onInputChange } =
          useForm(initialForm);
     const onSubmit = (e) => {
          e.preventDefault();
     };
     return (
          <>
               <Grid
                    container
                    minHeight={"100vh"}
                    justifyContent={"center"}
                    alignItems="center"
                    py={10}
               >
                    <Box
                         component="form"
                         onSubmit={onSubmit}
                         sx={{
                              width: { xs: "95%", sm: "90%" },
                              maxWidth: "700px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                              p: 4,
                         }}
                    >
                         <Typography variant="h4" fontWeight={600} color={"#1e3a8a"} mb={3}>
                              Registro Manual
                         </Typography>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Nombre"
                                   variant="outlined"
                                   name="nombre"
                                   value={nombre}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Apellido"
                                   variant="outlined"
                                   name="apellido"
                                   value={apellido}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Correo"
                                   type="email"
                                   variant="outlined"
                                   name="correo"
                                   value={correo}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Nro. del pago"
                                   variant="outlined"
                                   name="paymentId"
                                   value={paymentId}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Monto del pago"
                                   variant="outlined"
                                   name={"amount"}
                                   value={amount}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <TextField
                                   label="Descripcion(opcional)"
                                   variant="outlined"
                                   name={"descripcion"}
                                   value={descripcion}
                                   onChange={onInputChange}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <SelectOptions label={"Plan a contratar"} options={[]} />
                         </Grid>
                         <Grid item xs={12} my={1}>
                              <SelectOptions label={"Pais"} options={[]} />
                         </Grid>
                         <Grid item my={2}>
                              <Button variant="outlined" type="submit">
                                   Registrar
                              </Button>
                         </Grid>
                    </Box>
               </Grid>
          </>
     );
};
