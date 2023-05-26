import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { useState } from 'react';
import './addPassword.css';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/addPass';



const AddPassword = () => {

	let [password, setPassword] = useState('');
	let [website, setWebsite] = useState('');
	let [email_user, setEmail_user] = useState('');
	const [isClicked, setIsClicked] = useState(false);



	useEffect(() => {
		window.addEventListener('keyup', (event) => {
			if (event.key === 'Enter') {
				addPasswordFunc();
			}
		});
	}, [])



	const clear = target => {
		if (target.value != null)
			target.value = "";
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
		toast.error('Password already exist!', {
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
		toast.success("Password added successfully!", {
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



	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (website.length === 0 || email_user.length === 0 || password.length === 0) {
				reject();
			} else resolve();

		})
	}



	const handleClick = () => {
		if (!isClicked) {
			addPasswordFunc();
		}
		setIsClicked(true);
	}



	const addPasswordFunc = () => {
		isEmpty().then(() => {
			addPass().then((response) => {
				if (response === 1) {
					setTimeout(clear(document.getElementById('site')), 800);
					setTimeout(clear(document.getElementById('email')), 900);
					setTimeout(clear(document.getElementById('pass')), 1000);
					notifySuccess();
				} else {
					notifyFailure();
				}
			}).catch(() => console.error('failed'));
		}).catch(() => notifyFieldFailure());
	}



	const addPass = () => {
		return new Promise((resolve, reject) => {
			Axios.post(SERVER, {
				email_user: email_user,
				passwd: password,
				site: website
			}).then((response) => {
				if (response.data == 'Success') {
					console.log(response.data);
					resolve(1)
				} else {
					console.log(response.data);
					reject(0)
				}
			}).catch(err => {
				console.log(err);
				reject();
			})
		})
	}



	return (
		<div className="pass-container">
			<div className='passwd-form' >

				<div className="none" id="err"></div>
				<label htmlFor="site">Website</label>
				<input type="text" id="site"
					placeholder='e.g. linkedIn'
					onChange={(event) => {
						setWebsite(event.target.value);
					}} required='required' />

				<label htmlFor="email">Email/Username</label>
				<input type="text" id="email"
					placeholder="email/username"
					onChange={(event) => {
						setEmail_user(event.target.value);
					}} required='required' />

				<label htmlFor="pass">Password</label>
				<input type="password" id="pass"
					placeholder='e.g. pass123'
					onChange={(event) => {
						setPassword(event.target.value);
					}} required />
				<p>Passwords must contain at least eight characters, including at least 1 letter and 1 number. </p>

				<button type="submit" onClick={handleClick} disabled={isClicked} id='btn'>
					Save Password
				</button>
				<ToastContainer />
			</div >
		</div >
	)
}


export default AddPassword;
