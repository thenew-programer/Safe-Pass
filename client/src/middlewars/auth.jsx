import Axios from "axios";
import { getCookies } from "../hooks/setCookies";

const SERVER = 'https://passwordmanager-l5wn.onrender.com/auth';

export const isAuthenticated = () => {
	return new Promise((resolve, reject) => {
		const cookies = '__pass=' + getCookies('__pass');
		Axios.get(SERVER, {
			headers: {
				'Cookie': cookies,
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
