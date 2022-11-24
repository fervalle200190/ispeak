import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAttendances } from "hooks/useAttendances";
import { Link } from "wouter";
import { EditAsistanceModal } from "components/EditAsistanceModal";

const initialModal = { isModalOpen: false, modalData: {} };

export default function AssistancePage() {
     const { attendances } = useAttendances();
     const [modalInfo, setModalInfo] = useState(initialModal);

     const openModal = ({ id }) => {
          setModalInfo({
               isModalOpen: true,
               modalData: attendances.rawAttends.find((attend) => attend.id === id),
          });
     };

     const closeModal = () => {
          setModalInfo(initialModal);
     };

     return (
          <div className="w-full p-5">
               <div className="flex w-full flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex justify-between">
                         <h1 className="text-primary text-xl font-semibold">
                              Assistances<span className="text-accent">.</span>
                         </h1>
                         <Link to="assistance/ingresar">
                              <Button variant="contained" sx={{ backgroundColor: "#1e3a8a" }}>
                                   Agregar Asistencia
                              </Button>
                         </Link>
                    </div>
                    <div className="h-[100vh] w-full">
                         <DataGrid
                              columns={attendances.columns}
                              rows={attendances.rows}
                              onRowDoubleClick={openModal}
                         />
                    </div>
                    <EditAsistanceModal
                         {...modalInfo}
                         closeModal={closeModal}
                    />
               </div>
          </div>
     );
}
