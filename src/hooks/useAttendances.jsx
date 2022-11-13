import { useEffect, useState } from "react";
import { getAssistancesByProfessor } from "services/getAssistancesByProfessor";

export const useAttendances = () => {
     const [attendances, setAttendances] = useState({columns: [], rows: []});

     const getData = async () => {
          const { data } = await getAssistancesByProfessor();
          const columns = [
               { field: "id", headerName: "Código", width: 80, editable: true },
               {
                    field: "student",
                    headerName: "Alumno",
                    width: 150,
                    editable: true,
               },
               { field: "course", headerName: "Curso", width: 150, editable: true },
               { field: "module", headerName: "Modulo", width: 300, editable: true },
               { field: "class", headerName: "Clase", width: 100, editable: true },
               { field: "day", headerName: "Día", width: 100, editable: true },
               {
                    field: "present",
                    headerName: "Presente",
                    width: 100,
                    editable: true,
               },
               // //    {
               // //         field: "actions",
               // //         headerName: "",
               // //         sortable: false,
               // //         editable: false,
               // //         disableClickEventBubbling: true,
               // //         disableColumnMenu: true,
               // //         renderCell: (params) => {
               // //              return <DeleteData id={params.row.id} />;
               // //         },
               //    },
          ];

          const rows = data.map((attend) => ({
               id: attend.id,
               student: attend.alumno || "no info",
               course: attend.curso || "no info",
               module: attend.modulo || "no info",
               class: attend.clase? `Clase ${attend.clase}`: 'no info',
               day: attend.dia || "no info",
               present: attend.presente || "no info",
          }));
          setAttendances({ columns, rows });
     };

     useEffect(() => {
          getData();
     }, []);

     return {
          attendances,
     };
};
