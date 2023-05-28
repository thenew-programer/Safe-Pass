import {
	getAll, insertToDB, isExist, deleteFromdb,
	updatePassdb
} from '../db/users.js';
import { encrypt, decrypt } from '../utils/index.js';
import '../config.js';



export const addPass = (req, res) => {
	const encryptedObj = encrypt(req.body.passwd);
	const password = encryptedObj.password;
	const emailUser = req.body.email_user;
	const website = req.body.site;
	website.toUpperCase();
	const iv = encryptedObj.iv;


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
			res.status(500).send('Failed to add password');
		});
};



export const showPass = (req, res) => {
	getAll()
		.then((result) => {
			res.send(JSON.stringify(result));
		}).catch((err) => {
			console.error(err)
			res.status(500).send('Failed to get passwords');
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
		res.status(500).send('Failed to get passwords count');
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
		res.status(500).send("Failed to delete");
	})
}



export const updatePass = (req, res) => {
	isExist({ emailUser: req.body.email, website: req.body.site })
		.then((response) => {
			console.log('response is:');
			console.log(response)
			if (response !== false) {
				updatePassdb({ password: req.body.newPass, id: response.id })
					.then(() => {
						console.log('\n\n\npassword updated succefully\n\n\n')
						res.send('Success')
					})
					.catch(err => {
						console.log('\n\n\npassword not updated\n\n\n')
						console.error(err);
						res.status(500).send("Failed to update.")
					})
			} else {
				console.log('Failed to update: pass doesnt exist')
				res.send("Passowrd doesn't exist!");
			}
		})
		.catch(err => {
			console.error(err);
			res.status(500).send("Failed to update.")
		})
}



export const root = (req, res) => {
	res.send("Hello world");
};

