import { API_URL } from "./settings";

export const getAllProfessorsCombo = async () => {
     try {
          const url = `${API_URL}/Usuario/GetProfesoresCombo/1234`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const professors = await res.json();
          return {
               ok: true,
               professors,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error || "Ha ocurrido un error",
          };
     }
};