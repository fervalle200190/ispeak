import { API_KEY, API_URL, USER_ID } from "./settings"

export default function getCountries() {
	const URL = `${API_URL}/Usuario/GetPaises/${API_KEY}`

	return fetch(URL).then(response => response.json()).then(response => {
		const data = response;
		return data;
	})
}