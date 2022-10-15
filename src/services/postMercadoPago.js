import { API_KEY, API_URL } from "./settings";

export const postMercadoPago = async (payObj) => {
     const res = await fetch(
          `${API_URL}/PasarelaMercadoPago/GetPreferenceAsync/${API_KEY}`,
          {
               method: 'POST',
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(payObj),
          }
     );
     const pay = await res.json();
     return pay;
};
