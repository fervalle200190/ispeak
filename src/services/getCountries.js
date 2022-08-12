import { API_KEY, API_URL } from "./settings"

export default function getCountries() {
	const URL = `${API_URL}/Usuario/GetPaises/${API_KEY}`

	return fetch(URL).then(response => response.json()).then(response => {
		const data = response;
		console.log(data)
		return data;
	})
}