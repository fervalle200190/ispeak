import { API_URL, USER_ID } from "./settings";

export default function getAllUsers() {
  const URL = `${API_URL}/Usuario/GetAll/${USER_ID}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(response);
      return data;
    })
    .catch((err) => console.log(err));
}
