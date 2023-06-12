import {
	createUser, deleteUserById, getUserByEmail, getUserById,
} from "../db/users.js";
import { authentification, getError, random } from "../utils/users.js";
import { createTable, removeTable } from "../db/app.js";
import { updateUserById } from "../db/users.js";

export const register = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const username = req.body.username;

		if (!email || !password || !username) {
			return res.status(400).send("no data provided");
		}

		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.status(400).send("user already exist");
		}

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
		const userTable = "user" + registeredUser._id.toString().slice(1, 7);
		registeredUser.userTable = userTable;
		registeredUser.save();

		await createTable(userTable);

		return res.status(201).json(registeredUser).end();
	} catch (err) {
		return res.status(500);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).send("no credential provided");
		}

		const user = await getUserByEmail(email).select(
			"+authentification.salt +authentification.password +userTable"
		);
		if (!user) {
			return res.status(400).send("no user registred under these credentials");
		}

		const expectedHash = authentification(user.authentification.salt, password);
		if (expectedHash !== user.authentification.password) {
			return res.status(400).send("incorrect password");
		}

		const salt = random();
		user.authentification.sessionToken = authentification(
			salt,
			user._id.toString()
		);
		await user.save();

		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return res
			.status(200)
			.cookie('__pass', JSON.stringify(user.authentification.sessionToken), {
				expires: tomorrow,
				sameSite: 'none',
				secure: true
			})
			.send('welcome')
	} catch (err) {
		return res.status(500).send('Error while loging.');
	}
};

export const deleteUser = async (req, res) => {
	try {
		const id = req.identity._id;

		const deletedUser = await deleteUserById(id);

		return res.status(200).json(deletedUser);
	} catch (err) {
		return res.status(500).json({ err: err });
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const { id, oldPass, newPass } = req.body;

		if (!oldPass || !newPass || !id) {
			return res.status(400).send("unable to update password");
		}

		const user = await getUserById(id).select(
			"+authentification.password +authentification.salt"
		);

		const expectedPass = authentification(user.authentification.salt, oldPass);
		if (expectedPass !== user.authentification.password) {
			return res.status(401).send("old password incorrect");
		}

		user.authentification.password = authentification(user.authentification.salt, newPass);
		await user.save();

		return res.status(200).send("passoword reset successfully");
	} catch (err) {
		next(getError("SERVER STATUS", 500));
	}
};

export const getUser = async (req, res, next) => {
	try {
		const _id = req.identity._id;
		const user = await getUserById(_id);
		return res.status(200).json(user);
	} catch (err) {
		next(getError("Server STATUS", 500));
	}
};


export const logout = async (req, res) => {

	const id = req.identity._id;
	const user = await getUserById(id).select(
		'+authentification.password +authentification.salt'
	);

	const salt = random();
	user.authentification.sessionToken = authentification(
		salt,
		user._id.toString()
	);
	await user.save();

	return res.status(200).send('logout');
}
