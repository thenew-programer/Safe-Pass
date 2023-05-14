import  express  from 'express';
// import { authentification, random } from '../utils';
import { insertToDB } from '../db/users.js';


export const addPass = (req, res) => {
	const password = req.body.passwd;
	const website = req.body.site;

	const state = insertToDB(password, website);
	if (state === false) console.log("An Error accured!");
	else res.send("Success");
};

export const root = (req, res) => {
	res.send("Hello world");
};
