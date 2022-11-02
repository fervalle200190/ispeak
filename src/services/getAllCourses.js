import { API_KEY, API_URL, USER_ID } from "services/settings"

export default function getAllCourses() {
    const URL = `${API_URL}/Cursos/GetAll/${API_KEY}/`
    return fetch(URL)
        .then(response => response.json())
        .then(response => {
            const data = response
            const courses = data.map(course => {
                const id = course.id
                const title = course.nombre
                const students = course.cantidadAlumnos
                const duration = course.duracion
                const professor = course.profesor
                return {id, title, students, duration, professor}
            })
            return courses
    })
}