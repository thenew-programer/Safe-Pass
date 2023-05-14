import  express  from 'express';
import { db } from '../index.js';



export const insertToDB = (pass, site) => {

	db.query(`INSERT INTO passwd(password, website) VALUES (?, ?)`, [pass, site],
		(err) => {
			if (err) return false;
			else return true;
		});
}

