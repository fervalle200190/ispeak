import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getAdditionalMaterialByUser() {
  const URL = `${API_URL}/MaterialRefuerzo/GetAllByAlumnoCurso/${USER_ID}/${API_KEY}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
