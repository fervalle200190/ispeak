export const processAttendance = ({
     profesorSelected,
     moduloSelected,
     studentSelected,
     courseSelected,
     classSelected,
     observaciones,
     date,
}) => {
     return {
          alumnoId: studentSelected,
          cursoId: courseSelected,
          moduloId: moduloSelected,
          profesorId: profesorSelected,
          fecha: date,
          presente: "true",
          reprogramar: "true",
          observaciones,
          fechaCarga: "2022-10-05T14:48:00.000Z",
          clase: classSelected,
     };
};
