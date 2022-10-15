import { API_KEY, API_URL } from "./settings"

export default function getCoursesByUserId() {
    const USER_ID = JSON.parse(localStorage.getItem('loggedAppUser')).id
    const URL = `${API_URL}/Cursos/GetAllByAlumno/${USER_ID}/${API_KEY}/${USER_ID}`

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
                const progress = course.porcentajeCompletado
                return {id, title, students, duration, professor, progress}
            })
            return courses
        })
}