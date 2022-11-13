import { API_URL, USER_ID } from "./settings";

export const getAllUsersAsync = async () => {
     try {
          const url = `${API_URL}/Usuario/GetAll/1234/${USER_ID}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const users = await res.json();
          return {
               ok: true,
               users,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error,
          };
     }
};
