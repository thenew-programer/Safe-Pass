import { getUserBySessionToken } from '../db/users.js'
import lodash from 'lodash';
import { getError } from '../utils/users.js';

export let USER_TABLE = '';

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

		// skip the login and register route from auth
		if (req.path === '/login' || req.path === '/register') {
			next();
		} else if (req.path === '/auth') {

			let sessionToken = req.cookies.__pass;

			if (!sessionToken) {
				return res.status(405).send('you need to login');
			}
			sessionToken = JSON.parse(sessionToken);

			const user = await getUserBySessionToken(sessionToken).select('+userTable');

			if (!user) {
				return res.status(405).send('You are a scammer.');
			}

			return res.status(200).send('you\'re authenticated');
		} else {
			let sessionToken = req.cookies.__pass;

			if (!sessionToken) {
				return res.status(405).send('you need to login');
			}

			sessionToken = JSON.parse(sessionToken);
			const user = await getUserBySessionToken(sessionToken).select('+userTable');

			if (!user) {
				return res.status(405).send('You are a scammer.');
			}

			USER_TABLE = user.userTable;
			merge(req, { identity: user });
			next();

		}
	} catch (err) {
		next(getError('SERVER FAILED', 500));
	}

}



export const isOwner = async (req, res, next) => {
	try {
		const id = req.body.id;

		const currentUserId = req.identity._id;

		if (!currentUserId || currentUserId.toString() !== id) {
			return res.status(403).send('Forbiden');
		}

		next();

	} catch (err) {
		next(getError('SERVER FAILED', 500));
	}
}

