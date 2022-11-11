import { Box, Button, Grid, TextField } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { SnackBarActions } from "components/SnackBarActions";
import { useForm } from "hooks/useForm";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getAllStudentsCombo } from "services/getAllStudentsCombo";

export const initialClassOption = [
     {
          label: "Clase 1",
          value: "1",
     },
     {
          label: "Clase 2",
          value: "2",
     },
     {
          label: "Clase 3",
          value: "3",
     },
     {
          label: "Clase 4",
          value: "4",
     },
     {
          label: "Clase 5",
          value: "5",
     },
     {
          label: "Clase 6",
          value: "6",
     },
     {
          label: "Clase 7",
          value: "7",
     },
     {
          label: "Clase 8",
          value: "8",
     },
];

const initialForm = {
     observaciones: "",
     date: "",
};

const initialSelected = {
     profesorSelected: "",
     moduloSelected: "",
     studentSelected: "",
     courseSelected: "",
     classSelected: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El material de estudio ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

const customSelectStyles = {
     input: (provided, state) => ({
          ...provided,
          height: "47px",
     }),
     menu: (provided, state) => ({
          ...provided,
          zIndex: 500,
     }),
};

export const AddAsistancesPage = () => {
     const { date, observaciones, onInputChange } = useForm(initialForm);
     const [valueSelected, setValueSelected] = useState(initialSelected);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [selectsData, setSelectsData] = useState({ moduleList: [], studentsList: [] });

     const onValueSelected = (e, selector) => {
          setValueSelected({
               ...valueSelected,
               [selector]: e.target.value,
          });
     };

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const getData = async () => {
          const { students } = await getAllStudentsCombo();
          const studentsParsed = students.map((student)=> ({label: student.name, value: student.id}))
          setSelectsData({...selectsData, studentsList: studentsParsed})
     };

     const onSubmit = (e) => {
          e.preventDefault();
     };

     useEffect(() => {
          getData();
     }, []);

     return (
          <div className="w-full p-5">
               <Box
                    component={"form"}
                    width={"100%"}
                    maxWidth={500}
                    sx={{ pb: 10 }}
                    onSubmit={onSubmit}
               >
                    <Grid container>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <Select
                                   options={selectsData.studentsList}
                                   placeholder="Alumno"
                                   styles={customSelectStyles}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={[]}
                                   value={valueSelected.courseSelected}
                                   handleSelect={(e) => onValueSelected(e, "courseSelected")}
                                   label={"Curso"}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={[]}
                                   label={"Profesor"}
                                   value={valueSelected.profesorSelected}
                                   handleSelect={(e) => onValueSelected(e, "profesorSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={selectsData.moduleList}
                                   label={"Modulo"}
                                   value={valueSelected.moduloSelected}
                                   handleSelect={(e) => onValueSelected(e, "moduloSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField
                                   type={"date"}
                                   name="date"
                                   value={date}
                                   onChange={onInputChange}
                                   sx={{backgroundColor: "#fff",}}
                                   fullWidth
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField
                                   fullWidth
                                   variant="outlined"
                                   label={"Observaciones"}
                                   name="observaciones"
                                   value={observaciones}
                                   onChange={onInputChange}
                                   sx={{backgroundColor: "#fff",}}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={initialClassOption}
                                   label={"Clase"}
                                   value={valueSelected.classSelected}
                                   handleSelect={(e) => onValueSelected(e, "classSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <Button variant="outlined" size={"large"} type="submit">
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
               <SnackBarActions handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </div>
     );
};
