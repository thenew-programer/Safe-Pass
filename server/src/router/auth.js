import { addPass, root, showPass, decryptPass } from '../controllers/auth.js';


export default (router) => {
	router.post('/addPass', addPass);
	router.post('/decrypt', decryptPass);
	router.get('/showpasswords', showPass);
	router.get('/', root)
};
