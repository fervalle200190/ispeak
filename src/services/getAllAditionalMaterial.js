import { API_URL } from "./settings";

export const getAllAditionalMaterial = async () => {
     const url = `${API_URL}/MaterialRefuerzo/GetAll/1234`;
     const res = await fetch(url);
     const aditionalMaterial = await res.json();
     return {
          ok: true,
          aditionalMaterial,
     };
};
