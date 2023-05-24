import { db } from '../index.js';
import '../config.js';


export const insertToDB = (passwd, user, site, iv) => {

	const query = `INSERT INTO ${process.env.DATABASE_TABLE}(Password, User, Site, Iv) VALUES (?, ?, ?, ?)`;
	db.query(query,
		[passwd, user, site, iv],
		(err) => {
			if (err) return false;
			else return true;
		});
};

export const getAll = () => {
	const query = `SELECT * FROM ${process.env.DATABASE_TABLE};`;
	const returnValue = 0;
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			returnValue = result;
		}
	});
	return returnValue;
};

export const isExist = (data) => {
	const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE USER = ? AND Site = ?`;
	let returnValue = false;
	db.query(query, [data.emailUser, data.website], (err, result) => {
		if (err) console.error(err);
		else {
			if (result.length > 0) {
				console.log('User exist');
				returnValue = true;
			}
			else {
				console.log('User doesn\'t exist');
				returnValue = false;
			}
		}
	});
	return returnValue;
}
