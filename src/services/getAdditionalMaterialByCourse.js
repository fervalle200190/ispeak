import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getAdditionalMaterialByCourse({ id }) {
  const URL = `${URL}MaterialRefuerzo/GetAllByCurso/${id}/${API_KEY}/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
