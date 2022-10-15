import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getUser() {
  const URL = `${API_URL}/Usuario/GetById/${USER_ID}/${API_KEY}/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
