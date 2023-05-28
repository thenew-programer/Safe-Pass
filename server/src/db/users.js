import { db } from '../index.js';
import '../config.js';
import { encrypt } from '../utils/index.js';



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
}



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
}



export const isExist = (data) => {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM ${process.env.DATABASE_TABLE} WHERE USER = ? AND Site = ?;`;
		db.query(query, [data.emailUser, data.website], (err, result) => {
			if (err) {
				reject(err);
			} else {
				if (result.length > 0) {
					resolve(result);
				} else {
					resolve(false)
				}
			}
		});
	});
}



export const deleteFromdb = (data) => {
	return new Promise((resolve, reject) => {
		const query = `DELETE FROM ${process.env.DATABASE_TABLE} WHERE USER = ? AND Site = ?;`
		db.query(query, [data.email, data.site], (err, result) => {
			if (err) {
				reject(err);
			}
			if (result.affectedRows > 0) {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	});
}



export const updatePassdb = (data) => {
	return new Promise((resolve, reject) => {
		const encryption = encrypt(data.password);
		console.log(encryption);
		const query = `UPDATE ${process.env.DATABASE_TABLE} SET Password = ?, Iv = ? WHERE id = ?`;
		db.query(query, [encryption.password, encryption.iv, data.id], (err, result) => {
			if (err) {
				reject(err);
			}
			if (result.affectedRows > 0) {
				resolve();
			} else {
				reject();
			}
		})
	})
}
