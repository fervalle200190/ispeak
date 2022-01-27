import { API_URL } from "./settings"

export default function getMaterialById({ id }) {
    console.log(id)
    const URL = `${API_URL}/MaterialEstudios/GetById/${id}`
    return fetch(URL).then(response => response.json()).then(response => {
        const data = response
        console.log(data)
        return data
    })
}