import { insertToDB } from '../db/users.js';
import { encrypt, decrypt } from '../utils/index.js';
import { db } from '../index.js';


export const addPass = (req, res) => {
	const encryptedObj = encrypt(req.body.passwd);

	const password = encryptedObj.password;
	const emailUser = req.body.email_user;
	const website = req.body.site;
	const iv = encryptedObj.iv;

	const state = insertToDB(password, emailUser, website, iv);
	if (state === false) res.send("An Error accured!");
	else res.send("Success");
};

export const showPass = (req, res) => {
	db.query(`SELECT * FROM ${process.env.DB_NAME};`, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	})
};

export const decryptPass = (req, res) => {
	const password = decrypt(req.body);
	console.log(password);
	res.send(JSON.stringify(password));
}

export const root = (req, res) => {
	res.send("Hello world");
};
