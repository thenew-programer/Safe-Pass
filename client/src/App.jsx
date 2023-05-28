import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer/Footer'
import DarkMode from './DarkMode/DarkMode';
import './App.css';

const App = () => {

	return (
		<div className="App">
			<Sidebar />
			<DarkMode />
			<Footer />
		</div>
	);
}

export default App;
