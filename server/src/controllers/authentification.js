import { createUser, deleteUserById, getUserByEmail, getUserById } from '../db/users.js';
import { authentification, getError, random } from '../utils/users.js';
import { createTable, removeTable } from '../db/app.js';

export let USER_TABLE = '';

export const register = async (req, res) => {
	try {
		console.log('register method called!');
		// const { email, password, username } = req.body;
		const email = 'jos@hello.com';
		const password = '1234';
		const username = 'jos';

		if (!email || !password || !username) {
			return res.status(400).send('no data provided');
		}
		console.log('req.body is not empty');

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400);
		}
		console.log('user is not there');

		const salt = random();
		const user = await createUser({
			email,
			username,
			authentification: {
				password: authentification(salt, password),
				salt,
			},
		});


		const userTable = username + user._id;
		user.userTable = userTable;
		user.save();

		console.log('user created successfully');
		await createTable(userTable);
		console.log('table created successfully');

		return res.status(201).json(user).end();
	} catch (err) {
		console.error(err);
		console.log('error while registring user');
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
