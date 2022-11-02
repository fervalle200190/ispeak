import { API_KEY, API_URL } from "./settings";

export const getAllStudyMaterials = async () => {
     try {
          const res = await fetch(`${API_URL}/MaterialEstudios/GetAll/${API_KEY}`);
          if (!res.ok) throw new Error(res);
          const studyMaterials = await res.json();
          return {
               ok: true,
               studyMaterials,
          };
     } catch (error) {
          return {
               ok: false,
          };
     }
};
