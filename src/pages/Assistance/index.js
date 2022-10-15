import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { DataCell } from "components/DataCell";
import getAssistancesByProfessor from "services/getAssistancesByProfessor";
import { TextField } from "@mui/material";

// const Assistances = ({ assistances }) => {
//      return assistances.map((assistance) => {
//           return (
//                <tr className="h-10 text-center" key={assistance.id}>
//                     <td className="text-left">{assistance.id}</td>
//                     <td>{assistance.alumno}</td>
//                     <td>{assistance.curso}</td>
//                     <td>{assistance.modulo}</td>
//                     <td>{assistance.clase}</td>
//                     <td>{assistance.dia}</td>
//                     <td>{assistance.presente}</td>
//                </tr>
//           );
//      });
// };

export default function AssistancePage() {
     const [asistance, setAsistance] = useState(
          [...Array(10)].map((a, i) => ({
               id: i,
               classOne: i % 2 === 0,
               classTwo: !i % 2 === 0,
               classThree: i % 2 === 0,
               classFour: !i % 2 === 0,
               classFive: i % 2 === 0,
               classSix: !i % 2 === 0,
               classSix: i % 2 === 0,
               classSeven: "no info",
               classEight: "no info",
          }))
     );
     useEffect(() => {
          getAssistancesByProfessor().then((response) =>
               setAsistance(response)
          );
     }, []);

     const handleAsistance = (id, classRoom) => {
          const newData = asistance.map((asis) => {
               if (asis.id === id) {
                    return {
                         ...asis,
                         [classRoom]:
                              asis[classRoom] === "no info"
                                   ? true
                                   : asis[classRoom]
                                   ? false
                                   : "no info",
                    };
               }
               return asis;
          });
          setAsistance(newData);
     };

     const columns = [
          { field: "id", headerName: "Código", width: 90 },
          { field: "name", headerName: "Nombre", width: 100 },
          { field: "module", headerName: "Modulo", width: 100 },
          {
               field: "class1",
               headerName: "Clase 1",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classOne"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class2",
               headerName: "Clase 2",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classTwo"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class3",
               headerName: "Clase 3",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classThree"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class4",
               headerName: "Clase 4",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classFour"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class5",
               headerName: "Clase 5",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classFive"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class6",
               headerName: "Clase 6",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classSix"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class7",
               headerName: "Clase 7",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classSeven"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
          {
               field: "class8",
               headerName: "Clase 8",
               width: 100,
               renderCell: (params) => (
                    <DataCell
                         params={params}
                         status={asistance}
                         classN={"classEight"}
                         handleAsistance={handleAsistance}
                    />
               ),
          },
     ];

     const rows = [...Array(10)].map((a, i) => ({
          id: i,
          name: `hola ${i + 1}`,
          module: `modulo ${i + 1}`,
     }));

     return (
          <div className="w-full p-5">
               <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div>
                         <h1 className="text-primary text-xl font-semibold">
                              Assistances<span className="text-accent">.</span>
                         </h1>
                    </div>
                    <div className="h-[100vh] w-full">
                         <TextField
                              label={"Cursos"}
                              sx={{ width: 300, mb: 2 }}
                              select
                         />
                         <DataGrid columns={columns} rows={rows} />
                         {/* <table className="w-full">
                              <thead className="text-primary/60 h-10 border-b-2">
                                   <tr>
                                        <th className="text-left font-semibold">
                                             ID
                                        </th>
                                        <th className="font-semibold">Name</th>
                                        <th className="font-semibold">
                                             Course
                                        </th>
                                        <th className="font-semibold">
                                             Module
                                        </th>
                                        <th className="font-semibold">Class</th>
                                        <th className="font-semibold">Day</th>
                                        <th className="font-semibold">
                                             Assitance
                                        </th>
                                   </tr>
                              </thead>
                              <tbody className="text-gray-500">
                                   <Assistances assistances={falseInfo} />
                              </tbody>
                         </table> */}
                    </div>
               </div>
          </div>
     );
}
