import { API_KEY, API_URL } from "./settings";

export default function getCourseById({ id }) {
  const USER_ID = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Cursos/GetAllByAlumno/${USER_ID}/${API_KEY}/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      const course = data.filter((course) => course.id === parseInt(id));
      return course[0];
    });
}
