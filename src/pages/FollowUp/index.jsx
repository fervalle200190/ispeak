import { Grid, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CoursesList = () => {
     return (
          <>
               <ul>
                    <li>holaaa</li>
                    <li>holaaa</li>
                    <li>holaaa</li>
                    <li>holaaa</li>
               </ul>
          </>
     );
};

const rowsOne = [];

const columns = [
     { field: "class", headerName: "Clase", width: 150 },
     { field: "className", headerName: "Nombre de clase", width: 180 },
     { field: "videolessons", headerName: "Videolessons", width: 200 },
     {
          field: "indicator",
          headerName: "Indicador",
          width: 150,
     },
     { field: "observations", headerName: "Observaciones", width: 150 },
];

const classes = [...Array(15)].map((a, i) => ({
     id: i + 1,
     videolessons: `BLA BLA BLA ${i + 1}`,
     indicator: "AB",
     className: "nombre clase",
     observations: "blablabla",
     class: `clase ${i + 1}`
}));

export default function FollowUpPage() {
     return (
          <div className="w-full p-5">
               <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div>
                         <h1 className="text-primary text-xl font-semibold">
                              Follow Up<span className="text-accent">.</span>
                         </h1>
                    </div>
                    <Grid container spacing={2}>
                         <Grid item xs={3}>
                              <TextField
                                   label={"Modulo de clase"}
                                   select
                                   fullWidth
                              />
                         </Grid>
                    </Grid>
                    <div className="min-h-[100vh] w-full">
                         <Typography variant="h5">Juan Perez</Typography>
                         <DataGrid
                              rows={classes}
                              columns={columns}
                              rowHeight={30}
                              autoHeight
                         />
                         <Typography variant="h5" mt={5}>Pedro Suarez</Typography>
                         <DataGrid
                              rows={classes}
                              columns={columns}
                              rowHeight={30}
                              autoHeight
                         />
                         {/* <DataGrid /> */}
                         {/* <table className="w-full">
            <thead className="text-primary/60 h-10 border-b-2">
              <tr>
                <th className="text-left font-semibold">ID</th>
                <th className="font-semibold">Student</th>
                <th className="font-semibold">Course</th>
                <th className="font-semibold">Module</th>
                <th className="font-semibold">Class</th>
                <th className="font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-500"> */}
                         {/* <Fo assistances={assistances} /> */}
                         {/* </tbody>
          </table> */}
                    </div>
               </div>
          </div>
     );
}
