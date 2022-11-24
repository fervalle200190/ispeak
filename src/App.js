import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "wouter";

import LoginPage from "pages/Login";
import DashboardPage from "./pages/Dashboard";
import CoursesPage from "./pages/Courses";
import CoursePage from "./pages/Course";
import MaterialPage from "./pages/Material";
import AdditionalMaterialPage from "./pages/AdditionalMaterial";
import ProfilePage from "pages/Profile";
import StudentsPage from "pages/Students";
import { MyCommunityPage } from "pages/MyCommunity";
import MyTopicPage from "pages/MyTopic";
import ProfessorCoursesPage from "pages/ProfessorCourses";
import AssistancePage from "pages/Assistance";
import FollowUpPage from "pages/FollowUp";
import ProgressPage from "pages/Progress";
import CalendarPage from "pages/Calendar";
import ExternalRegisterPage from "pages/ExternalRegister";

import SideBar from "./components/SideBar";
import Header from "./components/Header";

import "./App.css";
import { SideBarContext } from "context/sideBarContext";
import { CoursesContext } from "context/coursesContext";
import getAllCoursesByUser from "services/getAllCoursesByUser";
import JitsiMeetPage from "pages/JitsiMeet";
import { SizeContext } from "context/SizeContext";
import { PreSignUp } from "pages/PreSignUp";
import { PasswordPage } from "pages/Password";
import { Navigate, useParams } from "react-router-dom";
import getAllCourses from "services/getAllCourses";
import CourseCommunityPage from "pages/CourseCommunity";
import ModuleCommunityPage from "pages/ModuleCommunity";
import MaterialCommunityPage from "pages/MaterialCommunity";
import { BubblePage } from "pages/BubblePage";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./firebase/credentials";
import { AddAsistancesPage } from "pages/AddAsistances";
import { getAllCoursesAsync } from "services/getAllCoursesAsync";
import { BubblecommunityPage } from "pages/BubbleCommunity";
import CoursePacedPage from "pages/CoursePaced";
import { ManualRegisterPage } from "pages/ManualRegister";
import getUser from "services/getUser";
import { getPlans } from "services/getPlans";
import { getUserAsync } from "services/getUserAsync";
import CourseCommunityList from "pages/CourseCommunityList";

const RenderProfessorView = () => {
     const user = JSON.parse(window.localStorage.getItem("loggedAppUser"));
     const { showBar } = useContext(SizeContext);
     const [courses, setCourses] = useState([]);

     const getData = async () => {
          const courses = await getAllCoursesAsync();
          setCourses(courses);
     };

     useEffect(() => {
          getData();
     }, []);

     return (
          <CoursesContext.Provider value={{ courses, profesor: true }}>
               <div
                    className={`App flex flex-col items-center ${
                         showBar ? "md:ml-60" : "md:ml-10"
                    }`}
               >
                    <SideBar />
                    <Header user={user} />
                    <main className="w-full ">
                         <Switch>
                              <Route component={DashboardPage} path="/" />
                              <Route component={StudentsPage} path="/students" />
                              <Route component={ProfessorCoursesPage} path="/courses" />
                              <Route path="/course-community">
                                   {(params) => (
                                        <CourseCommunityPage
                                             url={"course-community"}
                                             params={params}
                                        />
                                   )}
                              </Route>
                              {/* <Route path="/course-community/:courseId">
                                   {(params) => (
                                        <ModuleCommunityPage url="course-community" params={params} />
                                   )}
                              </Route> */}
                              <Route path="/course-community/:courseId">
                                   {(params) => (
                                        <CoursePage url={"course-community"} params={params} />
                                   )}
                              </Route>
                              <Route path="/courses-community-no/:courseId">
                                   {(params) => (
                                        <CourseCommunityList
                                             url="courses-community-no"
                                             params={params}
                                        />
                                   )}
                              </Route>
                              <Route path="/courses-community-no/:courseId/module/:moduleId/material/:materialId">
                                   {(params) => (
                                        <MaterialPage
                                             url={"courses-community-no"}
                                             params={params}
                                        />
                                   )}
                              </Route>
                              <Route path="/course-community/bubble/:courseId/:moduleId">
                                   {(params) => (
                                        <BubblecommunityPage
                                             params={params}
                                             url={"course-community"}
                                        />
                                   )}
                              </Route>
                              <Route path="/course-community/:courseId/module/:moduleId/material/:materialId/:bubbleId">
                                   {(params) => (
                                        <MaterialCommunityPage
                                             url={"course-community"}
                                             params={params}
                                        />
                                   )}
                              </Route>
                              <Route component={AssistancePage} path="/assistance" />
                              <Route component={AddAsistancesPage} path="/assistance/ingresar" />
                              <Route component={FollowUpPage} path="/followup" />
                              <Route component={ProgressPage} path="/progress" />
                              <Route component={MyCommunityPage} path="/community" />
                              <Route component={MyTopicPage} path="/community/:topicId" />
                              <Route component={JitsiMeetPage} path="/JitsiMeet/:jitsiId" />
                         </Switch>
                    </main>
               </div>
          </CoursesContext.Provider>
     );
};

const RenderStudentView = () => {
     const USER = JSON.parse(window.localStorage.getItem("loggedAppUser"));
     const [courses, setCourses] = useState([]);
     const [userPlan, setUserPlan] = useState("");
     const { showBar } = useContext(SizeContext);

     const getInfo = async () => {
          const [user, plans] = await Promise.all([getUserAsync(), getPlans()]);
          const userSelected = plans.find((plan) => plan.id === user.plan);
          if (!userSelected) return;
          setUserPlan(userSelected);
     };

     useEffect(() => {
          getAllCoursesByUser(USER.id).then((response) => {
               setCourses(response);
          });
          getInfo();
     }, [USER.id]);

     return (
          <>
               <CoursesContext.Provider value={{ courses, userPlan }}>
                    <div
                         className={`App tranisition-all flex flex-col items-center ${
                              showBar ? "md:ml-60" : "md:ml-10"
                         }`}
                    >
                         <SideBar />
                         <Header user={USER} />
                         <main className="w-full">
                              <Switch>
                                   <Route component={DashboardPage} path="/" />
                                   <Route path="/courses">
                                        {(params) => (
                                             <CoursesPage url={"courses"} params={params} />
                                        )}
                                   </Route>
                                   <Route path="/courses-paced">
                                        {(params) => (
                                             <CoursesPage url="courses-paced" params={params} />
                                        )}
                                   </Route>
                                   <Route path="/courses/:courseId">
                                        {(params) => <CoursePage url={"courses"} params={params} />}
                                   </Route>
                                   <Route path="/courses-paced/:courseId">
                                        {(params) => (
                                             <CoursePacedPage url="courses-paced" params={params} />
                                        )}
                                   </Route>
                                   <Route path="/courses-paced/bubble/:courseId/:moduleId">
                                        {(params) => (
                                             <BubblePage params={params} url={"courses-paced"} />
                                        )}
                                   </Route>
                                   <Route path="/courses/bubble/:courseId/:moduleId">
                                        {(params) => <BubblePage params={params} url={"courses"} />}
                                   </Route>
                                   <Route path="/courses/:courseId/module/:moduleId/material/:materialId/:bubbleId">
                                        {(params) => (
                                             <MaterialPage url={"courses"} params={params} />
                                        )}
                                   </Route>
                                   <Route path="/courses-paced/:courseId/module/:moduleId/material/:materialId">
                                        {(params) => (
                                             <MaterialPage
                                                  url={"courses-paced"}
                                                  community={false}
                                                  params={params}
                                             />
                                        )}
                                   </Route>
                                   <Route component={AdditionalMaterialPage} path="/refuerzo" />
                                   <Route component={ProfilePage} path="/profile" />
                                   <Route component={CalendarPage} path="/calendar" />
                                   <Route component={MyCommunityPage} path="/community" />
                                   <Route component={MyTopicPage} path="/community/:topicId" />
                                   <Route component={JitsiMeetPage} path="/JitsiMeet/:jitsiId" />
                              </Switch>
                         </main>
                    </div>
               </CoursesContext.Provider>
          </>
     );
};

function App() {
     const [user, setUser] = useState(null);
     const [isOpen, setIsOpen] = useState(false);

     useEffect(() => {
          const loggedUserJson = localStorage.getItem("loggedAppUser");
          if (loggedUserJson) {
               const user = JSON.parse(loggedUserJson);
               setUser(user);
          }
     }, []);

     return (
          <>
               {!user ? (
                    <>
                         <Switch>
                              <Route component={LoginPage} path="/" />
                              <Route component={PasswordPage} path="/password" />
                              <Route component={ManualRegisterPage} path="/manual-register" />
                              <Route component={ExternalRegisterPage} path="/register/:paymentId" />
                              <Route
                                   component={PreSignUp}
                                   path="/pre-register/:planId/:countryId"
                              />
                         </Switch>
                    </>
               ) : (
                    <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
                         {user.rol === "Profesor" ? <RenderProfessorView /> : <RenderStudentView />}
                    </SideBarContext.Provider>
               )}
          </>
     );
}

export default App;
