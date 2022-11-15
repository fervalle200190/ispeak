import { API_URL } from "./settings";

export const postManualRegister = async (register) => {
     try {
          const url = `${API_URL}/PasarelaMercadoPago/manualRegister`;
          const res = await fetch(url, {
               headers: { "Content-Type": "application/json" },
               method: "POST",
               body: JSON.stringify(register),
          });
          if (!res.ok) throw new Error(res);
          const response = res.json();
          return {
               ok: true,
               response,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: "Ha ocurrido un error",
          };
     }
};
