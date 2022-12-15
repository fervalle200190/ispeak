import React, { useContext, useEffect } from "react";

import DashboardSection from "components/DashboardSection";
// import CourseListSection from "components/CoursesSection";

// import getCoursesByUserId from "services/getCoursesByUserId";
import { CoursesContext } from "context/coursesContext";
import { useState } from "react";
import getAllCourses from "services/getAllCourses";
import { getStatisticsLevel } from "services/getStadisticsLevel";
import { BubbleStudents } from "components/BubbleStudents";
import FirstIcon from "../../assets/circle1.svg";
import SecondIcon from "../../assets/circle2.svg";
import ThirdIcon from "../../assets/circle3.svg";
import FourthIcon from "../../assets/circle4.svg";
import getCoursesByProfessor from "services/getCoursesByProfessorId";

const RenderProfessor = () => {
     const [courses, setCourses] = useState(0);
     const [levels, setLevels] = useState({
          allLevel: "",
          expert: "",
          junior: "",
          middle: "",
          senior: "",
     });

     useEffect(() => {
          getAllCourses().then((res) => setCourses(res.length));
          getStatisticsLevel().then((res) => setLevels(res.levelStatistics));
          getCoursesByProfessor().then((res)=> console.log(res))
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
                    </div>
               </div>
               <div className="grid grid-cols-2 gap-5">
                    <div className="flex h-24 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                         <span className="text-primary w-full text-xl font-semibold">
                              Active students<span className="text-accent">.</span>
                         </span>
                         <span className="text-primary relative top-[-15px] w-full text-right text-2xl">
                              <div className="flex gap-3">
                                   <BubbleStudents
                                        icon={FirstIcon}
                                        name={"Junior"}
                                        users={levels.junior}
                                        bgColor={"#0084FF"}
                                        textColor="#fff"
                                   />
                                   <BubbleStudents
                                        icon={SecondIcon}
                                        name={"Middle"}
                                        users={levels.middle}
                                        bgColor={"#5DF99C"}
                                        textColor={"#000027"}
                                   />
                                   <BubbleStudents
                                        icon={ThirdIcon}
                                        name={"Senior"}
                                        users={levels.senior}
                                        bgColor={"#5DF99C"}
                                        textColor={"#000027"}
                                   />
                                   <BubbleStudents
                                        icon={FourthIcon}
                                        name={"Expert"}
                                        users={levels.expert}
                                        bgColor={"#000027"}
                                        textColor={"#fff"}
                                   />
                              </div>
                         </span>
                    </div>
                    <div className="flex h-24 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                         <span className="text-primary text-xl font-semibold">
                              Courses<span className="text-accent">.</span>
                         </span>
                         <span className="text-primary w-full relative top-[-42px] text-right text-2xl">
                              <BubbleStudents
                                   icon={SecondIcon}
                                   name={"Cursos"}
                                   users={courses}
                                   bgColor={"#5DF99C"}
                                   textColor={"#000027"}
                              />
                         </span>
                    </div>
               </div>
               <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <span className="text-primary text-xl font-semibold">
                         My Students<span className="text-accent">.</span>
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
