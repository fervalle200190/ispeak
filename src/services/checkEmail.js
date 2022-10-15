import { API_KEY, API_URL } from "./settings";

export const checkEmail = async (email) => {
     try {
          const res = await fetch(
               `${API_URL}/EmailValidation/${email}/${API_KEY}`
          );
          if (!res.ok) throw res;
          return res.ok;
     } catch (error) {
          return error.ok;
     }
};
