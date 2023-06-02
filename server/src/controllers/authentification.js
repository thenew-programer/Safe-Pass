import { createUser, deleteUserById, getUserByEmail, getUserById } from '../db/users.js';
import { authentification, getError, random } from '../utils/users.js';
import { createTable, removeTable } from '../db/app.js';


export const register = async (req, res) => {
	try {
		console.log('register method called!');
		console.log(req.body);
		const email = req.body.email;
		const password = req.body.password;
		const username = req.body.username;

		if (!email || !password || !username) {
			return res.status(400).send('no data provided');
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400).send('user already exist');
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


		const registeredUser = await getUserByEmail(email);
		const userTable = 'user' + registeredUser._id.toString().slice(1, 7);
		registeredUser.userTable = userTable;
		registeredUser.save();

		console.log('user created successfully');
		await createTable(userTable);
		console.log('table created successfully');

		return res.status(201).json(registeredUser).end();
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
			return res.status(400).send('no credential provided');
		}

		const user = await getUserByEmail(email).select('+authentification.salt +authentification.password +userTable');
		if (!user) {
			return res.status(400).send('no user registred under these credentials');
		}

		const expectedHash = authentification(user.authentification.salt, password);
		if (expectedHash !== user.authentification.password) {
			return res.status(400).send('incorrect password');
		}

		const salt = random();
		user.authentification.sessionToken = authentification(salt, user._id.toString());
		await user.save();

		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return res.status(200)
			.cookie('__pass', user.authentification.sessionToken, {
				sameSite: 'none',
				secure: true,
				httpOnly: true,
				path: '/',
				expires: tomorrow,
				domain: '.onrender.com'
			})
			.send('welcome');

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
		const { password } = req.body;

		if (!password) {
			return res.status(400).send('unable to update password').end();
		}

		const user = await getUserById(id).select('+authentification.password +authentification.salt');

		const expectedPass = authentification(user.authentification.salt, password);
		if (expectedPass !== user.authentification.password) {
			return res.status(400).send('old password incorrect').end();
		}

		salt = random();
		user.authentification.password = authentification(salt, password);
		user.authentification.salt = salt;
		user.save();

		return res.status(200).send('passoword reset successfully').end();

	} catch (err) {
		console.error(err);
		next(getError('SERVER STATUS', 500));
	}
}

export const getUser = async (req, res, next) => {
	try {
		const { _id } = req.identity;
		const user = await getUserById(_id);
		return res.status(200).json(user).end();
	} catch (err) {
		console.log(err);
		next(getError('Server STATUS', 500));
	}
}
