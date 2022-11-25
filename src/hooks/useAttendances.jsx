import { useEffect, useState } from "react";
import { getAssistancesByProfessor } from "services/getAssistancesByProfessor";

export const useAttendances = () => {
     const [attendances, setAttendances] = useState({ columns: [], rows: [], rawAttends: [] });

     const getData = async () => {
          const { data } = await getAssistancesByProfessor();
          const columns = [
               { field: "id", headerName: "Código", width: 80 },
               {
                    field: "student",
                    headerName: "Alumno",
                    width: 150,
               },
               { field: "course", headerName: "Curso", width: 150 },
               { field: "module", headerName: "Modulo", width: 300 },
               { field: "class", headerName: "Clase", width: 100 },
               { field: "day", headerName: "Día", width: 100 },
               {
                    field: "present",
                    headerName: "Presente",
                    width: 100,
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
               class: attend.clase ? `Clase ${attend.clase}` : "no info",
               day: attend.dia || "no info",
               present: attend.presente || "no info",
          }));
          setAttendances({ columns, rows, rawAttends: data });
     };

     useEffect(() => {
          getData();
     }, []);

     return {
          attendances,
          getData
     };
};
