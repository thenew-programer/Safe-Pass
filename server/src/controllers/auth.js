import express from 'express';
// import { authentification, random } from '../utils';
import { insertToDB } from '../db/users.js';
import { encrypt, decrypt } from '../utils/index.js';


export const addPass = (req, res) => {
	const encryptedObj = encrypt(req.body.passwd);

	const password = encryptedObj.password;
	const emailUser = req.body.email_user;
	const website = 'https://' + req.body.site;
	const iv = encryptedObj.iv;

	const state = insertToDB(password, emailUser, website, iv);
	if (state === false) res.send("An Error accured!");
	else res.send("Success");
};

export const root = (req, res) => {
	res.send("Hello world");
};
