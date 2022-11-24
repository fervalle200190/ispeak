import { Box, Button, Grid, TextField } from "@mui/material";
import { SelectOptions } from "components/SelectOptions";
import { SnackBarActions } from "components/SnackBarActions";
import { CoursesContext } from "context/coursesContext";
import { useForm } from "hooks/useForm";
import { useContext, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { getAllUsersAsync } from "services/getAllUsersAsync";
import { getAttendanceById } from "services/getAttendanceById";
import { getModuleByCourseIdAsync } from "services/getModuleByCourseIdAsync";
import { processAttendanceToUpdate } from "services/processAttendanceToUpdate";
import { USER_ID } from "services/settings";
import { updateAttendance } from "services/updateAttendance";

export const initialClassOption = [...Array(8)].map((a, i) => ({
     label: `Clase ${i + 1}`,
     value: i + 1,
}));

const initialForm = {
     observaciones: "",
     date: "",
};

const initialSelected = {
     profesorSelected: "",
     moduloSelected: "",
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

export const FormEditAsistance = ({ modalInfo, closeModal }) => {
     const { date, observaciones, onInputChange, formState, onResetForm, setFormState } =
          useForm(initialForm);
     const { courses } = useContext(CoursesContext) || [];
     const [valueSelected, setValueSelected] = useState(initialSelected);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [selectsData, setSelectsData] = useState(initialList);
     const [originalAttend, setOriginalAttend] = useState({});
     const [studentSelected, setStudentSelected] = useState({ label: "", value: "" });

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
          const professors = users
               .filter(({ user }) => user.rol === "Profesor")
               .map(({ user }) => user);
          const students = users
               .filter(({ user }) => user.rol === "Alumno")
               .map(({ user }) => user);
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

     useEffect(() => {
          if (valueSelected.courseSelected.length <= 0) return;
          getModules(valueSelected.courseSelected);
     }, [valueSelected.courseSelected]);

     const getRawAttend = async (id) => {
          const { data } = await getAttendanceById(id);
          setOriginalAttend(data);
          setFormState({
               ...formState,
               observaciones: data.observaciones,
               date: data.fecha.slice(0, -9),
          });
          setStudentSelected(
               selectsData.studentsList.find((student) => student.value === data.alumnoId)
          );
          setValueSelected({
               courseSelected: data.cursoId,
               profesorSelected: data.profesorId,
               moduloSelected: data.moduloId,
               classSelected: data.clase,
               presentSelected: data.presente,
          });
     };

     useEffect(() => {
          getData();
     }, []);

     useEffect(() => {
          if (!modalInfo.id) return;
          if (selectsData.studentsList.length <= 0 || selectsData.professorsList.length <= 0)
               return;
          getRawAttend(modalInfo.id);
     }, [modalInfo, selectsData]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               valueSelected.classSelected === originalAttend.clase &&
               valueSelected.courseSelected === originalAttend.cursoId &&
               valueSelected.moduloSelected === originalAttend.moduloId &&
               valueSelected.profesorSelected === originalAttend.profesorId &&
               studentSelected.value === originalAttend.alumnoId &&
               valueSelected.presentSelected === originalAttend.presente &&
               observaciones === originalAttend.observaciones &&
               date === originalAttend.fecha.slice(0, -9)
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor cambia algun datos" });
               return;
          }
          const res = await updateAttendance(
               processAttendanceToUpdate({
                    ...originalAttend,
                    ...valueSelected,
                    studentSelected: studentSelected.value,
                    ...formState,
                    date: new Date(date).toISOString(),
               })
          );
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({
               ...initialSnackBar,
               isSnackBarOpen: true,
               message: "Asistencia editada exitosamente!!!",
          });
     };

     return (
          <>
               <Box
                    component={"form"}
                    width={"100%"}
                    sx={{ p: 5, overflowY: "auto", height: "400px" }}
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
                              <Button
                                   variant="outlined"
                                   size={"large"}
                                   type="submit"
                                   sx={{ mr: 2 }}
                              >
                                   Guardar
                              </Button>
                              <Button
                                   variant="contained"
                                   color="error"
                                   size={"large"}
                                   type="submit"
                                   onClick={closeModal}
                              >
                                   Cancelar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
               <SnackBarActions handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
