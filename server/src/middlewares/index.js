import { getUserBySessionToken } from '../db/users.js'
import lodash from 'lodash';
import { getError } from '../utils/users.js';


const { get, merge } = lodash;

export const errHandler = (err, req, res, next) => {
	res.status(err.statusCode).json({
		statusCode: err.statusCode,
		message: err.message
	});
}


export const pathErrHandler = (req, res, next) => {
	const err = getError('Not Found', 404);
	next(err);
}


export const isAuthenticated = async (req, res, next) => {
	try {

		// ignore auth in register and login routes
		if (req.originalUrl === '/auth/register' || req.originalUrl === '/auth/login') {
			console.log('register or login requested and escaped by the auth middleware!');
			next();
		}

		const sessionToken = req.cookies['SAFE-PASS'];

		if (!sessionToken) {
			return res.sendStatus(403);
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res.sendStatus(403);
		}

		merge(req, { identity: user });
		next();

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}

}



export const isOwner = async (req, res, next) => {
	try {
		const { id } = req.params;

		const currentUserId = get(req, 'identity._id');

		if (!currentUserId) {
			return res.sendStatus(403);
		}

		if (currentUserId.toString() !== id) {
			return res.sendStatus(403);
		}

		next();

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}

