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

		return res.status(200)
			.cookie('safepass', user.authentification.sessionToken, {
				samesite: 'None',
				secure: true,
				httpOnly: true,
				domain: '.onrender.com',
				path: '/'
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

		if (!username) {
			return res.status(400);
		}

		const user = await getUserById(id).select('+authentification.password +authentification.salt');

		salt = random();
		user.authentification.password = authentification(salt, password);
		user.authentification.salt = salt;
		user.save();

	} catch (err) {
		console.error(err);
		next(getError('SERVER STATUS', 500));
	}
}
