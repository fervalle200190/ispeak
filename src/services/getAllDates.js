import { API_KEY, API_URL } from "./settings";

export default function getAllDates() {
    const URL = `${API_URL}/Calendar/GetAll/${API_KEY}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((response) => {
        const data = response;
        console.log(response);
        return data;
      })
      .catch((err) => console.log(err));
  }