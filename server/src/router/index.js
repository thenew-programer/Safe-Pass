import express from 'express';
import  routes from './auth.js';


const router = express.Router();

export default () => {
	routes(router);

	return router;
}
