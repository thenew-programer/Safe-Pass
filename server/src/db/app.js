import { db } from '../index.js';
import '../config.js';
import { encrypt } from '../utils/index.js';
import { USER_TABLE as DATABASE_TABLE } from '../controllers/authentification.js';



export const insertToDB = (passwd, user, site, iv) => {
	return new Promise((resolve, reject) => {

		const query = `INSERT INTO ${DATABASE_TABLE}(Password, User, Site, Iv) VALUES (?, ?, ?, ?)`;
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
		const query = `SELECT * FROM ${'passwordmanager'};`;
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
		const query = `SELECT * FROM ${DATABASE_TABLE} WHERE USER = ? AND Site = ?;`;
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
		const query = `DELETE FROM ${DATABASE_TABLE} WHERE USER = ? AND Site = ?;`
		db.query(query, [data.email, data.site], (err, result) => {
			if (err) {
				reject(err);
			}
			if (result.affectedRows > 0) {
				resolve(true);
			} else {
				reject(err);
			}
		});
	});
}



export const updatePassdb = (data) => {
	return new Promise((resolve, reject) => {
		const encryption = encrypt(data.password);
		const query = `UPDATE ${DATABASE_TABLE} SET Password = ?, Iv = ? WHERE id = ?`;
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



export const createTable = (tableName) => {
	return new Promise((resolve, reject) => {

		const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INT AUTO_INCREMENT PRIMARY, KEY, Site VARCHAR(255) NOT NULL, User VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, Iv VARCHAR (255) NOT NULL);`

		db.query(query, (err) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log('Table created successfully!');
				resolve();
			}
		})
	})
};


export const removeTable = (tableName) => {
	return new Promise((resolve, reject) => {
		const query = `DROP TABLE IF EXISTS ${tableName};`;
		db.query(query, (err) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log('Table droped successfully');
				resolve();
			}
		})
	});
}
