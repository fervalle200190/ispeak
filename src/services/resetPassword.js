import { API_KEY, API_URL } from "./settings";

export const resetPassword = async (email) => {
     const response = await fetch(
          `${API_URL}/Usuario/Recovery/${email}/${API_KEY}`
     );
     const res = await response.json();
     return res;
};
