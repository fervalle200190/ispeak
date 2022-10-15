import { API_URL, USER_ID } from "./settings";

export default function getFollowupByProfessor() {
  const id = localStorage.getItem("loggedAppUser").id;
  const URL = `${API_URL}/Seguimientos/GetAll/${id}/${USER_ID}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    });
}
