import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from 'react';
import './addPassword.css';

const server = 'https://passwordmanager-l5wn.onrender.com/addPass';



const AddPassword = () => {

	let [password, setPassword] = useState('');
	let [website, setWebsite] = useState('');
	let [email_user, setEmail_user] = useState('');
	let [addPassReturn, setAddPassReturn] = useState(-1);


	const clearThis = target => {
		if (target.value != null)
			target.value = "";
	}


	const fieldFailure = () => {
		if (document.getElementById('error') !== null) return;
		if (document.getElementById('errorF') !== null) {
			document.getElementById('errorF').remove();
		}

		const email = document.getElementById('err');
		email.insertAdjacentHTML('afterend', '<div id="error" class="failure-alert" >Fill all the fields</div>');
	}

	const failure = () => {
		if (document.getElementById('errorF') !== null) return;
		if (document.getElementById('error') !== null) {
			document.getElementById('error').remove();
		}

		const email = document.getElementById('email');
		email.insertAdjacentHTML('afterend', '<div id="errorF" class="failure-alert" >Email is already taken!</div>');
	}


	const success = () => {
		if (document.getElementById('errorS') !== null) return;
		if (document.getElementById('error') !== null) {
			document.getElementById('error').remove();
		}

		const btn = document.getElementById('err');
		btn.insertAdjacentHTML('afterend', '<div id="errorS" class="success-alert" >/ Password Added successfully.</div >');
	}


	const addPass = () => {
		Axios.post(server, {
			email_user: email_user,
			passwd: password,
			site: website
		}).then((response) => {
			if (response.data == 'Success') {
				console.log(response.data);
				setAddPassReturn(1);
			} else {
				console.log(response.data);
				setAddPassReturn(0);
			}
		});
	};


	const addPasswordFunc = (event) => {
		if (event.key === 'Enter') {
			isEmpty();
			if (addPassReturn === -100) {
				fieldFailure();
			}
			else {

				addPass();
				if (addPassReturn === 1) {
					setTimeout(clearThis(document.getElementById('site')), 800);
					setTimeout(clearThis(document.getElementById('email')), 900);
					setTimeout(clearThis(document.getElementById('pass')), 1000);
					success();
				} else if (addPassReturn === 0) {
					failure();
				}
			}
		}
	};

	const isEmpty = () => {
		if (website.length === 0 || email_user.length === 0 || password.length === 0) {
			setAddPassReturn(-100);
		}
	}


	useEffect(() => {
		window.addEventListener('keyup', addPasswordFunc);
		window.removeEventListener('keyup', addPasswordFunc);
	}, [])


	return (

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

			<button type="submit" onClick={() => {
				isEmpty();
				if (addPassReturn === -100) {
					fieldFailure();
				}
				else {

					addPass();
					if (addPassReturn === 1) {
						setTimeout(clearThis(document.getElementById('site')), 800);
						setTimeout(clearThis(document.getElementById('email')), 900);
						setTimeout(clearThis(document.getElementById('pass')), 1000);
						success();
					} else if (addPassReturn == 0) {
						failure();
					}
				}
			}} id='btn'>
				Save Credential
			</button>
		</div>
	)
}


export default AddPassword;
