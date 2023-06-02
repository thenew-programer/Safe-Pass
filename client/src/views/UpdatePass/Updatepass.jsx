import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import Axios from 'axios';
import './Updatepass.css';
import {
	notifySuccess, notifyFailure,
	notifyFieldFailure, clear
} from '../../utils/notifacations'
import { isAuthenticated } from '../../middlewars/auth';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/updatePass';

const Updatepass = () => {
	const [website, setWebsite] = useState('');
	const [email, setEmail] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [isClicked, setIsClicked] = useState(false);



	useEffect(() => {
		isAuthenticated()
			.then(console.log('welcome'))
			.catch(() => {
				window.location.href = '/#/login';
			});
	}, []);




	const updatePass = () => {
		return new Promise((resolve, reject) => {
			Axios.patch(SERVER, {
				site: website,
				email: email,
				oldPass: oldPass,
				newPass: newPass
			}).then((response) => {
				console.log(response.data);
				if (response.data === 'Success') {
					resolve(1);
				} else {
					resolve(0);
				}
			}).catch((err) => {
				console.error(err);
				reject();
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
				console.error('error' + err)
				notifyFailure('All fields are required!');
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
					placeholder='i.g. LinkedIn'
					onChange={(event) => {
						setWebsite(event.target.value);
					}} required='required' />

				<label htmlFor="email" className='up-label email'>Email</label>
				<input type="text" id="up-email"
					placeholder='i.g. jos@home.com'
					onChange={(event) => {
						setEmail(event.target.value);
					}} required='required' />

				<label htmlFor="pass" className='up-label passs'>Old Password</label>
				<input type="password" id="up-pass"
					placeholder='....'
					onChange={(event) => {
						setOldPass(event.target.value);
					}} required='required' />

				<label htmlFor="n-pass" className='up-label npass'>New Password</label>
				<input type="password" id="up-npass"
					placeholder='....'
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
