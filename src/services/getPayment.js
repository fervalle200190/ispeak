import { API_KEY, API_URL } from "./settings";

export const getPayment = async (payment_id) => {
     const response = await fetch(
          `${API_URL}/PasarelaMercadoPago/GetPayment/${payment_id}/${API_KEY}`
     );
     const res = await response.json();
     return res
};
