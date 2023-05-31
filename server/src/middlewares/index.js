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
		const sessionToken = req.cookies.safepass;
		console.log(req.cookies);
		console.log(sessionToken);

		if (!sessionToken) {
			return res.status(403).send('you need to login');
		}

		const user = await getUserBySessionToken(sessionToken);

		if (!user) {
			return res.status(403).send('no user found uder your email');
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

		if (!currentUserId || currentUserId.toString() !== id) {
			return res.status(403).send('Forbiden');
		}

		next();

	} catch (err) {
		console.error(err);
		next(getError('SERVER FAILED', 500));
	}
}

