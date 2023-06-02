import Axios from 'axios';
import React, { useState } from 'react'
import { notifyFieldFailure, notifyFailure } from '../../utils/notifacations';
import './Register.css';

const SERVER = 'https://passwordmanager-l5wn.onrender.com/register';

const Register = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const handleClick = () => {
		if (!email || !password || !username) {
			notifyFieldFailure('Fill all the field.')
		} else {
			Axios.post(SERVER, {
				email: email,
				password: password,
				username: username
			}).then(() => {
				setErrorMsg('');
				window.location.href = '/#/login';
			}).catch(() => {
				notifyFailure('Failed to register')
				setErrorMsg('email or usename already taken.')
			});
		}
	}
	return (
		<div className="register-container">
			<div className="register-wraper">
				<h1>Register</h1>
				<label for="register-username">Username</label>
				<input type="text" id="register-username"
					onChange={e => setUsername(e.target.value)} />
				<label for="register-email">Email</label>
				<input type="text" id="register-email"
					placeholder='e.g. joe@example.com'
					onChange={e => setEmail(e.target.value)} />
				<label for="register-pass">Password</label>
				<input type="password" id="register-pass"
					placeholder='e.g. pass123'
					onChange={e => setPassword(e.target.value)} />
				<p style={{
					color: 'red',
					fontSize: '0.824rem', margin: 'auto',
					marginTop: 0
				}}>{errorMsg}</p>
				<button type="button" onClick={handleClick}>Register</button>
			</div>
		</div>
	)
}

export default Register;
