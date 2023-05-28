import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Axios from 'axios';
import './Updatepass.css';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/updatePass';

const Updatepass = () => {
	const [website, setWebsite] = useState('');
	const [email, setEmail] = useState('');
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [isClicked, setIsClicked] = useState(false);



	const updatePass = () => {
		return new Promise((resolve, reject) => {
			Axios.post(SERVER, {
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
						notifySuccess();
					}, 800);
					setTimeout(clear(document.getElementById('up-email')), 900);
					setTimeout(clear(document.getElementById('up-pass')), 1000);
					setTimeout(clear(document.getElementById('up-npass')), 1000);
				} else {
					notifyFailure()
				}
			}).catch((err) => console.error('error' + err));
		}).catch(() => notifyFieldFailure());
	}



	const clear = target => {
		if (target.value != null)
			target.value = "";
	}



	const handleClick = () => {
		if (!isClicked) {
			updatePassFunc();
		}
		setIsClicked(true);
	}



	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (website.length === 0 || email.length === 0 ||
				oldPass.length === 0 || newPass.length === 0) {
				reject();
			} else resolve();

		})
	}




	const notifyFieldFailure = () => {
		toast.warn('All fields are required!', {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
		setTimeout(setIsClicked(false), 2000);
	}




	const notifyFailure = () => {
		toast.error('Password doesn\'t exist!', {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	}



	const notifySuccess = () => {
		toast.success("Password update successfully!", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	}



	return (
		<div className='rm-container'>
			<div className="up-form">
				<h4 style={{ color: 'white' }}>Update Password</h4>
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
