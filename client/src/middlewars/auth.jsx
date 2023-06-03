import Axios from "axios";

const SERVER = 'https://passwordmanager-l5wn.onrender.com/auth';

export const isAuthenticated = () => {
	return new Promise((resolve, reject) => {
		const cookies = window.localStorage.getItem('__pasa');
		Axios.get(SERVER, {
			params: {
				cookies: cookies
			}
		}).then((response) => {
			if (response.status === 200) {
				resolve();
			} else {
				reject();
			}
		}).catch(() => reject());
	})
}
