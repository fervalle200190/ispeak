export const processAttendanceToUpdate = ({
     profesorSelected,
     moduloSelected,
     studentSelected,
     courseSelected,
     classSelected,
     observaciones,
     attendanceSelected,
     fechaCarga,
     id,
     date,
}) => {
     return {
          id,
          alumnoId: studentSelected,
          cursoId: courseSelected,
          moduloId: moduloSelected,
          profesorId: profesorSelected,
          fecha: date,
          presente: attendanceSelected,
          reprogramar: "true",
          observaciones,
          fechaCarga,
          clase: classSelected,
     };
};
