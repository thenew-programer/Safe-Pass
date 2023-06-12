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
			return res.send(JSON.stringify("Email already taken!"));
		}

		await insertToDB({ passwd: password, site: website, user: emailUser, iv: iv });
		return res.send(JSON.stringify('Success'));

	} catch (err) {
		next(getError('SERVER FAILED', 500));
	}
};



export const showPass = async (req, res, next) => {
	try {
		const response = await getAll();

		return res.status(200).send(JSON.stringify(response));
	} catch (err) {
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
		next(getError('SERVER FAILED', 500));
	}
}



export const removePass = async (req, res, next) => {
	try {
		const { email, site } = req.body;
		await deleteFromdb(email, site);

		return res.status(200).send(JSON.stringify("REMOVED"));

	} catch (err) {
		next(getError('SERVER FAILED', 500));
	}


}



export const updatePass = async (req, res, next) => {
	try {
		const oldPass = req.body.oldPass;
		const response = await isExist({ emailUser: req.body.email, website: req.body.site })

		if (response === false) {
			return res.status(400).send("Password doesn't exist!");
		}

		const password = decrypt({
			password: response[0].Password,
			iv: response[0].Iv
		});
		if (password !== oldPass) {
			return res.status(400).send("Old Password incorrect");
		}

		await updatePassdb({ password: req.body.newPass, id: response[0].id })
		res.status(200).send('Success');

	} catch (err) {
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
		const my_passwords = toCSV(data);
		return res.setHeader('Content-Type', 'text/csv')
			.setHeader('Content-Disposition', 'attachement; filename="my-passwords.csv"')
			.status(200)
			.send(my_passwords);
	} catch (err) {
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

