import React from "react";
import Axios from "axios";
import { useState } from 'react';
import './form.css';

const server = 'http://localhost:3001/addPass';

const addPass = (password, website) => {
	Axios.post(server, {
		passwd: password,
		site: website
	});
};


const Form = () => {

	let [password, setPassword] = useState('');
	let [website, setWebsite] = useState('');

	return (

		<div className='passwd-form'>
			<input type="text" name="pass"
				placeholder='e.g. pass123'
				onChange={(event) => {
					setPassword(event.target.value);
					console.log(password);
				}}
			/>
			<input type="text" name="website"
				placeholder='https://www.example.com'
				onChange={(event) => {
					setWebsite(event.target.value);
					console.log(website);
				}}
			/>
			<button onClick={() => {
				addPass(password, website)
			}} >
				Add Passwd
			</button>
		</div>
	)
}


export default Form;
