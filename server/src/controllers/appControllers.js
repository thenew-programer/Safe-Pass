import {
	getAll, insertToDB, isExist, deleteFromdb,
	updatePassdb,
} from '../db/app.js';
import { encrypt, decrypt, toCSV } from '../utils/index.js';
import path from 'path';
import '../config.js';
import { getError } from '../utils/users.js';


export const addPass = async (req, res, next) => {
	// const { password, iv } = encrypt(req.body.passwd);
	// const emailUser = req.body.email_user;
	// const website = req.body.site;
	//
	//
	// isExist({ emailUser: emailUser, website: website })
	// 	.then((response) => {
	// 		console.log('return after isExist');
	// 		if (response === false) {
	// 			insertToDB({
	// 				passwd: password,
	// 				site: website,
	// 				user: emailUser,
	// 				iv: iv
	// 			}).then(() => {
	// 				console.log('Success | User does\'nt exist');
	// 				return res.status(200).send(JSON.stringify('Success'));
	// 			}).catch((err) => console.error(err));
	// 		} else {
	// 			console.log("failure, user already exist!");
	// 			return res.send(JSON.stringify("Email already taken."));
	// 		}
	// 	}).catch((err) => {
	// 		console.error(err);
	// 		return res.status(500).send('Failed to add password');
	// 	});

	try {
		const { password, iv } = encrypt(req.body.passwd);
		const emailUser = req.body.email_user;
		let website = req.body.site;
		website.toUpperCase();

		const response = await isExist({ emailUser: emailUser, website: website });

		if (response !== false) {
			console.log('Failure, user already exist');
			return res.send(JSON.stringify("Email already taken!"));
		}

		await insertToDB({ passwd: password, site: website, user: emailUser, iv: iv });
		console.log('Success, User does not exist!');
		return res.send(JSON.stringify('Success'));

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
};



export const showPass = async (req, res, next) => {
	// getAll()
	// 	.then((result) => {
	// 		res.send(JSON.stringify(result));
	// 	}).catch((err) => {
	// 		console.error(err)
	// 		res.status(500).send('Failed to get passwords');
	// 	});

	try {
		const response = await getAll();

		return res.status(200).send(JSON.stringify(response));
	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
};



export const decryptPass = async (req, res, next) => {
	try {
		const password = decrypt(req.body);

		res.send(JSON.stringify(password));

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}



export const getPassCount = async (req, res, next) => {
	// getAll().then((result) => {
	// 	res.send(JSON.stringify(result.length));
	// }).catch((err) => {
	// 	console.error(err);
	// 	res.status(500).send('Failed to get passwords count');
	// })

	try {
		const response = await getAll();

		return res.status(200).send(JSON.stringify(response.length));
	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}



export const removePass = async (req, res, next) => {
	// deleteFromdb(req.body).then((response) => {
	// 	if (response === true) {
	// 		res.send(JSON.stringify("REMOVED"));
	// 	} else {
	// 		res.send(JSON.stringify("FAILED TO REMOVE"))
	// 	}
	// }).catch((err) => {
	// 	console.error(err);
	// 	res.status(500).send("Failed to delete");
	// })

	try {
		await deleteFromdb(req.body);

		return res.status(200).send(JSON.stringify("REMOVED"));

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}


}



export const updatePass = async (req, res, next) => {
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
		});


	// try {
	//
	// 	const response = await isExist({ emailUser: req.body.email, website: req.body.site })
	//
	// 	if (response === false) {
	// 		console.log('Failed to update: pass doesnt exist')
	// 		return res.status(400).send("Password doesn't exist!");
	// 	}
	//
	// 	await updatePassdb({ password: req.body.newPass, id: response[0].id })
	// 	res.status(200).send('Success');
	//
	// } catch (err) {
	// 	console.error(err);
	// 	next(getError('SERVER FAILED', 500));
	// }
}


export const downloadPass = async (req, res, next) => {
	try {
		const arr = await getAll();
		const data = arr.map(item => {
			item.Password = decrypt({ password: item.Password, iv: item.Iv });
			delete item.Iv;
			delete item.id;
			return item;
		});
		await toCSV(data);
		res.sendFile(path.resolve('../../my-passwords.csv'))
	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}



export const root = (req, res) => {
	const { pass } = req.params;
	if (!pass || pass !== '1234') {
		return res.status(404).send("NOT FOUND");
	}
	return res.send("Hello world");
};

