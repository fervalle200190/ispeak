import { API_KEY, API_URL } from "./settings";

export const getAllCoursesAsync = async () => {
     const url = `${API_URL}/Cursos/GetAll/${API_KEY}/`;
     const res = await fetch(url);
     const courses = await res.json();
     return courses;
};
