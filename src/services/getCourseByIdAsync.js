import { API_URL, USER_ID } from "./settings";

export const getCourseByIdAsync = async (courseId) => {
     try {
          const url = `${API_URL}/Cursos/GetById/${courseId}/1234/`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(res);
          const course = await res.json();
          return {
               ok: true,
               course,
          };
     } catch (error) {
          return {
               ok: false,
          };
     }
};
