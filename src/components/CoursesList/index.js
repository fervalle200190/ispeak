import CourseCard from "components/CourseCard";
import { v4 } from "uuid";

export default function CourseList({ courses, url }) {
  return (
    <div className="flex flex-wrap gap-5">
      {courses.map(
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
