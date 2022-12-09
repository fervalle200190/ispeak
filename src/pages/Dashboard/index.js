import React, { useContext, useEffect } from "react";

import DashboardSection from "components/DashboardSection";
// import CourseListSection from "components/CoursesSection";

// import getCoursesByUserId from "services/getCoursesByUserId";
import getCoursesByProfessor from "services/getCoursesByProfessorId";
import DashboardCourses from "components/DashboardCourses";
import { CoursesContext } from "context/coursesContext";
import { useState } from "react";
import getAllCourses from "services/getAllCourses";

const RenderProfessor = () => {
     const [courses, setCourses] = useState(0);

     useEffect(() => {
          getAllCourses().then((res) => setCourses(res.length));
     }, []);
     const user = JSON.parse(localStorage.getItem("loggedAppUser"));
     const username = user.nombre.split(" ").slice(0, 1);
     return (
          <div className="flex w-full flex-col gap-5 p-5">
               <div>
                    <div className="bg-primary flex w-full flex-col rounded-xl p-5">
                         <span className="text-xl font-semibold text-white">
                              Welcome back, {username}
                              <span className="text-accent">.</span>
                         </span>
                         <button className="bg-accent text-primary w-40 rounded-md p-1 text-sm font-semibold">
                              Create your course
                         </button>
                    </div>
               </div>
               <div className="grid grid-cols-2 gap-5">
                    <div className="flex h-24 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                         <span className="text-primary text-xl font-semibold">
                              Active students<span className="text-accent">.</span>
                         </span>
                         <span className="text-primary w-full text-right text-2xl">120</span>
                    </div>
                    <div className="flex h-24 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                         <span className="text-primary text-xl font-semibold">
                              Courses<span className="text-accent">.</span>
                         </span>
                         <span className="text-primary w-full text-right text-2xl">{courses}</span>
                    </div>
               </div>
               <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <span className="text-primary text-xl font-semibold">
                         My Students<span className="text-accent">.</span>
                    </span>
               </div>
               <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <span className="text-primary text-xl font-semibold">
                         My Courses<span className="text-accent">.</span>
                    </span>
               </div>
          </div>
     );
};

const RenderStudent = ({ courses }) => {
     return (
          <div className="max-w-7xl">
               <DashboardSection />
               {/* <DashboardCourses /> */}
          </div>
     );
};

export default function DashboardPage() {
     const userInfo = JSON.parse(localStorage.getItem("loggedAppUser"));
     const courses = useContext(CoursesContext);

     // useEffect(() => {
     //   getCoursesByUserId().then((courses) => setMyCourses(courses));
     // }, []);

     return userInfo.rol === "Profesor" ? <RenderProfessor /> : <RenderStudent courses={courses} />;
}
