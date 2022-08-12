import { API_KEY, API_URL } from "./settings";

export default function getMaterialById({ id }) {
  const URL = `${API_URL}/MaterialEstudios/GetById/${id}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
