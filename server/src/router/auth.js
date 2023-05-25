import { addPass, root, showPass, decryptPass, getPassCount } from '../controllers/auth.js';


export default (router) => {
	router.post('/addPass', addPass);
	router.get('/showpasswords', showPass);
	router.post('/decrypt', decryptPass);
	router.get('/getpasswordcount', getPassCount);
	router.get('/', root)
};
