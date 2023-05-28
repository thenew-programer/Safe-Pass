import { addPass, root, showPass, decryptPass,
		getPassCount, removePass, updatePass, downloadPass } from '../controllers/auth.js';


export default (router) => {
	router.post('/addPass', addPass);
	router.get('/showpasswords', showPass);
	router.post('/decrypt', decryptPass);
	router.get('/getpasswordcount', getPassCount);
	router.post('/removePass', removePass);
	router.post('/updatePass', updatePass);
	router.get('/downloadPass', downloadPass);
	router.get('/', root);
};
