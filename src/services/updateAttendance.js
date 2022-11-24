import { API_KEY, API_URL, USER_ID } from "./settings";

export const updateAttendance = async (attend) => {
     try {
          const url = `${API_URL}/Asistencias/Update/${API_KEY}/${USER_ID}`;
          const res = await fetch(url, {
               headers: { "Content-Type": "application/json" },
               method: "PUT",
               body: JSON.stringify(attend),
          });
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          return {
               ok: true,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: "Ha ocurrido un error",
          };
     }
};
