import {
	addPass, root, showPass, decryptPass,
	getPassCount, removePass, updatePass, downloadPass
} from '../controllers/appControllers.js';
import { deleteUser, login, register, updateUser } from '../controllers/authentification.js';
import { isAuthenticated, isOwner, pathErrHandler } from '../middlewares/index.js';


export default (router) => {
	router.post('/auth/login/', login);
	router.post('/auth/register', register);
	router.delete('/auth/delete/:id', isAuthenticated, isOwner, deleteUser);
	router.patch('/aut/update/:id', isAuthenticated, isOwner, updateUser);
	router.post('/addPass', addPass);
	router.get('/showpasswords', showPass);
	router.post('/decrypt', decryptPass);
	router.get('/getpasswordcount', getPassCount);
	router.delete('/removePass', removePass);
	router.patch('/updatePass', updatePass);
	router.get('/downloadPass', downloadPass);
	router.get('/:pass', root);
	router.all('*', pathErrHandler);
};
