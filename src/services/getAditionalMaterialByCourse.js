import { API_URL } from "./settings";

export const getAditionalMaterialByCourse = async (courseId) => {
     const url = `${API_URL}/MaterialRefuerzo/GetAllByCurso/${courseId}/1234`;
     const res = await fetch(url);
     const aditionalMaterials = await res.json();
     return {
          ok: true,
          aditionalMaterials,
     };
};
