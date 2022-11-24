import { API_KEY, API_URL, USER_ID } from "./settings";

export const getAttendanceById = async (attendId) => {
     try {
          const url = `${API_URL}/Asistencias/GetById/${attendId}/${API_KEY}/${USER_ID}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const data = await res.json();
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error || "Ha ocurrido un error",
          };
     }
};
