import { API_KEY, API_URL } from "./settings";

export default function getCommentsByMaterialId({ id }) {
  const URL = `${API_URL}/Comentarios/getComentariosByClase/${id}/${API_KEY}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
