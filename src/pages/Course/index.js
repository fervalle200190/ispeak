import React, { useState, useEffect, useContext } from "react";
import { Link } from "wouter";

import getCourseById from "services/getCourseById";

import "./styles.css";
import CourseIcons from "components/CourseIcons";
import { CoursesContext } from "context/coursesContext";

function AccordionItem({ course, module, index, url }) {
  const [isActive, setActive] = useState(true);

  return (
    <li
      key={module.id}
      className="accordion-item rounded-xl border-gray-200 bg-white p-5 text-primary shadow-sm transition-all duration-300 ease-in-out"
    >
      <div
        className="flex w-full items-center justify-between"
        onClick={() => setActive(!isActive)}
      >
        <div className="flex items-center">
          <h2 className="accordion-title mr-5 text-center font-Barlow text-lg font-semibold text-primary">
            {module.nombre}
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
        {module.clases.map((clase, index) => (
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
                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-accent p-2">
                      <span className="mr-1 font-semibold text-primary">
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
                  <h3 className="font-Barlow font-semibold text-primary">
                    {clase.nombre}
                  </h3>
                </div>
                <div className=" flex h-28 items-center justify-center border-l border-gray-200 p-3 text-2xl font-semibold text-primary">
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

function Module({ course, modules = [], url }) {
  return modules.map((module, index) => (
    <AccordionItem
      key={module.id}
      course={course}
      module={module}
      index={index}
      url={url}
    />
  ));
}

export default function CoursePage({ params, url }) {
  const id = params.courseId;
  // const [course, setCourse] = useState({});
  const courses = useContext(CoursesContext) || {};
  const course = courses.filter((course) => course.id === parseInt(id))[0];

  // useEffect(() => {
  //   getCourseById({ id }).then((course) => setCourse(course));
  //   const filterCourse = course.filter(
  //     (course) => course.id === parseInt(id)
  //   )[0];
  //   setCourse(filterCourse);
  // }, [course, id]);
  

  return (
    <section className="p-5 md:p-10">
      {course ? (
        <>
          <h1 className="mr-5 font-Barlow text-2xl font-semibold text-primary">
            {course.nombre}
          </h1>
          <ol className="accordion flex flex-col gap-3 p-5">
            {<Module url={url} course={course.id} modules={course.modulos} />}
          </ol>
        </>
      ) : (
        <></>
      )}
    </section>
    // <></>
  );
}
