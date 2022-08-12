import { API_KEY, API_URL } from "./settings";

export default function getAdditionalMaterialByCourse({ id }) {
  const URL = `${URL}MaterialRefuerzo/GetAllByCurso/${id}/${API_KEY}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
