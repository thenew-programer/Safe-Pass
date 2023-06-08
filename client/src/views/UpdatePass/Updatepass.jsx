import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import Axios from 'axios';
import './Updatepass.css';
import {
	notifySuccess, notifyFailure,
	notifyFieldFailure, clear
} from '../../utils/notifacations'

const SERVER = 'https://passwordmanager-l5wn.onrender.com/updatePass';

const Updatepass = () => {
	const [website, setWebsite] = useState('');
	const [email, setEmail] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [isClicked, setIsClicked] = useState(false);
	Axios.defaults.withCredentials = true;



	const updatePass = () => {
		return new Promise((resolve, reject) => {
			Axios.patch(SERVER, {
				site: website,
				email: email,
				oldPass: oldPass,
				newPass: newPass
			}).then((response) => {
				if (response.data === 'Success') {
					resolve(1);
				} else {
					resolve(0);
				}
			}).catch((err) => {
				reject(err);
			});
		})
	}



	const updatePassFunc = () => {
		isEmpty().then(() => {
			updatePass().then((response) => {
				if (response === 1) {
					setTimeout(() => {
						clear(document.getElementById('up-site'));
						notifySuccess("Password update successfully!");
					}, 800);
					setTimeout(clear(document.getElementById('up-email')), 900);
					setTimeout(clear(document.getElementById('up-pass')), 1000);
					setTimeout(clear(document.getElementById('up-npass')), 1000);
				} else {
					notifyFailure('Password doesn\'t exist!')
				}
			}).catch((err) => {
				if (err.response.status === 405) {
					window.location.href = '/#/login';
				} else {
					notifyFailure('All fields are required!');
				}
			});
		}).catch(() => notifyFieldFailure('All fields are required!'));
	}




	const handleClick = () => {
		if (!isClicked) {
			updatePassFunc();
		}
		setIsClicked(true);
	}



	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (!website || !email || !oldPass || !newPass) {
				reject();
			} else resolve();

		})
	}



	return (
		<div className='rm-container'>
			<div className="up-form">
				<h4>Update Password</h4>
				<hr />
				<label htmlFor="site" className='up-label site'>Website</label>
				<input type="text" id="up-site"
					onChange={(event) => {
						setWebsite(event.target.value);
					}} required='required' />

				<label htmlFor="email" className='up-label email'>Email</label>
				<input type="text" id="up-email"
					onChange={(event) => {
						setEmail(event.target.value);
					}} required='required' />

				<label htmlFor="pass" className='up-label passs'>Old Password</label>
				<input type="password" id="up-pass"
					onChange={(event) => {
						setOldPass(event.target.value);
					}} required='required' />

				<label htmlFor="n-pass" className='up-label npass'>New Password</label>
				<input type="password" id="up-npass"
					onChange={(event) => {
						setNewPass(event.target.value);
					}} required='required' />

				<button type="submit" onClick={handleClick} disabled={isClicked}>
					Update Password</button>
				<ToastContainer />
				<p>&#9734; refresh before updating any password</p>
			</div>
		</div>
	)
};
export default Updatepass;
