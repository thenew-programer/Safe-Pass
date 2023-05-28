import {
	getAll, insertToDB, isExist, deleteFromdb,
	updatePassdb
} from '../db/users.js';
import { encrypt, decrypt, toCSV } from '../utils/index.js';
import path from 'path';
import '../config.js';


const __dirname = path.resolve(path.dirname(''));

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
			if (response !== false) {
				updatePassdb({ password: req.body.newPass, id: response[0].id })
					.then(() => {
						res.send('Success')
					})
					.catch(err => {
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


export const downloadPass = async (req, res) => {
	try {
		let data = await getAll()
		data = data.map(item => {
			item.Password = decrypt({ password: item.Password, iv: item.Iv })
			delete item.Iv;
		});
		await toCSV(data);
		res.sendFile(path.join(__dirname + '../../my-passwords.csv'))
	} catch (err) {
		console.error(err);
		res.status(501).send('Failed to download file');
	}
}
export const root = (req, res) => {
	res.send("Hello world");
};

