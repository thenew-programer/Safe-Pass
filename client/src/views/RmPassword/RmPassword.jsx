import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
	notifyFailure,
	notifySuccess,
	notifyFieldFailure,
} from "../../utils/notifacations";
import Axios from "axios";
import "./RmPassword.css";

// const SERVER = 'https://passwordmanager-l5wn.onrender.com/removePass';
const SERVER = 'https://safe-pass-backend.vercel.app/removePass';

const RmPassword = () => {
	const [website, setWebsite] = useState("");
	const [email, setEmail] = useState("");
	const [isClicked, setIsClicked] = useState(false);
	Axios.defaults.withCredentials = true;

	const removePass = () => {
		return new Promise((resolve, reject) => {
			Axios.post(SERVER, {
				email: email,
				site: website,
			})
				.then(() => {
					resolve();
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	const removePassFunc = () => {
		isEmpty()
			.then(() => {
				removePass()
					.then(() => {
						setTimeout(() => {
							clear(document.getElementById("site"));
							notifySuccess('Password removed successfully');
						}, 800);
						setTimeout(clear(document.getElementById("email")), 900);
						setTimeout(clear(document.getElementById("pass")), 1000);
					})
					.catch((err) => {
						if (err.response.status === 405) {
							window.location.href = "/#/login";
						} else {
							notifyFailure("Old password incorrect!");
						}
					});
			})
			.catch(() => {
				notifyFieldFailure();
			});
	};

	const clear = (target) => {
		if (target.value != null) target.value = "";
	};

	const handleClick = () => {
		if (!isClicked) {
			removePassFunc();
		}
		setIsClicked(true);
	};

	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (!website || !email) {
				reject();
			} else resolve();
		});
	};

	return (
		<div className="rm-container">
			<div className="rm-form">
				<h4>Remove Password</h4>
				<hr />
				<hr />
				<label htmlFor="site" id="lsite">
					Website
				</label>
				<input
					type="text"
					id="site"
					onChange={(event) => {
						setWebsite(event.target.value);
					}}
					required="required"
				/>

				<label htmlFor="email" id="lemail">
					Email/Username
				</label>
				<input
					type="text"
					id="email"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					required="required"
				/>

				<button type="submit" onClick={handleClick} disabled={isClicked}>
					Remove Password
				</button>
				<ToastContainer />
				<p>&#9734; refresh before removing any password</p>
			</div>
		</div>
	);
};
export default RmPassword;
