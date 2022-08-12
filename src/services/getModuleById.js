import { API_KEY, API_URL } from "./settings";

export default function getModuleById(id) {
  const URL = `${API_URL}/Modulos/GetById/${id}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
