import { API_KEY, API_URL, USER_ID } from "./settings";

export const postMaterialCompleteAsync = async ({ materialId, classNum }) => {
     try {
          const url = `${API_URL}/MaterialEstudios/SetMaterialCompletado/${materialId}/${classNum}/${USER_ID}/${API_KEY}/${USER_ID}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          return {
               ok: true,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error || 'Ha ocurrido un error',
          };
     }
};
