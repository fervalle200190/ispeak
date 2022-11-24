import CourseCard from "components/CourseCard";
import { CourseCardCommunity } from "components/CourseCardCommunity";
import { CoursesContext } from "context/coursesContext";
import { useContext, useEffect, useMemo } from "react";
import { v4 } from "uuid";

export default function CourseList({ courses: coursesList, url }) {
     const { profesor: professor = false } = useContext(CoursesContext);
     const courses = useMemo(() => {
          if (url === "courses") {
               return coursesList.filter((course) => course.planEstudio !== "Obligatorio");
          }
          if (url === "courses-paced") {
               return coursesList.filter((course) => course.planEstudio === "Obligatorio");
          }
          return coursesList
     }, [coursesList, url]);
     return (
          <div className="flex flex-wrap gap-5">
               {professor
                    ? courses.map((course) => (
                           <CourseCardCommunity key={v4()} url={url} {...course} />
                      ))
                    : courses.map((course) => {
                                return (
                                     <CourseCard
                                          key={v4()}
                                          url={url}
                                          {...course}
                                     />
                                );
                           }
                      )}
          </div>
     );
}
