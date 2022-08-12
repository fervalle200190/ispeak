import { API_URL } from "./settings";

export default function getAllUsers() {
  const URL = `${API_URL}/Usuario/GetAll`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(response);
      return data;
    })
    .catch((err) => console.log(err));
}
