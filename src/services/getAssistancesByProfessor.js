import { API_KEY, API_URL } from "./settings";

export default function getAssistancesByProfessor() {
  const id = JSON.parse(localStorage.getItem("loggedAppUser")).id;
  const URL = `${API_URL}/api/Asistencias/GetAllByProfesor/${id}/${API_KEY}`;
  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
