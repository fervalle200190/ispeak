import { API_URL, USER_ID } from "./settings";

export const postAttendance = async (attendance) => {
     try {
          const res = await fetch(`${API_URL}/Asistencias/Create/1234/${USER_ID}`, {
               method: "post",
               body: JSON.stringify(attendance),
               headers: {'Content-type': 'application/json'}
          });
          if (!res.ok) throw new Error(`Ha ocurrido un error`);
          const data = await res.json();
          return {
               ok: true,
               data,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.message || "Ha ocurrido un error",
          };
     }
};
