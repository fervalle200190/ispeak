import { API_KEY, API_URL, USER_ID } from "./settings";

export const postCalendar = async (data)=> {
    const URL = `${API_URL}/Calendar/Create/${API_KEY}/${USER_ID}`;
    return fetch(URL, {
        method: 'POST',
        body: data,
        headers: {'Content-Type': 'application/json'}
    })
      .then((response) => response.json())
      .then((response) => {
        const data = response;
        console.log(response);
        return data;
      })
      .catch((err) => console.log(err, "error"));
  }