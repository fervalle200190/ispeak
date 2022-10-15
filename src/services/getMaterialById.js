import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getMaterialById({ id }) {
  const URL = `${API_URL}/MaterialEstudios/GetById/${id}/${USER_ID}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
