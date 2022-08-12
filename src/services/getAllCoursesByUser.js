import { API_KEY, API_URL } from "./settings";

export default function getAllCoursesByUser({ id }) {
  const USER_ID = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Cursos/GetAllByAlumno/${USER_ID}/${API_KEY}`;
 
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(data);
      return data;
    });
}
