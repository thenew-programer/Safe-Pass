import express from 'express';

import  auth from './auth.js';


const router = express.Router();

export default () => {
	auth(router);

	return router;
}
