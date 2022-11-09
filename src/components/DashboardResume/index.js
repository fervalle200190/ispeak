import { useState, useEffect } from "react";
import { useLocation } from "wouter";

import getAllCoursesByUser from "services/getAllCoursesByUser";
import DashboardIcons from "components/DashboardIcons";
import { API_KEY } from "services/settings";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../firebase/credentials";
import { getAllCoursesByUserAsync } from "services/getAllCoursesByUserAsync";

const getData = async (courseId, moduleId) => {
     const docRef = collection(firestore, "modulos", `${courseId}`, "modulos");
     const data = await getDocs(query(docRef));
     const modulos = [];
     data.forEach((item) => {
          modulos.push(item.data());
     });
     return modulos.find((mod) => mod.bubbleIds.includes(moduleId));
};

const getContinueWatching = async (courses) => {
     if (courses.lenght > 1) {
          console.log("NO");
     } else {
          console.log("SI");
     }

     for (let course of courses) {
          const courseId = course.id;
          for (let module of course.modulos) {
               const moduleId = module.id;
               for (let material of module.clases) {
                    if (!material.completada) {
                         const { id: bubbleId } = await getData(courseId,moduleId)
                         return {
                              nombre: material.nombre,
                              thumbnail: material.thumbnails,
                              url: `/courses/${courseId}/module/${moduleId}/material/${material.id}/${bubbleId}`,
                         };
                    }
               }
          }
     }
};

export default function DashboardResume() {
     const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));
     const [resume, setResume] = useState({});
     const [location, setLocation] = useLocation();

     const getData = async () => {
          const { ok, courses } = await getAllCoursesByUserAsync();
          if (!ok) return;
          const materialData = await getContinueWatching(courses)      
          setResume(materialData);
     };

     useEffect(() => {
          getData();
     }, [user.id]);

     const handleResume = () => {
          setLocation(resume.url);
     };

     return (
          <>
               {resume ? (
                    <div className="bg-primary flex max-h-fit min-h-[20px] w-full flex-col gap-5 overflow-hidden rounded-xl text-gray-50 shadow-sm">
                         <div className="w-full">
                              <div className="relative w-full">
                                   <div className="absolute left-0 top-0 z-10 h-full w-full rounded-bl-[2rem] bg-black opacity-30"></div>
                                   <span className="absolute left-2 top-2 z-10 text-xl font-semibold">
                                        {resume.nombre}
                                   </span>
                                   <button
                                        onClick={() => handleResume()}
                                        className="absolute top-1/2 left-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white"
                                   >
                                        <DashboardIcons name="play" />
                                   </button>
                                   <img
                                        src={resume.thumbnail}
                                        alt=""
                                        className="h-full w-full rounded-bl-[2rem]"
                                   />
                              </div>
                              <div className="flex w-full justify-end p-5">
                                   <button
                                        onClick={() => handleResume()}
                                        className="> bg-accent text-primary rounded-xl py-2 px-5 font-medium"
                                   >
                                        Continue your recent courses{" >"}
                                   </button>
                              </div>
                         </div>
                    </div>
               ) : (
                    <></>
               )}
          </>
     );
}

// <Link
//   className="flex h-64 w-56 flex-col rounded-xl border border-gray-300 bg-white shadow-md"
//   href={`/courses/${course}/module/${module.id}/material/${clase.id}`}
// ></Link>;
