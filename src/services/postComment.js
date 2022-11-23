import { API_KEY, API_URL, USER_ID } from "./settings";

export default function postComment({ comment }) {
  const URL = `${API_URL}/Comentarios/Create/${API_KEY}/${USER_ID}`;
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
}
