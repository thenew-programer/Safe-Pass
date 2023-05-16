import express from 'express';
import { db } from '../index.js';



export const insertToDB = (passwd, user, site, iv) => {

	db.query(`INSERT INTO PasswordUserSite(Password, User, Site, Iv) VALUES (?, ?, ?, ?)`,
		[passwd, user, site, iv],
		(err) => {
			if (err) return false;
			else return true;
		});
}

