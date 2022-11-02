import { API_URL, USER_ID } from "./settings";


export const updateCourse = async (course) => {
     const { data } = await fetch(`${API_URL}/Cursos/Update/1234/${USER_ID}`, {
          headers: {'Content-type': 'application/json'},
          method: 'PUT',
          body: JSON.stringify(course)
     } );
     return data;
};
