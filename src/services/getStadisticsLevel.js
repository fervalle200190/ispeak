import { API_URL, USER_ID } from "./settings";

export const getStatisticsLevel = async () => {
     try {
          const res = await fetch(`${API_URL}/Usuario/GetEstadisticasNivel/${USER_ID}`);
          if (!res.ok) throw new Error("Ha ocurrido un error");
          const stadistics = await res.json();
          return {
               ok: true,
               levelStatistics: stadistics,
          };
     } catch (error) {
          return {
               ok: false,
               errorMessage: error.response.data.message || "Ha ocurrido un error",
          };
     }
};
