import crypto from 'crypto';
import '../config.js';
import { writeFile } from 'fs';


const KEY = process.env.DATA_ENCRYPTION_KEY;

export const encrypt = (password) => {
	const iv = Buffer.from(crypto.randomBytes(16));
	const cipher = crypto.createCipheriv(
		'aes256',
		Buffer.from(KEY),
		iv
	);

	const encryptedPass = Buffer.concat([
		cipher.update(password),
		cipher.final()
	]);

	return {
		password: encryptedPass.toString('hex'),
		iv: iv.toString('hex')
	};
};


export const decrypt = (encryption) => {
	const decipher = crypto.createDecipheriv(
		'aes256',
		Buffer.from(KEY),
		Buffer.from(encryption.iv, 'hex')
	);

	const decryptedPass = Buffer.concat([
		decipher.update(Buffer.from(encryption.password, 'hex')),
		decipher.final()
	]);

	return decryptedPass.toString('utf8');
};


export const toCSV = (arr) => {
	return new Promise((resolve, reject) => {
		arr.unshift({
			Site: 'Website',
			User: 'User/Email',
			Password: 'Password'
		});
		const csvData = arr.map(item => Object.values(item).join(','));
		const csvContent = csvData.join('\n');
		writeFile('../../my-passwords.csv', csvContent, 'utf8', err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}
