import Axios from "axios";
import GetCookies  from "../hooks/setCookies";

const SERVER = 'https://passwordmanager-l5wn.onrender.com/auth';

export const isAuthenticated = () => {
	return new Promise((resolve, reject) => {
		Axios.get(SERVER, {
			params: {
				'cookies': GetCookies('__pass'),
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
