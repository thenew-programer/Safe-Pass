import Axios from "axios";

const SERVER = 'https://passwordmanager-l5wn.onrender.com/auth';


export const isAuthenticated = () => {
	Axios.defaults.withCredentials = true;
	return new Promise((resolve, reject) => {
		Axios.get(SERVER).then((response) => {
			console.log(response.headers);
			if (response.status === 200) {
				resolve();
			} else {
				reject();
			}
		}).catch(() => reject());
	})
}
