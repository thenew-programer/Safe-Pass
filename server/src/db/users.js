import { db } from '../index.js';



export const insertToDB = (passwd, user, site, iv) => {

	db.query(`INSERT INTO PasswordUserSite(Password, User, Site, Iv) VALUES (?, ?, ?, ?)`,
		[passwd, user, site, iv],
		(err) => {
			if (err) return false;
			else return true;
		});
};

export const getAll = () => {
	db.query("SELECT * FROM PasswordUserSite;", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			let data = result;
			console.log(data);
			return data;
		}
	});
};

