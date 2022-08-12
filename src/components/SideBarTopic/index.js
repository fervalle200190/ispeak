import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import HeaderIcons from "components/HeaderIcons";

function SideBarTopic({ students, profesor }) {
     let approved = students.filter(
          (student) => student.ocupacion === "Profesor"
     );
     let alumnos = students.filter((student) => student.rol === "Alumno");

     return (
          <div className="absolute min-h-full bg-white right-0 translate-x-full">
               <div className="sidebar__top">
                    <h4 className="text-primary text-xl font-semibold">
                         {" "}
                         Participants{" "}
                    </h4>
                    <GroupsIcon
                         titleAccess={`${students.length}/1000`}
                         fontSize="large"
                         className="sideicon__top"
                    />
                    <p>algo</p>
               </div>

               <div className="sidebar__channels">
                    <div className="sidebar__channelsHeader">
                         <table className="sidebar__table">
                              <tbody>
                                   <tr>
                                        <th>
                                             <h2 className="sidetitle__names">
                                                  Instructors
                                             </h2>
                                        </th>
                                   </tr>

                                   <tr>
                                        <td className="sidetitle__names">
                                             <HeaderIcons name="profile" />
                                        </td>
                                        <td>
                                             <h2 className="sidetitle__names">
                                                  {profesor}
                                             </h2>
                                        </td>
                                   </tr>

                                   <tr>
                                        <th>
                                             <h2 className="sidetitle__names">
                                                  Students{" "}
                                             </h2>
                                        </th>
                                   </tr>

                                   {alumnos
                                        ? alumnos.map((canal) => {
                                               return (
                                                    <tr key={canal.id}>
                                                         <td>
                                                              <HeaderIcons name="profile" />
                                                         </td>

                                                         <td>
                                                              <h2 className="sidetitle__names ">
                                                                   {
                                                                        canal.nombre
                                                                   }
                                                              </h2>
                                                         </td>
                                                    </tr>
                                               );
                                          })
                                        : null}
                              </tbody>
                         </table>
                    </div>

                    <div className="sidebar__channelsList"></div>
               </div>
          </div>
     );
}

export default SideBarTopic;
