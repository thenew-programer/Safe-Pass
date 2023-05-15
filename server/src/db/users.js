import express from 'express';
import { db } from '../index.js';



export const insertToDB = (passwd, user, site) => {

	db.query(`INSERT INTO PasswordUserSite(Password, User, Site) VALUES (?, ?, ?)`,
		[passwd, user, site],
		(err) => {
			if (err) return false;
			else return true;
		});
}

