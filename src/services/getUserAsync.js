import { API_KEY, API_URL, USER_ID } from "./settings";

export const getUserAsync = async () => {
     const url = `${API_URL}/Usuario/GetById/${USER_ID}/${API_KEY}/${USER_ID}`;
     const res = await fetch(url);
     if (!res.ok) throw new Error("Ha ocurrido un error");
     const user = await res.json();
     return user
};
