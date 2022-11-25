export const processAttendanceToUpdate = ({
     profesorSelected,
     moduloSelected,
     studentSelected,
     courseSelected,
     classSelected,
     observaciones,
     presentSelected,
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
          presente: presentSelected,
          reprogramar: "true",
          observaciones,
          fechaCarga,
          clase: classSelected,
     };
};
