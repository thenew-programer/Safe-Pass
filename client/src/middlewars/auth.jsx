import Axios from "axios";

const SERVER = 'https://passwordmanager-l5wn.onrender.com/auth';

export const isAuthenticated = () => {
	return new Promise((resolve, reject) => {
		Axios.get(SERVER, { withCredentials: true })
			.then((response) => {
				if (response.status === 200) {
					resolve();
				} else {
					reject();
				}
			}).catch(() => reject());
	})
}
