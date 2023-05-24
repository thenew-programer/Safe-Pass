import { getAll, insertToDB, isExist } from '../db/users.js';
import { encrypt, decrypt } from '../utils/index.js';
import { db } from '../index.js';
import '../config.js';


export const addPass = (req, res) => {
	const encryptedObj = encrypt(req.body.passwd);

	const password = encryptedObj.password;
	const emailUser = req.body.email_user;
	const website = req.body.site;
	website.toUpperCase();
	const iv = encryptedObj.iv;

	let isElementExist = isExist({
		emailUser: emailUser,
		website: website,
	});
	console.log('isElementExist = ' + isElementExist)
	// if the user doen't exist
	if (isElementExist === false) {
		const state = insertToDB(password, emailUser, website, iv);

		if (state === false) console.log("An Error accured! in db");
		else res.send(JSON.stringify('Success'));
		console.log('Success | User does\'nt exist');

	} else{ 	// if the user exist
		res.send(JSON.stringify("Email already taken."));
		console.log("failure | User exist");
	}
};


export const showPass = (req, res) => {
	// db.query(`SELECT * FROM ${process.env.DATABASE_TABLE};`, (err, result) => {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		res.send(result);
	// 	}
	// });
	const result = getAll();
	res.send(result);
};

export const decryptPass = (req, res) => {
	const password = decrypt(req.body);
	res.send(JSON.stringify(password));
}

export const root = (req, res) => {
	res.send("Hello world");
};

