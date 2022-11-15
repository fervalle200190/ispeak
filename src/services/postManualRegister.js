import { API_URL } from "./settings";

export const postManualRegister = async (register) => {
     const url = `${API_URL}/PasarelaMercadoPago/manualRegister`;
     const res = await fetch(url, {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(register),
     });
     const response = res.json();
     return {
          ok: true,
          response,
     };
};
