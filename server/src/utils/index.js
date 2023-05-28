import crypto from 'crypto';
import '../config.js';
import { writeFile } from 'fs';


const KEY = process.env.ENCRYPTION_KEY;

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


export const toCSV = (arr, delimiter = ',') => {
	return new Promise((resolve, reject) => {
		const csvData = arr.map(item => Object.values(item).join(delimiter));
		const csvContent = csvData.join('\n');
		console.log(csvContent);
		writeFile('../../my-passwords.csv', csvContent, 'utf8', err => {
			if (err) {
				reject();
			} else {
				console.log("my-passwords.csv generated successfully");
				resolve();
			}
		});
	});
}
