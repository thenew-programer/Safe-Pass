import { createUser, deleteUserById, getUserByEmail, getUserById } from '../db/users.js';
import { authentification, getError, random } from '../utils/users.js';
import { createTable, removeTable } from '../db/app.js';

export let USER_TABLE = '';

export const register = async (req, res) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.status(400);
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400);
		}

		const salt = random();
		const user = await createUser({
			email,
			username,
			userTable,
			authentification: {
				salt,
				password: authentification(salt, password),
			},
		});

		const userTable = user._id + username;
		user.userTable = userTable;
		user.save();

		await createTable(userTable);

		return res.status(201).json(user).end();
	} catch (err) {
		console.error(err);
		return res.status(500);
	}
}



export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400);
		}

		const user = await getUserByEmail(email).select('+authentification.salt +authentification.password +userTable');
		if (!user) {
			return res.status(400);
		}

		const expectedHash = authentification(user.authentification.salt, password);
		if (expectedHash !== user.authentification.password) {
			return res.status(400);
		}

		USER_TABLE = user.userTable;
		const salt = random();
		user.authentification.sessionToken = authentification(salt, user._id.toString());
		await user.save();

		res.cookie('SAFE-PASS', user.authentification.sessionToken,
			{ domain: 'localhost', path: '/' });

		return res.status(202).json(user).end();

	} catch (err) {
		console.error(err);
		return res.status(500);
	}
};


export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedUser = await deleteUserById(id);

		await removeTable(deletedUser.userTable);

		return res.status(203).json(deletedUser);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ err: err });
	}
}


export const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username, email, password } = req.body;

		if (!username) {
			return res.status(400);
		}

		const user = await getUserById(id).select('+authentification.password +authentification.salt');

		salt = random();
		user.username = username;
		user.email = email;
		user.authentification.password = authentification(salt, password);
		user.authentification.salt = salt;
		user.save();

	} catch (err) {
		console.error(err);
		next(getError('SERVER STATUS', 500));
	}
}