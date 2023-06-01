import {
	addPass, root, showPass, decryptPass,
	getPassCount, removePass, updatePass, downloadPass
} from '../controllers/appControllers.js';
import { deleteUser, login, register, updateUser } from '../controllers/authentification.js';
import { isOwner, pathErrHandler } from '../middlewares/index.js';


export default (router) => {
	router.post('/login/', login);
	router.post('/register', register);
	router.delete('/delete/:id', isOwner, deleteUser);
	router.patch('/update/:id', isOwner, updateUser);
	router.get('/auth');
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
