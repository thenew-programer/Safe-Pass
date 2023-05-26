import { getAll, insertToDB, isExist, deleteFromdb } from '../db/users.js';
import http from 'http'
import { encrypt, decrypt } from '../utils/index.js';
import '../config.js';

const URL = 'https://passwordmanager-l5wn.onrender.com/';

export const addPass = (req, res) => {
	const encryptedObj = encrypt(req.body.passwd);
	const password = encryptedObj.password;
	const emailUser = req.body.email_user;
	const website = req.body.site;
	website.toUpperCase();
	const iv = encryptedObj.iv;

	// try {
	// 	let isElementExist = isExist({
	// 		emailUser: emailUser,
	// 		website: website,
	// 	});
	// 	console.log('isElementExist = ' + isElementExist)
	// 	// if the user doen't exist
	// 	if (isElementExist === false) {
	// 		const state = insertToDB(password, emailUser, website, iv);
	//
	// 		if (state === false) console.log("An Error accured! in db");
	// 		else {
	// 			res.send(JSON.stringify('Success'));
	// 			console.log('Success | User does\'nt exist');
	// 		}
	// 	} else { 	// if the user exist
	// 		res.send(JSON.stringify("Email already taken."));
	// 		console.log("failure | User exist");
	// 	}
	// } catch (err) {
	// 	console.log(err);
	// }

	isExist({ emailUser: emailUser, website: website })
		.then((response) => {
			if (response === false) {
				insertToDB(password, emailUser, website, iv)
					.then(() => {
						res.send(JSON.stringify('Success'));
						console.log('Success | User does\'nt exist');
					}).catch((err) => console.error(err));
			} else {
				res.send(JSON.stringify("Email already taken."));
				console.log("failure, user already exist!");
			}
		}).catch((err) => {
			console.error(err);
			res.status(500).send('an error occured');
		});
};




export const showPass = (req, res) => {
	getAll()
		.then((result) => {
			res.send(JSON.stringify(result));
		}).catch((err) => {
			console.error(err)
			res.status(500).send('An error occured in the db');
		});
};




export const decryptPass = (req, res) => {
	const password = decrypt(req.body);
	res.send(JSON.stringify(password));
}




export const getPassCount = (req, res) => {
	getAll().then((result) => {
		res.send(JSON.stringify(result.length));
	}).catch((err) => {
		console.error(err);
		res.status(500).send('An error occured');
	})
}




export const removePass = (req, res) => {
	deleteFromdb(req.body).then((response) => {
		if (response === true) {
			res.send(JSON.stringify("REMOVED"));
		} else {
			res.send(JSON.stringify("FAILED TO REMOVE"))
		}
	}).catch((err) => {
		console.error(err);
		res.status(500).send("An error occured");
	})
}




export const root = (req, res) => {
	res.send("Hello world");
};

export const makeInternalRequest = () => {
	const internalRequest = http.request(URL, (response) => {

		response.on('data', (data) => {
			console.log(data);
			console.log('App is working...')
		});

		response.on('error', () => {
			console.log('Server is not Running!');
		});

		internalRequest.end();
	});
}
