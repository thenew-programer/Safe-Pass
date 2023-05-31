import crypto from 'crypto';
import '../config.js'

const KEY = process.env.USERS_HASHING_KEY;

export const random = () => crypto.randomBytes(128).toString('base64');

export const authentification = (salt, password) => {
	return crypto.createHmac('sha256', [salt, password].join('/')).update(KEY).digest('hex');
}

export const getError = (status, code) => {
	const error = new Error(status);
	error.statusCode = code;
	return error;
}
