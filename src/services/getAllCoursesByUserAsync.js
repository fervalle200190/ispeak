import { API_KEY, API_URL, USER_ID } from "./settings";

export const getAllCoursesByUserAsync = async () => {
     try {
          const url = `${API_URL}/Cursos/GetAllByAlumno/${USER_ID}/${API_KEY}/${USER_ID}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Ha ocurrido un error");
          const courses = await res.json();
          return {
               ok: true,
               courses,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error || "Ha ocurrido un error",
          };
     }
};
