import express from 'express';
// import { authentification, random } from '../utils';
import { insertToDB } from '../db/users.js';


export const addPass = (req, res) => {
	const password = req.body.passwd;
	const website = 'https://' + req.body.site;
	const emailUser = req.body.email_user;

	const state = insertToDB(password, emailUser, website);
	if (state === false) res.send("An Error accured!");
	else res.send("Success");
};

export const root = (req, res) => {
	res.send("Hello world");
};
