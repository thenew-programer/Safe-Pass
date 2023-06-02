import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/Footer'
import DarkMode from './DarkMode/DarkMode';
import { Route, Routes } from 'react-router-dom';
import AddPassword from './views/addPassword/AddPassword';
import MyPasswords from './views/MyPasswords/MyPasswords';
import RmPassword from './views/RmPassword/RmPassword';
import Dashboard from './views/Dashboard/Dashboard';
import Updatepass from './views/UpdatePass/Updatepass';
import Profile from './views/profile/Profile'
import Register from './views/Register/Register';
import './App.css';
import Login from './views/Login/Login';

const App = () => {

	return (
		<div className="App">
			<Sidebar />
			<DarkMode />
			<Footer />
			<Routes>
				<Route exact path='/' element={<Dashboard />} />
				<Route path='/home' element={<Dashboard />} />
				<Route path='/add' element={<AddPassword />} />
				<Route path='/show' element={<MyPasswords />} />
				<Route path='/update' element={<Updatepass />} />
				<Route path='/remove' element={<RmPassword />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
