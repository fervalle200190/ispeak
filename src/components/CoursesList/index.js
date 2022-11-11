import CourseCard from "components/CourseCard";
import { CourseCardCommunity } from "components/CourseCardCommunity";
import { CoursesContext } from "context/coursesContext";
import { useContext } from "react";
import { v4 } from "uuid";

export default function CourseList({ courses, url }) {
     const { profesor: professor = false } = useContext(CoursesContext);
     return (
          <div className="flex flex-wrap gap-5">
               {professor
                    ? courses.map(({ title, id }) => (
                           <CourseCardCommunity key={v4()} id={id} url={url} title={title} />
                      ))
                    : courses.map(
                           ({
                                id,
                                nombre,
                                cantidadAlumnos,
                                duracion,
                                profesor,
                                porcentajeCompletado,
                           }) => {
                                return (
                                     <CourseCard
                                          key={v4()}
                                          id={id}
                                          url={url}
                                          title={nombre}
                                          students={cantidadAlumnos}
                                          duration={duracion}
                                          professor={profesor}
                                          progress={porcentajeCompletado}
                                     />
                                );
                           }
                      )}
          </div>
     );
}
