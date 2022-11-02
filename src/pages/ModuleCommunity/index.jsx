import React, { useState, useEffect, useContext } from "react";
import { Link } from "wouter";

import getCourseById from "services/getCourseById";

import "../Course/styles.css";
import CourseIcons from "components/CourseIcons";
import { CoursesContext } from "context/coursesContext";
import { getModulesComboByCourse } from "services/getModulesComboByCourse";
import { getAllStudyMaterials } from "services/getAllStudyMaterials";
import { useMemo } from "react";

function AccordionItem({ course, module, index, url, studyMaterials }) {
     const [isActive, setActive] = useState(true);
     const classes = useMemo(() => {
          return studyMaterials.filter((study) => study.moduloId === module.id);
     }, [studyMaterials]);
     return (
          <li
               key={module.id}
               className="accordion-item text-primary rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out"
          >
               <div
                    className="flex w-full items-center justify-between"
                    onClick={() => setActive(!isActive)}
               >
                    <div className="flex items-center">
                         <h2 className="accordion-title font-Barlow text-primary mr-5 text-center text-lg font-semibold">
                              {module.name}
                         </h2>
                    </div>

                    {isActive ? <CourseIcons name="minus" /> : <CourseIcons name="plus" />}
               </div>
               <ol
                    className={`accordion-content flex flex-wrap  justify-center gap-5 sm:justify-start ${
                         isActive
                              ? "display mt-10 max-h-min"
                              : "m-0 max-h-0 overflow-hidden opacity-0"
                    } mb-1 transition-all duration-500 ease-in-out`}
               >
                    {classes.map((clase, index) => (
                         <li key={clase.id}>
                              <Link
                                   className="flex h-64 w-56 flex-col rounded-xl border border-gray-300 bg-white shadow-md"
                                   href={`/${url}/${course}/module/${module.id}/material/${clase.id}`}
                              >
                                   <div className="relative overflow-hidden rounded-t-xl">
                                        <img
                                             src={clase.thumbnails}
                                             alt={clase.nombre}
                                             className={`h-36 object-cover ${
                                                  clase.completada ? "blur-sm" : "blur-none"
                                             }`}
                                        />
                                        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-10"></div>
                                        {clase.completada ? (
                                             <>
                                                  <div className="bg-accent absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full p-2">
                                                       <span className="text-primary mr-1 font-semibold">
                                                            Complete
                                                       </span>
                                                       <CourseIcons name="check" />
                                                  </div>
                                             </>
                                        ) : (
                                             <></>
                                        )}
                                   </div>
                                   <div className="flex w-full justify-between overflow-hidden rounded-b-lg">
                                        <div className="flex  p-5 font-semibold">
                                             <h3 className="font-Barlow text-primary font-semibold">
                                                  {clase.nombre}
                                             </h3>
                                        </div>
                                        <div className=" text-primary flex h-28 items-center justify-center border-l border-gray-200 p-3 text-2xl font-semibold">
                                             <span>{index + 1}</span>
                                        </div>
                                   </div>
                              </Link>
                         </li>
                    ))}
               </ol>
          </li>
     );
}

function Module({ course, study, modules = [], url }) {
     return (
          <>
               {modules.map((module, index) => (
                    <AccordionItem
                         key={module.id}
                         course={course}
                         module={module}
                         studyMaterials={study}
                         index={index}
                         url={url}
                    />
               ))}
          </>
     );
}

export default function ModuleCommunityPage({ params, url }) {
     const id = params.courseId;
     const [modules, setModules] = useState([]);
     const [studyMaterials, setStudyMaterials] = useState([]);
     //   const courses = useContext(CoursesContext) || {};
     //   const course = courses.filter((course) => course.id === parseInt(id))[0];

     const getModules = async (id) => {
          const res = await getModulesComboByCourse(id);
          const study = await getAllStudyMaterials();
          console.log(study);
          if (!res.ok) return;
          setModules(res.modules);
          setStudyMaterials(study.studyMaterials);
     };

     useEffect(() => {
          getModules(params.courseId);
          //   const filterCourse = course.filter((course) => course.id === parseInt(id))[0];
          //   setCourse(filterCourse);
     }, [params.courseId]);

     return (
          <section className="p-5 md:p-10">
               {modules.length > 0 ? (
                    <>
                         <h1 className="font-Barlow text-primary mr-5 text-2xl font-semibold">
                              {/* {course.nombre} */}
                         </h1>
                         <ol className="accordion flex flex-col gap-3 p-5">
                              {
                                   <Module
                                        url={url}
                                        course={id}
                                        modules={modules}
                                        study={studyMaterials}
                                   />
                              }
                         </ol>
                    </>
               ) : (
                    <></>
               )}
          </section>
          // <></>
     );
}
