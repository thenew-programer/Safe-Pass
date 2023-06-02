import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { useState } from 'react';
import './addPassword.css';
import {
	notifyFailure, notifySuccess, notifyFieldFailure, clear
} from "../../utils/notifacations";
import { isAuthenticated } from "../../middlewars/auth";


const SERVER = 'https://passwordmanager-l5wn.onrender.com/addPass';



const AddPassword = () => {

	let [password, setPassword] = useState('');
	let [website, setWebsite] = useState('');
	let [email_user, setEmail_user] = useState('');
	const [isClicked, setIsClicked] = useState(false);


	useEffect(() => {
		isAuthenticated()
			.then(console.log('welcome'))
			.catch(() => {
				window.location.href = '/#/login';
		});
	}, []);



	const handleClick = () => {
		if (!isClicked) {
			addPasswordFunc();
		}
		setIsClicked(true);
	}

	const isEmpty = () => {
		return new Promise((resolve, reject) => {
			if (!website || !email_user || !password) {
				reject();
			} else resolve();

		})
	}


	const addPasswordFunc = () => {
		isEmpty().then(() => {
			addPass().then((response) => {
				if (response === -1) {
					window.location.href = '/#/login';
				} else if (response === 1) {
					setTimeout(clear(document.getElementById('site')), 800);
					setTimeout(clear(document.getElementById('email')), 900);
					setTimeout(clear(document.getElementById('pass')), 1000);
					notifySuccess('Password added successfully!');
				} else {
					notifyFailure('Failed to add password.');
				}
			}).catch(() => console.error('failed'));
		}).catch(() => {
			setIsClicked(false);
			notifyFieldFailure('Fill the remaining fields');
		});
	}



	const addPass = () => {
		return new Promise((resolve, reject) => {
			Axios.post(SERVER, {
				email_user: email_user,
				passwd: password,
				site: website
			}).then((response) => {
				if (response.data === 'Success') {
					console.log(response.data);
					resolve(1)
				} else if (response.status === 405) {
					resolve(-1);
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

				<h1>Add Password</h1>
				<label htmlFor="site" id="asite">Website</label>
				<input type="text" id="site"
					placeholder='e.g. linkedIn'
					onChange={(event) => {
						setWebsite(event.target.value);
					}} required='required' />

				<label htmlFor="email" id="aemail">Email/Username</label>
				<input type="text" id="email"
					placeholder="e.g. jos@example.com"
					onChange={(event) => {
						setEmail_user(event.target.value);
					}} required='required' />

				<label htmlFor="pass" id="apass">Password</label>
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
