import {
	addPass, root, showPass, decryptPass,
	getPassCount, removePass, updatePass,
	downloadPass, 
} from '../controllers/appControllers.js';
import { deleteUser, login, register, updateUser, getUser, logout } from '../controllers/authentification.js';
import { isOwner, pathErrHandler } from '../middlewares/index.js';


export default (router) => {
	router.post('/login/', login);
	router.post('/register', register);
	router.delete('/delete/:id', isOwner, deleteUser);
	router.patch('/update/:id', isOwner, updateUser);
	router.get('/user', getUser);
	router.get('/auth/');
	router.get('/logout', logout);
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
