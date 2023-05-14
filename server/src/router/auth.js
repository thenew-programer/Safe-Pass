import  express  from 'express';
import { addPass, root } from '../controllers/auth.js';


export default (router) => {
	router.post('/addPass', addPass);
	router.get('/', root)
};
