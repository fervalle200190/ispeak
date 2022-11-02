import { API_KEY, API_URL, USER_ID } from "./settings";

export const getModulesComboByCourse = async (courseId) => {
     try {
          const url = `${API_URL}/Modulos/GetAllComboByCurso/${courseId}/${API_KEY}/`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(res);
          const modules = await res.json();
          return {
               ok: true,
               modules,
          };
     } catch (error) {
          return {
               ok: false,
          };
     }
};
