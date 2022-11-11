import { Box, Button, Grid, TextField } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { SnackBarActions } from "components/SnackBarActions";
import { CoursesContext } from "context/coursesContext";
import { useForm } from "hooks/useForm";
import { useContext, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getAllProfessorsCombo } from "services/getAllProfessorsCombo";
import { getAllStudentsCombo } from "services/getAllStudentsCombo";
import { getModuleByCourseIdAsync } from "services/getModuleByCourseIdAsync";
import { postAttendance } from "services/postAttendance";
import { USER_ID } from "services/settings";
import { processAttendance } from "utils/processAttendance";

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
     courseSelected: "",
     classSelected: "",
};

const initialList = {
     moduleList: [],
     studentsList: [],
     professorsList: [],
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
     const { date, observaciones, onInputChange, onResetForm } = useForm(initialForm);
     const { courses } = useContext(CoursesContext) || [];
     const [valueSelected, setValueSelected] = useState(initialSelected);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [selectsData, setSelectsData] = useState(initialList);
     const [studentSelected, setStudentSelected] = useState('')

     const onStudentSelect = (e)=> {
        setStudentSelected(e)
     }

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

     const coursesParsed = useMemo(() => {
          return courses.map((course) => ({
               label: course.title,
               value: course.id,
          }));
     }, [courses]);

     const getData = async () => {
          const { students } = await getAllStudentsCombo();
          const { professors } = await getAllProfessorsCombo();
          const professorsParsed = professors.map((prof) => ({
               label: prof.name,
               value: prof.id,
          }));
          const studentsParsed = students.map((student) => ({
               label: student.name,
               value: student.id,
          }));
          setSelectsData({
               ...selectsData,
               studentsList: studentsParsed,
               professorsList: professorsParsed,
          });
     };

     const getModules = async (id) => {
          const { modulos } = await getModuleByCourseIdAsync(id);
          const modulesParsed = modulos.map((mod) => ({
               label: mod.nombre,
               value: mod.id,
          }));
          setSelectsData({
               ...selectsData,
               moduleList: modulesParsed,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               valueSelected.classSelected === "" ||
               valueSelected.courseSelected === "" ||
               valueSelected.moduloSelected === "" ||
               studentSelected === "" ||
               observaciones === "" ||
               date === ""
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const res = await postAttendance(
               processAttendance({
                    ...valueSelected,
                    studentSelected: studentSelected.value,
                    profesorSelected: USER_ID,
                    observaciones,
                    date,
               })
          );
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({
               ...initialSnackBar,
               isSnackBarOpen: true,
               message: "Asistencia creada exitosamente!!!",
          });
          onResetForm();
          setValueSelected(initialSelected);
          setStudentSelected('')
     };

     useEffect(() => {
          if (valueSelected.courseSelected.length <= 0) return;
          getModules(valueSelected.courseSelected);
     }, [valueSelected.courseSelected]);

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
                                   value={studentSelected}
                                   onChange={(e) => {
                                        onStudentSelect(e)
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={coursesParsed}
                                   value={valueSelected.courseSelected}
                                   handleSelect={(e) => onValueSelected(e, "courseSelected")}
                                   label={"Curso"}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={selectsData.professorsList}
                                   label={"Profesor"}
                                   value={selectsData.professorsList.length <= 0 ? "" : USER_ID}
                                   handleSelect={(e) => onValueSelected(e, "profesorSelected")}
                                   disabled={true}
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
                                   sx={{ backgroundColor: "#fff" }}
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
                                   sx={{ backgroundColor: "#fff" }}
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
