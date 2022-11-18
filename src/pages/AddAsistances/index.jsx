import { Box, Button, Grid, TextField } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { SnackBarActions } from "components/SnackBarActions";
import { CoursesContext } from "context/coursesContext";
import { useForm } from "hooks/useForm";
import { useContext, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getAllUsersAsync } from "services/getAllUsersAsync";
import { getModuleByCourseIdAsync } from "services/getModuleByCourseIdAsync";
import { postAttendance } from "services/postAttendance";
import { USER_ID } from "services/settings";
import { processAttendance } from "utils/processAttendance";

export const initialClassOption = [...Array(8)].map((a, i) => ({
     label: `Clase ${i}`,
     value: i + 1,
}));

const initialForm = {
     observaciones: "",
     date: "",
};

const initialSelected = {
     profesorSelected: "",
     moduloSelected: [],
     courseSelected: "",
     classSelected: "",
     presentSelected: "",
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

const optionPresence = [
     { label: "Presente", value: true },
     { label: "Ausente", value: false },
];

const customSelectStyles = {
     input: (provided, state) => ({
          ...provided,
          height: "47px",
          outline: state.isHovering ? "1px solid #000" : "none",
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
     const [studentSelected, setStudentSelected] = useState("");

     const onStudentSelect = (e) => {
          setStudentSelected(e);
     };

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
               label: course.nombre,
               value: course.id,
          }));
     }, [courses]);

     const getData = async () => {
          const { users } = await getAllUsersAsync();
          const professors = users.filter((user) => user.rol === "Profesor");
          const students = users.filter((user) => user.rol === "Alumno");
          const professorsParsed = professors.map((prof) => ({
               label: prof.nombre,
               value: prof.id,
          }));
          const studentsParsed = students.map((student) => ({
               label: `${student.nombre} - ${student.email}`,
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
               valueSelected.presentSelected === "" ||
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
          setStudentSelected("");
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
                                        onStudentSelect(e);
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
                                   options={optionPresence}
                                   label={"Asistencia"}
                                   value={valueSelected.presentSelected}
                                   handleSelect={(e) => onValueSelected(e, "presentSelected")}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={selectsData.moduleList}
                                   label={"Modulo"}
                                   value={valueSelected.moduloSelected}
                                   multiple={true}
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
