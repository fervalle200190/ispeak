import { API_KEY, API_URL, USER_ID } from "./settings";

export const getModuleByCourseIdAsync = async (id) => {
     try {
          const url = `${API_URL}/Modulos/GetByCurso/${id}/1234/`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const modulos = await res.json();
          return {
               ok: true,
               modulos,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error,
          };
     }
};
