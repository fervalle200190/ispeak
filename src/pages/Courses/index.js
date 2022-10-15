import React, { useContext, useEffect, useState } from "react";

// import getCoursesByUserId from "services/getCoursesByUserId";
import { CoursesContext } from "context/coursesContext";

import CourseListSection from "components/CoursesSection";
import CoursesHeader from "components/CoursesHeader";
import {
     filterByBoth,
     filterByCategory,
     filterBySearch,
     filterByStatus,
} from "utils";
import { Typography } from "@mui/material";

const initialSelect = "";

export default function CoursesPage({ url }) {
     const [course, setCourse] = useState([]);
     const [search, setSearch] = useState("");
     const [category, setCategory] = useState(initialSelect);
     const [status, setStatus] = useState(initialSelect);
     const courses = useContext(CoursesContext);

     const handleCategory = (e) => {
          setCategory(e.target.value);
     };

     const handleStatus = (e) => {
          setStatus(e.target.value);
     };

     const handleSearch = (e) => {
          setSearch(e.target.value);
     };

     useEffect(() => {
          if (category === "" && status === "") {
               setCourse(courses);
               return;
          }
          if (category === "" && status !== "") {
               return setCourse(filterByStatus(courses, status));
          }
          if (category !== "" && status === "") {
               return setCourse(filterByCategory(courses, category));
          }
          if (category !== "" && status !== "") {
               return setCourse(filterByBoth(courses, category, status));
          }
     }, [category, status, courses]);

     useEffect(() => {
          if (search !== "") {
               setCategory(initialSelect);
               setStatus(initialSelect);
               setCourse(filterBySearch(courses, search));
          }
          if (search === "") {
               setCourse(courses);
          }
     }, [search]);

     return (
          <>
               <section className="flex w-full flex-col gap-5 p-5 md:p-10">
                    <CoursesHeader
                         coursesNum={courses.length}
                         handleCategory={handleCategory}
                         handleStatus={handleStatus}
                         handleSearch={handleSearch}
                         search={search}
                    />
                    {course.length > 0 ? (
                         <CourseListSection courses={course} url={url} />
                    ) : (
                         <Typography variant="h6" mt={5} color='#1e3a8a'>
                              No results, probably you have not completed
                              progress.
                         </Typography>
                    )}
               </section>
          </>
     );
}
