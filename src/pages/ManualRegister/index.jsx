import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { SnackBarActions } from "components/SnackBarActions";
import { useForm } from "hooks/useForm";
import { useState, useEffect } from "react";
import Select from "react-select";
import { postManualRegister } from "services/postManualRegister";
import { processPlans } from "utils/processPlans";
import { getPlans } from "../../services/getPlans";

const initialForm = {
     nombre: "",
     apellido: "",
     correo: "",
     paymentId: "",
     amount: "",
     descripcion: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "Alumno registrado correctamente",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const ManualRegisterPage = () => {
     const {
          nombre,
          apellido,
          correo,
          paymentId,
          amount,
          descripcion,
          onInputChange,
          formState,
          onResetForm,
     } = useForm(initialForm);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [plansList, setPlansList] = useState([]);
     const [plansRaw, setPlansRaw] = useState([]);
     const [planSelected, setPlanSelected] = useState("");

     const getInfo = async () => {
          const plans = await getPlans();
          const newList = plans.filter((plan) => plan.pais.nombre === "Internacional");
          setPlansRaw(newList);
          setPlansList(newList.map((plan) => ({ label: plan.nombre, value: plan.id })));
     };
     useEffect(() => {
          getInfo();
     }, []);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onPlanSelectedChange = (e) => {
          setPlanSelected(e.target.value);
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               nombre === "" ||
               apellido === "" ||
               correo === "" ||
               paymentId === "" ||
               amount === "" ||
               planSelected === ""
          ) {
               return setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
          }
          const res = await postManualRegister(
               processPlans({ ...formState, plansRaw, planSelected })
          );
          if (!res.ok) {
               return setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage })
          }
          onResetForm();
          setPlanSelected();
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
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
                              <SelectOptions
                                   options={plansList}
                                   label="Plan a contratar"
                                   value={planSelected}
                                   handleSelect={onPlanSelectedChange}
                              />
                         </Grid>
                         <Grid item my={2}>
                              <Button variant="outlined" type="submit">
                                   Registrar
                              </Button>
                         </Grid>
                    </Box>
               </Grid>
               <SnackBarActions handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
