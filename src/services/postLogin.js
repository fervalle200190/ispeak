import { API_KEY, API_URL } from "./settings";

export default function postLogin({ email, password }) {
  const URL = `${API_URL}/User/Login/${API_KEY}`;

  const credentials = {
    email: email,
    password: password,
  };

  return fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (response.status === 400) return false;
      return response.json();
    })
    .then((response) => {
      if (response === false) return false;
      const { id, email, nombre, rol } = response;
      const data = { id, email, nombre, rol };
      window.localStorage.setItem("loggedAppUser", JSON.stringify(data));
      return data;
    });
}
