import {
	getAll, insertToDB, isExist, deleteFromdb,
	updatePassdb,
} from '../db/app.js';
import { encrypt, decrypt, toCSV } from '../utils/index.js';
import path from 'path';
import '../config.js';
import { getError } from '../utils/users.js';


export const addPass = async (req, res, next) => {
	try {
		const { password, iv } = encrypt(req.body.passwd);
		const emailUser = req.body.email_user;
		let website = req.body.site;

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
	try {
		const response = await getAll();

		return res.status(200).send(JSON.stringify(response));
	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
};



export const decryptPass = async (req, res) => {

	const password = decrypt(req.body);

	return res.status(200).send(JSON.stringify(password));
}



export const getPassCount = async (req, res, next) => {
	try {
		const response = await getAll();

		return res.status(200).send(JSON.stringify(response.length));

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}



export const removePass = async (req, res, next) => {
	try {
		const { email, site } = req.body;
		await deleteFromdb(email, site);

		return res.status(200).send(JSON.stringify("REMOVED"));

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}


}



export const updatePass = async (req, res, next) => {
	try {
		const response = await isExist({ emailUser: req.body.email, website: req.body.site })

		if (response === false) {
			console.log('Failed to update: pass doesnt exist')
			return res.status(400).send("Password doesn't exist!");
		}

		await updatePassdb({ password: req.body.newPass, id: response[0].id })
		res.status(200).send('Success');

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
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
		return res.sendFile(path.resolve('../../my-passwords.csv'))
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

