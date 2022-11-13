import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link, useLocation } from "wouter";

import getCourseById from "services/getCourseById";

import "./styles.css";
import CourseIcons from "components/CourseIcons";
import { CoursesContext } from "context/coursesContext";
import { collection, doc, Firestore, getDoc, getDocs, query } from "firebase/firestore";
import firebaseApp, { firestore } from "../../firebase/credentials";
import { BubblePage } from "pages/BubblePage";

function AccordionItem({ course, module, index, url }) {
     const [isActive, setActive] = useState(true);
     const [location, setLocation] = useLocation();
     const onClickCard = () => {
          setLocation(`/${url}/bubble/${course}/${module.id}`);
     };
     return (
          <li
               key={module.id}
               onClick={onClickCard}
               className="accordion-item show-peace-page text-primary cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:border-teal-500"
          >
               <div
                    className="flex w-full items-center justify-between"
                    onClick={() => setActive(!isActive)}
               >
                    <div className="flex items-center">
                         <h2 className="accordion-title font-Barlow text-primary mr-5 text-center text-lg font-semibold">
                              {module.moduleName}
                         </h2>
                    </div>
               </div>
          </li>
     );
}

function Module({ course, modules = [], url }) {
     return (
          <>
               {modules.map((module, index) => (
                    <AccordionItem
                         key={module.id}
                         module={module}
                         course={course}
                         index={index}
                         url={url}
                    />
               ))}
          </>
     );
}

export default function CoursePage({ params, url }) {
     const id = parseInt(params.courseId);
     const [modules, setModules] = useState([])
     // const [course, setCourse] = useState({});

     const { courses } = useContext(CoursesContext) || [];
     const course = useMemo(() => {
          console.log(courses)
          const courseSelected = courses.filter((course) => course.id === parseInt(id))[0];
          return {
               ...courseSelected,
               modulos: courseSelected?.modulos?.filter((mod) => mod.nombre.includes(`Content`)),
          };
     }, [courses]);

     const getData = async () => {
          const docRef = collection(firestore, "modulos", `${id}`, "modulos");
          const data = await getDocs(query(docRef));
          const modulos = [];
          data.forEach((item) => {
               modulos.push(item.data());
          });
          setModules(modulos);
     };

     useEffect(() => {
          getData();
     }, []);


     // useEffect(() => {
     //   getCourseById({ id }).then((course) => setCourse(course));
     //   const filterCourse = course.filter(
     //     (course) => course.id === parseInt(id)
     //   )[0];
     //   setCourse(filterCourse);
     // }, [course, id]);

     return (
          <section className="p-5 md:p-10 show-peace-page">
               {course ? (
                    <>
                         <h1 className="font-Barlow text-primary mr-5 text-2xl font-semibold">
                              {course.nombre || course.title}
                         </h1>
                         <ol className="accordion flex flex-col gap-3 p-5">
                              {<Module url={url} course={course.id} modules={modules} />}
                         </ol>
                    </>
               ) : (
                    <></>
               )}
          </section>
          // <></>
     );
}
