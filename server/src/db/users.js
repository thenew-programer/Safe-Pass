import { db } from '../index.js';
import '../config.js';


export const insertToDB = (passwd, user, site, iv) => {
	return new Promise((resolve, reject) => {

		const query = `INSERT INTO ${process.env.DATABASE_TABLE}(Password, User, Site, Iv) VALUES (?, ?, ?, ?)`;
		db.query(query, [passwd, user, site, iv],
			(err) => {
				if (err) {
					reject();
				} else {
					resolve();
				}
			});
	})
};



export const getAll = () => {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM ${process.env.DATABASE_TABLE};`;
		db.query(query, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	})
};




export const isExist = (data) => {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE USER = ? AND Site = ?`;
		db.query(query, [data.emailUser, data.website], (err, result) => {
			if (err) {
				reject(err);
			} else {
				if (result.length > 0) {
					resolve(true);
				} else {
					resolve(false)
				}
			}
		});
	});
};
