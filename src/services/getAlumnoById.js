import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getAlumnoById(id) {
    const URL = `${API_URL}/Usuario/GetAlumnoById/${id}/${API_KEY}/${USER_ID}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        const data = response;
        return data;
      })
      .catch((err) => console.log(err));
  }