import { API_URL } from "./settings";

export const getAllStudentsCombo = async () => {
     try {
          const url = `${API_URL}/Usuario/GetAlumnosCombo/1234`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const students = await res.json();
          return {
               ok: true,
               students,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error || "Ha ocurrido un error",
          };
     }
};
