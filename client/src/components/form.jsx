import React from "react";
import Axios from "axios";
import { useState } from 'react';
import './form.css';

const server = 'http://localhost:3001/addPass';

const addPass = (password, website, emailUser) => {
	Axios.post(server, {
		email_user: emailUser,
		passwd: password,
		site: website
	});
};

const clearThis = target => {
	if (target.value != null)
		target.value = "";
}


const Form = () => {

	let [password, setPassword] = useState('');
	let [website, setWebsite] = useState('');
	let [email_user, setEmail_user] = useState('');

	return (

		<div className='passwd-form'>
			<label htmlFor="email">Email/Username</label>
			<input type="text" id="email"
				placeholder="email/username"
				onChange={(event) => {
					setEmail_user(event.target.value);
					console.log(email_user);
				}} />
			<label htmlFor="pass">Password</label>
			<input type="password" id="pass"
				placeholder='e.g. pass123'
				onChange={(event) => {
					setPassword(event.target.value);
					console.log(password);
				}}
			/>
			<p>Passwords must contain at least eight characters, including at least 1 letter and 1 number. </p>
			<button onClick={() => {
				setWebsite(document.location.hostname);
				addPass(password, website, email_user);
				clearThis(document.getElementById('email'));
				clearThis(document.getElementById('pass'));
			}}>
				Save Credential
			</button>
		</div>
	)
}


export default Form;
