import { API_URL } from "./settings";

export const getPlans = async () => {
     const res = await fetch(
          `${API_URL}/Planes/1234/1007`
     );

     const plans = await res.json();
     return plans;
};
