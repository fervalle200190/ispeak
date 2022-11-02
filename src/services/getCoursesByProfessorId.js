import { API_KEY, API_URL, USER_ID } from "./settings";

export default function getCoursesByProfessor() {
  const id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/Cursos/GetAllByProfesor/${id}/${API_KEY}/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      console.log(data)
      return data;
    });
}
